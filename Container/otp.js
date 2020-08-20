import React, {Component} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NextButton from '../Components/utils/nextButton';
import BackButton from '../Components/utils/backButton';
import Logo from '../Components/utils/logo';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {connect} from 'react-redux';
import * as actionTypes from '../Store/action';
import * as api from '../assets/api/api';


class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      otp: '',
      otpError:false,
      invalidOTP:false
    };
  } 

 
  handleLogin = () => {
    // if(this.state.otp !== ''){
    //  let otpCheck = String(this.state.otp).length     
    //  if(otpCheck === 4){
      // this.setState({invalidOTP:false})
      if(this.props.userType === null){
        this.props.navigation.navigate('Set Password');
      }
      else{
        this.props.navigation.navigate('Seller Details');
      }
   
    //  } 
    //  else{
      //  this.setState({invalidOTP:true})
    //  }
    
    // }
    // else{
    //   this.setState({otpError:true})
    // }
    
  };

  resendOTP = async() =>{
     let data = JSON.stringify({
      email_id: this.props.email,
      otp:this.props.otp
    })   
    await axios.post(api.otpAPI,data,
    {headers:{'accept': 'application/json',
    'accept-language': 'en_US',
    'content-type': 'application/x-www-form-urlencoded'}} )
    .then(res =>{ 
      console.log(res.data.data)        
      if(res.status){             
        this.props.onResendOTP(String(res.data.data.otp));        
      }
    })
    .catch(err =>{console.log(err)})
  }

  render() {
   
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,  
        height:this.state.height - 90,
        justifyContent:'center'      
      },
      otpFormContainer: {
        width: '100%',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        paddingRight:10,
        paddingLeft:10,
        alignItems:'center'
      },
      otpStyles: {
        width:300,
        height: 100,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent:'center'
       
      },
      borderStyleBase: {
        width: 30,
        height: 45
      },
    
      borderStyleHighLighted: {
        borderColor: "#95A5A6",
      },
    
      underlineStyleBase: {
        width: 30,
        height: 50,
        borderWidth: 0,    
        borderWidth:1,
        borderColor:'#bad5ff',
     
        color:'#3e708f',
        fontSize:25
      },
    
      underlineStyleHighLighted: {
        borderColor: "#3e708f",
      },

      resendOtpContainer: {
        paddingLeft:10,
        paddingRight:10,
        paddingTop: 10,
        width: '100%',
      },
    });

    return (
      <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}}
      style={{backgroundColor:'#ffff'}} 
      scrollEnabled={true}>

        <View style={styles.container}>         
          <Logo />

          <View style={styles.otpFormContainer}>            
            <OTPInputView
              autoFocus={true}
              pinCount={4}
              style={styles.otpStyles}
              code={this.props.otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({otp:code,otpError:false})}}
              // autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}              
            />
          </View>
          {this.state.otpError ? (
              <Text
                style={{
                  color: 'red',
                  fontSize: 12,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}>
                Enter the OTP
              </Text>
            ) : null}
             {this.state.invalidOTP ? (
              <Text
                style={{
                  color: 'red',
                  fontSize: 12,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}>
                Invalid OTP
              </Text>
            ) : null}
          <View style={styles.resendOtpContainer}>
            <TouchableOpacity onPress={() => {this.resendOTP()}}>
            <Text
                style={{
                  color: '#3e708f',
                  fontFamily: 'GothamLight',
                  fontSize: 14,
                  fontWeight:'100',
                  textAlign: 'right',
                  textAlignVertical: 'center',
                 
                }}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>
  
          <NextButton
           click={() => this.handleLogin()}
            {...this.state}
            color="#7ea100"
            label="Next"
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    otp: state.reducer.otp,
    email: state.reducer.email,
    userType: state.reducer.userType,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onResendOTP: (value) =>
      dispatch({type: actionTypes.RESEND_OTP, payload: value}),
  };
};
export default  connect(mapStateToProps,mapDispatchToProps)(Otp);
