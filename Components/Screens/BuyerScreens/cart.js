import React, {Component} from 'react';
import {
  AsyncStorage,
  BackHandler,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavigation from '../../BottomNavigation/bottomNavigation';
import ProductAction from '../../utils/productAction';
import {Button} from 'react-native-paper';
import {YellowBox} from 'react-native';
import ConfirmButton from '../../utils/confirmButton';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../../../assets/api/api';
import Toast from 'react-native-simple-toast';
import {add} from 'react-native-reanimated';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      spinner: false,
      active10Button: false,
      active20Button: false,
      active50Button: true,
      buyerCartData: [],
      cartCount: null,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      buyerCartData: this.props.buyerCartData,
      cartCount: this.props.cartCount,
    });

    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentDidUpdate(prevProps, prevState) {   
    if (this.state.cartCount !== this.props.cartCount) {
      this.setState({
        buyerCartData: this.props.buyerCartData,
        cartCount: this.props.cartCount,
      });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    // this.props.onBottomTabClicked('home');
    this.props.navigation.goBack(null);
    return true;
  }

  deleteItem = async args => {
    const data = JSON.stringify({
      Id: args,
    });

    const access_token = await AsyncStorage.getItem('isLoggedIn');

    await axios
      .post(api.buyerDeleteProductFromCart, data, {
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
          Toast.show('Removed from cart.');
        }
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  };

  activateUnitsButton = param1 => {
    if (param1 === 'active10Button') {
      if (this.state.active10Button) {
        this.setState({active10Button: false});
      } else {
        this.setState({active10Button: true});
      }
    }
  };

  productDetails = (args, args1) => {
    this.props.onDisplayVarietyName(args1);
    this.props.navigation.navigate('Product Description', {productId: args});
  };

  placeOrder = async(args, args1)=>{
    const data = JSON.stringify({
      cart_id:args,
      shipping_address_Id:args1,
      invoice_address_Id:args1
    });
    this.setState({spinner:true})
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    await axios
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
          this.props.navigation.navigate('Home')
          Toast.show('Orderd placed sucessfully!');
        }
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  }

  render() {
   
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
      },
      itemListContainer: {},
      itemContainer: {
        marginBottom: 10,
        flexDirection: 'column',
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
      itemDetailContainer: {
        paddingLeft: 10,
        paddingRight: 10,
      },
      itemTextVariety: {
        fontFamily: 'Gotham Black Regular',
        fontSize: 14,
        paddingTop: 5,
      },
      itemTextOrigin: {
        fontSize: 12,
        justifyContent: 'space-around',
        fontFamily: 'GothamMedium',
        color: '#5C5C5C',
      },
      itemTextFarm: {
        fontSize: 12,
        justifyContent: 'space-around',
        fontFamily: 'GothamMedium',
        color: '#95A5A6',
        paddingBottom: 10,
      },
      quantityContainer: {
        flexDirection: 'row',
      },
      unitsContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
      },
      thumbnailImageContainer: {
        justifyContent: 'center',
      },
      placeOrderButtonText: {
        fontFamily: 'GothamLight',
        color: 'black',
        textAlign: 'center',
        fontSize: 14,
      },
      priceText: {
        fontFamily: 'Gotham Black Regular',
        color: '#004561',
        fontSize: 25,
      },
      orderPlacementContainer: {
        flex: 1.0,
        flexDirection: 'column',
        paddingTop: 10,
      },
      orderPlacementContainerHeaderText: {
        fontSize: 20,
        fontFamily: 'Gotham Black Regular',
      },
      orderPlacementContainerText: {
        paddingBottom: 10,
        fontFamily: 'GothamLight',
        lineHeight: 20,
      },
      orderPlacementContainerTextName: {
        paddingTop: 10,
        fontFamily: 'GothamMedium',
        lineHeight: 20,
        fontSize: 16,
      },
      orderPlaceButton: {
        backgroundColor: '#004561',
        borderTopWidth: 2,
        borderColor: '#95A5A6',
      },
      AddToCartButton: {
        marginBottom: 5,
        marginTop: 5,

        width: '50%',
        paddingTop: 5,
        paddingBottom: 5,
      },
      unitsText: {
        fontFamily: 'GothamBook',
        fontSize: 14,
        marginRight: 10,
        marginLeft: 10,
      },
      buyButton: {
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: '#00aa00',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginRight: 10,
      },
      cartText: {
        fontFamily: 'Gotham Black Regular',
        fontSize: 20,
        textAlignVertical: 'center',
        textAlign: 'center',
      },
      buyText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        padding: 10,
        fontFamily: 'GothamMedium',
      },
      totalAmount: {
        justifyContent: 'center',
        width: '50%',
      },
      totalAmountText: {
        textAlign: 'center',
        fontFamily: 'Gotham Black Regular',
        fontSize: 25,
        textAlignVertical: 'center',
        textAlign: 'center',
      },
      loginButton: {
        borderWidth: 1,
        borderColor: '#3e708f',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#004561',
      },
      buttonTextStyle: {
        color: 'white',
        fontFamily: 'GothamMedium',
        fontSize: 14,
        paddingLeft: 10,
        paddingRight: 10,
      },
      spinnerTextStyle: {
        color: '#00aa00',
      },
      noData: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: this.state.height - 150,
      },
      noDataText: {
        fontSize: 20,
        fontFamily: 'GothamBold',
      },
      viewall: {
        color: '#3e708f',
        borderRadius: 10,
        fontSize: 12,
        fontFamily: 'GothamMedium',
        // paddingTop: 10,
        // paddingBottom: 10,
        // paddingLeft: 10,
        // paddingRight: 10,
        textAlign: 'center',
      },
      spinnerTextStyle: {
        color: '#00aa00',
      },
    });

    let amount,
      tax,
      shipping,
      totalAmount,
      door,
      street,
      mobile,
      city,
      state,
      zip,
      addressName,
      addressFormating,
      addressId,
      cartId;

    amount = this.state.buyerCartData.cart_amount;
    tax = this.state.buyerCartData.tax;
    shipping = this.state.buyerCartData.shipping_charge;
    totalAmount = this.state.buyerCartData.total_amount;
    cartId = this.state.buyerCartData.cart_id;

    let button;
    if (this.state.buyerCartData.buyer_address) {
      button = (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => this.props.navigation.navigate('My Address')}>
          <Text style={styles.buttonTextStyle}>Change Address</Text>
        </TouchableOpacity>
      );
    } else {
      button = (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => this.props.navigation.navigate('My Address')}>
          <Text style={styles.buttonTextStyle}>Add Address</Text>
        </TouchableOpacity>
      );
    }

    Object.values(this.state.buyerCartData).map(i => {
      if (i) {
        addressFormating = true;
        addressName = i.name;
        door = i.door_number;
        street = i.address;
        city = i.city;
        state = i.state_name;
        zip = i.zip;
        mobile = i.contact_no;
        addressId = i.address_Id;
      } else {
        addressFormating = false;
      }
    });

  

    return (
      <View style={{flex: 1.0}}>
        <Spinner
              visible={this.state.spinner}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
        {this.state.cartCount >= 1 ? (
          <View style={{flex: 1.0}}>
            <ScrollView ref={scrollView => (this.scrollView = scrollView)}>
              <View style={styles.container}>
                <View style={styles.itemListContainer}>
                  <FlatList
                    data={ this.state.buyerCartData.cart_list}
                    numColumns={1}
                    // keyExtractor = {(items)=>{items.key}}

                    renderItem={({item}) => {
                      let ratingIcon = (
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.ratingStyle}>
                            {'  '}
                            {item.ratings}{' '}
                            <Icon
                              name="star"
                              size={12}
                              style={{
                                justifyContent: 'center',
                                textAlignVertical: 'center',
                              }}
                            />
                            {'  '}
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'GothamLight',
                              fontSize: 10,
                              textAlignVertical: 'center',
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}>
                            100:ratings
                          </Text>
                        </View>
                      );
                      return (
                        <TouchableNativeFeedback
                          onPress={() =>
                            this.productDetails(
                              item.product_Id,
                              item.verityname,
                            )
                          }
                          pointerEvents={'box-none'}>
                          <View style={styles.itemContainer}>
                            <View style={{flexDirection: 'column'}}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <View style={styles.itemDetailContainer}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      paddingTop: 10,
                                    }}>
                                    <Text style={styles.itemTextVariety}>
                                      {item.verityname}
                                    </Text>
                                  </View>
                                  <Text style={styles.itemTextOrigin}>
                                    {item.originsname}
                                  </Text>
                                  <Text style={styles.itemTextFarm}>
                                    {item.farm}
                                  </Text>
                                  <View style={styles.quantityContainer}>
                                    <Text
                                      style={{
                                        fontFamily: 'GothamLight',
                                        fontSize: 15,
                                        textAlignVertical: 'center',
                                        paddingRight: 10,
                                      }}>
                                      Quantity:{' '}
                                    </Text>                                   
                                    <NumericInput
                                      value={item.cart_quantity}
                                      // onChange={value =>
                                      //   this.setState({value: value})
                                      // }
                                      totalWidth={80}
                                      totalHeight={30}
                                      minValue={1}
                                      maxValue={item.available_quantity}
                                      onLimitReached={(isMax, msg) => {
                                        Toast.show(
                                              'Quantity is not available.');
                                      }}
                                    />
                                  </View>
                                  <View style={styles.unitsContainer}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'flex-start',
                                      }}>
                                      <Text
                                        style={{
                                          fontFamily: 'GothamLight',
                                          fontSize: 15,
                                          textAlignVertical: 'center',
                                        }}>
                                        Units:
                                      </Text>
                                      <Text style={styles.unitsText}>
                                        {item.unit_name}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                                <View style={styles.thumbnailImageContainer}>
                                  <Image
                                    source={{
                                      uri: item.thumbnail_image_url,
                                    }}
                                    style={{
                                      width: 130,
                                      resizeMode: 'cover',
                                      aspectRatio: 1 / 1,
                                      borderTopRightRadius: 5,
                                      borderBottomRightRadius: 5,
                                    }}
                                  />
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  borderColor: '#95A5A6',
                                  borderTopWidth: 0.25,
                                  justifyContent: 'space-between',
                                }}>
                                <View style={styles.AddToCartButton}>
                                  <Text style={styles.cartText}>
                                    $ {item.price}
                                  </Text>
                                </View>

                                <TouchableOpacity
                                  style={{
                                    width: '50%',
                                    borderLeftWidth: 0.25,
                                    color: '#95A5A6',
                                    justifyContent: 'center',
                                  }}
                                  onPress={() => this.deleteItem(item.cart_item_id)}>
                                  <Text style={styles.placeOrderButtonText}>
                                    Remove
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </TouchableNativeFeedback>
                      );
                    }}
                  />
                </View>
                <View style={styles.orderPlacementContainer}>
                  <View style={{flexDirection: 'column'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{width: '50%'}}>
                        <Text style={styles.orderPlacementContainerHeaderText}>
                          Address
                        </Text>
                        <Text style={styles.orderPlacementContainerTextName}>
                          {addressName}
                        </Text>
                        <Text style={styles.orderPlacementContainerText}>
                          {door}
                          {addressFormating ? ',' : null}
                          {street}
                          {addressFormating ? ',' : null}
                          {city}
                          {addressFormating ? ',\n' : null}
                          {state}
                          {addressFormating ? '-' : null}
                          {zip}
                          {addressFormating ? '\n' : null}
                          {mobile}
                        </Text>

                        {/* <Text style={styles.orderPlacementContainerText}> */}
                        {/* {addressFormating === true ? door + ',' + street + ',' + city + ',\n' + state + '-' + zip + '\n' + mobile : null} */}

                        {/* </Text> */}
                      </View>
                      <View>{button}</View>
                    </View>
                    <View style={{}}>
                      <Text style={styles.orderPlacementContainerHeaderText}>
                        Price Details
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{width: '50%'}}>
                          <Text style={styles.orderPlacementContainerText}>
                            Total
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            Tax
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            Shipping
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            Total Amt
                          </Text>
                        </View>
                        <View style={{width: '50%'}}>
                          <Text style={styles.orderPlacementContainerText}>
                            $ {amount}
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            $ {tax}
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            $ {shipping}
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            $ {totalAmount}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                borderColor: '#95A5A6',
                borderTopWidth: 0.25,
                justifyContent: 'space-between',
                backgroundColor: 'white',
              }}>
              <View style={styles.totalAmount}>
                <Text style={styles.totalAmountText}>$ {totalAmount}</Text>
                <Text
                  style={styles.viewall}
                  onPress={() => {
                    this.scrollView.scrollToEnd();
                  }}>
                  View price details
                </Text>
              </View>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => this.placeOrder(cartId,addressId)}
                underlayColor="#fff">
                <Text style={styles.buyText}>Place order</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>No Data</Text>
          </View>
        )}
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onDisplayVarietyName: value =>
      dispatch({type: actionTypes.DISPLAY_VARIETY_NAME, payload: value}),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Cart);
