//import thu vien
import React, {Component} from "react";
import{
  View, Text, FlatList, StyleSheet, Image, ActivityIndicator, TextInput, TouchableOpacity 
} from "react-native";
//Khai bao class
export default class Forecast extends Component{
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      city: 'Thành phố Hồ Chí Minh',
    }
  }

  getForecast(){
    return fetch('http://api.openweathermap.org/data/2.5/forecast?q='+ this.state.city +'&lang=vi&units=metric&APPID=b5177eb82d0e5d0cbdbbf5a5d2cd19b1')
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
    this.getForecast();
  }

  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    const {navigate} = this.props.navigation;
    return(
      <View>
        <View style={{flexDirection: "row"}}>
          <TextInput  
          placeholder = "Nhập thành phố" 
          underlineColorAndroid = "transparent"
          style={{flex: 2}}
          onChangeText = {(TextInputText) => this.setState({ city: TextInputText })} />
          <TouchableOpacity style={{flex: 1/3}} onPress={()=>this.getForecast()}>
            <View style={{width:100, height: 50, backgroundColor: "grey"}}>
              <Text>Tìm kiếm</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.thanhpho}>Thành phố(Quận): {this.state.dataSource.city.name}</Text>
        <Text style={styles.thanhpho}>Quốc gia: {this.state.dataSource.city.country}</Text>
        <FlatList data={this.state.dataSource.list}
          renderItem={({item})=>{
            return(
              <View>
                <TouchableOpacity onPress={() => navigate('Weather', {key: item.dt_txt, city: this.state.city})}>
                <View style={styles.flatList}>

                  <View style={{
                    flex: 2,
                    flexDirection: "column",
                  }}>
                    <Text style={styles.flatListItem}>{item.dt_txt}</Text>
                    <Text style={styles.flatListItem}>{item.weather[0].description}</Text>
                  </View>
                  <View style={{flex: 1/2,
                    flexDirection: "column",}}>
                    <Image
                      style={styles.image}
                      source={{uri: "http://openweathermap.org/img/wn/"+ item.weather[0].icon + "@2x.png"}}
                    />
                  </View>
                  <View style={{
                    flex: 2/3,
                    flexDirection: "column",
                  }}>
                  <Text style={styles.flatListItem}>{`${item.main.temp_max}°C`}</Text>
                    <Text style={styles.flatListItem}>{`${item.main.temp_min}°C`}</Text>
                  </View>
                </View>
                </TouchableOpacity>
                <View style={{height: 1, backgroundColor: 'white'}}>
                </View>
              </View>
            )
          }}
          keyExtractor={item => item.dt_txt}
        >
          
        </FlatList>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  flatListItem: {
    color: 'white',
    padding: 10,
    fontSize: 16,
  },

  flatList:{
    flex: 1,
    flexDirection: "row",
    backgroundColor: 'mediumseagreen'
  },
  
  image:{
    width: 60, 
    height: 60, 
    marginTop: 10
  },
  thanhpho:{
    padding: 10,
    fontSize: 16,
    backgroundColor: "tomato",
    color: "white",
  },
});