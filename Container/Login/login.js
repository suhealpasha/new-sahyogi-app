import React, { Component } from 'react';
import axios from "axios";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

class Login extends Component {

  constructor(props) {
    
    super(props);
    state = {
      email:'',
      password:'',
      data:[]
    }
    
  }
  UNSAFE_componentWillMount() {
    this.setState({
      email:'',
      password:'',
      data:[]
    });

}

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }
 

  handleInput = async() => {

    if(this.state.email!=null|| this.state.password!=null){      
    const res = await axios.post('http://mathtech.co.in/helpinghand/hh_api/signIn', {
      email_phone:this.state.email,
       password:this.state.password
    });
   this.setState({data:res.data})   
   let check = Object.values(this.state.data)[0]
   if(check){ Alert.alert("Login Successful!")}
   else{ Alert.alert("Invalid Email or password!")}
  }

}

 
  
  render() {

    
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>

          <Image style={styles.inputIcon} source={require('../..//assets/Images/email.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('../..//assets/Images/key.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}onPress={() => this.handleInput()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight >

        <TouchableHighlight style={styles.buttonContainer}  onPress={() => this.onClickListener('restore_password')}>
            <Text style={styles.forgotPassword} >Forgot your password?</Text>
        </TouchableHighlight>
        
        
      </View>
    );
  }
}
export default Login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
 
  },
  buttonContainerNew: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
    width:'100%',
    borderColor:'red',
    backgroundColor:'grey',
   

  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  forgotPassword:{
      fontStyle:'italic',
      textDecorationLine:'underline'
  }
});