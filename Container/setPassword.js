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
import BackButton from '../Components/utils/backButton';
import Logo from '../Components/utils/logo';
import ConfirmButton from '../Components/utils/confirmButton';
import Dialog from 'react-native-dialog';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as actionTypes from '../Store/action';
import {connect} from 'react-redux';
import {stat} from 'react-native-fs';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';

class SetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      spinner: false,
      password: null,
      confirmPassword: null,
      passwordError: false,
      confirmPasswordError: false,
      passwordMatchError: false,
      dailogBoxOpen: false,
    };
  }

  handleRegister = async () => {
    if (this.state.password !== null && this.state.confirmPassword !== null) {
      if (this.state.password === this.state.confirmPassword) {
        this.setState({spinner:true})
        let userType;
        if (this.props.sellerUser) {
          userType = 'Seller';
        } else {
          userType = 'Buyer';
        }

        if (this.props.forgotPassword === null) {
          let data = JSON.stringify({
            name: this.props.name,
            gender: '',
            email: this.props.email,
            mobile_no: this.props.mobile,
            password: this.state.password,
            user_type: userType,
          });

          await axios
            .post('http://mathtech.co.in/microffee_api/Buyer/signup', data, {
              headers: {
                accept: 'application/json',
                'accept-language': 'en_US',
                'content-type': 'application/x-www-form-urlencoded',
              },
            })
            .then(res => {
              this.setState({spinner:false,dailogBoxOpen: true});
            })
            .catch(err => {
              this.setState({spinner:false})
              console.log(err);
            });
        } else {
          let data = JSON.stringify({
            mobile_no: this.props.mobile,
            password: this.state.password,
          });

          await axios
            .post(
              'http://mathtech.co.in/microffee_api/Buyer/resetPassword',
              data,
              {
                headers: {
                  accept: 'application/json',
                  'accept-language': 'en_US',
                  'content-type': 'application/x-www-form-urlencoded',
                },
              },
            )
            .then(res => {
              this.setState({spinner:false})
             Toast.show("Password Reset.") 
             this.props.navigation.navigate('Sign In')
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        this.setState({spinner:false,passwordMatchError: true});
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
    }
  };

  handleOk = () => {
    this.setState({dailogBoxOpen: false});
    this.props.navigation.navigate('Sign In');
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
        height: this.state.height,
      },
      registerFormContainer: {
        width: '100%',
      },
      users: {},
      inputStyle: {},
      suggestionContainer: {
        paddingTop: 10,
        width: '100%',
      },
      spinnerTextStyle: {
        color: '#00aa00'
      },
    });

    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}         
        />
          <BackButton {...this.props} />
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
              Set Your Password
            </Text>
            <Input
              placeholder="Enter Your Password"
              style={styles.inputStyle}
              secureTextEntry={true}
              onChangeText={password =>
                this.setState({password, passwordError: false})
              }
              errorMessage={
                this.state.passwordError === true ? 'Enter the Password' : false
              }
            />
            <Input
              placeholder="Confirm Your password"
              style={styles.inputStyle}
              secureTextEntry={true}
              onChangeText={confirmPassword =>
                this.setState({confirmPassword, confirmPasswordError: false})
              }
              errorMessage={
                this.state.confirmPasswordError === true
                  ? 'Confirm the password'
                  : this.state.passwordMatchError
                  ? 'Password Mismatch'
                  : false
              }
            />
          </View>
          <ConfirmButton
            buttonName={
              this.props.forgotPassword === null
                ? 'Complete Registration'
                : 'Reset Password'
            }
            click={this.handleRegister}
          />
          <Dialog.Container
            contentStyle={{
              alignItems: 'center',
              paddingBottom: 0,
              paddingRight: 0,
              paddingLeft: 0,
            }}
            visible={this.state.dailogBoxOpen}>
            <Dialog.Title style={{textAlign: 'center'}}>
              <Icon name="done" size={25} />
            </Dialog.Title>
            <Dialog.Title
              style={{textAlign: 'center', fontFamily: 'GothamMedium'}}>
              Thank you
            </Dialog.Title>
            <Dialog.Description
              style={{textAlign: 'center', fontFamily: 'GothamLight'}}>
              Your account is registered and it will be activated after your
              verification is done by our Executive.
            </Dialog.Description>
            <Dialog.Button
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                color: '#004561',
                fontFamily: 'GothamBold',
                paddingLeft: 0,
                paddingRight: 0,
                borderColor: 'grey',
                width: 330,
                borderWidth: 1,
                textAlign: 'center',
                justifyContent: 'center',
              }}
              label="Ok"
              onPress={this.handleOk}
            />
          </Dialog.Container>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    forgotPassword: state.reducer.forgotPassword,
    name: state.reducer.name,
    mobile: state.reducer.mobile,
    email: state.reducer.email,
    sellerUser: state.reducer.sellerUser,
  };
};
export default connect(
  mapStateToProps,
  null,
)(SetPassword);
