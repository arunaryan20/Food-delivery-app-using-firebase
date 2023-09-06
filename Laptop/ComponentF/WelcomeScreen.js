import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import LoginScreen from './LoginScreen'
import SignupScreen from './SignupScreen'
import {firebase} from '@react-native-firebase/auth'
import HomeScreen from './HomeScreen'

const WelcomeScreen = ({navigation}) => {
  const [userLogged, setUserLogged] = useState('')
  useEffect(() => {
    const checkLogin = () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user)
          setUserLogged(user)
        } else {
          setUserLogged('')
          console.log('No user logged in')
        }
      })
    }
    checkLogin()
  }, [])
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUserLogged('')
      })
      .catch(error => {
        console.log('this is error' + error)
      })
  }

  console.log(userLogged)

  return (
    <View style={{backgroundColor: '#fa638c', height: '100%'}}>
      <Text
        style={{
          paddingTop: 80,
          alignSelf: 'center',
          fontSize: 40,
          fontWeight: '500',
          color: 'white',
        }}>
        WELCOME TO
      </Text>
      <Text
        style={{
          paddingTop: 10,
          alignSelf: 'center',
          fontSize: 50,
          fontWeight: '500',
          color: 'white',
        }}>
        FOODIE
      </Text>
      <Image
        source={require('../Assets/bike.png')}
        style={{height: 300, width: 300, alignSelf: 'center'}}
      />
      <View
        style={{
          borderTopColor: 'white',
          borderBottomColor: 'white',
          borderWidth: 1,
          alignSelf: 'center',
          alignItems: 'center',
          borderLeftColor: '#fa638c',
          borderRightColor: '#fa638c',
          padding: 15,
        }}>
        <Text style={{fontSize: 18, color: 'black'}}>
          Find the best food around you,
        </Text>
        <Text style={{fontSize: 18, color: 'black'}}>At lowest price.</Text>
      </View>

      {/* <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          gap: 30,
          paddingTop: 70,
        }}> */}
      {userLogged == '' ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              gap: 30,
              paddingTop: 40,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
              <View style={styles.container}>
                <Text style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
                  LOGIN
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <View style={styles.container}>
                <Text style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
                  SIGNUP
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <View style={{alignSelf: 'center', paddingTop: 10}}>
            <Text style={{fontSize: 15, color: 'white'}}>
              Signed in {userLogged.email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              gap: 30,
              paddingTop: 40,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <View style={styles.container}>
                <Text style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
                  Go to Home
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLogout()}>
              <View style={styles.container}>
                <Text style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* </View> */}
    </View>
  )
}
export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:1,
    borderRadius: 4,
    width: 100,
    height: 45,
    backgroundColor: 'white',
    elevation: 20,
  },
})
