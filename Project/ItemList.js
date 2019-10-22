//import thu vien
import React, {Component} from "react";
import{
  View, Text, FlatList, StyleSheet, Image, ActivityIndicator
} from "react-native";
//Khai bao class
export default class Project extends Component{
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://api.openweathermap.org/data/2.5/forecast?q=Hanoi&lang=vi&units=metric&APPID=b5177eb82d0e5d0cbdbbf5a5d2cd19b1')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson
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

    return(
      <View>
        <FlatList data={this.state.dataSource.list}
          renderItem={({item})=>{
            return(
              <View>
                <View style={{
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: 'mediumseagreen'}}
                  >
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
                      style={{width: 70, height: 70, marginTop: 10}}
                      source={{uri: "http://openweathermap.org/img/wn/"+ item.weather[0].icon + "@2x.png"}}
                    />
                  </View>
                  <View style={{
                    flex: 2/3,
                    flexDirection: "column",
                  }}>
                  <Text style={styles.flatListItem}>{`${item.main.temp_max} °C`}</Text>
                    <Text style={styles.flatListItem}>{`${item.main.temp_min} °C`}</Text>
                  </View>
                </View>
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
  }
});