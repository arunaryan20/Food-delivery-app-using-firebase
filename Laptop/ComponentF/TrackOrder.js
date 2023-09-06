import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {firebase} from '@react-native-firebase/auth'
import {ScrollView} from 'react-native-gesture-handler'

const TrackOrder = ({navigation}) => {
  const [orders, setOrders] = useState()
  const getorders = async () => {
    const ordersRef = firebase
      .firestore()
      .collection('UserOrders')
      .where('orderuserid', '==', firebase.auth().currentUser.uid)
    ordersRef.onSnapshot(snapshot => {
      setOrders(snapshot.docs.map(doc => doc.data()))
    })
  }
  useEffect(() => {
    getorders()
  }, [])

  const convertDate = date => {
    let newDate = new Date(date.seconds * 1000)
    return newDate.toDateString()
  }
     const cancelOrder=(orderitem)=>{
         const orderRef=firebase.firestore().collection('UserOrders').doc(orderitem.orderid);
         orderRef.update({
          orderstatus:"cancelled"
         })
         getorders();
     }



  console.log('this is Trackorders ', orders)

  return (
    <View style={{flex:1}}>
      <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
        <View style={{alignSelf: 'center', paddingLeft: '20%'}}>
          <Text style={{color: 'red', fontSize: 30, fontWeight: '500'}}>
            Your Orders
          </Text>
        </View>
      </View>

      <ScrollView>
        {orders != null &&
          orders
            .sort((a, b) => b.orderdate.seconds - a.orderdate.seconds)
            .map((order, index) => {
              return (
                <View style={{marginTop:10}}>
                  <View style={{width:30,height:30,marginLeft:10,backgroundColor:"white",alignItems:"center",justifyContent:"center",padding:4,borderRadius:4,elevation:10}}>
                  <Text style={{color: 'black',fontWeight:"500"}}>{index + 1}</Text>
                  </View>
                  <Text style={styles.txt1}>
                    order id : {order.orderid}
                  </Text>
                  <Text style={styles.txt1}>
                    order date : {convertDate(order.orderdate)}
                  </Text>
                  {order.orderstatus == 'ontheway' && (
                    <Text style={styles.status_way}>
                      Your Order is on the Way
                    </Text>
                  )}

                  {order.orderstatus == 'delivered' && (
                    <Text style={styles.status_delivered}>
                      Your Order has Delivered
                    </Text>
                  )}
                  {order.orderstatus == 'cancelled' && (
                    <Text style={styles.status_cancel}>
                      Your Order has Cancelled
                    </Text>
                  )}
                  {order.orderstatus == 'pending' && (
                    <Text style={styles.status_pending}>Your Order is Pending</Text>
                  )}

                  <View style={{alignSelf:"center",padding:10,elevation:10,alignItems:"center",backgroundColor:"white",borderRadius:5}}>
                    <Text style={{alignSelf:"center",color:"red",fontSize:20}}>
                      Delivery Agent name & Contact
                    </Text>
                    {order.deliveryboy_name ? (
                      <Text style={styles.txt3}>
                        {order.deliveryboy_name}
                      </Text>
                    ) : (
                      <Text style={styles.txt3}>Not Assigned</Text>
                    )}
                    {order.deliveryboy_phone ? (
                      <Text style={styles.txt3}>
                        {order.deliveryboy_phone}
                      </Text>
                    ) : (
                      <Text style={styles.txt3}>Not Assigned</Text>
                    )}
                  </View>

                  <View>
                    <FlatList
                      data={order.orderdata}
                      renderItem={({item}) => (
                        <View>
                          <View style={styles.item}>
                            <Text style={{color: 'red', fontSize: 20}}>
                              {item.data.foodName}
                            </Text>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 20,
                                paddingLeft: 20,
                              }}>
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
                    <Text style={{color:"black",fontSize:20}}>Total: </Text>
                  <Text style={{ color: 'black',
              fontSize: 20,
              position: 'absolute',
              marginLeft: 230,
              padding: 4,
              borderWidth: 2,
              borderColor: 'pink',
              borderRadius: 5,}}>₹  {order.ordercost}/-</Text>
                  </View>
                   
                   {
                    order.orderstatus=="delivered"?<Text style={styles.status_delivered}>Thank you for ordering with us</Text>:null
                   }
                    {
                    order.orderstatus=="cancelled"?<Text style={styles.status_delivered}>Sorry for the inconvenience</Text>:null
                   }

                   {
                    order.orderstatus!="cancelled" && order.orderstatus!="delivered"?<TouchableOpacity style={styles.cancelorder} onPress={()=>cancelOrder(order)}>
                      <Text style={{color:"white",fontSize:15,fontWeight:"500"}}>Cancel Order</Text>
                    </TouchableOpacity>:null
                   }

                </View>
              )
            })}
      </ScrollView>
    </View>
  )
}

export default TrackOrder

const styles = StyleSheet.create({
    txt1:{
          alignSelf:"center",
          color:"black",
          fontWeight:"500",
          fontSize:15,
    },
    status_pending:{
      backgroundColor:"palegoldenrod",color:"red",alignSelf:"center",height:40,padding:5,borderRadius:4,fontSize:18,margin:10,elevation:10,
    },
    status_delivered:{
      backgroundColor:"green",color:"white",alignSelf:"center",height:40,padding:5,borderRadius:4,fontSize:18,margin:10,elevation:10,
    },
    status_cancel:{
      backgroundColor:"red",color:"black",alignSelf:"center",height:40,padding:5,borderRadius:4,fontSize:18,margin:10,elevation:10,
    },
    status_way:{
      backgroundColor:"orangered",color:"white",alignSelf:"center",height:40,padding:5,borderRadius:4,fontSize:18,margin:10,elevation:10,
    },

     txt3:{
      color: 'black',paddingTop:5,fontSize:15,fontWeight:"500",
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
    cancelorder:{
      alignSelf:"center",
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:"red",
      padding:5,
      borderRadius:5,
      marginTop:5,
      elevation:10,
      height:40,
    }
})
