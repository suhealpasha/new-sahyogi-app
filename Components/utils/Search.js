import React, { Component } from 'react';
import {View,Text,FlatList,Card,CardImage} from 'react-native';
import BottomNavigation from '../BottomNavigation/bottomNavigation';
export default class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
         
        };
      }
        render(){
            const items = [ 
                {name : require('../../assets/Images/coffeeFarms/img1.png') ,key:'1' ,origin:'EL SALVADOR',farm:'Las Delicias'} ,
                {name : require('../../assets/Images/coffeeFarms/img2.png') ,key:'2' ,origin:'BOURBON',farm:'Sta Lucia' } ,  
                {name : require('../../assets/Images/coffeeFarms/img3.png') ,key:'3' ,origin:'GEISHA',farm:'El Rosario'} ,  
                {name : require('../../assets/Images/coffeeFarms/img4.png') ,key:'4',origin:'EL SALVADOR',farm:'Las Delicias'} ,  
                {name : require('../../assets/Images/coffeeFarms/img5.png') ,key:'5',origin:'BOURBON',farm:'Sta Lucia' } ,  
                {name : require('../../assets/Images/coffeeFarms/img6.png') ,key:'6',origin:'EL SALVADOR',farm:'Las Delicias'} ,  
                {name : require('../../assets/Images/coffeeFarms/img7.png') ,key:'7',origin:'GEISHA',farm:'El Rosario'} ,  
                {name : require('../../assets/Images/coffeeFarms/img8.png') ,key:'8',origin:'EL SALVADOR',farm:'Las Delicias'} ,  
                {name : require('../../assets/Images/coffeeFarms/img9.png') ,key:'9',origin:'BOURBON',farm:'Sta Lucia'} ,  
                {name : require('../../assets/Images/coffeeFarms/img10.png') ,key:'10',origin:'EL SALVADOR',farm:'Las Delicias'} ,  
               
            ];
            console.log(this.props.navigation)
            return(
            
             
            <View style={{ flex: 1.0,backgroundColor:'rgb(0,70,99)'}}>
              
           
            
            </View>
           
            );
        }
    
}