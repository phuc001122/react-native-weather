import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput, 
  Image,
  ActivityIndicator,
} from 'react-native';
 
import styles from './styles';

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

  getUV()
  {
    return fetch('api.openweathermap.org/data/2.5/uvi?appid=b5177eb82d0e5d0cbdbbf5a5d2cd19b1&lat=37.75&lon=122.37')
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
 
