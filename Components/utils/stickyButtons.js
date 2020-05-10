import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Image,
    ScrollView,
    Button,
    Dimensions,
    TouchableOpacity,
    AppRegistry,
    navigation,
  } from 'react-native';
import Toast from 'react-native-simple-toast';
class StickyButton extends Component{
    constructor(props) {
        super(props);
        this.state = {
          
      }
    }
    
    render(){
        const styles = StyleSheet.create({
            parentContaier:{     
            
            },
            container: {       
                flexDirection:'row',
                width:'100%' ,
                alignItems: 'center',  
            
            },          
           
            AddToCartButton:{                        
              borderTopWidth: 2,                       
              borderColor: '#95A5A6',
              width:'50%',
              paddingTop:5,
              paddingBottom:5,
              backgroundColor:'#ffffff'
            },
            buyButton:{               
                backgroundColor:'#004561',              
                borderTopWidth: 2,                         
              borderColor: '#95A5A6',
                width:'50%',
                paddingTop:5,
                paddingBottom:5
              },
              cartText:{
                color:'#004561',
                textAlign:'center',
                fontSize:14,
                padding:10,
                fontFamily:'GothamMedium',
                
            },
              buyText:{
                  color:'#fff',
                  textAlign:'center',
                  fontSize:14,
                  padding:10,
                  fontFamily:'GothamMedium',
              },
          })
      
        return(<View style={styles.container}>
            <TouchableOpacity
          style={styles.AddToCartButton}
          onPress={() => Toast.show('Added to the cart.')}
          underlayColor='#fff'>
          <Text style={styles.cartText}>{this.props.cancel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => navigate('Home Screen')}
          underlayColor='#fff'>
          <Text style={styles.buyText}>{this.props.proceed}</Text>
        </TouchableOpacity>
        </View>);
    }
}

export default StickyButton;