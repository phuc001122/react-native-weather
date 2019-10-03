//import thu vien
import React, {Component} from "react";
import{
  View, Text, FlatList, StyleSheet, Image
} from "react-native";
import flastListData from "./flastListData";
//Khai bao class
export default class Project extends Component{
  render(){
    return(
      <View>
        <FlatList data={flastListData}
          renderItem={({item, index})=>{
            return(
              <FlatListItem item= {item} index = {index}>

              </FlatListItem>
            )
          }}
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

class FlatListItem extends Component{
  render(){
    return(
      <View style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen' : "tomato",}}
        >
          <View style={{
          flex: 1,
          flexDirection: "column",
        }}>
          <Text style={styles.flatListItem}>{this.props.item.date}</Text>
          <Text style={styles.flatListItem}>{this.props.item.status}</Text>
        </View>
        <View style={{flex: 1,
          flexDirection: "column",}}>
        <Image
          style={{width: 50, height: 50, marginTop: 30}}
          source={{uri: this.props.item.image}}
        />
        </View>
      </View>
    );
  }
}