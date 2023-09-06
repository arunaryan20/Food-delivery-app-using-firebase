import {View, Text, TextInput, Image, ScrollView, FlatList,TouchableOpacity,StyleSheet} from 'react-native'
// import { TouchableOpacity} from 'react-native-gesture-handler'
import React, {useState, useEffect} from 'react'
import Categories from './Categories'
import Slider from './Slider'

import firestore from '@react-native-firebase/firestore'
import BottomNav from './BottomNav'

const HomeScreen = ({navigation}) => {
  const [foodData, setFoodData] = useState([])
  const [veg, setVeg] = useState([])
  const [nonveg, setNonveg] = useState([])
  const [search, setSearch] = useState()
  const foodRef = firestore().collection('FoodData')

  useEffect(() => {
    foodRef.onSnapshot(snapshot => {
      setFoodData(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  useEffect(() => {
    setVeg(foodData.filter(item => item.foodType == 'veg'))
    setNonveg(foodData.filter(item => item.foodType == 'Non-veg'))
  }, [foodData])

  // console.log("This is food data "+JSON.stringify(nonveg));
  console.log(search)

  return (
    <View style={{flex:1}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          elevation: 15,
          width: '100%',
          height: 50,
        }}>
        <Image
          source={require('../Assets/menu1.png')}
          style={{height: 30, width: 30, margin: 10}}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: 'red',
              fontSize: 22,
              paddingLeft: 80,
              fontWeight: '500',
            }}>
            Foodie
          </Text>
          <Image
            source={require('../Assets/foodie.png')}
            style={{height: 30, width: 30}}
          />
        </View>
        <View style={{marginLeft:95}}>
        <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
        <Image
          source={require('../Assets/user1.png')}
          style={{
            height: 30,
            width: 30,
            // marginLeft: 80,
            marginTop: 10,
            tintColor: 'red',
              // position:"absolute"
          }}
        />
        </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          backgroundColor: 'white',
          width: '90%',
          height: 45,
          elevation: 15,
          alignSelf: 'center',
          borderRadius: 25,
          marginTop: 20,
          flexDirection: 'row',
        }}>
        <Image
          source={require('../Assets/search2.png')}
          style={{
            height: 20,
            width: 20,
            position: 'absolute',
            alignSelf: 'flex-start',
            marginTop: 13,
            marginLeft: 10,
            tintColor: 'red',
          }}
        />
        <TextInput
          placeholder='Search'
          onChangeText={txt => setSearch(txt)}
          style={{width: '90%', marginLeft: 35, color: 'black'}}
        />
      </View>

      {search != '' && (
        <View>
          <FlatList
            data={foodData}
            renderItem={({item}) => {
              if (item.foodName.includes(search)) {
                return (
                  <View>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 20,
                        paddingLeft: 20,
                        paddingTop: 10,
                      }}>
                      {item.foodName}
                    </Text>
                  </View>
                )
              }
            }}
          />
        </View>
      )}

      <Categories />
      <ScrollView>
        <Slider title={"Today's Special"} data={foodData} navigation={navigation} />
        <Slider title={'Veg Hunger'} data={veg} navigation={navigation} />
        <Slider title={'NonVeg Love'} data={nonveg} navigation={navigation}/>
      </ScrollView>
      <View style={styles.nav}>
        <BottomNav  navigation={navigation}/>
      </View>
    </View>
  )
}
export default HomeScreen

const styles=StyleSheet.create({
  nav:{
           bottom:0,
           width:"100%",
           height:50,
           backgroundColor:"white",
           zIndex:20
  }
})