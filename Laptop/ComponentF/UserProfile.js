import { StyleSheet, Text, View } from 'react-native'
import {React,useEffect,useState} from 'react'
import { firebase } from '@react-native-firebase/auth'

const UserProfile = ({navigation}) => {

    const [userLoggeduid, setUserLoggeduid] = useState('')
    const [userdata,setUserdata]=useState(null);
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
   
     
    useEffect(()=>{
              const getUserData=async()=>{
                const docRef=await firebase.firestore().collection('UserData').where('uid','==',userLoggeduid)
                const doc=await docRef.get();
                 doc.forEach((doc)=>{
                        setUserdata(doc.data())
                    })  
                // if(!doc.empty){
                   
                // }else{
                //     navigation.navigate('Signin')
                // }
               
            }  
              
             getUserData();

    },[userLoggeduid])
     console.log(userdata);

  return (
    <View>
              {userdata!=null &&
                    <View style={{alignSelf:"center",marginTop:50,borderWidth:2,borderColor:"green",borderRadius:8,padding:20,backgroundColor:"white",elevation:15}}>
                    <Text style={{color:"white",fontSize:18,backgroundColor:"red",padding:5,borderRadius:4}}>Name: {userdata.name}</Text>
                     <Text style={{color:"white",fontSize:18,backgroundColor:"red",padding:5,borderRadius:4,marginTop:5}}>Email: {userdata.email}</Text>
                      <Text style={{color:"white",fontSize:18,backgroundColor:"red",padding:5,borderRadius:4,marginTop:5}}>Phone: {userdata.phone}</Text>
                       <Text style={{color:"white",fontSize:18,backgroundColor:"red",padding:5,borderRadius:4,marginTop:5}}>Address: {userdata.address}</Text>
                  </View>
              
              }
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({})