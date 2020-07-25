import React, {Component} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
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
import PageTitle from '../Components/utils/pageTitle';
import {HelperText, TextInput} from 'react-native-paper';
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
      this.setState({spinner: true});
      let data = JSON.stringify({
        email_id: this.state.emailId,
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
        justifyContent: 'center',
        display: 'flex',
        alignItems:'center',
        height: this.state.height - 48,
         },
      registerFormContainer: {
        paddingTop:10,
        width: '100%',
      },
      users: {},
      spinnerTextStyle: {
        color: '#7ea100',
      },
      suggestionContainer: {
        paddingTop: 10,
        width: '100%',
      },
      inputFieldsStyle: {
        backgroundColor: '#ffff',
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#bad5ff',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        height:55
      },
    });

    return (
      <View>
           <PageTitle title="Fill User Details" {...this.props} />
    
      <KeyboardAwareScrollView
        style={{backgroundColor: '#ffff',display:'flex'}}
        resetScrollToCoords={{x: 0, y: 0}}
        scrollEnabled={true}>
     
     
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />

          <Logo />
          <View style={styles.registerFormContainer}>
            <TextInput
              type="text"
              label="Name"
              mode="flat"
              style={styles.inputFieldsStyle}
              underlineColor="transparent"
              theme={{
                colors: {text: 'black', primary: 'grey'},
                fonts: {medium: 'Open Sans'},
              }}
              spellCheck={false}
              autoCorrect={false}
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
            />
            <HelperText
              type="error"
              visible={
                this.state.userNameError === true ||
                this.state.userNameValidationError
              }>
              {this.state.userNameError === true
                ? 'Enter the User Name'
                : this.state.userNameValidationError
                ? 'Invalid User Name'
                : false}
            </HelperText>
            <TextInput
              type="email"
              label="Email"
              mode="flat"
              style={styles.inputFieldsStyle}
              underlineColor="transparent"
              theme={{
                colors: {text: 'black', primary: 'grey'},
                fonts: {medium: 'Open Sans'},
              }}
              spellCheck={false}
              autoCorrect={false}           
              onChangeText={emailId =>
                this.setState({
                  emailId,
                  emailIdError: false,
                  emailValidationError: false,
                  emailExist: false,
                })
              }
              onBlur={this.checkEmailExist}
              autoCapitalize="none" 
            />
            <HelperText
              type="error"
              visible={
                this.state.emailIdError === true ||
                this.state.emailValidationError ||
                this.state.emailExist
              }>
              {
                this.state.emailIdError === true
                  ? 'Enter the emailId'
                  : this.state.emailValidationError
                  ? 'Invalid Email address'
                  : this.state.emailExist
                  ? 'Email already registered'
                  : null
              }
            </HelperText>            
             <TextInput
              type="text"
              label="Mobile Number"
              value={this.state.mobileNumber}
              mode="flat"
              style={styles.inputFieldsStyle}
              underlineColor="transparent"
              theme={{
                colors: {text: 'black', primary: 'grey'},
                fonts: {medium: 'Open Sans'},
              }}
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
                    mobileExist: false,
                  });
                }
              }} 
            />
            <HelperText
              type="error"
              visible={
                this.state.mobileNumberError === true ||
                this.state.mobileValidationError ||
                this.state.mobileExist
              }>
             {
                this.state.mobileNumberError === true
                  ? 'Enter the mobile number'
                  : this.state.mobileValidationError
                  ? 'Invalid mobile number'
                  : this.state.mobileExist
                  ? 'Mobile number already registered'
                  : null
              }
            </HelperText>
          </View>    
          <NextButton
            click={() => this.handleRegister()}
            {...this.state}
            color="#7ea100"
            label="Next"
          />
        </View>
      </KeyboardAwareScrollView>
      </View>
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
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
