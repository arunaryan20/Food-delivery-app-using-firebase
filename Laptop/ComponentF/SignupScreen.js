import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native'
import React, {useState} from 'react'
import {firebaseConfig} from '../Firebase/FirebaseConfig'
import {firebase} from '@react-native-firebase/firestore'

import LoginScreen from './LoginScreen'

const SignupScreen = ({navigation}) => {
  const [flag, setFlag] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cnfpassword, setCnfPassword] = useState('')
  const [address, setAddress] = useState('')
  const [phone,setPhone]=useState('');
  const [msg, setMsg] = useState(null)

  const handleSignup = () => {
    const formData = {
      name: name,
      email: email,
      phone:phone,
      address: address,
      password: password,
      //  cnfpassword:cnfpassword,
     

    }

    if (password != cnfpassword) {
      Alert.alert("Password doesn't match")
      return
    }
    try {
      console.log('hello')
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // console.log("this is user Credential"+JSON.stringify(userCredential))
          console.log('User created successfully')
          const userRef = firebase.firestore().collection('UserData')
          const myData={
            ...formData,
            uid:userCredential.user.uid,
          }
          console.log("this is my data "+JSON.stringify(myData));
          userRef.add(myData).then(() => {
            setMsg('User created successfully')
            console.log('Data added to firestore')
          })
        })
        .catch(error => {
          console.log('signup firebase error ' + error.message)
        })
    } catch (error) {
      console.log('signup system error ', error.message)
    }
  }
  const HideShow = () => {
    if (flag == true) {
      setFlag(false)
    } else {
      setFlag(true)
    }
  }
  return (
    <View>
      {msg == null ? (
        <View>

          <ScrollView>
            <View style={{alignSelf:"center"}}>
              <Text style={{color:"red",fontSize:30}}>Signup</Text>
            </View>
            <View style={{paddingTop: 30, alignSelf: 'center'}}>
              <Text style={{color: 'black'}}>Name</Text>
              <TextInput
                onChangeText={txt => setName(txt)}
                style={{
                  backgroundColor: 'white',
                  elevation: 10,
                  height: 40,
                  width: 250,
                  borderRadius: 5,
                  borderWidth: 1,
                  marginTop: 10,
                  color: 'black',
                }}
              />

              <Text style={{paddingTop: 30, color: 'black'}}>Email</Text>
              <TextInput
                onChangeText={txt => setEmail(txt)}
                style={{
                  backgroundColor: 'white',
                  elevation: 10,
                  height: 40,
                  width: 250,
                  borderRadius: 5,
                  borderWidth: 1,
                  marginTop: 10,
                  color: 'black',
                }}
              />
                  <Text style={{paddingTop: 30, color: 'black'}}>Phone</Text>
              <TextInput
                onChangeText={txt => setPhone(txt)}
                style={{
                  backgroundColor: 'white',
                  elevation: 10,
                  height: 40,
                  width: 250,
                  borderRadius: 5,
                  borderWidth: 1,
                  marginTop: 10,
                  color: 'black',
                }}
              />


               <Text style={{paddingTop: 30, color: 'black'}}>Address</Text>
              <TextInput
                onChangeText={txt => setAddress(txt)}
                style={{
                  backgroundColor: 'white',
                  elevation: 10,
                  height: 40,
                  width: 250,
                  borderRadius: 5,
                  borderWidth: 1,
                  marginTop: 10,
                  color: 'black',
                }}
              />

              <Text style={{color: 'black', paddingTop: 30}}>Password</Text>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  onChangeText={txt => setPassword(txt)}
                  secureTextEntry={flag}
                  style={{
                    backgroundColor: 'white',
                    elevation: 10,
                    height: 40,
                    width: 250,
                    borderRadius: 5,
                    borderWidth: 1,
                    marginTop: 10,
                    color: 'black',
                  }}
                />
                <Pressable onPress={HideShow}>
                  {flag == false && (
                    <Image
                      source={require('../Assets/view.png')}
                      style={{
                        height: 20,
                        width: 20,
                        marginLeft: 5,
                        marginTop: 20,
                      }}
                    />
                  )}
                  {flag == true && (
                    <Image
                      source={require('../Assets/hidden.png')}
                      style={{
                        height: 20,
                        width: 20,
                        marginLeft: 5,
                        marginTop: 20,
                      }}
                    />
                  )}
                </Pressable>
              </View>
              <Text style={{paddingTop: 30, color: 'black'}}>
                Confirm Password
              </Text>
              <TextInput
                onChangeText={txt => setCnfPassword(txt)}
                secureTextEntry={flag}
                style={{
                  backgroundColor: 'white',
                  elevation: 10,
                  height: 40,
                  width: 250,
                  borderRadius: 5,
                  borderWidth: 1,
                  marginTop: 10,
                  color: 'black',
                }}
              />
             
              <TouchableOpacity
                style={{marginTop: 30}}
                onPress={() => handleSignup()}>
                <View
                  style={{
                    backgroundColor: 'green',
                    borderRadius: 20,
                    width: 200,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    elevation: 10,
                  }}>
                  <Text style={{color: 'white', fontSize: 15}}>SUBMIT</Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  alignSelf: 'center',
                  paddingTop: 30,
                  flexDirection: 'row',
                }}>
                <Text style={{color: 'black'}}>I do not have Account. </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                  <Text style={{color: 'blue', fontSize: 14}}> SIGNIN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={{justifyContent:"center"}}>
          <View style={{alignSelf:"center",borderWidth:1,borderRadius:15,height:40,justifyContent:"center",marginTop:200,width:250,alignItems:"center"}}>
            <Text style={{color:"green",fontSize:15}}>{msg}</Text>
          </View>
          <TouchableOpacity
            style={{marginTop: 30}}
            onPress={() => navigation.navigate('Signin')}>
            <View
              style={{
                backgroundColor: 'red',
                borderRadius: 20,
                width: 200,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                elevation: 10,
              }}>
              <Text style={{color: 'white', fontSize: 15}}>SignIn</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop: 30}}
            onPress={() =>setMsg(null)}>
            <View
              style={{
                backgroundColor: 'red',
                borderRadius: 20,
                width: 200,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                elevation: 10,
              }}>
              <Text style={{color: 'white', fontSize: 15}}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
export default SignupScreen
