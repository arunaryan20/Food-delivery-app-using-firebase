import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'

const Slider = ({title, data,navigation}) => {
//   console.log(title)
//   console.log(data)
const productPage=(item)=>{
          navigation.navigate("ProductPage",item);
}
  return (
    <View>
     
        <View>
          <Text
            style={{
              color: 'black',
              paddingLeft: 20,
              paddingTop: 10,
              fontSize: 20,
              alignSelf: 'center',
            }}>
            {title}
          </Text>
        </View>

        <View>
          <FlatList
            data={data}
            horizontal={true}
            renderItem={({item}) => (
              <View>
                <View style={styles.card}>
                  <Image
                    source={{uri: item.foodImageUrl}}
                    style={{height: 160, width: '95%', borderRadius: 4}}
                  />
                  <View style={{flexDirection: "row"}}>
                    <Text
                      style={{color: 'black', paddingLeft: 10, fontSize: 15}}>
                      {item.foodName}
                    </Text>
                    <Text style={{color: 'black',textAlign:"right",paddingLeft:140,position:"absolute"}}>
                      Rs: {item.foodPrice}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={()=>productPage(item)}>
                    <View style={styles.btn}>
                      <Text style={{color: 'white', fontSize: 20}}>Buy</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
     
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({
  card: {
    height: 250,
    width: 200,
    borderColor: 'black',
    borderRadius: 4,
    marginLeft: 10,
    marginTop: 20,
  },
  btn: {
    width: '95%',
    height: 40,
    backgroundColor: 'red',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
})
