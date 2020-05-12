import React, {Component} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import {Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
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

  _handleLogin = async () => {   
    if (this.state.mobileNumber !== null && this.state.password !== null) {
      let data;
      this.setState({spinner: true});
      data = JSON.stringify({
        user_id: this.state.mobileNumber,
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
            this.setState({spinner: false, mobileNumber: null, password: null});
          } else if (
            res.data.status === 'success' &&
            res.data.user_type === 'Seller'
          ) {
            AsyncStorage.setItem('isLoggedIn', res.data.access_token);
            AsyncStorage.setItem('userType', res.data.user_type);
            this.props.onBottomTabClicked('home');
            this.props.onSellerSignIn();
            this.setState({spinner: false, mobileNumber: null, password: null});
          } else {
            this.setState({spinner: false});
            alert('Invalid Credentials!');
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      if (this.state.mobileNumber === null ) {
        this.setState({mobileNumberError: true});
      } else {
        this.setState({mobileNumberError: false});
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
        paddingTop:10,
        justifyContent:'center',        
        height:this.state.height
      },
      spinnerTextStyle: {
        color: '#00aa00',
      },

      logoContainer: {},
      logoImageStyle: {
        width: 340,
        height: 210,
        resizeMode: 'stretch',
      },
      signInFormContainer: {
        width: '100%',
        
      },
      inputStyle: {
        fontFamily: 'Gotham Black Regular',
      },

      signUpContainer: {
        paddingTop: 10,
        width: '100%',
      },
      forgotPasswordContainer: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
      },
    });

    return (
      <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}} style={{ backgroundColor: '#efebea'}}
      scrollEnabled={false}>
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          <Logo />
          <View style={styles.signInFormContainer}>
            <Text
              style={{
                fontFamily: 'Gotham Black Regular',
                color: '#004561',
                fontSize: 24,
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              Login
            </Text>
            <Input
              placeholder="Mobile Number"
              style={{fontFamily: 'Gotham Black Regular'}}
              keyboardType="numeric"
              onChangeText={mobileNumber =>
                {
                  const input = mobileNumber.replace(/\D/g, '').substring(0, 10);
                  const first = input.substring(0, 3);
                  const middle = input.substring(3, 6);
                  const last = input.substring(6, 10);  
                  if (input.length > 6) {
                    this.setState({
                      mobileNumber: `${first}-${middle}-${last}`,
                      mobileNumberError: false,                     
                    });
                  } else if (input.length > 3) {
                    this.setState({
                      mobileNumber: `${first}-${middle}`,
                      mobileNumberError: false,                     
                    });
                  } else if (input.length >= 0) {
                    this.setState({
                      mobileNumber: input,
                      mobileNumberError: false,                     
                    });
                  }
                }                
                }            
              onBlur={this.state.mobileNumber === '' ? this.setState({mobileNumber:null}):null}
              errorMessage={
                this.state.mobileNumberError === true
                  ? 'Enter the Mobile Number'
                  : false
              }
              value={this.state.mobileNumber}
            />
            <Input            
              secureTextEntry={true}
              placeholder="Password"
              style={{fontFamily: 'Gotham Black Regular'}}
              onChangeText={password => this.setState({password,passwordError:false})}
              onBlur={this.state.password === '' ? this.setState({password:null}):null}
              errorMessage={
                this.state.passwordError === true ? 'Enter the Password' : false
              }
              value={this.state.password}
            />
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
                  textAlign: 'right',
                  textAlignVertical: 'center',
                  paddingLeft: 10,
                  paddingRight: 10,
                }}>
                Forgot your Password?
              </Text>
            </TouchableOpacity>
          </View>

          <NextButton click={() => this._handleLogin()} />
          <View style={styles.signUpContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontFamily: 'GothamLight'}}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({password: null, mobileNumber: null});
                  this.props.navigation.navigate('Sign Up');
                  this.props.onForgotPasswordClicked(null);
                }}>
                <Text
                  style={{
                    color: '#004561',
                    fontFamily: 'GothamBold',
                    fontSize: 14,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  Register
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
