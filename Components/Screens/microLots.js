import React, { Component } from 'react';
import {StyleSheet,FlatList,View,Text, Image,ScrollView , Button} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
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
           <TouchableOpacity style={{width:180}}  onPress={() => this.productDetails() }>
            <Card style={{backgroundColor:'#004561'}}>
               <CardImage 
                    source= {item.name} 
                    style={{resizeMode: 'contain'}}
                    />
         
             <CardTitle subtitle={item.origin}/>
             <CardContent text={item.farm} />
             {/* <CardAction  
       separator={false} 
       inColumn={false}>
       <CardButton
         onPress={() => this.productDetails()}   
         title="Details"
   
         
       />
       <CardButton
         onPress={() => {}}
         title="Add to Cart"
        
       />
     </CardAction> */}
            </Card>
            </TouchableOpacity>
             
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
    detailsButton:{
               
        backgroundColor:'orange',
        paddingBottom:10,
        paddingTop:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
      detailsButtonText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
      }
}
   
  );

  
