import React, { Component } from 'react';
import {StyleSheet,FlatList,View,Text, Image,ScrollView, Dimensions} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import Swiper from 'react-native-swiper'

export default class FeaturedItems extends Component{
    constructor(props) {
        super(props);
        this.state = {
            width:Dimensions.get('window').width,
            items : [ 
             
                require('../../assets/Images/coffeeFarms/img4.png')  ,  
                require('../../assets/Images/coffeeFarms/img5.png')  ,  
                require('../../assets/Images/coffeeFarms/img6.png')  ,  
                require('../../assets/Images/coffeeFarms/img7.png') , 
                require('../../assets/Images/coffeeFarms/img1.png')  ,
                require('../../assets/Images/coffeeFarms/img2.png') ,  
                require('../../assets/Images/coffeeFarms/img3.png') ,  
                require('../../assets/Images/coffeeFarms/img8.png')  ,  
                require('../../assets/Images/coffeeFarms/img9.png')  ,  
                require('../../assets/Images/coffeeFarms/img10.png')  ,  
            ]       
        }

};
        
      

    render(){
        
       
        return(
        
         <View style={{ justifyContent:'center',alignItems: 'center', }}>
            <SliderBox images={this.state.items} 
            onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
            autoplay
            circleLoop
            parentWidth={this.state.width/1.1}
            dotStyle={{
                width: 0,
                height: 0,
                borderRadius: 0,
                marginHorizontal: 0,
                padding: 0,
                margin: 0
              }}
            />
            

            </View>
        );
    }

}

const styles = StyleSheet.create({
   
    microLotsHolderStyle: {       
        // flexDirection: 'column',
        // backgroundColor:'pink'
       },
    itemHolderStyle: {        
       
        // width:'100%',
        // marginBottom:10,
        // padding:10,
        // justifyContent: 'center',
        // alignItems: 'center', 
       },
    itemStyle: {
    
      
    },
   
  });

  
