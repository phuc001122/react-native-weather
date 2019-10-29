import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput, 
  Image,
  ActivityIndicator,
} from 'react-native';
 
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
      flex: 1,
      backgroundColor: '#9DD6EB'
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
      width: '58%'
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
      alignItems: "baseline"
    },
  
    info_temp:
    {
      color: 'white',
      width: '55%'
    },
  
    rowbasic_2_1:
    {
      flexDirection: "row",
      width: '50%'
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
      marginStart: '20%',
      marginEnd: 10
    },
  
    detail_row:
    {
      flexDirection: "row",
      marginTop: 23,
      borderBottomWidth: 1,
      borderBottomColor: '#cecdcd69',
      paddingBottom: 10
    },
  })


export default class App extends Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      city: 'Thành phố Hồ Chí Minh',
    }
  }

  getWeather(){
    return fetch('http://api.openweathermap.org/data/2.5/weather?q='+ this.state.city +'&lang=vi&units=metric&APPID=b5177eb82d0e5d0cbdbbf5a5d2cd19b1')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  componentDidMount(){
    this.getWeather();
  }

  render(){
    const weather = this.state.dataSource;
    
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
        <View style={styles.slide1}>
        <TextInput 
          placeholder={'Nhập thành phố...'} 
          style={styles.input}
          onChangeText = {(TextInputText) => this.setState({ city: TextInputText })}
          onSubmitEditing={()=>{
            this.getWeather();
          }}   
          onKeyPress={ (event) => {
            if(event.nativeEvent.key == "Enter"){
                this.getWeather();
            } 
        }}
        ></TextInput>
        <View style={styles.info_basic_today}>

          <View style={styles.rowbasic_1}>
            <Text style={styles.temp_now}>{`${weather.main.temp}°C`}</Text>
            <Image source={{uri: "http://openweathermap.org/img/wn/"+ weather.weather[0].icon + "@2x.png"}} style={styles.icon_temp_now}></Image>
          </View>

          <View style={styles.rowbasic_2}>
            <Text style={styles.info_temp}>{weather.weather[0].description}</Text>
            <View style={styles.rowbasic_2_1}>
              <Image source={require('./img/up-arrow.png')} style={{width: 10, height: 14, marginTop: 3}}></Image>
              <Text style={styles.temp_low_high}>  {`${weather.main.temp_min}°C`}    </Text>
              <Image source={require('./img/down-arrow.png')} style={{width: 10, height: 14, marginTop: 3}}></Image>
              <Text style={styles.temp_low_high}>  {`${weather.main.temp_max}°C`}   </Text>
            </View>
          </View>
        </View>

        

        <View style={styles.info_detail_today}>
          <View style={styles.detail_row}>
            <Image source={require('./img/humidity.png')} style={styles.icon_weather}></Image>
            <Text style={styles.detail_title}>Độ ẩm</Text>
            <Text style={styles.detail_number}>{weather.main.humidity + "%"}</Text>
          </View>
          <View style={styles.detail_row}>
            <Image source={require('./img/cloudcover.png')} style={styles.icon_weather}></Image>
            <Text style={styles.detail_title}>Mây che phủ</Text>               
            <Text style={styles.detail_number}>{weather.clouds.all + "%"}</Text>
          </View>
          <View style={styles.detail_row}>
          <Image source={require('./img/view.png')} style={styles.icon_weather}></Image>
          <Text style={styles.detail_title}>Tầm nhìn</Text>
          <Text style={styles.detail_number}>{weather.visibility / 1000 + "km"}</Text>
          </View>
          <View style={styles.detail_row}>
            <Image source={require('./img/meter.png')} style={styles.icon_weather}></Image>
            <Text style={styles.detail_title}>Sức ép</Text>
            <Text style={styles.detail_number}>{weather.main.pressure}hPa</Text>
          </View>
          <View style={styles.detail_row}>
            <Image source={require('./img/uv-protection.png')} style={styles.icon_weather}></Image>
            <Text style={styles.detail_title}>UV</Text>
            <Text style={styles.detail_number}>5</Text>
          </View>
          <View style={styles.detail_row}>
            <Image source={require('./img/windmill.png')} style={styles.icon_weather}></Image>
            <Text style={styles.detail_title}>Gió</Text>
            <Text style={styles.detail_number}>{weather.wind.speed + " m/s"}</Text>
          </View>
        </View>
        </View>
    );
  }
}
 
