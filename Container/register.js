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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NextButton from '../Components/utils/nextButton';
import BackButton from '../Components/utils/backButton';
import Logo from '../Components/utils/logo';
import * as actionTypes from '../Store/action';
import {connect} from 'react-redux';
import {validate} from 'validate.js';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import * as api from '../assets/api/api';
import Spinner from 'react-native-loading-spinner-overlay';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      spinner: false,
      userName: null,
      emailId: null,
      mobileNumber: null,
      mobileNumberError: false,
      mobileValidationError: false,
      userNameError: false,
      emailIdError: false,
      userNameValidationError: false,
      emailValidationError: false,
      otp: null,
      mobileExist: false,
      emailExist: false,
    };
  }

  checkMobileExist = async () => {
    if (this.state.mobileNumber === '') {
      this.setState({mobileNumber: null});
      return;
    } else {
      if (String(this.state.mobileNumber).length !== 12) {
        this.setState({mobileValidationError: true});
        return;
      } 
      // else {
      //   if (this.state.mobileNumber !== null) {
      //     let data = JSON.stringify({
      //       mobile_no: this.state.mobileNumber,
      //     });
      //     await axios
      //       .post(api.mobileCheckAPI, data, {
      //         headers: {
      //           accept: 'application/json',
      //           'content-type': 'application/x-www-form-urlencoded',
      //         },
      //       })
      //       .then(res => {
      //         if (res.data.message === 'Mobile exist') {
      //           this.setState({
      //             mobileExist: true,
      //           });
      //         } else {
      //           this.setState({
      //             mobileExist: false,
      //           });
      //         }
      //       })
      //       .catch(err => {
      //         console.log(err);
      //       });
      //   }
      // }
    }
  };

  checkEmailExist = async () => {
    if (this.state.emailId === '') {
      this.setState({emailId: null});
    } else {
      const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailReg.test(this.state.emailId) === false) {
        this.setState({emailValidationError: true});
        return;
      } else {
        this.setState({emailIdError: false, emailValidationError: false});
          if (this.state.emailId !== null) {
          let data = JSON.stringify({
            email_id: this.state.emailId,
          });        
          await axios
            .post(api.emailCheckAPI, data, {
              headers: {
                accept: 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
              },
            })
            .then(res => {              
              if (res.data.message === 'Mobile exist') {
                this.setState({
                  emailExist: true,
                });
              } else {
                this.setState({
                  emailExist: false,
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
  };

 

  handleRegister = async () => {
    if (
      this.state.mobileNumber !== null &&
      this.state.userName !== null &&
      this.state.emailId !== null &&
      this.state.mobileExist === false &&
      this.state.emailExist === false && 
      this.state.userNameValidationError === false &&
      this.state.mobileValidationError === false &&
      this.state.emailValidationError === false 
    ) {
      if (this.props.userType === null) {
        this.setState({spinner: true});
        let data = JSON.stringify({
          mobile_no: this.state.mobileNumber,
        });
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
              this.setState({spinner: false});
              this.props.onRegisterDetails(
                this.state.userName,
                this.state.mobileNumber,
                this.state.emailId,
                String(res.data.data.otp),
              );
              this.props.navigation.navigate('OTP');
            }
          })
          .catch(err => {
            this.setState({spinner: false});
            console.log(err);
          });
      } else {
        this.setState({spinner: false});
        this.props.onRegisterSellerDetails(
          this.state.userName,
          this.state.mobileNumber,
          this.state.emailId,
        );
        this.props.navigation.navigate('Seller Details');
      }
    } else {
      if (this.state.mobileNumber === null) {
        this.setState({mobileNumberError: true});
      } else {
        this.setState({mobileNumberError: false});
      }
      if (this.state.userName === null) {
        this.setState({userNameError: true});
      } else {
        this.setState({userNameError: false});
      }
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
      },
      registerFormContainer: {
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
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        style={{backgroundColor: '#efebea'}}
        scrollEnabled={true}>
            <BackButton {...this.props} />
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        
          <Logo />
          <View style={styles.registerFormContainer}>
            <Text
              style={{
                fontFamily: 'Gotham Black Regular',
                color: '#004561',
                fontSize: 24,
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              Create Your Account
            </Text>
            <Input
              placeholder="Name"
              style={styles.inputStyle}
              onChangeText={userName => {
                if (/[^a-zA-Z\s]/.test(userName)) {
                  this.setState({userNameValidationError: true});
                } else {
                  this.setState({
                    userName,
                    userNameError: false,
                    userNameValidationError: false,
                  });
                }
              }}
              onBlur={
                this.state.userName === ''
                  ? this.setState({userName: null})
                  : null
              }
              errorMessage={
                this.state.userNameError === true
                  ? 'Enter the User Name'
                  : this.state.userNameValidationError
                  ? 'Invalid User Name'
                  : false
              }
            />
             <Input
              placeholder="Email"
              spellCheck={false}
              autoCorrect={false}
              style={styles.inputStyle}
              onChangeText={emailId =>
                this.setState({
                  emailId,
                  emailIdError: false,
                  emailValidationError: false,
                  emailExist:false
                })
              }
              onBlur={this.checkEmailExist}
              autoCapitalize="none"
              errorMessage={
                this.state.emailIdError === true
                  ? 'Enter the emailId'
                  : this.state.emailValidationError
                  ? 'Invalid Email address'
                  : this.state.emailExist
                  ? 'Email already registered'
                  : null
              }
            />
            <Input
              placeholder="Mobile Number"
              style={styles.inputStyle}
              value={this.state.mobileNumber}
              keyboardType="numeric"
              maxLength={12}
              onBlur={this.checkMobileExist}
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
                    mobileExist:false
                  });
                }
              }}
              errorMessage={
                this.state.mobileNumberError === true
                  ? 'Enter the mobile number'
                  : this.state.mobileValidationError
                  ? 'Invalid mobile number'
                  : this.state.mobileExist
                  ? 'Mobile number already registered'
                  : null
              }
            />           
          </View>
          <NextButton click={() => this.handleRegister()} {...this.state} />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    userType: state.reducer.userType,
    sellerUserType: state.reducer.sellerUserType,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRegisterDetails: (value, value2, value3, value4) =>
      dispatch({
        type: actionTypes.REGISTER_DETAILS,
        payload: value,
        payload2: value2,
        payload3: value3,
        payload4: value4,
      }),
    onRegisterSellerDetails: (value, value2, value3) =>
      dispatch({
        type: actionTypes.REGISTER_SELLER_DETAILS,
        payload: value,
        payload2: value2,
        payload3: value3,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
