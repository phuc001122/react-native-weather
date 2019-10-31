import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import moment from 'moment';

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


export default class Weather extends Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      city: this.props.navigation.getParam('city'),
    }
  }

  

  componentDidMount(){
    return fetch('http://api.openweathermap.org/data/2.5/forecast?q='+ this.state.city +'&lang=vi&units=metric&APPID=b5177eb82d0e5d0cbdbbf5a5d2cd19b1')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.list,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    const weather = this.state.dataSource;
    for(let i = 0; i < weather.length; i++){
      if(this.props.navigation.getParam('key') === weather[i].dt_txt){
        return (
            <ImageBackground source={require('./img/night.jpg')} style={{width: '100%', height: '100%'}}>
            <View style={styles.info_basic_today}>
  
              <View style={styles.rowbasic_1}>
                <Text style={styles.temp_now}>{parseInt(weather[i].main.temp, 10)}°C</Text>
                <Image source={{uri: "http://openweathermap.org/img/wn/"+ weather[i].weather[0].icon + "@2x.png"}} style={styles.icon_temp_now}></Image>
              </View>
              <View style={styles.rowbasic_2}>
                <Text style={styles.info_temp}>Ngày giờ</Text>
                <Text style={styles.detail_number}>{moment(weather[i].dt*1000).format('HH:mm DD/MM/YYYY')}</Text>
              </View>
              <View style={styles.rowbasic_2}>
                <Text style={styles.info_temp}>{weather[i].weather[0].description}</Text>
                <View style={styles.rowbasic_2_1}>
                  <Image source={require('./img/up-arrow.png')} style={{width: 10, height: 14, marginTop: 3}}></Image>
                  <Text style={styles.temp_low_high}>  {weather[i].main.temp_max}°C     </Text>
                  <Image source={require('./img/down-arrow.png')} style={{width: 10, height: 14, marginTop: 3}}></Image>
                  <Text style={styles.temp_low_high}>  {weather[i].main.temp_min}°C</Text>
                </View>
              </View>
            </View>
  
            <View style={styles.info_detail_today}>
              <View style={styles.detail_row}>
                <Image source={require('./img/humidity.png')} style={styles.icon_weather}></Image>
                <Text style={styles.detail_title}>Độ ẩm</Text>
                <Text style={styles.detail_number}>{weather[i].main.humidity}%</Text>
              </View>
              <View style={styles.detail_row}>
                <Image source={require('./img/cloudcover.png')} style={styles.icon_weather}></Image>
                <Text style={styles.detail_title}>Mây che phủ</Text>               
                <Text style={styles.detail_number}>{weather[i].clouds.all}%</Text>
              </View>
              <View style={styles.detail_row}>
              <Image source={require('./img/view.png')} style={styles.icon_weather}></Image>
              <Text style={styles.detail_title}>Tầm nhìn</Text>
              <Text style={styles.detail_number}>6.4km</Text>
              </View>
              <View style={styles.detail_row}>
                <Image source={require('./img/meter.png')} style={styles.icon_weather}></Image>
                <Text style={styles.detail_title}>Sức ép</Text>
                <Text style={styles.detail_number}>{weather[i].main.pressure}hPa</Text>
              </View>
              <View style={styles.detail_row}>
                <Image source={require('./img/windmill.png')} style={styles.icon_weather}></Image>
                <Text style={styles.detail_title}>Gió</Text>
                <Text style={styles.detail_number}>{weather[i].wind.speed}m/s</Text>
              </View>
            </View>
            </ImageBackground>
        )
      }
    }
    return null;
  }
}
 
