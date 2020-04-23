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

  componentWillMount() {
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
    this.setState({passwordError:false,mobileNumberError:false})
    if (this.state.mobileNumber !== null && this.state.password !== null) {
      this.setState({spinner:true})
      let data = JSON.stringify({
        user_id: this.state.mobileNumber,
        password: this.state.password,
      });
      await axios
        .post('http://mathtech.co.in/microffee_api/Buyer/signIn', data, {
          headers: {
            accept: 'application/json',
            'accept-language': 'en_US',
            'content-type': 'application/x-www-form-urlencoded',
          },
        })
        .then(res => {
          if (res.data.status === 'success') {
            AsyncStorage.setItem('isLoggedIn', res.data.access_token);
            this.setState({spinner:false,mobileNumber: null, password: null});
            this.props.onBottomTabClicked('home');
            this.props.onSignIn();
          }
        })
        .catch(err => {
          this.setState({spinner:false})
          alert('Invalid Credentials!');
        });
    } else {
      if (this.state.mobileNumber === null) {
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
        backgroundColor: '#efebea',
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        height: this.state.height,
      },
      spinnerTextStyle: {
        color: '#00aa00'
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
      <KeyboardAwareScrollView enableOnAndroid={true}>
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
              onChangeText={mobileNumber => this.setState({mobileNumber})}
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
              onChangeText={password => this.setState({password})}
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
    onSellerUserSelected: value =>
      dispatch({type: actionTypes.SELLER_USER_SELECTED, payload: value}),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(Login);
