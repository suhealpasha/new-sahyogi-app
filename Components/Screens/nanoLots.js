import React, { Component } from 'react';
import {StyleSheet,FlatList,View,Text, Image,ScrollView} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
export default class NanoLots extends Component{

    render(){
        const items = [            
            {name : require('../../assets/Images/coffeeFarms/img8.png') ,key:'8'} ,  
            {name : require('../../assets/Images/coffeeFarms/img9.png') ,key:'9'} ,  
            {name : require('../../assets/Images/coffeeFarms/img10.png') ,key:'10'} ,  
            {name : require('../../assets/Images/coffeeFarms/img1.png') ,key:'1'} ,
        
        ];
        return(
        
         
        <View style={{ flex: 1.0,padding:5 }}>
          
        <FlatList data={items}
        columnWrapperStyle={{justifyContent:'space-between', }}
        numColumns={2}
        // keyExtractor = {(items)=>{items.key}}
      
        renderItem = {({item})=>{
 
        return(        
       
            <Card>
            <CardImage 
           source= {item.name} 
          style={{height:'auto'}}
              />
              {/* <Image  style={{width: '45%',height:100}} source= {item.name} /> */}
             </Card>
        );
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

  
