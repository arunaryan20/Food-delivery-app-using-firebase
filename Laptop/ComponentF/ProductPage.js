import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native'
import React, {useState} from 'react'
import {firebase} from '@react-native-firebase/auth'

const ProductPage = ({navigation, route}) => {
  const data = route.params
  console.log('this is data ' + JSON.stringify(data))
  const [quantity, setQuantity] = useState(1)
  const [addOnQuantity, setAddOnQuantity] = useState('0')
  const increaseQnt = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1)
    } else {
      Alert.alert('Add maximum 10 quantity only')
    }
  }
  const decreaseQnt = () => {
    if (quantity == 1) {
      Alert.alert('Minimum quantity 1')
    } else {
      setQuantity(quantity - 1)
    }
  }

  const addToCart = () => {
    const docRef = firebase
      .firestore()
      .collection('UserCart')
      .doc(firebase.auth().currentUser.uid)
    const data1 = {data, addOnQuantity: addOnQuantity, Foodquantity: quantity}
    docRef.get().then(doc => {
      if (doc.exists) {
        docRef.update({
          cart: firebase.firestore.FieldValue.arrayUnion(data1),
        })
        Alert.alert('Added to cart')
      } else {
        docRef.set({
          cart: [data1],
        })
        Alert.alert('Added to cart')
      }
    })

    console.log('data1  ', data1)
  }

  const cartData=JSON.stringify({cart:[{data, addOnQuantity: addOnQuantity, Foodquantity: quantity}]})
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View>
          <Image
            source={{uri: data.foodImageUrl}}
            style={{
              width: '95%',
              height: 280,
              alignSelf: 'center',
              marginTop: 10,
              borderRadius: 5,
            }}
          />
          <View style={{flexDirection: 'row', paddingLeft: 20, paddingTop: 20}}>
            <View>
              <Text style={{color: 'red', fontSize: 30, fontWeight: 500}}>
                {data.foodName}
              </Text>
            </View>
            <View
              style={{paddingLeft: 250, position: 'absolute', paddingTop: 20}}>
              <Text style={{color: 'black', fontSize: 30}}>
                ₹{data.foodPrice}/-
              </Text>
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              width: '95%',
              borderWidth: 2,
              borderColor: 'green',
              borderRadius: 5,
              padding: 10,
              marginTop: 15,
            }}>
            <Text style={{color: 'red', fontSize: 18}}>About</Text>
            <Text style={{color: 'black', fontSize: 15}}>{data.foodDesc}</Text>
            <Text style={{color: 'black', fontSize: 15}}>{data.foodType}</Text>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              alignItems: 'center',
              alignSelf: 'center',
              padding: 20,
              borderColor: 'green',
              marginTop: 20,
              // borderWidth: 2,
              borderRadius: 8,
              elevation: 10,
            }}>
            <View>
              <Text style={{color: 'red', fontSize: 18}}>Location</Text>
            </View>
            <View>
              <Text style={{color: 'black', fontSize: 25, paddingTop: 10}}>
                {data.restName}{' '}
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <View>
                <Text style={{color: 'red', fontSize: 15}}>
                  {data.restBuildingNumber}
                </Text>
              </View>
              <View>
                <Text style={{color: 'red', fontSize: 15}}>|</Text>
              </View>
              <View>
                <Text style={{color: 'red', fontSize: 15}}>
                  {data.restArea}
                </Text>
              </View>
              <View>
                <Text style={{color: 'red', fontSize: 15}}>|</Text>
              </View>
              <View>
                <Text style={{color: 'red', fontSize: 15}}>
                  {data.restCity}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              elevation: 20,
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 20,
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 8,
              width: 200,
            }}>
            <View>
              <Text style={{fontSize: 18, color: 'red'}}>Food Quantity</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10, paddingTop: 10}}>
              <TouchableOpacity onPress={() => increaseQnt()}>
                <View style={styles.btn1}>
                  <Text style={{fontSize: 20, color: 'white'}}>+</Text>
                </View>
              </TouchableOpacity>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'black'}}>{quantity}</Text>
              </View>
              <TouchableOpacity onPress={() => decreaseQnt()}>
                <View style={styles.btn1}>
                  <Text style={{fontSize: 25, color: 'white'}}>-</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flexDirection:"row",backgroundColor:"white",elevation:20,padding:10,alignSelf:"center",marginTop:20,width:300,borderRadius:8}}>
           <View>
                 <Text style={{color:"red",fontSize:18}}>Total Price</Text>
           </View>
           <View>
                   <Text style={{color:"black",fontSize:18,paddingLeft:120,position:"absolute"}}>₹{quantity*data.foodPrice}/-</Text>
           </View>

          </View>



          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              gap: 30,
              paddingTop: 40,
            }}>
            <TouchableOpacity onPress={() => addToCart()}>
              <View style={styles.container}>
                <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
                  Add to Cart
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Order',{cartData})}>
              <View style={styles.container}>
                <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>
                  Buy Now
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProductPage

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:1,
    borderRadius: 4,
    width: 150,
    height: 45,
    backgroundColor: 'red',
    elevation: 20,
  },
  btn1: {
    backgroundColor: 'red',
    width: 40,
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  // dash: {
  //   borderWidth: 1,
  //   borderColor: 'white',
  //   borderLeftColor: 'red',
  //   height: 20,
  // },
})
