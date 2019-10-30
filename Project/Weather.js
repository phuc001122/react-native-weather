import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput, 
  Image,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Button
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

  componentDidMount(){
    this.getWeather();
  }

  render(){
    const weather = this.state.dataSource;
    const {navigate} = this.props.navigation;
    
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <ImageBackground source={require('./img/day.jpg')} style={{width: '100%', height: '100%'}}>
      <ScrollView>
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
      >{weather.name}</TextInput>
      <View style={styles.info_basic_today}>

        <View style={styles.rowbasic_1}>
          <Text style={styles.temp_now}>{parseInt(weather.main.temp,10)}°C</Text>
          <Image source={{uri: "http://openweathermap.org/img/wn/"+ weather.weather[0].icon + "@2x.png"}} style={styles.icon_temp_now}></Image>
        </View>
        <Text style={styles.info_temp}>{}</Text>
        <View style={styles.rowbasic_2}>
          <Text style={styles.info_temp}>{weather.weather[0].description}</Text>
          
          <View style={styles.rowbasic_2_1}>
            <Image source={require('./img/up-arrow.png')} style={{width: 10, height: 14, marginTop: 3}}></Image>
            <Text style={styles.temp_low_high}>  {parseInt(weather.main.temp_min,10)}°C    </Text>
            <Image source={require('./img/down-arrow.png')} style={{width: 10, height: 14, marginTop: 3}}></Image>
            <Text style={styles.temp_low_high}>  {parseInt(weather.main.temp_max,10)}°C   </Text>
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
      <Button
        title="Các ngày tiếp theo"
        onPress={() => navigate('Forecast', {city: this.state.city})}
      />
      </View>
      </ScrollView>
      </ImageBackground>
        
    );
  }
}
 
