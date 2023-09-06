import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Categories = () => {
  data=[
    {
      name:"Burger",
      path:require('../Assets/burger.png')
    },
    {
      name:"Pizza",
      path:require('../Assets/pizza.png')
    },
    {
      name:"Ice-cream",
      path:require('../Assets/ice-cream.png')
    },
    {
      name:"Burger",
      path:require('../Assets/burger.png')
    },
    {
      name:"Pizza",
      path:require('../Assets/pizza.png')
    },
    {
      name:"Ice-cream",
      path:require('../Assets/ice-cream.png')
    },
  ]

  return (
    <View style={{width:"90%",height:140,backgroundColor:"white",alignSelf:"center",marginTop:20,borderRadius:4}}>
      <Text style={{alignSelf:"center",paddingTop:10,fontSize:20,color:"black",textDecorationLine:"underline"}}>Categories</Text>
      
      <View>
         
          <FlatList  
             data={data}
             horizontal={true}
            renderItem={({item})=>
               <View style={{backgroundColor:"grey",marginTop:10,height:"80%",width:100,justifyContent:"center",borderRadius:4,marginRight:5,alignItems:"center"}}>
             <Image
              source={item.path}
              style={{height:50,width:50}}
             />
             <Text style={{color:"white"}}>{item.name}</Text>
          </View> 
          }
          
          />


          {/* <View style={{backgroundColor:"grey",marginTop:10,height:95,justifyContent:"center",borderBottomLeftRadius:4,borderBottomRightRadius:4,}}>
             <Image
              source={require("../Assets/burger.png")}
              style={{height:50,width:50}}
             />
             <Text style={{color:"white"}}>Burger</Text>
          </View> */}
          
       
      </View>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({})