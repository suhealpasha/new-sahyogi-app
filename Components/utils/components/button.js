import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  AppRegistry,
  navigation,
  AsyncStorage,

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
 
  // login = ()=>{
  //  {AsyncStorage.getItem('isLoggedIn') ? this.props.navigation.navigate('SearchCustomer') : null}
    
  // }

  getStart = async() =>{
    await AsyncStorage.setItem('sahyogiWalkthrough', '1');
    this.props.pressGetstarted();
    // this.props.navigation.navigate("LoginPartner")
    
  }


  render() {
    const styles = StyleSheet.create({
      parentContaier: {},
      container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      },

      AddToCartButton: {
        borderTopWidth: 2,
        borderColor: '#95A5A6',
        width: '50%',
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#ffffff',
      },
      button: {
        zIndex:999,
        marginLeft:30,
        marginRight:30,        
        paddingTop: 5,
        paddingBottom: 5,
      },
      disbleButton: {        
        marginLeft:30,
        marginRight:30,        
        paddingTop: 5,
        paddingBottom: 5,
        opacity:0.3
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,       
        fontFamily: 'AvenirNextFont',
        fontFamily:'bold'
      },
      linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        padding:10,
        marginTop:40,
        zIndex:1
       
      },
    });

    return (
    
        
      
        <TouchableOpacity      
          style={this.props.disabled ? styles.disbleButton :styles.button}    
          onPress={()=>{this.props.walkthrough ? this.getStart() : this.props.onLogin()}}
          underlayColor="#fff"
          disabled={this.props.disabled}
          >
            
         <LinearGradient
         start={{x: 0.5, y: 0.8}} end={{x: 1.0, y: 0.8}}
      colors={['#ffb600', '#ff5f02']}
      style={styles.linearGradient}
    >
      <Text style={styles.buttonText} >{this.props.title}</Text>
    </LinearGradient>
    
         
        </TouchableOpacity>
     
      
    );
  }
}


export default Button;
