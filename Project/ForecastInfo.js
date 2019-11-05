import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import styles from './styles';

export default class Weather extends Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      city: this.props.navigation.getParam('city'),
    }
  }

  

  componentDidMount(){
    return fetch('http://api.openweathermap.org/data/2.5/forecast?q='+ this.state.city +'&lang=vi&units=metric&APPID=dc5595c47749d00d1dfc9743773820da')
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
    var image;
    for(let i = 0; i < weather.length; i++){
      if(this.props.navigation.getParam('key') === weather[i].dt_txt){
        if(weather[i].weather[0].icon === "01d" || weather[i].weather[0].icon === "02d" || weather[i].weather[0].icon === "03d"){
          image = require('./img/day.jpg');
        } else if(weather[i].weather[0].icon === "09d" || weather[i].weather[0].icon === "10d"){
          image = require('./img/dayrain.jpg');
        }else if(weather[i].weather[0].icon === "01n" || weather[i].weather[0].icon === "02n" || weather[i].weather[0].icon === "03n" || weather[i].weather[0].icon === "04n"){
          image = require('./img/night.jpg');
        }else if( weather[i].weather[0].icon === "09n" || weather[i].weather[0].icon === "10n"){
          image = require('./img/nightrain.jpg');
        }
        else if(weather[i].weather[0].icon === '50n')
        {
           image = require('./img/fog.jpg')
        }
        else if(weather[i].weather[0].icon === "04d")
        {
          image = require('./img/brokencloud.jpg')
        }
        else if(weather[i].weather[0].icon === "11d" || weather[i].weather[0].icon === "11n")
        {
          image = require('./img/nightthunder.jpg')
        }
        else if(weather[i].weather[0].icon === "13d" || weather[i].weather[0].icon === "13n")
        {
          image = require('./img/snow.jpg')
        }
        return (
            <ImageBackground source={image} style={{flex: 1}}>
            <View style={styles.forecastInfo}>
  
              <View style={styles.rowbasic_1}>
                <Text style={styles.temp_now}>{parseInt(weather[i].main.temp, 10)}°C</Text>
                <Image source={{uri: "http://openweathermap.org/img/wn/"+ weather[i].weather[0].icon + "@2x.png"}} style={styles.icon_temp_now}></Image>
              </View>
              <View style={styles.rowbasic_2}>
                <Text style={styles.info_temp}>Ngày giờ</Text>
                <Text style={styles.info_temp}>{moment(weather[i].dt*1000).format('HH:mm DD/MM/YYYY')}</Text>
              </View>
              <View style={styles.rowbasic_2}>
                <Text style={styles.info_temp}>{weather[i].weather[0].description}</Text>
                <View style={styles.rowbasic_2_1}>
                  <Image source={require('./img/up-arrow.png')} style={{width: 10, height: 14, marginTop: 3}}></Image>
                  <Text style={styles.temp_low_high}>  {parseInt(weather[i].main.temp_max,10)}°C     </Text>
                  <Image source={require('./img/down-arrow.png')} style={{width: 10, height: 14, marginTop: 3}}></Image>
                  <Text style={styles.temp_low_high}>  {parseInt(weather[i].main.temp_min,10)}°C</Text>
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
 
