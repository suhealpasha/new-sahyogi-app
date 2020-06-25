import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Dimensions,
  TouchableOpacity,
  AppRegistry,
  navigation,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import * as api from '../../assets/api/api';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import * as actionTypes from '../../Store/action';
import { connect } from 'react-redux';

class StickyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }
  }

  addToCart = async() => {    
    this.props.onSpinner(true) 
    const data = JSON.stringify({     
     product_id:this.props.cartProductData[0],
     unit_id:this.props.cartProductData[1],     
     quantity:this.props.cartProductData[2],     
     unit_price:this.props.cartProductData[3],
     inventory_id:this.props.cartProductData[4]
    });
    console.log(data)
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    await axios
      .post(api.buyerAddProductToCart, data, {
        headers: {
          access_token: access_token,
          accept: 'application/json',
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        if (res.status) {
          this.props.onSpinner(false) 
          this.props.onfetchBuyerCart();
          Toast.show('Added to the cart.')
        }
      })
      .catch(err => {
        this.props.onSpinner(false) 
        console.log(err);
      });
  }

 buyNow = async() =>{
  await this.addToCart();
  this.props.navigation.navigate('Cart')
  }


  render() {

    const styles = StyleSheet.create({
      parentContaier: {

      },
      container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',

      },

      AddToCartButton: {
        borderTopWidth: 2,
        borderColor: '#95A5A6',
        width: '50%',
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#ffffff'
      },
      buyButton: {
        backgroundColor: '#004561',
        borderTopWidth: 2,
        borderColor: '#95A5A6',
        width: '50%',
        paddingTop: 5,
        paddingBottom: 5
      },
      cartText: {
        color: '#004561',
        textAlign: 'center',
        fontSize: 14,
        padding: 10,
        fontFamily: 'GothamMedium',

      },
      buyText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        padding: 10,
        fontFamily: 'GothamMedium',
      },
      spinnerTextStyle: {
        color: '#00aa00',
      },
    })

    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <TouchableOpacity
          disabled={this.props.buy}
          style={styles.AddToCartButton}
          onPress={this.props.buyer ? this.addToCart : null}
          underlayColor='#fff'>
          <Text style={styles.cartText}>{this.props.cancel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={this.props.buy}
          style={styles.buyButton}
          onPress={this.props.buyer ? this.buyNow : null}
          underlayColor='#fff'>
          <Text style={styles.buyText}>{this.props.proceed}</Text>
        </TouchableOpacity>
      </View>);
  }
}

const mapStateToProps = state => {
  return {
    cartProductData: state.reducer.cartProductData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSpinner: value =>
      dispatch({type: actionTypes.SPINNER_SWITCH, payload: value}),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)( StickyButton);