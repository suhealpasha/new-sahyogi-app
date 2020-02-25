import React, { Component } from 'react';
import {Image,View,Text,FlatList,Card,CardImage,StyleSheet,Dimensions, Item,ListItem,List,CardTitle} from 'react-native';
import BottomNavigation from '../BottomNavigation/bottomNavigation';
export default class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            height: Dimensions.get('window').height,
            items: [ 
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
               
            ],
            data:[]
        
        };
      }

   
      
    
        render(){
          
            const styles = StyleSheet.create({
                container: {
                  flex: 1,                 
                },
                searchFilterContainer:{
                    height:this.state.height-130
                },
                searchedItems:
                {
                    padding:10,
                    flexDirection:'row', 
                    backgroundColor:'rgb(0,70,99)'  ,                   
                    marginTop:10,  
                    marginLeft:10,
                    marginRight:10            
                
                },
                searchItemText:{
                    textAlignVertical:'center',
                    padding:5,
                    color:'white'
                }
              })

              const newData = this.state.items.filter(item => {      
                const itemDataOrigin = item.origin.toUpperCase();    
                if(this.props.route.params.searchText)    {        
                 const textData = this.props.route.params.searchText.toUpperCase();                  
                 return itemDataOrigin.indexOf(textData) > -1;   
                }                
              });  

            return(          
                <View style={styles.container}>  

            <View style={styles.container}>
            {this.props.route.params.searchText===undefined?<Text>Seach for an item!</Text>:            
            newData.length === 0 ?
            <Text>No Item Found!</Text>
            :
            newData.map(i=>{
                return(
                <View style={styles.searchedItems}>
                    <Image source={i.name}  style={{width: 50, height: 50}}/>
                    <Text style={styles.searchItemText}>{i.origin}</Text>
                </View>
                
                )
                })
            }
    

            </View>
            <BottomNavigation {...this.props} />
            </View>
            );
          
        }
    
}

