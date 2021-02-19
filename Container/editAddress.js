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
      address: null,
      addressError: false,
      phoneNumber: null,
      phoneNumberError: false,
      phoneNumberValidationError: false,     
      city: null,
      cityError: false,
      stateId:null,
      stateError: false,
      zipCode: null,
      zipCodeError: false,
      zipCodeValidationError: false,
      addressData: [],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    this.fetchEditAddress();
    this.setState({ countriesData: this.props.countriesData })
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  fetchEditAddress = async () => {
    const data = JSON.stringify({
      address_Id: this.props.route.params.addressId,
    });
    this.setState({spinner: true});
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    const userType = await AsyncStorage.getItem('userType');
    let editAddressAPI;
    if (userType === 'Buyer') {
      editAddressAPI = api.buyerAddressByIdAPI;
    } else {
      editAddressAPI = api.sellerAddressByIdAPI;
    }
    axios
      .post(api.buyerAddressByIdAPI, data, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        console.log(res.data.data)
        this.setState({spinner: false, addressData: res.data.data});
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  };
 
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
      this.setState({phoneNumber: null});
      return;
    } else {
      if (String(this.state.phoneNumber).length !== 12) {
        this.setState({phoneNumberValidationError: true});
        return;
      }
    }
  };

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

  onContrySelect = async (args,args1) => {
    let country;
    this.state.countriesData.filter(i => {
      if (i.country_name === args1) {
        country = i.country_Id;
      }
    });
    this.setState({
      defaultContryColor: 'black',
      countryId: country,
      countryError: false,
      statesData: [],
    });
    const data = JSON.stringify({
      country_Id: country,
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

  async UNSAFE_componentWillReceiveProps(prevProps,prevState) {
    if(prevProps.saveEditIconAddress  !== this.props.saveEditIconAddress){
    let name,address, city, state, zip, contact_no;
    if (
      this.state.userName === null &&
      this.state.userNameValidationError === false
    ) {
      name = this.state.addressData.name;
    } else {
      name = this.state.userName;
    }
    if (this.state.address === null) {
      address = this.state.addressData.address;
    } else {
      address = this.state.address;
    }
   
    if (this.state.city === null) {
      city = this.state.addressData.city;
    } else {
      city = this.state.city;
    }    
    if (this.state.stateId === null) {
      state = this.state.addressData.state_Id;
    } else {
      state = this.state.stateId;
    }
    if (this.state.zipCode === null) {
      zip = this.state.addressData.zip;
    } else {
      zip = this.state.zipCode;
    }
    if (
      this.state.phoneNumber === null &&
      this.state.phoneNumberValidationError === false
    ) {
      contact_no = this.state.addressData.contact_no;
    } else {
      contact_no = this.state.phoneNumber;
    }

    const data = JSON.stringify({
      address_Id: this.state.addressData.address_Id,
      name: name,    
      address: address,
      city: city,
      state_Id: state,
      zip: zip,
      contact_no: contact_no,
      is_default:this.state.addressData.is_default
    });
    this.setState({spinner: true});
    const userType = await AsyncStorage.getItem('userType');
    let addressUpdateAPI;
    if (userType === 'Buyer') {
      addressUpdateAPI = api.buyerAddressUpdateAPI;
    } else {
      addressUpdateAPI = api.sellerAddressUpdateAPI;
    }
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    await axios
      .post(addressUpdateAPI, data, {
        headers: {
          access_token: access_token,
          accept: 'application/json',
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        if (res.status) {
          this.setState({spinner: false});
          Toast.show('Address Updated');
          this.props.onFetchAddress();
          this.props.navigation.navigate('My Address');
          this.props.onfetchBuyerCart();
        }
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
    }
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
        color: '#7ea100',
      },
      loginButton: {
        alignItems: 'center',
        // width: '100%',
        width:150,
        padding: 10,
        backgroundColor: '#7ea100',
        borderRadius: 50,
      },
      buttonText: {
        color: '#fff',
        fontFamily: 'GothamMedium',
        fontSize: 14,
      },
    });

    let countriesList = [],stateList=[];    
    countriesList = this.state.countriesData.map(i => { return (i.country_name) })
    stateList = this.state.statesData.map(i => { return (i.state_name) })

    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        scrollEnabled={true}
        style={{backgroundColor: '#efebea'}}>
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.registerFormContainer}>
            <Input
              placeholder={this.state.addressData.name}
              maxLength={20}
              spellCheck={false}
              autoCorrect={false}
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
             spellCheck={false}
             autoCorrect={false}             
              placeholder={this.state.addressData.address}
              style={styles.inputStyle}
              onChangeText={address =>
                this.setState({address, addressError: false})
              }
              // errorMessage={
              //   this.state.doorNumberError === true
              //     ? 'Enter the User Name'
              //     : false
              // }
            />
           
            <Input
             spellCheck={false}
             autoCorrect={false}
             maxLength={20}
              placeholder={this.state.addressData.city}
              style={styles.inputStyle}
              onChangeText={city => this.setState({city})}
              // errorMessage={
              //   this.state.userNameError === true
              //     ? 'Enter the User Name'
              //     : false
              // }
            />
             <ModalDropdown
              options={countriesList}
              defaultValue={this.state.addressData.country_name}
              textStyle={{ color: this.state.defaultContryColor, fontSize: 18, fontWeight: '100', paddingLeft: 5, }}
              style={{ borderBottomColor: '#8c939a', borderBottomWidth: 1, marginLeft: 10, marginRight: 10, paddingBottom: 10, paddingTop: 10 }}
              dropdownStyle={{ width: this.state.width - 40}}
              dropdownTextStyle={{fontSize:18}}
              onSelect={(i, j) => {
                this.onContrySelect(i, j);
              }}           
            />
            <ModalDropdown
              options={stateList}
              defaultValue={this.state.addressData.state_name}
              disabled={stateList.length >=1 ? false:true}
              textStyle={{ color: this.state.defaultStateColor, fontSize: 18, fontWeight: '100', paddingLeft: 5, }}
              style={{ borderBottomColor: '#8c939a', borderBottomWidth: 1, marginLeft: 10, marginRight: 10, paddingBottom: 10, paddingTop: 10 }}
              dropdownStyle={{ width: this.state.width - 40 }}
              dropdownTextStyle={{fontSize:18}}
              onSelect={i => { this.onStateSelect(i) }}
            />
            <Input
              placeholder={this.state.addressData.zip}
              style={styles.inputStyle}
              maxLength={5}
              keyboardType="numeric"
              onChangeText={zipCode => this.setState({zipCode,zipCodeValidationError:false,zipCodeError:false})}
              onBlur={
                this.zipCodeValidate
              }
              errorMessage={
                this.state.zipCodeError === true
                  ? 'Enter the Zip Code'
                  : this.state.zipCodeValidationError
                  ? 'Enter the valid Zip Code'
                  : false
              }
            />
            <Input
              placeholder={this.state.addressData.contact_no}
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
              onBlur={this.mobileValidate}
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
          <View style={{alignContent:'center',alignItems:'center',padding:20}}> 
          <TouchableOpacity style={styles.loginButton}  onPress={() =>this.props.saveAddress()}>
                     <Text style={styles.buttonText}>Save Address</Text>
                       </TouchableOpacity>
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
