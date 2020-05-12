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
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import * as actionTypes from '../Store/action';
import {connect} from 'react-redux';
import * as api from '../assets/api/api';

class SellerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      company: null,
      ein: null,
      alternatePhone: null,
      address: null,
      companyError: false,
      companyValidationError: false,
      einError: false,
      einValidationError: false,
      alternatePhoneError: false,
      alternatePhoneValidationError: false,
      addressError: false,
    };
  }

  einValidate = () => {
    if (this.state.ein === '') {
      this.setState({ein: null});
      return;
    } else {
      if (String(this.state.ein).length !== 12) {
        this.setState({einValidationError: true});
        return;
      }
    }
  };

  alternatePhoneValidate = () => {
    if (this.state.alternatePhone === '') {
      this.setState({alternatePhone: null});
      return;
    } else {
      if (String(this.state.alternatePhone).length !== 12) {
        this.setState({alternatePhoneValidationError: true});
        return;
      }
    }
  };

  handleRegister = async () => {
    if (
      this.state.company !== null &&
      this.state.ein !== null &&
      this.state.alternatePhone !== null &&
      this.state.address !== null &&
      this.state.companyValidationError === false &&
      this.state.einValidationError === false &&
      this.state.alternatePhoneValidationError === false
    ) {
      let data = JSON.stringify({
        mobile_no: this.props.mobile,
      });
      await axios
        .post(api.otpAPI, data, {
          headers: {
            accept: 'application/json',
            'accept-language': 'en_US',
            'content-type': 'application/x-www-form-urlencoded',
          },
        })
        .then(res => {
          if (res.status) {
            this.props.onRegisterSellerAdditionalDetails(
              this.state.company,
              this.state.ein,
              this.state.alternatePhone,
              this.state.address,
              String(res.data.data.otp),
            );
            this.props.navigation.navigate('OTP');
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      if (this.state.company === null) {
        this.setState({companyError: true});
      } else {
        this.setState({companyError: false});
      }
      if (this.state.ein === null) {
        this.setState({einError: true});
      } else {
        this.setState({einError: false});
      }
      if (this.state.alternatePhone === null) {
        this.setState({alternatePhoneError: true});
      } else {
        this.setState({alternatePhoneError: false});
      }
      if (this.state.address === null) {
        this.setState({addressError: true});
      } else {
        this.setState({addressError: false});
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
      },
      registerFormContainer: {
        width: '100%',
      },
    });

    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        style={{backgroundColor: '#efebea'}}
        scrollEnabled={true}>
        <BackButton {...this.props} />
        <View style={styles.container}>
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
              Contact Details
            </Text>
            <Input
              placeholder="Company"
              style={styles.inputStyle}
              onChangeText={company => {
                if (/[^0-9a-zA-Z\s]/.test(company)) {
                  this.setState({companyValidationError: true});
                } else {
                  this.setState({
                    company,
                    companyError: false,
                    companyValidationError: false,
                  });
                }
              }}
              onBlur={
                this.state.company === ''
                  ? this.setState({company: null})
                  : null
              }
              errorMessage={
                this.state.companyError === true
                  ? 'Enter the Company'
                  : this.state.companyValidationError
                  ? 'Invalid Company name'
                  : null
              }
            />
            <Input
              placeholder="EIN"
              style={styles.inputStyle}
              keyboardType="numeric"
              maxLength={11}
              onChangeText={ein => {
                const input = ein.replace(/\D/g, '').substring(0, 11);
                const first = input.substring(0, 2);
                const last = input.substring(2, 11);

                if (input.length > 3) {
                  this.setState({
                    ein: `${first}-${last}`,
                    einError: false,
                    einValidationError: false,
                  });
                } else if (input.length >= 0) {
                  this.setState({
                    ein: input,
                    einError: false,
                    einValidationError: false,
                  });
                }
              }}
              onBlur={this.einValidate}
              errorMessage={
                this.state.einError === true
                  ? 'Enter the EIN'
                  : this.state.einValidationError
                  ? 'Invalid Ein'
                  : null
              }
            />
            <Input
              placeholder="Alternate Phone"
              keyboardType="numeric"
              maxLength={10}
              style={styles.inputStyle}
              onChangeText={alternatePhone => {
                const input = alternatePhone
                  .replace(/\D/g, '')
                  .substring(0, 10);
                const first = input.substring(0, 3);
                const middle = input.substring(3, 6);
                const last = input.substring(6, 10);

                if (input.length > 6) {
                  this.setState({
                    alternatePhone: `${first}-${middle}-${last}`,
                    alternatePhoneError: false,
                    alternatePhoneValidationError: false,
                  });
                } else if (input.length > 3) {
                  this.setState({
                    alternatePhone: `${first}-${middle}`,
                    alternatePhoneError: false,
                    alternatePhoneValidationError: false,
                  });
                } else if (input.length >= 0) {
                  this.setState({
                    alternatePhone: input,
                    alternatePhoneError: false,
                    alternatePhoneValidationError: false,
                  });
                }
              }}
              onBlur={this.alternatePhoneValidate}
              errorMessage={
                this.state.alternatePhoneError === true
                  ? 'Enter the Alternate Phone number'
                  : this.state.alternatePhoneValidationError
                  ? 'Invalid Phone number'
                  : null
              }
            />
            <Input
              placeholder="Address"
              style={styles.inputStyle}
              onChangeText={address =>
                this.setState({address, addressError: false})
              }
              onBlur={
                this.state.address === ''
                  ? this.setState({address: null})
                  : null
              }
              errorMessage={
                this.state.addressError === true ? 'Enter the Address' : false
              }
            />
          </View>
          <NextButton click={() => this.handleRegister()} />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    mobile: state.reducer.mobile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegisterSellerAdditionalDetails: (
      value,
      value2,
      value3,
      value4,
      value5,
    ) =>
      dispatch({
        type: actionTypes.REGISTER_SELLER_ADDITIONAL_DETAILS,
        payload: value,
        payload2: value2,
        payload3: value3,
        payload4: value4,
        payload5: value5,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SellerDetails);
