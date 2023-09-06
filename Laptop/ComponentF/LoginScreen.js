import {View, Text, TextInput, Touchable, TouchableOpacity, Image, Pressable, Alert} from 'react-native'
import React, { useState } from 'react'
import SignupScreen from './SignupScreen';
import { firebase } from '@react-native-firebase/auth';


const  LoginScreen= ({navigation})=> {
  const [flag,setFlag]=useState(true);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const signinHandler=()=>{
               if(email != "" || password != ""){
                firebase.auth().signInWithEmailAndPassword(email,password)
                .then((userCredential)=>{
                    var user=userCredential.user;
                    console.log(user);
                    navigation.navigate("Welcome")
                }).catch((error)=>{
                     console.log(error);
                     Alert.alert("Something went wrong");
                })
               } else{
                Alert.alert("Enter Email and Password")
               } 
              
  }
  const HideShow=()=>{
    if(flag==true){
      setFlag(false);
    }else{
      setFlag(true);
    }
  }
  return (
    <View>
      <View style={{paddingTop: 80, alignSelf: 'center'}}>
        <Text style={{color: 'black'}}>Email</Text>
        <TextInput
        onChangeText={(txt)=>setEmail(txt)}
          style={{
            backgroundColor:"white",
            elevation:10,
            height: 40,
            width: 250,
            borderRadius: 5,
            borderWidth: 1,
            marginTop: 10,
            color:"black"
          }}
        />
        <Text style={{color: 'black', paddingTop: 30}}>Password</Text>
        <View style={{flexDirection:"row"}}>
        <TextInput
        onChangeText={(txt)=>setPassword(txt)}
        secureTextEntry={flag}
          style={{
            backgroundColor:"white",
            elevation:10,
            height: 40,
            width: 250,
            borderRadius: 5,
            borderWidth: 1,
            marginTop: 10,
            color:"black"
          }}

        /> 
        <Pressable   onPress={HideShow}>
          {flag==false && (
              <Image   source={require("../Assets/view.png")} style={{height:20,width:20,marginLeft:5,marginTop:20}} />
          )}
           {flag==true && (
              <Image   source={require("../Assets/hidden.png")} style={{height:20,width:20,marginLeft:5,marginTop:20}} />
          )}
        
        </Pressable>
         </View>

        <TouchableOpacity style={{width: 110, marginTop: 10}}>
          <Text style={{color: 'blue'}}>Forget Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 30}} onPress={()=>signinHandler()}>
          <View
            style={{
              backgroundColor: 'green',
              borderRadius: 20,
              width: 200,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              elevation:10,
            }}>
            <Text style={{color: 'white', fontSize: 15}}>SIGNIN</Text>
          </View>
        </TouchableOpacity>
          
          <View style={{alignSelf:"center",paddingTop:30,flexDirection:"row"}}>
            <Text style={{color:"black"}}>I do not have Account.  </Text>
             <TouchableOpacity  onPress={()=>navigation.navigate('Signup')} ><Text style={{color:"blue",fontSize:14}}> SIGNUP</Text></TouchableOpacity>
          </View>



      </View>
    </View>
  )
}

export default LoginScreen;