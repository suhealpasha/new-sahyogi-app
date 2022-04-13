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

class StepButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
 
 componentDidMount(){
   console.log("INSIDE step",this.props.searchbar)
 }

  getStart = async() =>{
    if(this.props.searchbar){
    this.props.closeSearch(); 
    }   
    this.props.navigation.navigate('Category',{'search':false})
  }

  getManiCategory = async() =>{
    if(this.props.searchbar){
      this.props.closeSearch(); 
      }   
      this.props.navigation.navigate('MainCategory',{'search':false})
  }


  render() {
    const styles = StyleSheet.create({
    
         
      button: {
        width:'100%',
        paddingLeft:10,
        paddingRight:10,
         justifyContent:'center',
         alignItems:'center'
     
      },
      disbleButton: {        
        width:'100%',
        paddingLeft:10,
        paddingRight:10,
         justifyContent:'center',
         alignItems:'center',
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
        width:'50%',
        marginTop:10,
       justifyContent:'center',
       alignItems:'center',
        borderRadius: 20,
        padding:10,      
        zIndex:1
       
      },
    });

  

    return (     
        <TouchableOpacity      
          style={this.props.disabled ? styles.disbleButton :styles.button}    
          onPress={()=>{this.props.mainCategory ? this.getManiCategory() :this.getStart()}}
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


export default StepButton;
