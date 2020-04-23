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
import {validate} from 'validate.js';
import constraints from './constraints';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      userName: null,
      emailId: null,
      mobileNumber: null,
      mobileNumberError: false,
      userNameError: false,
      emailIdError: false,
      userNameValidationError: false,
      mobileNumberValidationError: false,
      emailValidationError: false,
      otp:null,
      mobileExist:false,
      emailExist:false,
    };
  }

  checkMobileExist = async () =>{
    let data = JSON.stringify({
      mobile_no: this.state.mobileNumber,
    });
    console.log(data)
    await axios
      .post("http://mathtech.co.in/microffee_api/Buyer/checkmobile", data, {
        headers:{'accept': 'application/json',        
        'content-type': 'application/x-www-form-urlencoded'}} )
      .then((res) => {
        console.log(res)
        if (res.data.message === "Mobile exist") {
          this.setState({
            mobileExist: true,
          });
        } else {
          this.setState({
            mobileExist: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  checkEmailExist = async () =>{
    let data = JSON.stringify({
     email: this.state.emailId,
    });
    
    await axios
      .post("http://mathtech.co.in/microffee_api/Buyer/checkemail", data, {
        headers:{'accept': 'application/json',        
        'content-type': 'application/x-www-form-urlencoded'}} )
      .then((res) => {
        console.log(res)
        if (res.data.message === "Email exist") {
          this.setState({
            emailExist: true,
          });
        } else {
          this.setState({
            emailExist: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleRegister = async () => {
    if (
      this.state.mobileNumber !== null &&
      this.state.userName !== null &&
      this.state.emailId !== null && this.state.mobileExist === false && this.state.emailExist === false
    ) {
      if (this.props.userType === null) {
        let data = JSON.stringify({
          mobile_no:this.state.mobileNumber
        })
       
        await axios.post('http://mathtech.co.in/microffee_api/Buyer/otp',data,
        {headers:{'accept': 'application/json',
        'accept-language': 'en_US',
        'content-type': 'application/x-www-form-urlencoded'}} )
        .then(res =>{         
          console.log(res.data)
          if(res.status){           
            this.props.onRegisterDetails(this.state.userName,this.state.mobileNumber,this.state.emailId,String(res.data.data.otp));
            this.props.navigation.navigate('OTP');
          }
        })
        .catch(err =>{console.log(err)})

        
      } else {
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
        backgroundColor: '#efebea',
        paddingTop: 10,
        paddingBottom: 10,
        height: this.state.height + 30,
      },
      registerFormContainer: {
        width: '100%',
      },
      users: {},

      suggestionContainer: {
        paddingTop: 10,
        width: '100%',
      },
    });

    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
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
              Create Your Account
            </Text>
            <Input
              placeholder="Name"
              style={styles.inputStyle}
              onChangeText={userName => this.setState({userName,userNameError:false})}
              errorMessage={
                this.state.userNameError === true
                  ? 'Enter the User Name'
                  : false
              }
            />
            <Input
              placeholder="Mobile Number"
              style={styles.inputStyle}
              keyboardType="numeric"
              onBlur={this.checkMobileExist}
              onChangeText={mobileNumber => this.setState({mobileNumber,mobileNumberError:false})}
              errorMessage={
                this.state.mobileNumberError === true
                  ? 'Enter the Mobile Number'
                  : this.state.mobileExist ? 'Mobile Number Already registered' : null
              }
            />

            <Input
              placeholder="Email"
              style={styles.inputStyle}
              onChangeText={emailId => this.setState({emailId,emailIdError:false})}
              onBlur={this.checkEmailExist}
              errorMessage={
                this.state.emailIdError === true ? 'Enter the emailId' : this.state.emailExist ? 'Email Already registered' : null
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
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRegisterDetails: (value,value2,value3,value4) =>
      dispatch({type: actionTypes.REGISTER_DETAILS, payload: value,payload2: value2,payload3: value3,payload4: value4}),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
