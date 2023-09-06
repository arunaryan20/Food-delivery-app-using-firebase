import {StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native'
import React, {useEffect, useState} from 'react'
import {FlatList, ScrollView} from 'react-native-gesture-handler'
import {firebase} from '@react-native-firebase/auth'

const Order = ({navigation, route}) => {
  // const data1=route.params.cartData;
  const [totalPrice, setTotalPrice] = useState()
  const [userLoggeduid, setUserLoggeduid] = useState('')
  const [userdata, setUserdata] = useState(null)
  useEffect(() => {
    const data1 = JSON.parse(route.params.cartData).cart
    let total = 0
    data1.map(item => {
      total = item.data.foodPrice * item.Foodquantity + total
    })

    setTotalPrice(total)
  }, [])

  useEffect(() => {
    const checkLogin = () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user)
          setUserLoggeduid(user.uid)
        } else {
          setUserLoggeduid('')
          console.log('No user logged in')
        }
      })
    }
    checkLogin()
  }, [])

  useEffect(() => {
    const getUserData = async () => {
      const docRef = await firebase
        .firestore()
        .collection('UserData')
        .where('uid', '==', userLoggeduid)
      const doc = await docRef.get()
      doc.forEach(doc => {
        setUserdata(doc.data())
      })
      // if(!doc.empty){

      // }else{
      //     navigation.navigate('Signin')
      // }
    }

    getUserData()
  }, [userLoggeduid])

  console.log('User data ', userdata)
  // console.log("Total Price "+totalPrice);
  const placenow=()=>{
    // console.log(JSON.parse(route.params.cartData).cart);
   
          const docRef=firebase.firestore().collection('UserOrders').doc(new Date().getTime().toString());
          docRef.set({
              orderid:docRef.id,
               orderdata:JSON.parse(route.params.cartData).cart,
              orderstatus:'pending',
              ordercost:totalPrice,
              orderdate:firebase.firestore.FieldValue.serverTimestamp(),
              orderaddress:userdata.address,
              orderphone:userdata.phone,
              ordername:userdata.name,
              orderuserid:userLoggeduid,
              orderpayment:'online',
              paymentstatus:'paid',

          }).then(()=>{
           Alert.alert("Done");
          })


  }
  return (
    <View>
      <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View
            style={{
              elevation: 15,
              width: 30,
              height: 30,
              backgroundColor: 'white',
              margin: 5,
            }}>
            <Image
              source={require('../Assets/back.png')}
              style={{
                height: 30,
                width: 30,
                tintColor: 'red',
                backgroundColor: 'white',
                position: 'absolute',
              }}
            />
          </View>
        </TouchableOpacity>
        <View style={{alignSelf: 'center', paddingLeft: '12%'}}>
          <Text style={{color: 'red', fontSize: 25, fontWeight: '500'}}>
            Your Order Summary
          </Text>
        </View>
      </View>
      <ScrollView style={{marginBottom:120}}>
        <View>
          <FlatList
            data={JSON.parse(route.params.cartData).cart}
            renderItem={({item}) => (
              <View>
                <View style={styles.item}>
                  <Text style={{color: 'red', fontSize: 20}}>
                    {item.data.foodName}
                  </Text>
                  <Text style={{color: 'black', fontSize: 20, paddingLeft: 20}}>
                    ₹ {item.data.foodPrice}/-
                  </Text>

                  <Text style={styles.price1}>
                    ₹ {item.data.foodPrice * item.Foodquantity}/-
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
        <View style={styles.item}>
          <Text style={{color: 'red', fontSize: 25}}>Total</Text>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              position: 'absolute',
              marginLeft: 230,
              padding: 4,
              borderWidth: 2,
              borderColor: 'pink',
              borderRadius: 5,
            }}>
            ₹ {totalPrice}/-
          </Text>
        </View>

         <View>
              <Text style={{fontSize:25,color:"red",alignSelf:"center",paddingTop:20}}>User Details</Text>
             <View style={styles.outer}>
                <View style={styles.inner}>
                  <Text style={{color:"red",fontSize:18}}>Name: </Text>
                  <Text style={{color:"black",fontSize:18}}>{userdata?.name}</Text>
                </View>
                <View style={styles.inner}>
                  <Text style={{color:"red",fontSize:18}}>Email: </Text>
                  <Text style={{color:"black",fontSize:18}}>{userdata?.email}</Text>
                </View>
                <View style={styles.inner}>
                  <Text style={{color:"red",fontSize:18}}>Phone: </Text>
                  <Text style={{color:"black",fontSize:18}}>{userdata?.phone}</Text>
                </View>
                <View style={styles.inner}>
                  <Text style={{color:"red",fontSize:18}}>Address: </Text>
                  <Text style={{color:"black",fontSize:18}}>{userdata?.address}</Text>
                </View>
              </View>
         </View>

      </ScrollView>

      <View style={styles.container1}>
        <TouchableOpacity
          onPress={() => placenow()}>
          <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
            Proceed to Payment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Order

const styles = StyleSheet.create({
  container1: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:1,
    borderRadius: 4,
    width: 200,
    height: 50,
    backgroundColor: 'red',
    elevation: 20,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 700,
  },
  item: {
    backgroundColor: 'white',
    width: '90%',
    padding: 20,
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
  },
  price1: {
    color: 'black',
    fontSize: 20,
    position: 'absolute',
    marginLeft: 245,
    padding: 4,
    borderWidth: 2,
    borderColor: 'pink',
    borderRadius: 5,
  },
  outer:{
      backgroundColor:"white",
      elevation:10,
      alignSelf:"center",
      // alignItems:"center",
      padding:20,
      borderRadius:8,
      width:"90%",
      marginTop:10,
      marginBottom:10,

  },
  inner:{
    flexDirection:"row",
    padding:10
  },
})
