import React, { Component } from 'react';
import {Dimensions,StyleSheet,FlatList,View,Text, Image,ScrollView , Button} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class MicroLots extends Component{

    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
        };
      }

    productDetails = ()=>{
        this.props.navigation.navigate('Product Description')
        }

    render(){
        const items = [ 
            {name : require('../../../assets/Images/coffeeFarms/img1.png') ,key:'1ML',origin:'EL SALVADOR',farm:'Las Delicias',ratings:'4.0'} ,
            {name : require('../../../assets/Images/coffeeFarms/img2.png') ,key:'2ML',origin:'BOURBON',farm:'Sta Lucia',ratings:'2.5'} ,  
            {name : require('../../../assets/Images/coffeeFarms/img3.png') ,key:'3ML',origin:'BOURBON',farm:'Sta Lucia',ratings:'1.5'} ,  
            {name : require('../../../assets/Images/coffeeFarms/img4.png') ,key:'4ML',origin:'GEISHA',farm:'El Rosario',ratings:'5.0'} ,  
            {name : require('../../../assets/Images/coffeeFarms/img2.png') ,key:'2NL' ,origin:'BOURBON',farm:'Sta Lucia',ratings:'3.3' } , 
            {name : require('../../../assets/Images/coffeeFarms/img5.png') ,key:'5NL',origin:'BOURBON',farm:'Sta Lucia',ratings:'4.0' } ,  
            {name : require('../../../assets/Images/coffeeFarms/img6.png') ,key:'6NL',origin:'EL SALVADOR',farm:'Las Delicias',ratings:'1.5'} ,  
            {name : require('../../../assets/Images/coffeeFarms/img7.png') ,key:'7NL',origin:'GEISHA',farm:'El Rosario',ratings:'4.0'} , 
            {name : require('../../../assets/Images/coffeeFarms/img3.png') ,key:'3NL' ,origin:'GEISHA',farm:'El Rosario',ratings:'2.5'} ,  
            {name : require('../../../assets/Images/coffeeFarms/img4.png') ,key:'4NL',origin:'EL SALVADOR',farm:'Las Delicias',ratings:'5.0'} ,  
           
        ];       
     
        return(        
         
        <View style={{ flex: 1.0}} >          
        <FlatList data={items}
        columnWrapperStyle={{justifyContent:'space-between', }}
        numColumns={2}
        // keyExtractor = {(items)=>{items.key}}
      
        renderItem = {({item})=>{
        let ratingIcon = <Text style={styles.ratingStyle} >{'  '}{item.ratings}{' '}<Icon name="star" size={13} style={{justifyContent:'center',textAlignVertical:'center'}}/>{'  '}</Text>
        let ratings =  <Text style={{color:'black',fontFamily:'GothamLight',fontSize:10,textAlignVertical:'center',paddingLeft:10,paddingRight:10}}>{'   '}100:Ratings</Text>
        return(   
           <TouchableOpacity pressDuration = {0} style={{width:(this.state.width/2)-5}} onPress={this.productDetails}>
            <Card style={{backgroundColor:'white'}}>
               <CardImage 
                    source= {item.name} 
                    style={{resizeMode: 'contain'}}
                    />
         
             <CardTitle subtitle={item.origin}/>             
             <CardContent text={item.farm} />      
             <CardContent text={[ratingIcon,ratings]} />              
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
      },
      ratingStyle:{
        backgroundColor: '#00ac00',
        color: 'white',
        lineHeight: 20,   
        fontSize: 13,
        width: 45,
               
      }
}
   
  );

  
