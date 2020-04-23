import React, { Component } from 'react';
import {View,Text,  StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
class ConfirmButton extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){

        return(
            <View style={styles.nextButtonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={this.props.click}>
        <Text style={styles.buttonTextStyle}>{this.props.buttonName}</Text>
            </TouchableOpacity>
          </View>
        );
    }
}

export default ConfirmButton;
const styles = StyleSheet.create({
nextButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#3e708f',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#004561',
  
   borderRadius:15,
    marginTop: 10,
    marginRight: 10,
  },
  buttonTextStyle:{
    color:'white',
    fontFamily: 'GothamMedium',
    fontSize: 14,
    paddingLeft:10,
    paddingRight:10
  }
})