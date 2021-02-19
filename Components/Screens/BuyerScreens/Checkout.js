import React,{ PureComponent }from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Dimensions,
  AsyncStorage,
  TouchableOpacity

} from 'react-native';

import NextButton from '../../utils/nextButton';
import Stripe from 'react-native-stripe-api';
import {PaymentScreen} from '../../utils/screens/PaymentScreen';
import {HelperText,TextInput} from 'react-native-paper';
import axios from 'axios';
import * as api from '../../../assets/api/api';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';

export default class CardFormScreen extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
  number:null,
  expMonth:null,
  expYear:null,
  cvc:null,
numberError:false,
expMonthError:false,
expYearError:false,
cvcError:false,
spinner:false,
cardValidError:false,
cardNumberValidation:false,
invalidYear:false,
invalidMonth:false,
invalidYearType:false,
invalidCCV:false
    };

  }

 
 
  payment = async () =>{
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    if (this.state.number !== null && this.state.expMonth !== null &&   this.state.expYear !== null &&  this.state.cvc !== null && this.state.invalidMonth === false && this.state.invalidYear === false && this.state.invalidYearType === false && this.state.ccvValidation === false) {
    const apiKey = 'pk_test_rvTVsu63XIgc5QFowZEfoEPk00HGt34Sk7';
    const client = new Stripe(apiKey);
    this.setState({spinner: true});
    const token = await client.createToken({
      number: this.state.number ,
      exp_month: this.state.expMonth, 
      exp_year: this.state.expYear, 
      cvc: this.state.cvc,
  
   });
   
   let data = JSON.stringify({
    stripeToken: token.id,
    amount:this.props.route.params.totalAmount    
  })   
  console.log(">>>>>>Data",data)
  if(token.id !== undefined){
  await axios.post(api.buyerStripeCheckoutAPI,data,
  { headers:{
    Access_token: access_token,
    'accept': 'application/json',
  'accept-language': 'en_US',
  'content-type': 'application/x-www-form-urlencoded'}} )
  .then(res => { 
    console.log(res.data)
    if(res.data.statusCode === 200){
        const data = JSON.stringify({
      cart_id: this.props.route.params.cartId,
      shipping_address_Id: this.props.route.params.addressId,
      invoice_address_Id: this.props.route.params.addressId,
      stripe_id:res.data.stripe_id,
      stripe_transaction_id:res.data.stripe_transaction_id
    });
  
    this.setState({spinner: true});
    
     axios
      .post(api.buyerOrderAPI, data, {
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
          this.props.onfetchBuyerCart();
          this.props.navigation.navigate('Home');
          this.props.onFetchBuyerOrders();
          Toast.show('Orderd placed sucessfully!');
        }
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
    }        
    
  })
  .catch(err =>{console.log(err)})
   }
   else{
    
      this.setState({cardValidError:true,spinner: false})
   
   }

  }
  


   
   else{
     
    if (this.state.number === null) {
      this.setState({numberError: true});
    } else {
      this.setState({numberError: false});
    }
    if (this.state.expMonth === null) {
      this.setState({expMonthError: true});
    } else {
      this.setState({expMonthError: false});
    }
    if (this.state.expYear === null) {
      this.setState({expYearError: true});
    } else {
      this.setState({expYearError: false});
    }
    if (this.state.cvc === null) {
      this.setState({cvcError: true});
    } else {
      this.setState({cvcError: false});
    }
   }
  }

  inRange = (x, min, max) => {
    return ((x-min)*(x-max) <= 0);
}
  
  monthValidation = () =>{
    
    if(Number(this.state.expMonth) > 12)
    {
      this.setState({invalidMonth:true})
    }
    else if (Number(this.state.expMonth) < 1){
      this.setState({invalidMonth:true})
    }
    else{
      this.setState({invalidMonth:false})
    }
  }
  
  yearValidation = () =>{
    if(this.state.expYear && this.state.expYear.length < 4){
      this.setState({invalidYearType:true})
      return
    }  
    console.log(this.state.expYear,Number(new Date().getFullYear()))
    if(this.state.expYear < Number(new Date().getFullYear())){
      this.setState({invalidYear:true})
    }
    else{
      this.setState({invalidYear:false})
    }
  }
  ccvValidation = ()  =>{
   
    if(this.state.cvc.length != 3){
      
      this.setState({ccvValidation:true})
    }
    else{
      this.setState({ccvValidation:false})
    }
  }
  render() {

    const styles = StyleSheet.create({
      
      spinnerTextStyle: {
        color: '#7ea100',
      },

     
    });

    return (
      <View>
        <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
         <TextInput
              type="number"
              label="Credit Card Number"            
              mode="flat"
              style={styles.inputFieldsStyle}              
              underlineColor="transparent"  
              under
              theme={{colors: {text: 'black', primary: 'grey'} ,  fonts: { medium: 'Open Sans' }}}
              spellCheck={false}
              autoCorrect={false}
              maxLength={16}
              keyboardType = 'numeric'
              onChangeText={number =>
                this.setState({
                  number,
                  numberError:false,
                  cardValidError:false
                })
              }
              
              autoCapitalize="none"             
              value={this.state.number}
            />

            <HelperText type="error" visible={this.state.numberError === true || this.state.cardValidError }>
             {this.state.numberError === true ? 'Enter the credit card number' : this.state.cardValidError
                  ? 'Invalid Card'
                  : null}
                   
            </HelperText>

            <TextInput
              type="number"
              label="Expiry Month"            
              mode="flat"
              style={styles.inputFieldsStyle}      
              maxLength={2}        
              underlineColor="transparent"  
              under
              theme={{colors: {text: 'black', primary: 'grey'} ,  fonts: { medium: 'Open Sans' }}}
              spellCheck={false}
              autoCorrect={false}
              keyboardType = 'numeric'
              onChangeText={expMonth =>
                this.setState({
                  expMonth,
                  expMonthError:false,
                  invalidMonth:false
                })
              }
              onBlur={this.monthValidation}
              autoCapitalize="none"             
              value={this.state.expMonth}
            />

          <HelperText type="error" visible={this.state.expMonthError === true || this.state.invalidMonth == true  }>
             {this.state.expMonthError === true 
             ? 'Enter the expiry month'
              : this.state.invalidMonth 
              ? 'Invalid Month' : null }
            </HelperText>

            <TextInput
              type="number"
              label="Expiry Year"            
              mode="flat"
              maxLength={4}
              style={styles.inputFieldsStyle}              
              underlineColor="transparent"  
              under
              theme={{colors: {text: 'black', primary: 'grey'} ,  fonts: { medium: 'Open Sans' }}}
              spellCheck={false}
              autoCorrect={false}
              keyboardType = 'numeric'
              onChangeText={expYear =>
                this.setState({
                  expYear,
                  expYearError:false,
                  invalidYear:false,
                  invalidYearType:false
                })
              }
              onBlur={this.yearValidation}
              autoCapitalize="none"             
              value={this.state.expYear}
            />
             <HelperText type="error" visible={this.state.expYearError === true || this.state.invalidYearType||this.state.invalidYear  }>
             {this.state.expYearError === true ? 'Enter expiry year' : this.state.invalidYearType ? "Invalid year": this.state.invalidYear ? 'Card already expired' : false }
            </HelperText>
            <TextInput
              type="number"
              label="CCV"            
              mode="flat"
              maxLength={3}
              style={styles.inputFieldsStyle}              
              underlineColor="transparent"  
              under
              theme={{colors: {text: 'black', primary: 'grey'} ,  fonts: { medium: 'Open Sans' }}}
              spellCheck={false}
              autoCorrect={false}
              keyboardType = 'numeric'
              onChangeText={cvc =>
                this.setState({
                  cvc,
                  cvcError:false,
                  ccvValidation:false
                })
              }
              onBlur={this.ccvValidation}
              autoCapitalize="none"             
              value={this.state.cvc}
            />

        <HelperText type="error" visible={this.state.cvcError === true || this.state.ccvValidation }>
             {this.state.cvcError === true ? 'Enter CVC' : this.state.ccvValidation ? "Invalid CCV" : false}
            </HelperText>
        <NextButton click={() => this.payment()} color="#7ea100" label="Make Payment"/>
      </View>
    )
  }
}
