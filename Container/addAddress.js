import React, { Component } from 'react';
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
  Picker
} from 'react-native';
import { Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NextButton from '../Components/utils/nextButton';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../assets/api/api';
import ModalDropdown from 'react-native-modal-dropdown';

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      spinner: false,
      defaultContryColor: '#969291',
      defaultStateColor: '#969291',     
      countriesData: [],
      statesData:[],      
      countryId:null,
      countryError:false,      
      userName: null,
      userNameError: false,
      userNameValidationError: false,
      doorNumber: null,
      doorNumberError: false,
      phoneNumber: null,
      phoneNumberError: false,
      phoneNumberValidationError: false,
      street: null,
      streeError: false,
      city: null,
      cityError: false,
      stateId:null,
      stateError: false,
      zipCode: null,
      zipCodeError: false,
      zipCodeValidationError: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {    
    this.setState({ countriesData: this.props.countriesData})
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

  mobileValidate = () => {
    if (this.state.phoneNumber === '') {
      this.setState({ phoneNumber: null });
      return;
    } else {
      if (String(this.state.phoneNumber).length !== 12) {
        this.setState({ phoneNumberValidationError: true });
        return;
      }
    }
  }

  zipCodeValidate = () => {
    if (this.state.zipCode === '') {
      this.setState({ zipCode: null });
      return;
    } else {
      if (String(this.state.zipCode).length !== 5) {
        this.setState({ zipCodeValidationError: true });
        return;
      }
    }
  }

  async UNSAFE_componentWillReceiveProps(prevProps,prevState) {
    if(prevProps.saveIconAddress  !== this.props.saveIconAddress){
    if (
      this.state.doorNumber !== null &&
      this.state.userName !== null &&
      this.state.phoneNumber !== null &&
      this.state.street !== null &&
      this.state.countryId !== null &&
      this.state.stateId !== null &&
      this.state.city !== null &&
      this.state.zipCode !== null &&
      this.state.userNameValidationError === false &&
      this.state.phoneNumberValidationError === false &&
      this.state.zipCodeValidationError === false
    ) {
      const data = JSON.stringify({
        name: this.state.userName,
        street: this.state.street,
        door_number: this.state.doorNumber,
        city: this.state.city,
        state_Id: this.state.stateId,
        zip: this.state.zipCode,
        contact_no: this.state.phoneNumber,
        is_default:false
      });     
      this.setState({ spinner: true });
      const access_token = await AsyncStorage.getItem('isLoggedIn');
      const userType = await AsyncStorage.getItem('userType');
      let addAddressAPI;
      if (userType === 'Buyer') {
        addAddressAPI = api.buyerAddAddressAPI
      }
      else {
        addAddressAPI = api.sellerAddAddressAPI
      }
      await axios
        .post(addAddressAPI, data, {
          headers: {
            access_token: access_token,
            accept: 'application/json',
            'accept-language': 'en_US',
            'content-type': 'application/x-www-form-urlencoded',
          },
        })
        .then(res => {         
          if (res.status) {
            this.setState({ spinner: false });
            this.props.onFetchAddress();
            this.props.onfetchBuyerCart();
            Toast.show('Address Added');
            this.props.navigation.goBack(null);            
          }
        })
        .catch(err => {
          this.setState({ spinner: false });
          console.log(err);
        });
    } else {
      if (this.state.doorNumber === null) {
        this.setState({ doorNumberError: true });
      } else {
        this.setState({ doorNumberError: false });
      }
      if (this.state.userName === null) {
        this.setState({ userNameError: true });
      } else {
        this.setState({ userNameError: false });
      }
      if (this.state.phoneNumber === null) {
        this.setState({ phoneNumberError: true });
      } else {
        this.setState({ phoneNumberError: false });
      }
      if (this.state.street === null) {
        this.setState({ streetError: true });
      } else {
        this.setState({ streetError: false });
      }
      if (this.state.countryId === null) {
        this.setState({ countryError: true });
      } else {
        this.setState({ countryError: false });
      }
      if (this.state.stateId === null) {
        this.setState({ stateError: true });
      } else {
        this.setState({ stateError: false });
      }
      if (this.state.city === null) {
        this.setState({ cityError: true });
      } else {
        this.setState({ cityError: false });
      }
      if (this.state.zipCode === null) {
        this.setState({ zipCodeError: true });
      } else {
        this.setState({ zipCodeError: false });
      }
    }
  }
  }

  onContrySelect = async (args) => {
    this.setState({ defaultContryColor: 'black' ,countryId:args+1,countryError:false})
    const data = JSON.stringify({
      country_Id: args + 1
    });
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    await axios
      .post(api.statesAPI, data, {
        headers: {
          access_token: access_token,
          accept: 'application/json',
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        console.log(res.data.data)
        if (res.status) {
          this.setState({ statesData: res.data.data })
        }
      })
      .catch(err => {
        console.log(err);
      });

  }

  onStateSelect = async (args) => {
    this.setState({ defaultStateColor: 'black',stateError:false, stateId:args+1})
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
        color: '#00aa00',
      },
    });

    let countriesList = [],stateList=[];    
    countriesList = this.state.countriesData.map(i => { return (i.country_name) })
    stateList = this.state.statesData.map(i => { return (i.state_name) })
 
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        style={{ backgroundColor: '#efebea' }}
        scrollEnabled={true}>
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.registerFormContainer}>
            <Input
              placeholder="Name"
              style={styles.inputStyle}
              maxLength={20}
              spellCheck={false}
              autoCorrect={false}
              onChangeText={userName => {
                if (/[^a-zA-Z\s]/.test(userName)) {
                  this.setState({ userNameValidationError: true });
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
                  ? this.setState({ userName: null })
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
              placeholder="Door Number"
              style={styles.inputStyle}
              maxLength={4}
              onChangeText={doorNumber =>
                this.setState({ doorNumber, doorNumberError: false })
              }
              onBlur={
                this.state.userName === ''
                  ? this.setState({ userName: null })
                  : null
              }
              errorMessage={
                this.state.doorNumberError === true
                  ? 'Enter the Door Number'
                  : false
              }
            />
            <Input
              placeholder="Street"
              maxLength={20}
              style={styles.inputStyle}
              onChangeText={street =>
                this.setState({ street, streetError: false })
              }
              onBlur={
                this.state.street === '' ? this.setState({ street: null }) : null
              }
              errorMessage={
                this.state.streetError === true ? 'Enter the Street' : false
              }
            />
            <Input
              placeholder="City"
              style={styles.inputStyle}
              maxLength={20}
              onChangeText={city => this.setState({ city, cityError: false })}
              onBlur={
                this.state.city === '' ? this.setState({ city: null }) : null
              }
              errorMessage={
                this.state.cityError === true ? 'Enter the City' : false
              }
            />

            <ModalDropdown
              options={countriesList}
              defaultValue="Country"
              textStyle={{ color: this.state.defaultContryColor, fontSize: 18, fontWeight: '100', paddingLeft: 5, }}
              style={{ borderBottomColor: '#8c939a', borderBottomWidth: 1, marginLeft: 10, marginRight: 10, paddingBottom: 10, paddingTop: 10 }}
              dropdownStyle={{ width: this.state.width - 40}}
              dropdownTextStyle={{fontSize:18}}
              onSelect={i => { this.onContrySelect(i) }}            
            />
            {this.state.countryError ?<Text
                style={{
                  color: 'red',
                  fontSize: 12,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}>
                Please Select the Country!
              </Text> :null}

            <ModalDropdown
              options={stateList}
              defaultValue="State"
              disabled={stateList.length >=1 ? false:true}
              textStyle={{ color: this.state.defaultStateColor, fontSize: 18, fontWeight: '100', paddingLeft: 5, }}
              style={{ borderBottomColor: '#8c939a', borderBottomWidth: 1, marginLeft: 10, marginRight: 10, paddingBottom: 10, paddingTop: 10 }}
              dropdownStyle={{ width: this.state.width - 40 }}
              dropdownTextStyle={{fontSize:18}}
              onSelect={i => { this.onStateSelect(i) }}
            />
             {this.state.stateError ?<Text
                style={{
                  color: 'red',
                  fontSize: 12,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}>
                Please Select the State!
              </Text> :null}
           
            <Input
              placeholder="Zip Code"
              maxLength={5}
              style={styles.inputStyle}
              keyboardType="numeric"
              onChangeText={zipCode =>
                this.setState({ zipCode, zipCodeError: false,zipCodeValidationError:false })
              }
              onBlur={
                this.zipCodeValidate
              }
              errorMessage={
                this.state.zipCodeError === true
                ? 'Enter the Zip code'
                : this.state.zipCodeValidationError
                  ? 'Invalid Zip Code'
                  : null
              }
            />
            <Input
              placeholder="Alternate Phone Number"
              style={styles.inputStyle}
              maxLength={12}
              value={this.state.phoneNumber}
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
export default AddAddress;
