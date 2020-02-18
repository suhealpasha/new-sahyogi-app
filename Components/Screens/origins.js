import React, { Component } from 'react';
import {StyleSheet,FlatList,View,Text, Image,ScrollView,Button,TouchableHighlight} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";

export default class Origins extends Component{
    constructor(props) {
        super(props);
        this.state = {
           
        }
      }

    render(){
        
        const items = [ 
            {name :'Nort America' ,key:'1'} ,
            {name : 'South America' ,key:'2'} ,  
            {name : 'Central Asia' ,key:'3'} ,  
            {name : 'Europe' ,key:'4'} ,  
            {name : 'Central Africa' ,key:'5'} ,  
            {name : 'South Asia' ,key:'6'} ,  
            {name : 'Middle East' ,key:'7'} ,  
            {name : 'Central America' ,key:'8'} ,  
            {name : 'Austalia' ,key:'9'} ,  
            {name : 'South Africa' ,key:'10'} ,  
        ];
       
        return(
        
            <FlatList data={items}
             
            horizontal      
            keyExtractor = {(items)=>{items.key}}          
            renderItem = {({item})=>{
     
            return(  
                
           <View  style = {styles.originStyles}>
            <TouchableHighlight style={styles.button}
              onPress={this.onPress} >    
            <Text style={{color:'white'}}>{item.name}</Text>
            </TouchableHighlight>  
            </View>
        
            );
            }}
            />
         
           
        );
    }

}

const styles = StyleSheet.create({
   
    originStyles: {       
       marginHorizontal:5,     
       justifyContent: 'center', 
       alignItems: 'center' ,       
        padding:5
       },
       
       button: {
        alignItems: 'center',
        backgroundColor: 'rgb(33,150,243)',
        padding: 10,
    
      },
   
  });

  
