import React, { Component } from 'react';
import {View,Text,  StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
class NextButton extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
      const styles = StyleSheet.create({
        nextButtonContainer: {
            flexDirection: 'row',
            width: '100%',            
            paddingLeft:10,
            paddingRight:10,
            paddingTop:30
          },
          loginButton: {   
      
            alignItems: 'center',
             width:'100%',
            padding:10,
            backgroundColor: this.props.color,
            borderRadius:50,
            marginTop: 10,
            marginRight: 10,           
          },
          buttonText:{
            color:'#fff',
            fontFamily:'GothamMedium',
            fontSize:18
          }
        })
        return(
            <View style={styles.nextButtonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={this.props.click} disabled={this.props.disabled}>
        <Text style={styles.buttonText}>{this.props.label}</Text>
            </TouchableOpacity>
          </View>
        );
    }
}

export default NextButton;
