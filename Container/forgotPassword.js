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
  TochableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NextButton from '../Components/utils/nextButton';
import BackButton from '../Components/utils/backButton';
import Logo from '../Components/utils/logo';
import * as actionTypes from '../Store/action';
import {connect} from 'react-redux';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../assets/api/api';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      height: Dimensions.get('window').height,
      mobileNumber: null,
      mobileNumberError: false,
      mobileValidationError:false,      
      emailId:null,
      emailIdError:false,
      emailValidationError:false
    };
  }
validateMobile = () =>{
  if (this.state.mobileNumber === '') {
    this.setState({mobileNumber: null});
    return;
  } else {
    if (String(this.state.mobileNumber).length !== 12) {
      this.setState({mobileValidationError: true});
      return;
    }
}
}

emailValidate = () => {
  if (this.state.emailId === '') {
    this.setState({emailId: null});
  } else {
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailReg.test(this.state.emailId) === false) {
      this.setState({emailValidationError: true});
    } else {
      this.setState({emailIdError: false, emailValidationError: false});
    }
  }
};

  handleForgotPassword = async () => {
   
    if (this.state.emailId !== null && this.state.mobileValidationError === false) {     
      let data = JSON.stringify({
        email_id: this.state.emailId,
      });
      this.setState({spinner: true});  
      await axios
        .post(api.otpAPI, data, {
          headers: {
            accept: 'application/json',
            'accept-language': 'en_US',
            'content-type': 'application/x-www-form-urlencoded',
          },
        })
        .then(res => {          
          if (res.status) {
            this.setState({spinner: false})
            this.props.onForgotPasswordDetails(
              this.state.emailId,
              String(res.data.data.otp),
            );
            this.props.navigation.navigate('OTP');
          }
          else{
            this.setState({spinner: false})
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.props.navigation.navigate('OTP');
    } else {
      if (this.state.emailId === null) {
        this.setState({emailIdError: true});
      } else {
        this.setState({emailIdError: false});
      }
    }
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,  
        height:this.state.height - 90,
        justifyContent:'center' ,   
      },
      ForgotPasswordFormContainer: {
        width: '100%',
      },
      users: {},
      spinnerTextStyle: {
        color: '#00aa00',
      },
      suggestionContainer: {
        paddingTop: 10,
        width: '100%',
      },
    });

    return (
      <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}} style={{ backgroundColor: '#efebea',}}
      scrollEnabled={false}>
             <BackButton {...this.props} />
        <View style={styles.container}>
        <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
     
          <Logo />

          <View style={styles.ForgotPasswordFormContainer}>
            <Text
              style={{
                fontFamily: 'Gotham Black Regular',
                color: '#004561',
                fontSize: 24,
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              Forgot Your password?
            </Text>

            {/* <Input
              placeholder="Mobile Number"
              style={styles.inputStyle}
              keyboardType="numeric"
              maxLength={10}   
              onBlur={this.validateMobile}           
              onChangeText={mobileNumber => {
                const input = mobileNumber.replace(/\D/g, '').substring(0, 10);
                const first = input.substring(0, 3);
                const middle = input.substring(3, 6);
                const last = input.substring(6, 10);

                if (input.length > 6) {
                  this.setState({
                    mobileNumber: `${first}-${middle}-${last}`,
                    mobileNumberError: false,
                    mobileValidationError: false,
                  });
                } else if (input.length > 3) {
                  this.setState({
                    mobileNumber: `${first}-${middle}`,
                    mobileNumberError: false,
                    mobileValidationError: false,
                  });
                } else if (input.length >= 0) {
                  this.setState({
                    mobileNumber: input,
                    mobileNumberError: false,
                    mobileValidationError: false,
                  });
                }
              }}
              errorMessage={
                this.state.mobileNumberError === true
                  ? 'Enter the mobile number'
                  : this.state.mobileValidationError
                  ? 'Invalid mobile number'
                  : null
              }
            /> */}
             <Input
              placeholder="Email"
              style={styles.inputStyle}
              spellCheck={false}
              autoCorrect={false}
              onChangeText={emailId =>
                this.setState({
                  emailId,
                  emailIdError: false,
                  emailValidationError: false,
                })
              }
              onBlur={this.emailValidate}
              autoCapitalize="none"
              errorMessage={
                this.state.emailIdError === true
                  ? 'Enter the emailId'
                  : this.state.emailValidationError
                  ? 'Invalid Email address'
                  : null
              }
            />
          </View>
          <NextButton click={() => this.handleForgotPassword()} />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onForgotPasswordDetails: (value, value1) =>
      dispatch({
        type: actionTypes.FORGOT_PASSWORD_DETAILS,
        payload: value,
        payload1: value1,
      }),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(ForgotPassword);
