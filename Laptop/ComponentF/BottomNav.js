import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import TrackOrder from './TrackOrder'


const BottomNav = ({navigation}) => {
      //  const [color1,setColor1]=useState("black");
      //  const [color2,setColor2]=useState("black");
      //  const [color3,setColor3]=useState("black");
      //  useEffect(()=>{
      //   setColor1("red");
      //   setColor2("black");
      //   setColor3("black");
      //  },[])

        const homeClick=()=>{
          // setColor1("red");
          //   setColor2("black");
          //   setColor3("black")
           navigation.navigate("Home");
        }
       const cartClick=()=>{
        // setColor2("red");
        // setColor1("black");
        // setColor3("black") 
        navigation.navigate("Cart");
       }
       const orderClick=()=>{
        // setColor3("red");
        //     setColor1("black");
        //     setColor2("black")
        console.log("hello")
        navigation.navigate("TrackOrder");
            
       }

  return (
    <View style={{flexDirection:"row",gap:110,padding:5,paddingLeft:10}}>
        <View>
          <TouchableOpacity onPress={()=>homeClick()}>
           <Image  
               source={require("../Assets/home.png")}
               style={{height:35,width:40,tintColor:"green"}}
           />
           </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity  onPress={()=>cartClick()}>
        <Image  
               source={require("../Assets/cart.png")}
               style={{height:35,width:40,tintColor:"green"}}
           />
           </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity onPress={()=>orderClick()}>
        <Image  
               source={require("../Assets/order.png")}
               style={{height:35,width:40,tintColor:"green"}}
           />
           </TouchableOpacity>
        </View>
    </View>
  )
}

export default BottomNav

const styles = StyleSheet.create({})