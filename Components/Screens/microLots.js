import React, { Component } from 'react';
import {StyleSheet,FlatList,View,Text, Image,ScrollView , Button} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { TouchableHighlight } from 'react-native-gesture-handler';
export default class MicroLots extends Component{

    productDetails = ()=>{
        this.props.navigation.navigate('Product Description')
        }

    render(){
        const items = [ 
            {name : require('../../assets/Images/coffeeFarms/img1.png') ,key:'1',origin:'EL SALVADOR',farm:'Las Delicias'} ,
            {name : require('../../assets/Images/coffeeFarms/img2.png') ,key:'2',origin:'BOURBON',farm:'Sta Lucia'} ,  
            {name : require('../../assets/Images/coffeeFarms/img3.png') ,key:'3',origin:'BOURBON',farm:'Sta Lucia'} ,  
            {name : require('../../assets/Images/coffeeFarms/img4.png') ,key:'4',origin:'GEISHA',farm:'El Rosario'} ,  
           
        ];
        
        return(
        
         
        <View style={{ flex: 1.0}} >
          
        <FlatList data={items}
        columnWrapperStyle={{justifyContent:'space-between', }}
        numColumns={2}
        // keyExtractor = {(items)=>{items.key}}
      
        renderItem = {({item})=>{
 
        return(   
           
            <Card style={{padding:5},{backgroundColor:'#ffffff'}>
               <CardImage 
                    source= {item.name} 
                 style={{height:74}}
                    />
         
             <CardTitle 
                    style={{color:'red'}}         
               subtitle={item.origin}  
              
            />
             <CardContent text={item.farm} style={{color:'red'}}/>
             <CardAction  style={{backgroundColor:'#ffffff'}}
    separator={true} 
    inColumn={false}>
    <CardButton
      onPress={() => this.productDetails()}

      title="Details"
      color="#000000"
    />
    <CardButton
      onPress={() => {}}
      title="Add to Cart"
      color="rgb(0,70,99)"
      
     
    />
  </CardAction>
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

  
