import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
      flex: 1,
    },
    slide2: {
      flex: 1,
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
      marginVertical: 10,
      borderRadius: 10
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
      borderRadius: 10
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
      marginStart: '25%',
      marginEnd: 10,
      alignItems: "stretch"
    },
  
    detail_row:
    {
      flexDirection: "row",
      marginTop: 23,
      borderBottomWidth: 1,
      borderBottomColor: '#cecdcd69',
      paddingBottom: 10
    },




    //forecast
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
  })

module.exports = styles;