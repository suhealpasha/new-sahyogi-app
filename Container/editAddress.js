import React, {Component} from 'react';
import axios from 'axios';
import {
  AsyncStorage,
  BackHandler,
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as actionTypes from '../Store/action';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../assets/api/api';

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      spinner: false,
      userName: null,
      userNameError: false,
      userNameValidationError:false,
      doorNumber: null,
      doorNumberError: false,
      phoneNumber: null,
      phoneNumberError: false,
      phoneNumberValidationError:false,
      street: null,
      streetError: false,
      state: null,
      city:null,
      cityError:false,
      stateError: false,
      zipCode: null,
      zipCodeError: false,      
      addressData: [],      
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    this.fetchEditAddress();    
  }

  fetchEditAddress = async() =>{ 
   const data = JSON.stringify({
     address_Id:this.props.route.params.addressId
   })
   this.setState({spinner:true})
     const access_token = await AsyncStorage.getItem('isLoggedIn');            
      axios
     .post(api.buyerAddressByIdAPI,data,{
       headers: {
         accept: 'application/json',
         access_token: access_token,
         'accept-language': 'en_US',
         'content-type': 'application/x-www-form-urlencoded',
       },
     })
     .then(res => {       
       this.setState({spinner:false,addressData:res.data.data})    
     })
     .catch(err => {
      this.setState({spinner:false})
       console.log(err);
     });
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
    this.props.navigation.goBack();
    return true;
  }

  mobileValidate = () =>{
    if (this.state.phoneNumber === '') {
      this.setState({phoneNumber: null});
      return;
    } else {
      if (String(this.state.phoneNumber).length !== 12) {
        this.setState({phoneNumberValidationError: true});
        return;
      }
  }
}

  async UNSAFE_componentWillReceiveProps() {     
      let name, street, door_number, city, state, zip, contact_no;
      if (this.state.userName === null && this.state.userNameValidationError === false) {
        name = this.state.addressData.name;
      } else {
        name = this.state.userName;
      }
      if (this.state.doorNumber === null) {
        door_number = this.state.addressData.door_number;
      } else {
        door_number = this.state.doorNumber;
      }
      if (this.state.street === null) {
        street = this.state.addressData.address;
        
      } else {
        street = this.state.street;
      }
      if (this.state.city === null) {
        city = this.state.addressData.city;       
      } else {
        city = this.state.city;
      }
      if (this.state.state === null) {
        state = this.state.addressData.state;
      } else {
        state = this.state.state;
      }
      if (this.state.zipCode === null) {
        zip = this.state.addressData.zip;
      } else {
        zip = this.state.zipCode;
      }
      if (this.state.phoneNumber === null && this.state.phoneNumberValidationError === false) {
        contact_no = this.state.addressData.contact_no;
      } else {
        contact_no = this.state.phoneNumber;
      }

      const data = JSON.stringify({
        address_Id:this.state.addressData.address_Id,
        name: name,
        street: street,
        door_number: door_number,
        city: city,
        state: state,
        zip: zip,
        contact_no: contact_no,
      });
      this.setState({spinner:true})

      const access_token = await AsyncStorage.getItem('isLoggedIn')
        await axios.post(api.buyerAddressUpdateAPI,data,
        {headers:{
          "access_token" : access_token,
          'accept': 'application/json',
        'accept-language': 'en_US',
        'content-type': 'application/x-www-form-urlencoded'}} )
        .then(res =>{
        if(res.status) {
          this.setState({spinner:false})
          Toast.show('Address Updated')
          this.props.onFetchAddress()
          this.props.navigation.navigate('My Address')

        }

        })
        .catch(err =>{
          this.setState({spinner:false})
          console.log(err)})
    
  }
  render() {
    const styles = StyleSheet.create({
      container: {
        paddingLeft: 10,
        paddingRight: 10, 
        flexDirection: 'column',
        justifyContent: 'flex-start',
        
      },
      registerFormContainer: {
        width: '100%',
      },
      spinnerTextStyle: {
        color: '#00aa00'
      }, 
    });
    return (
      <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={false} style={{backgroundColor: '#efebea'}}>
        <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}         
        />
          <View style={styles.registerFormContainer}>
            <Input
              placeholder={this.state.addressData.name}
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
              placeholder={this.state.addressData.door_number}
              style={styles.inputStyle}
              onChangeText={doorNumber =>
                this.setState({doorNumber, doorNumberError: false})
              }
              // errorMessage={
              //   this.state.doorNumberError === true
              //     ? 'Enter the User Name'
              //     : false
              // }
            />
            <Input
              placeholder={this.state.addressData.address}
              style={styles.inputStyle}
              onChangeText={street => this.setState({street})}
              // errorMessage={
              //   this.state.userNameError === true
              //     ? 'Enter the User Name'
              //     : false
              // }
            />
            <Input
              placeholder={this.state.addressData.city}
              style={styles.inputStyle}
              onChangeText={city => this.setState({city})}
              // errorMessage={
              //   this.state.userNameError === true
              //     ? 'Enter the User Name'
              //     : false
              // }
            />
            <Input
              placeholder={this.state.addressData.state}
              style={styles.inputStyle}
              onChangeText={state => this.setState({state})}
              // errorMessage={
              //   this.state.userNameError === true
              //     ? 'Enter the User Name'
              //     : false
              // }
            />
            <Input
              placeholder={this.state.addressData.zip}
              style={styles.inputStyle}
              keyboardType="numeric"
              onChangeText={zipCode => this.setState({zipCode})}
              // errorMessage={
              //   this.state.userNameError === true
              //     ? 'Enter the User Name'
              //     : false
              // }
            />
            <Input
              placeholder={this.state.addressData.contact_no}
              style={styles.inputStyle}
              maxLength={10}
              onChangeText={phoneNumber => {
                const input = phoneNumber.replace(/\D/g, '').substring(0, 10);
                const first = input.substring(0, 3);
                const middle = input.substring(3, 6);
                const last = input.substring(6, 10);

                if (input.length > 6) {
                  this.setState({
                    phoneNumber: `${first}-${middle}-${last}`,
                    phoneNumberError: false,
                    phoneNumberValidationError: false,
                  });
                } else if (input.length > 3) {
                  this.setState({
                    phoneNumber: `${first}-${middle}`,
                    phoneNumberError: false,
                    phoneNumberValidationError: false,
                  });
                } else if (input.length >= 0) {
                  this.setState({
                    phoneNumber: input,
                    phoneNumberError: false,
                    phoneNumberValidationError: false,
                  });
                }
              }}
              onBlur={         
               this.mobileValidate
            }
              keyboardType="numeric"
              errorMessage={
                this.state.phoneNumberError === true
                  ? 'Enter the mobile number'
                  : this.state.phoneNumberValidationError
                  ? 'Invalid mobile number'
                  : null
              }
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    addressData: state.reducer.addressData,
  };
};
export default connect(
  null,
  null,
)(AddAddress);
