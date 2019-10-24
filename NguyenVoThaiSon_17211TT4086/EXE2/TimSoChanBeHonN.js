//import thu vien
import React, {Component} from "react";
import{
    View, Text
} from "react-native";

//Viet class
export default class TinhSoChan extends Component{
    render(){
        //Mang
        let mang = [10,12,15,16,20,30];
        let xuatSoChan = (n)=>{
            console.log(`Cac so chan nho hon ${n} la: `)
            for(let i of mang){
                if((i %2 ==0) && (i < n)){
                    console.log(i);
                }
            }
        }
        
        xuatSoChan(20);
        
        return(
            <View>
            </View>
        );
    }
}