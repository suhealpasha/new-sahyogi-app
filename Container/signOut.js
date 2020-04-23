import React, {Component} from 'react';
import {BackHandler,StyleSheet,Text,View,TextInput,Button,TouchableHighlight,Image,Alert,Dimensions,AsyncStorage} from 'react-native';
import {Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import NextButton from '../Components/utils/nextButton';
import { NavigationActions } from 'react-navigation';
import BackButton from '../Components/utils/backButton';
import Logo from '../Components/utils/logo';
import * as actionTypes from '../Store/action'
import { connect} from 'react-redux';

const userInfo = {mobileNumber:'8888888888',password:'smith123'}
const adminInfo = {mobileNumber:'9999999999',password:'root123'}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      mobileNumber: null,
      password: null,
      mobileNumberError: false,
      passwordError: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount(){
    console.log(this.props)
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() { 
  this.props.onBottomTabClicked('home');
  this.props.navigation.navigate('Home');
  return true;
}
  _handleLogin = async () => {
    if (this.state.mobileNumber !== null && this.state.password !== null) {
      if(userInfo.mobileNumber === this.state.mobileNumber && userInfo.password === this.state.password){
       await AsyncStorage.setItem('isLoggedIn','1')
       this.setState({mobileNumber:null,password:null})
       this.props.onBottomTabClicked('home')
        this.props.navigation.push('Home')
      }
      else  if(adminInfo.mobileNumber === this.state.mobileNumber && adminInfo.password === this.state.password){
        await AsyncStorage.setItem('isLoggedIn','2')        
        this.props.onBottomTabClicked('home')        
        this.props.navigation.navigate('Seller Home')
        this.props.onSellerUserSelected(true)
       }
      else{
        alert('Invalid Credentials!')
      }
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
        paddingTop:10,
        paddingBottom:10,
        justifyContent:'center',
        height:this.state.height
      },

      logoContainer: {
   
      },
      logoImageStyle: {
        width: 340,
        height: 210,
        resizeMode: 'stretch',
      },
      signInFormContainer: {
        width: '100%',        
      },
      inputStyle: {
        fontFamily:"Gotham Black Regular"
      },

      signUpContainer: {
        paddingTop: 10,
        width: '100%',
      },
      forgotPasswordContainer: {
        paddingTop: 10,
        paddingLeft:10,
        paddingRight:10,
        width: '100%',
      },
      
    });

    return (
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={styles.container}>
        <Logo />

          <View style={styles.signInFormContainer}>
            <Text
              style={{
                fontFamily: 'Gotham Black Regular',
                color: '#004561',
                fontSize: 24,
                paddingLeft:10,
                paddingRight:10
              }}>
              Login
            </Text>
            <Input
              placeholder="Mobile Number"            
              style={{fontFamily:"Gotham Black Regular"}}
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
              style={{fontFamily:"Gotham Black Regular"}}
              onChangeText={password => this.setState({password})}
              errorMessage={
                this.state.passwordError === true ? 'Enter the Password' : false
              }
              value={this.state.password}
            />
          </View>
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity onPress={() => {
          this.props.navigation.navigate('Forgot Password')
          this.props.onForgotPasswordClicked(true);
          }}>
              <Text
                style={{
                  color: '#3e708f',
                  fontFamily: 'GothamLight',
                  fontSize: 14,
                  fontWeight:'100',
                  textAlign: 'right',
                  textAlignVertical: 'center',
                  paddingLeft:10,
                  paddingRight:10
                }}>
                Forgot your Password?
              </Text>
            </TouchableOpacity>
          </View>

          <NextButton click={() => this._handleLogin()} />
          <View style={styles.signUpContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Sign Up');
              }}>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Text style ={{fontFamily:'GothamLight'}}
                >
                  Don't have an account?
                  {' '}
              </Text>
                  <Text style={{
                  color: '#004561',
                  fontFamily: 'GothamBold',
                  fontSize: 14,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}>
                  Register
                  </Text>
                
                </View>
             
            </TouchableOpacity>
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
export default connect(null,mapDispatchToProps)(Login);
