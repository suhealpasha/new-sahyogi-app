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
import {HelperText, TextInput,Checkbox } from 'react-native-paper';
import {Input} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BackButton from '../Components/utils/backButton';
import CloseButton from '../Components/utils/closeButton';
import Logo from '../Components/utils/logo';
import ConfirmButton from '../Components/utils/confirmButton';
import Dialog from 'react-native-dialog';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as actionTypes from '../Store/action';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../assets/api/api';
import {CheckBox} from 'react-native-elements';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';
import {ceil} from 'react-native-reanimated';


class SetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      spinner: false,
      password: null,
      confirmPassword: null,
      passwordError: false,
      passwordValidationError: false,
      confirmPasswordError: false,
      passwordMatchError: false,
      dailogBoxOpen: false,
      webView: false,
      checked: false,
      checkedError: false,
      registeredMessage:null
    };
  }

  handleRegister = async () => {
  
    if(this.props.forgotPassword !== null){
      this.setState({checked :true,checkedError:false})
    }
         if (
      this.state.password !== null &&
      this.state.confirmPassword !== null &&
      this.state.checked &&
      this.state.passwordValidationError === false  &&
      this.state.checkedError === false
    ) {
      if (this.state.password === this.state.confirmPassword ) {
        this.setState({spinner: true});
        if (this.props.forgotPassword === null ) {
          let data, userType, signUp;
          if (this.props.userType === 'seller') {
            signUp = api.sellerSignupAPI;
            userType = 'Seller';
            data = JSON.stringify({
              first_name: this.props.name,
              last_name: this.props.lastName,
              type: this.props.sellerUserType,
              company: this.props.company,
              EIN: this.props.ein,
              reference: '',
              gender: '',
              email: this.props.email,
              mobile_no: this.props.mobile,
              alternative_phone: this.props.alternatePhone,
              document: '',
              password: this.state.password,
              user_type: userType,
              street: this.props.sellerStreet,
              city: this.props.sellerCity,
              state_Id: this.props.sellerState,
              zip_code: this.props.sellerZipcode,
            });
          } else {
            userType = 'Buyer';
            signUp = api.buyerSignupAPI;
            data = JSON.stringify({
              first_name: this.props.name,
              last_name:this.props.lastName,
              gender: '',
              email: this.props.email,
              mobile_no: this.props.mobile,
              password: this.state.password,
              user_type: userType,
            });
            console.log(data)
          }
          
          await axios
            .post(signUp, data, {
              headers: {
                accept: 'application/json',
                'accept-language': 'en_US',
                'content-type': 'application/x-www-form-urlencoded',
              },
            })
            .then(res => {
              this.setState({spinner: false, dailogBoxOpen: true,registeredMessage:res.data.message});
            })
            .catch(err => {
              this.setState({spinner: false});
              console.log(err);
            });
        } else {
          let data = JSON.stringify({
            email_id: this.props.email,
            password: this.state.password,
          });
          let resetPasswordAPI;
          await axios
            .post(api.resetPasswordAPI, data, {
              headers: {
                accept: 'application/json',
                'accept-language': 'en_US',
                'content-type': 'application/x-www-form-urlencoded',
              },
            })
            .then(res => {
              this.setState({spinner: false});
              this.props.onUserTypeClicked(null);
              Toast.show('Password Reset.');
              this.props.navigation.navigate('Sign In');
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        this.setState({spinner: false, passwordMatchError: true});
      }
    } else {
      if (this.state.password === null) {
        this.setState({passwordError: true});
      } else {
        this.setState({passwordError: false});
      }
      if (this.state.confirmPassword === null) {
        this.setState({confirmPasswordError: true});
      } else {
        this.setState({confirmPasswordError: false});
      }
      if (this.state.checked === false && this.props.forgotPassword === null) {
        this.setState({checkedError: true});
      } else {
        this.setState({checkedError: false});
      }
    }
  };

  handleOk = () => {
    this.setState({dailogBoxOpen: false});
    this.props.onUserTypeClicked(null);
    this.props.navigation.navigate('Sign In');
  };

  passwordValidate = () => {
    if (this.state.password === '') {
      this.setState({password: null});
    } else {
      const passwordReg = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)\w.{6,18}\w/;
      if (passwordReg.test(this.state.password) === false) {
        this.setState({passwordValidationError: true});
      } else {
        this.setState({passwordError: false, passwordValidationError: false});
      }
    }
  };

  close = () => {
    this.setState({webView: false});
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent:'center',
        display:'flex',       
        height:this.state.height - 48
      },
      registerFormContainer: {
        width: '100%',
        paddingTop:10,
        paddingBottom:10
      },
      users: {},
      inputFieldsStyle: {
        backgroundColor: '#ffff',
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#bad5ff',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        height: 55,
      },
      suggestionContainer: {
        paddingTop: 10,
        width: '100%',
      },
      spinnerTextStyle: {
        color: '#7ea100',
      },
      viewall: {
        color: '#3e708f',
        borderRadius: 10,
        fontSize: 16,
        fontFamily: 'GothamLight',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
      },
      webView: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10,
        paddingRight: 10,
        flex: 1.0,
        justifyContent: 'center',
        alignItems: 'center',
      },
      webViewChild: {
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        height: this.state.height - 100,
        width: this.state.width - 30,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        
      },
      tc: {
        textAlign: 'center',
        fontFamily: 'GothamMedium',
        fontSize:18
      },
      tcDetail: {
        padding: 10,
        justifyContent: 'center',
        fontFamily: 'GothamLight',
        textAlign: 'justify',
        fontSize:16
      },
    });

    const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

  
    return (
      <View style={{flex: 1.0}}>       
        
          <KeyboardAwareScrollView
          style={{backgroundColor:'#ffff'}} 
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
                  secureTextEntry={true}
                  type="text"
                  label="Enter Your Password"
                  mode="flat"
                  style={styles.inputFieldsStyle}
                  underlineColor="transparent"
                  theme={{
                    colors: {text: 'black', primary: 'grey'},
                    fonts: {medium: 'Open Sans'},
                  }}
                  spellCheck={false}
                  autoCorrect={false}
                  onChangeText={password =>
                    this.setState({
                      password,
                      passwordError: false,
                      passwordValidationError: false,
                    })
                  }
                  onBlur={this.passwordValidate}
                />
                <HelperText
                  type="error"
                  visible={
                    this.state.passwordError === true ||
                    this.state.passwordValidationError
                  }>
                  {this.state.passwordError === true
                    ? 'Enter the Password'
                    : this.state.passwordValidationError
                    ? 'Should contain min 8 digits,atleast 1 no, 1 uppercase letter & a special charater.'
                    : null}
                </HelperText>
                <TextInput
                  secureTextEntry={true}
                  label="Confirm Your Password"
                  mode="flat"
                  style={styles.inputFieldsStyle}
                  underlineColor="transparent"
                  theme={{
                    colors: {text: 'black', primary: 'grey'},
                    fonts: {medium: 'Open Sans'},
                  }}
                  spellCheck={false}
                  autoCorrect={false}
                  onChangeText={confirmPassword =>
                    this.setState({
                      confirmPassword,
                      confirmPasswordError: false,
                      passwordMatchError: false,
                    })
                  }
                  onBlur={
                    this.state.confirmPassword === ''
                      ? this.setState({confirmPassword: null})
                      : null
                  }
                />
                <HelperText
                  type="error"
                  visible={
                    this.state.confirmPasswordError === true ||
                    this.state.passwordMatchError
                  }>
                  {this.state.confirmPasswordError === true
                    ? 'Confirm the password'
                    : this.state.passwordMatchError
                    ? 'Password Mismatch'
                    : false}
                </HelperText>
              </View>
              <ConfirmButton
                buttonName={
                  this.props.forgotPassword === null
                    ? 'Complete Registration'
                    : 'Reset Password'
                }
                name="register"
                click={this.handleRegister}
              />
            { this.props.forgotPassword === null ? 
            <>
              <CheckBox
                title={'I have read and accepted'}
                fontFamily={'GothamMedium'}                
                size={25}
                containerStyle={{
                  paddingLeft: 0,
                  marginLeft: 0,
                  marginTop: 0,
                  marginBottom: 0,  
                  backgroundColor:'#ffff',
                  borderWidth:0              
                }}
                checkedColor={'#7ea100'}
                checked={this.state.checked}
                onPress={() =>
                  this.setState({
                    checked: !this.state.checked,
                    checkedError: false,
                  })
                }
              />
              <TouchableNativeFeedback
                onPress={() => {
                  this.props.navigation.navigate('Web View')
                }}>
                <Text style={styles.viewall}>Terms & Conditions!</Text>
              </TouchableNativeFeedback>
              </>
              :
              null
              }
              {this.state.checkedError ? (
                <Text
                  style={{
                    color: '#a10723',
                    fontSize: 12,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}>
                  Accept terms & conditions!
                </Text>
              ) : null}
              <Dialog.Container
                contentStyle={{
                  alignItems: 'center',
                  paddingBottom: 10,
                  paddingRight: 0,
                  paddingLeft: 0,
                }}
                visible={this.state.dailogBoxOpen}>
                <Dialog.Title style={{textAlign: 'center'}}>
                  <Icon name="done" size={25} color='#7ea100'/>
                </Dialog.Title>
                <Dialog.Title
                  style={{textAlign: 'center', fontFamily: 'GothamMedium',fontSize:18}}>
                  Thank you
                </Dialog.Title>
                {this.props.userType === 'seller' ? (
                  <Dialog.Description
                    style={{textAlign: 'center', fontFamily: 'GothamLight'}}>
                    Your account is registered and it will be activated after
                    your verification is done by our Executive.
                  </Dialog.Description>
                ) : (
                  <Dialog.Description
                    style={{textAlign: 'center', fontFamily: 'GothamLight'}}>
                    {this.state.registeredMessage}
                  </Dialog.Description>
                )}

                <Dialog.Button
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    color: '#ffff',
                    fontFamily: 'GothamMedium',
                    paddingLeft: 0,
                    paddingRight: 0,
                    backgroundColor:'#024262',
                    textAlign: 'center',
                    justifyContent: 'center',
                    width:100,
                    fontSize:16
                  }}
                  label="Ok"
                  onPress={this.handleOk}
                />
              </Dialog.Container>
            </View>
          </KeyboardAwareScrollView>
       
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    forgotPassword: state.reducer.forgotPassword,
    name: state.reducer.name,
    lastName:state.reducer.lastName,
    mobile: state.reducer.mobile,
    email: state.reducer.email,
    userType: state.reducer.userType,
    sellerUserType: state.reducer.sellerUserType,
    company: state.reducer.company,
    ein: state.reducer.ein,
    alternatePhone: state.reducer.alternatePhone,
    sellerStreet: state.reducer.sellerStreet,
    sellerCity: state.reducer.sellerCity,
    sellerState: state.reducer.sellerState,
    sellerZipcode: state.reducer.sellerZipcode,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUserTypeClicked: value =>
      dispatch({type: actionTypes.USER_TYPE, payload: value}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetPassword);
