import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import React, {useEffect, useState} from 'react'
import BottomNav from './BottomNav'
import {firebase} from '@react-native-firebase/auth'
import {FlatList, ScrollView} from 'react-native-gesture-handler'
import {parse} from 'yargs'
import Order from './Order'

const CartItem = ({navigation,props}) => {
  const [cartData, setCartData] = useState(null)
  const [totalCost, setTotalCost] = useState('0')
  const [fooddatalength, setfooddatalength] = useState()

  const getCartData = async () => {
    const docRef = firebase
      .firestore()
      .collection('UserCart')
      .doc(firebase.auth().currentUser.uid)
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = JSON.stringify(doc.data())
          setCartData(data)
        } else {
          console.log('No such document')
        }
      })
      .catch(error => {
        console.log('error getting document: ', error)
      })
  }
  useEffect(() => {
    getCartData()
  }, [])
  console.log('this is cart data' + cartData)
  useEffect(() => {
    if (cartData != null) {
      const fooddata = JSON.parse(cartData).cart
      console.log('food data length ', fooddata.length)
      setfooddatalength(fooddata.length)

      let totalfoodprice = 0
      fooddata.map(item => {
        totalfoodprice =
          item.data.foodPrice * item.Foodquantity + totalfoodprice
      })
      setTotalCost(totalfoodprice)
    }
  }, [cartData])

  const backClick = () => {
    navigation.navigate('Home')
  }

  const removeItem =async (item) => {
    const docRef =await firebase
      .firestore()
      .collection('UserCart')
      .doc(firebase.auth().currentUser.uid)
       .update({
      cart: firebase.firestore.FieldValue.arrayRemove(item),
    })

    getCartData()
  }
  return (
    <View>
      <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
        <TouchableOpacity onPress={() => backClick()}>
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
        <View style={{alignSelf: 'center', paddingLeft: '25%'}}>
          <Text style={{color: 'red', fontSize: 30, fontWeight: '500'}}>
            Your Cart
          </Text>
        </View>
      </View>

      <View>
        <ScrollView style={{marginBottom: 170}}>
          {fooddatalength > 0 ? (
            <View>
              <FlatList
                data={JSON.parse(cartData).cart}
                renderItem={({item}) => (
                  <View
                    style={{
                      height: 100,
                      backgroundColor: 'white',
                      width: '95%',
                      marginTop: 20,
                      alignSelf: 'center',
                      borderRadius: 8,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        <Image
                          source={{uri: item.data.foodImageUrl}}
                          style={{
                            height: 100,
                            width: 120,
                            borderTopLeftRadius: 8,
                            borderBottomLeftRadius: 8,
                          }}
                        />
                      </View>
                      <View>
                        <View style={{flexDirection: 'row', paddingLeft: 10}}>
                          <Text style={{color: 'red', fontSize: 18}}>
                            {item.data.foodName}
                          </Text>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 18,
                              paddingLeft: 50,
                              position: 'absolute',
                              paddingLeft: 130,
                            }}>
                            ₹ {item.data.foodPrice}/each
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingLeft: 10}}>
                          <Text style={{color: 'red', fontSize: 15}}>
                            Quantity
                          </Text>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 15,
                              paddingLeft: 10,
                            }}>
                            {item.Foodquantity}
                          </Text>
                        </View>

                        <View style={{margin: 10}}>
                          <TouchableOpacity onPress={() => removeItem(item)}>
                            <View style={styles.container}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontWeight: '500',
                                  color: 'black',
                                }}>
                                Remove
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>

          ) : (
            <View
              style={{
                alignSelf: 'center',
                width: '80%',
                height: 200,
                backgroundColor: 'white',
                elevation: 15,
                marginTop: 100,
                borderRadius: 8,
                justifyContent: 'center',
              }}>
              <Text style={{color: 'green', fontSize: 25, alignSelf: 'center'}}>
                No items added
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          marginTop: 680,
          height: 80,
          padding: 20,
          position: 'absolute',
          width: '100%',
        }}>
        <Text style={{color: 'red', fontSize: 20}}>Total Price</Text>
        <Text style={{color: 'black', fontSize: 25, paddingLeft: 20}}>
          ₹{totalCost}/-
        </Text>
       
          <View style={styles.container1}>
          <TouchableOpacity onPress={()=>navigation.navigate("Order",{cartData})}>
            <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
              Place Order
            </Text>
            </TouchableOpacity>
          </View>
       
      </View>
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:1,
    borderRadius: 4,
    width: 80,
    height: 30,
    backgroundColor: 'white',
    elevation: 20,
  },
  container1: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:1,
    borderRadius: 4,
    width: 100,
    height: 40,
    backgroundColor: 'red',
    elevation: 20,
    position: 'absolute',
    marginLeft: 230,
    marginTop:20
  },
})
