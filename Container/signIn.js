import React, {Component} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Dimensions,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import {Input} from 'react-native-elements';

import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import NextButton from '../Components/utils/nextButton';
import {NavigationActions} from 'react-navigation';
import BackButton from '../Components/utils/backButton';
import Logo from '../Components/utils/logo';
import * as actionTypes from '../Store/action';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../assets/api/api';
import {HelperText,TextInput} from 'react-native-paper';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      spinner: false,
      mobileNumber: null,
      password: null,
      mobileNumberError: false,
      passwordError: false,
      emailId: null,
      emailIdError: false,
      emailValidationError: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
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

  _handleLogin = async () => {
    if (this.state.emailId !== null && this.state.password !== null) {
      let data;
      this.setState({spinner: true});
      data = JSON.stringify({
        email_id: this.state.emailId,
        password: this.state.password,
      });
      await axios
        .post(api.signInAPI, data, {
          headers: {
            accept: 'application/json',
            'accept-language': 'en_US',
            'content-type': 'application/x-www-form-urlencoded',
          },
        })
        .then(res => {
          if (res.data.status === 'success' && res.data.user_type === 'Buyer') {
            AsyncStorage.setItem('isLoggedIn', res.data.access_token);
            AsyncStorage.setItem('userType', res.data.user_type);
            this.props.onBottomTabClicked('home');
            this.props.onSignIn();
            this.setState({spinner: false, emailId: null, password: null});
          } else if (
            res.data.status === 'success' &&
            res.data.user_type === 'Seller'
          ) {
            AsyncStorage.setItem('isLoggedIn', res.data.access_token);
            AsyncStorage.setItem('userType', res.data.user_type);
            this.props.onBottomTabClicked('home');
            this.props.onSellerSignIn();
            this.setState({spinner: false, emailId: null, password: null});
          } else {
            this.setState({spinner: false});
            alert('Invalid Credentials!');
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      if (this.state.emailId === null) {
        this.setState({emailIdError: true});
      } else {
        this.setState({emailIdError: false});
      }
      if (this.state.password === null) {
        this.setState({passwordError: true});
      } else {
        this.setState({passwordError: false});
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
        paddingTop: 10,
        justifyContent: 'center',
        height: this.state.height,
    
    
      },
      spinnerTextStyle: {
        color: '#7ea100',
      },

      logoContainer: {},
      logoImageStyle: {
        width: 340,
        height: 210,
        resizeMode: 'stretch',
      },
      signInFormContainer: {
        paddingTop:20,
        width: '100%',
        
      },
      inputStyle: {
        fontFamily: 'Gotham Black Regular',
      },

      signUpContainer: {
        paddingTop: 20,
        width: '100%',
     
       
      },
      forgotPasswordContainer: {
        paddingTop: 10,
        paddingBottom:10,
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
       
      },
      inputFieldsStyle:{
        backgroundColor:'#ffff',
        marginLeft:10,
        marginRight:10,
        borderWidth:1,
        borderColor:'#bad5ff',
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        height:55
      }
    });

    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        style={{backgroundColor: '#ffff'}}
        scrollEnabled={true}>
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          <Text style={{fontSize:26,fontFamily:'GothamMedium'}}>Welcome to Microffee</Text>
          <Logo />
          <View style={styles.signInFormContainer}>           
            <TextInput
              type="email"
              label="Email"            
              mode="flat"
              style={styles.inputFieldsStyle}              
              underlineColor="transparent"  
              under
              theme={{colors: {text: 'black', primary: 'grey'} ,  fonts: { medium: 'Open Sans' }}}
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
              value={this.state.emailId}
            />
             <HelperText type="error" visible={this.state.emailIdError === true || this.state.emailValidationError }>
             {this.state.emailIdError === true
                  ? 'Enter the email Id'
                  : this.state.emailValidationError
                  ? 'Invalid Email address'
                  : null}
            </HelperText>
            
              <TextInput
              secureTextEntry={true}
              label="Password"           
              mode="flat"
              style={styles.inputFieldsStyle}              
              underlineColor="transparent"               
              theme={{colors: {text: 'black', primary: 'grey'} ,  fonts: { medium: 'Open Sans' }}}
              spellCheck={false}
              autoCorrect={false}
              onChangeText={password =>
                this.setState({password, passwordError: false})
              }
              onBlur={
                this.state.password === ''
                  ? this.setState({password: null})
                  : null
              }
              autoCapitalize="none"             
              value={this.state.password}
            />
             <HelperText type="error" visible={this.state.passwordError === true }>
             {this.state.passwordError === true ? 'Enter the Password' : false}
            </HelperText>
          </View>
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity
              onPress={() => {
                this.setState({password: null, mobileNumber: null});
                this.props.navigation.navigate('Forgot Password');
                this.props.onForgotPasswordClicked(true);
              }}>
              <Text
                style={{
                  color: '#3e708f',
                  fontFamily: 'GothamLight',
                  fontSize: 14,
                  fontWeight: '100',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  paddingLeft: 10,
                  paddingRight: 10,
                }}>
                Forgot your Password?
              </Text>
            </TouchableOpacity>
          </View>

          <NextButton click={() => this._handleLogin()} color="#7ea100" label="Login"/>
          <View style={styles.signUpContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontFamily: 'GothamMedium',fontSize:16}}>
                Not a member yet?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({password: null, mobileNumber: null});
                  this.props.navigation.navigate('Sign Up');
                  this.props.onForgotPasswordClicked(null);
                }}>
                <Text
                  style={{
                    color: '#043f4f',
                    fontFamily: 'GothamMedium',
                    fontSize: 16,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  Signup
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onForgotPasswordClicked: value =>
      dispatch({type: actionTypes.FORGOT_PASSWORD, payload: value}),
    onBottomTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_ICON, payload: value}),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(Login);
