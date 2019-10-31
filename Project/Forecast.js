import React, {Component} from 'react';
import { FlatList, StyleSheet, View, Image, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import moment from 'moment';

export default class Forecast extends Component {

	constructor(props){
		super(props);
		this.state ={ 
		  isLoading: true,
		  city: this.props.navigation.getParam('city'),
		}
	  }
	
	getWeather(){
		return fetch('http://api.openweathermap.org/data/2.5/forecast?q='+ this.state.city +'&lang=vi&units=metric&APPID=dc5595c47749d00d1dfc9743773820da')
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

	render() {
		const {navigate} = this.props.navigation;
		if(this.state.isLoading){
			return(
			  <View style={{flex: 1, padding: 20}}>
				<ActivityIndicator/>
			  </View>
			)
		  }

		var image = "";
		if(this.props.navigation.getParam('icon') === "01d" || this.props.navigation.getParam('icon') === "02d" || this.props.navigation.getParam('icon') === "03d" || this.props.navigation.getParam('icon') === "04d"){
			image = require('./img/day.jpg');
		} else if(this.props.navigation.getParam('icon') === "09d" || this.props.navigation.getParam('icon') === "10d" || this.props.navigation.getParam('icon') === "11d"){
			image = require('./img/dayrain.jpg');
		}else if(this.props.navigation.getParam('icon') === "01n" || this.props.navigation.getParam('icon') === "02n" || this.props.navigation.getParam('icon') === "03n" || this.props.navigation.getParam('icon') === "04n"){
			image = require('./img/night.jpg');
		}else if( this.props.navigation.getParam('icon') === "09n" || this.props.navigation.getParam('icon') === "10n" || this.props.navigation.getParam('icon') === "11n"){
			image = require('./img/nightrain.jpg');
		}
		return (
			<ImageBackground source={image} style={{width: '100%', height: '100%'}}>
      	<FlatList 
			data={this.state.dataSource.list} 
			style={{marginTop:20}} 
			keyExtractor={item => item.dt_txt} 
			renderItem={({item}) => {
				return(
					<TouchableOpacity onPress={() => navigate('Info', {key: item.dt_txt, city: this.state.city})}>
						<Card containerStyle={styles.card}>
							<Text style={styles.notes}>{this.state.dataSource.city.name}</Text>
							
							<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
								<Image style={{width:100, height:100}} source={{uri:"https://openweathermap.org/img/wn/" + item.weather[0].icon + "@2x.png"}} />
								<View style={{flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
									<Text style={styles.time}>{moment(item.dt*1000).format('HH:mm')}</Text>
									<Text style={styles.time}>{moment(item.dt*1000).format('DD/MM/YYYY')}</Text>
								</View>
								
							</View>

							<Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20}} />
							
							<View style={{flexDirection:'row', justifyContent:'space-between'}}>
								<Text style={styles.notes}>{item.weather[0].description}</Text>
								<Text style={styles.notes}>{Math.round( item.main.temp * 10) / 10 }&#8451;</Text>
							</View>
						</Card>
					</TouchableOpacity>
				);
		}} />
		</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	card:{
		backgroundColor:'rgba(56, 172, 236, 1)',
		borderWidth:0,
		borderRadius:3,
	},
	time:{
		fontSize:30,
		color:'#fff'
	},
	notes: {
		fontSize: 18,
		color:'#fff',
		textTransform:'capitalize'
	}
});