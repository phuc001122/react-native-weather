import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput, 
  Image,
  ActivityIndicator,
  ImageBackground,
  Button,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      city: 'Thành phố Hồ Chí Minh',
      dialogVisible: false,
      savedCity: "",
    }
  }
 
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('savedCity', this.state.savedCity);
    } catch (error) {
      // Error saving data
    }
    this.setState({ dialogVisible: false });
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('savedCity');
      if (value !== null) {
        this.setState({city: value});
        console.log(value);
      }else{
        this.setState({city: 'Thành phố Hồ Chí Minh'});
      }
    } catch (error) {
      this.setState({city: 'Thành phố Hồ Chí Minh'});
    }finally{
      this.getWeather();
    }
  };

  _removeItem = async () => {
    try {
      await AsyncStorage.removeItem('savedCity');
    } catch (error) {
      // Error remove data
    }
  };

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  getWeather(){
    return fetch('http://api.openweathermap.org/data/2.5/weather?q='+ this.state.city +'&lang=vi&units=metric&APPID=dc5595c47749d00d1dfc9743773820da')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        if(this.state.dataSource.message === "city not found"){
          this._removeItem();
          this.setState(({city: "Thành phố Hồ Chí Minh"}));
        }
      });
  }

  componentDidMount(){
    this._retrieveData();
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
    if(weather.message === "city not found"){
      return(
        <View>
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
          <Text>Không tìm thấy thành phố</Text>
        </View>
      )
    }
    else
    {
      var image = "";
      if(weather.weather[0].icon === "01d" || weather.weather[0].icon === "02d" || weather.weather[0].icon === "03d"){
        image = require('./img/day.jpg');
      } else if(weather.weather[0].icon === "09d" || weather.weather[0].icon === "10d"){
        image = require('./img/dayrain.jpg');
      }else if(weather.weather[0].icon === "01n" || weather.weather[0].icon === "02n" || weather.weather[0].icon === "03n" || weather.weather[0].icon === "04n"){
        image = require('./img/night.jpg');
      }else if( weather.weather[0].icon === "09n" || weather.weather[0].icon === "10n"){
        image = require('./img/nightrain.jpg');
      }
      else if(weather.weather[0].icon === '50n')
      {
         image = require('./img/fog.jpg')
      }
      else if(weather.weather[0].icon === "04d")
      {
        image = require('./img/brokencloud.jpg')
      }
      else if(weather.weather[0].icon === "11d" || weather.weather[0].icon === "11n")
      {
        image = require('./img/nightthunder.jpg')
      }
      else if(weather.weather[0].icon === "13d" || weather.weather[0].icon === "13n")
      {
        image = require('./img/snow.jpg')
      }
    }




      const {navigate} = this.props.navigation;
      return (
        <ImageBackground source={image} style={{width: '100%', height: '100%'}}>
          <ScrollView>
            <View style={styles.slide1}>
            <View style={styles.head}>
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

              <TouchableOpacity onPress={()=>this.showDialog()}>
                <Image source={require('./img/checked.png')} style={styles.button}></Image>
              </TouchableOpacity>
            </View>
              <View style={styles.info_basic_today}>
        
                <View style={styles.rowbasic_1}>
                  <Text style={styles.temp_now}>{parseInt(weather.main.temp,10)}°C</Text>
                  <Image source={{uri: "http://openweathermap.org/img/wn/"+ weather.weather[0].icon + "@2x.png"}} style={styles.icon_temp_now}></Image>
                </View>

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
                  <Text style={styles.detail_title}>Áp suất</Text>
                  <Text style={styles.detail_number}>{weather.main.pressure} hPa</Text>
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
            <TouchableOpacity
              style={styles.buttonNext}
              onPress={() => navigate('Forecast', {city: this.state.city, icon: weather.weather[0].icon})}>
              <Text style={styles.textNext}>Các ngày tiếp theo</Text>
            </TouchableOpacity>
            <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Title>Lưu thành phố</Dialog.Title>
              <Dialog.Input 
                label="Nhập tên thành phố:"
                onChangeText={savedCity => this.setState({savedCity})}
                value={this.state.savedCity}
                >

                </Dialog.Input>
              <Dialog.Button label="Lưu" onPress={this._storeData} />
              <Dialog.Button label="Hủy" onPress={this.handleCancel} />
            </Dialog.Container>
          </ScrollView>
        </ImageBackground>  
      );
    }
  }
}
 
