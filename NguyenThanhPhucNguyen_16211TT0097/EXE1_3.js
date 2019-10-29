import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput, 
  Image,
} from 'react-native';
 
import Swiper from 'react-native-swiper';



const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    backgroundColor: '#9DD6EB',
  },


  input:
  {
    width: '90%',
    marginLeft: 15,
    color: 'white',
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    alignSelf: 'baseline',
    borderRadius: 30,
    paddingLeft: 20,
    marginVertical: 15,
  },

  info_basic_today:
  {
    paddingLeft: 20,
    marginLeft: 15,
    paddingRight: 20,
    width: '90%',
    alignSelf: "baseline",
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    marginVertical: 10
  },
  
  temp_now:
  {
    color: 'white',
    fontSize: 60,
    paddingRight: 50
  },

  icon_temp_now:
  {
    width: 100,
    height: 90,
    flexDirection: "row-reverse",
    
  },

  rowbasic_1:
  {
    marginVertical: 10,
    flexDirection: "row"
  },

  rowbasic_2:
  {
    flexDirection: "row",
    marginVertical: 15
  },

  temp_low_high:
  {
    color: 'white',
    flexDirection: "row-reverse",
  },

  info_temp:
  {
    color: 'white'
  },

  rowbasic_2_1:
  {
    flexDirection: "row",
    marginStart: 100,
    marginEnd: 20
  },
 


  info_detail_today:
  {
    paddingHorizontal: 20,
    marginLeft: 15,
    paddingRight: 20,
    width: '90%',
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    marginVertical: 10,
  },
  

  icon_weather:
  {
    width: 27,
    height: 27,
  },

  detail_title:
  {
    color: 'white',
    height: 25,
    width: 100,
    paddingLeft: 15
  },

  detail_number:
  {
    color: 'white',
    height: 25,
    marginStart: '35%',
    marginEnd: 10
  },

  detail_row:
  {
    flexDirection: "row",
    marginTop: 23,
    borderBottomWidth: 1,
    borderBottomColor: '#cecdcd69',
    paddingBottom: 10
  }

})


export default class App extends Component {
  render(){
    return (

        <View style={styles.slide1}>
        <TextInput placeholder={'Nhập thành phố...'} style={styles.input}></TextInput>
        <View style={styles.info_basic_today}>

          <View style={styles.rowbasic_1}>
            <Text style={styles.temp_now}>27°C</Text>
            <Image source={require('./img/sunny_icon.png')} style={styles.icon_temp_now}></Image>
          </View>

          <View style={styles.rowbasic_2}>
            <Text style={styles.info_temp}>Nắng nhẹ</Text>
            <View style={styles.rowbasic_2_1}>
              <Image source={require('./img/up-arrow.png')} style={{width: 10, height: 14, marginTop: 3}}></Image>
              <Text style={styles.temp_low_high}>  25°C     </Text>
              <Image source={require('./img/down-arrow.png')} style={{width: 10, height: 14, marginTop: 3}}></Image>
              <Text style={styles.temp_low_high}>  30°C</Text>
            </View>
          </View>
        </View>

        

        <View style={styles.info_detail_today}>
          <View style={styles.detail_row}>
            <Image source={require('./img/humidity.png')} style={styles.icon_weather}></Image>
            <Text style={styles.detail_title}>Độ ẩm</Text>
            <Text style={styles.detail_number}>70%</Text>
          </View>
          <View style={styles.detail_row}>
            <Image source={require('./img/cloudcover.png')} style={styles.icon_weather}></Image>
            <Text style={styles.detail_title}>Mây che phủ</Text>               
            <Text style={styles.detail_number}>91%</Text>
          </View>
          <View style={styles.detail_row}>
          <Image source={require('./img/view.png')} style={styles.icon_weather}></Image>
          <Text style={styles.detail_title}>Tầm nhìn</Text>
          <Text style={styles.detail_number}>6.4km</Text>
          </View>
          <View style={styles.detail_row}>
            <Image source={require('./img/foggy.png')} style={styles.icon_weather}></Image>
            <Text style={styles.detail_title}>Điểm sương</Text>
            <Text style={styles.detail_number}>25°C</Text>
          </View>
          <View style={styles.detail_row}>
            <Image source={require('./img/meter.png')} style={styles.icon_weather}></Image>
            <Text style={styles.detail_title}>Sức ép</Text>
            <Text style={styles.detail_number}>1008.0mb</Text>
          </View>
          <View style={styles.detail_row}>
            <Image source={require('./img/uv-protection.png')} style={styles.icon_weather}></Image>
            <Text style={styles.detail_title}>Chỉ số UV</Text>
            <Text style={styles.detail_number}>5</Text>
          </View>
          <View style={styles.detail_row}>
            <Image source={require('./img/windmill.png')} style={styles.icon_weather}></Image>
            <Text style={styles.detail_title}>Gió</Text>
            <Text style={styles.detail_number}>20.4km/h</Text>
          </View>
        </View>
        </View>


        
    );
  }
}
 
