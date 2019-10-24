import React, {Component} from "react";
import {
    View, Text, FlatList, StyleSheet, Image, TouchableHighlight, ToastAndroid,
} from "react-native";
import flatListData from './data/flatListData';

export default class EXE2 extends Component{
    onPressAdd(){
        ToastAndroid.show('Click Add', ToastAndroid.SHORT);
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <View style={{
                    backgroundColor: "tomato",
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: 50,
                }}>
                    <TouchableHighlight 
                        style={{marginRight: 10}}
                        underlayColor="tomato"
                        onPress={this.onPressAdd}
                    >
                        <Image 
                            style={{width: 30, height: 30}}
                            source={require('./icon/addicon.png')}
                                                        
                        />

                    </TouchableHighlight>
                </View>
                <FlatList 
                    data={flatListData}
                    renderItem={({item, index})=>{
                        //console.log(`Item = ${JSON.stringify(item)}`);
                        return(
                        <FlatListItem list = {item} index = {index}>

                        </FlatListItem>);
                        }
                    }
                >

                </FlatList>
            </View>
        );
    }
}

class FlatListItem extends Component{
    render(){
        return(
            <View>
                <View style={ao.bao}>
                    <Image
                        source={{uri: this.props.list.imageURL}}
                        style={ao.hinhanh}
                    />
                    
                    <View style={{
                        flex: 1, 
                        flexDirection: 'column'
                    }}>
                        <Text style={ao.title}>{this.props.list.name}</Text>
                        <Text style={ao.description}>{this.props.list.description}</Text>
                    </View>
                </View>

                <View style={{
                    height: 1,
                    backgroundColor: 'white',
                }}>
                </View>
            </View>
            
        );
    }
}

var ao = StyleSheet.create({
    bao:{
        flex: 1,
        backgroundColor: "#6699FF",
        flexDirection: 'row'
    },

    description:{
        color: "white",
        padding: 10,
        fontSize: 16,
    },

    title:{
        color: "white",
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    
    hinhanh:{
        width: 100,
        height: 100,
        margin: 5,
    },
});