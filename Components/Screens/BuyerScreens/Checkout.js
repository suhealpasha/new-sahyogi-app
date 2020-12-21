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
cardValidError:false
    };

  }

 
 
  payment = async () =>{
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    if (this.state.number !== null && this.state.expMonth !== null &&   this.state.expYear !== null &&  this.state.cvc !== null ) {
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
  console.log(token.id)
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
   console.log(data)
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
              keyboardType = 'numeric'
              onChangeText={number =>
                this.setState({
                  number,
                  numberError:false
                })
              }
              
              autoCapitalize="none"             
              value={this.state.number}
            />

            <HelperText type="error" visible={this.state.numberError === true || this.state.cardValidError }>
             {this.state.numberError === true ? 'Enter the Credit Card Number' : this.state.cardValidError
                  ? 'Invalid Card'
                  : null}
            </HelperText>

            <TextInput
              type="number"
              label="Expiry Month"            
              mode="flat"
              style={styles.inputFieldsStyle}              
              underlineColor="transparent"  
              under
              theme={{colors: {text: 'black', primary: 'grey'} ,  fonts: { medium: 'Open Sans' }}}
              spellCheck={false}
              autoCorrect={false}
              keyboardType = 'numeric'
              onChangeText={expMonth =>
                this.setState({
                  expMonth,
                  expMonthError:false
                })
              }
              
              autoCapitalize="none"             
              value={this.state.expMonth}
            />

          <HelperText type="error" visible={this.state.expMonthError === true  }>
             {this.state.expMonthError === true ? 'Enter the expiry month' : false }
            </HelperText>

            <TextInput
              type="number"
              label="Expiry Year"            
              mode="flat"
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
                  expYearError:false
                })
              }
              
              autoCapitalize="none"             
              value={this.state.expYear}
            />
             <HelperText type="error" visible={this.state.expYearError === true  }>
             {this.state.expYearError === true ? 'Enter expiry year' : false }
            </HelperText>
            <TextInput
              type="number"
              label="CCV"            
              mode="flat"
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
                  cvcError:false
                })
              }
              
              autoCapitalize="none"             
              value={this.state.cvc}
            />

        <HelperText type="error" visible={this.state.cvcError === true  }>
             {this.state.cvcError === true ? 'Enter CVC' : false }
            </HelperText>
        <NextButton click={() => this.payment()} color="#7ea100" label="Make Payment"/>
      </View>
    )
  }
}
