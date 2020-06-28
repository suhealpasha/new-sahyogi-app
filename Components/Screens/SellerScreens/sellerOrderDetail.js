import React, {Component} from 'react';
import {
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
  AsyncStorage,
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
import StickyButton from '../../utils/stickyButtons';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import * as api from '../../../assets/api/api';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

class SellerOrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      active10Button: false,
      active20Button: false,
      active50Button: true,
      orderDetailsData: [],
      orderItemDetailsData: [],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount() {
    this.fetchOrder();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  fetchOrder = async () => {
    this.setState({spinner: true});
    let data = JSON.stringify({
      order_Id: this.props.route.params.orderId,
    });
    this.setState({spinner: true});
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    axios
      .post(api.sellerOrderDetailsAPI, data, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        console.log(res.data.data);
        this.setState({
          spinner: false,
          orderDetailsData: res.data.data,
          orderItemDetailsData: res.data.data.order_items,
        });
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

  _deleteCart = e => {
    console.log('Child');
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

  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
      },
      productHeaderText: {
        fontSize: 20,
        fontFamily: 'Gotham Black Regular',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
      },
      itemListContainer: { },
      itemContainer: {
        borderBottomWidth: 0.25,
        borderColor: '#95A5A6',
        flexDirection: 'column',
        backgroundColor: 'white',
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
        fontSize: 14,
        fontFamily: 'GothamLight',
        borderTopWidth: 0.25,
        borderBottomWidth: 0.25,
        borderColor: '#95A5A6',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
      },
      orderPlacementContainerTextBuyerName: {
        paddingTop: 10,
        fontFamily: 'GothamBold',
        lineHeight: 20,
        paddingLeft: 10,
        paddingRight: 10,
      },
      orderPlacementContainerText: {
        paddingBottom: 10,
        paddingTop: 10,
        fontFamily: 'GothamBook',
        lineHeight: 20,
        paddingLeft: 10,
        paddingRight: 10,
      },
      orderPlacementContainerTotalText: {
        paddingBottom: 10,
        paddingTop: 10,
        fontFamily: 'GothamBook',
        fontSize: 20,
        lineHeight: 20,
        paddingLeft: 10,
        paddingRight: 10,
      },
      orderPlacementContainerTotalValueText: {
        paddingBottom: 10,
        paddingTop: 10,
        fontFamily: 'Gotham Black Regular',
        fontSize: 20,
        lineHeight: 20,
        paddingLeft: 10,
        paddingRight: 10,
      },
      statusText: {
        fontFamily: 'GothamMedium',
        paddingLeft: 10,
        paddingRight: 10,
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
        marginLeft: 5,
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
      statusDelivered: {
        fontFamily: 'GothamMedium',
        color: 'green',
        paddingBottom: 5,
        fontSize: 12,
      },
      statusRejected: {
        fontFamily: 'GothamMedium',
        color: 'red',
        paddingBottom: 5,
        fontSize: 12,
      },
      statusOrdered: {
        fontFamily: 'GothamMedium',
        paddingBottom: 5,
        fontSize: 12,
      },
    });

    let orderDetails = [],
      buyerAddress,
      buyerName,
      buyerContact;
    if (this.state.orderDetailsData !== []) {
      if (this.state.orderDetailsData.shipping_address) {
        buyerName = this.state.orderDetailsData.shipping_address.name;
        buyerAddress =
          this.state.orderDetailsData.shipping_address.door_number +
          "," +
          this.state.orderDetailsData.shipping_address.address +
          "," +
          this.state.orderDetailsData.shipping_address.city +
          "," +
          this.state.orderDetailsData.shipping_address.state_name +
          "-" +
          this.state.orderDetailsData.shipping_address.zip;
        buyerContact = this.state.orderDetailsData.shipping_address.contact_no;
      }
    }

    return (
      <View style={{flex: 1.0}}>
        <ScrollView>
          <View style={styles.container}>
            <Spinner
              visible={this.state.spinner || this.props.spinner}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.itemListContainer}>
              <Text style={styles.productHeaderText}>Products</Text>
              <FlatList
                data={this.state.orderItemDetailsData}
                numColumns={1}
                // keyExtractor = {(items)=>{items.key}}

                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => console.log('parent')}
                      pointerEvents={'box-none'}>
                      <View style={styles.itemContainer}>
                        <View style={{flexDirection: 'column'}}>
                          <View
                            style={{
                              flexDirection: 'row',
                            }}>
                            <View style={styles.thumbnailImageContainer}>
                              <Image
                                source={{
                                  uri: item.thumbnail_image_url,
                                }}
                                style={{
                                  width: 150,
                                  resizeMode: 'cover',
                                  height: 130,
                                }}
                              />
                            </View>
                            <View style={styles.itemDetailContainer}>
                              <View style={{flexDirection: 'row'}}>
                                <Text style={styles.itemTextVariety}>
                                  {item.verityname}
                                </Text>
                              </View>
                              <View style={{flexDirection: 'row'}}>
                                <Text style={styles.itemTextOrigin}>
                                  {item.originsname}
                                </Text>
                              </View>

                              <Text style={styles.itemTextFarm}>
                                {item.farm}
                              </Text>
                              <View style={styles.quantityContainer}>
                                <Text
                                  style={{
                                    fontFamily: 'GothamLight',
                                    fontSize: 15,
                                    textAlignVertical: 'center',
                                  }}>
                                  Quantity:
                                </Text>
                                <Text style={styles.unitsText}>
                                  {item.quantity}
                                </Text>
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
                                    Price:
                                  </Text>
                                  <Text style={styles.unitsText}>
                                    ${item.unit_price}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              borderColor: '#95A5A6',
                              borderTopWidth: 0.25,
                            }}>
                            <View style={styles.AddToCartButton}>
                              <Text
                                style={{
                                  fontFamily: 'GothamBook',
                                  textAlign: 'center',
                                  fontSize: 16,
                                }}>
                                Total
                              </Text>
                            </View>

                            <View
                              style={{
                                width: '50%',
                                borderLeftWidth: 0.25,
                                color: '#95A5A6',
                                justifyContent: 'center',
                              }}
                              onPress={() => navigate('HomeScreen')}>
                              <Text style={styles.cartText}>
                                ${item.total_price}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
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
                  <View style={{width: this.state.width}}>
                    <Text style={styles.orderPlacementContainerHeaderText}>
                      Shipping Details
                    </Text>
                    <View style={{width: '50%'}}>
                    <Text style={styles.orderPlacementContainerTextBuyerName}>
                        {buyerName}
                      </Text>
                      <Text style={styles.orderPlacementContainerText}>
                        {buyerAddress}
                      </Text>
                      <Text style={styles.orderPlacementContainerText}>
                        {buyerContact}
                      </Text>
                    </View>
                  </View>
                  <View />
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
                      <Text style={styles.orderPlacementContainerTotalText}>
                        Total Amount
                      </Text>
                    </View>
                    <View style={{width: '50%'}}>
                      <Text style={styles.orderPlacementContainerText}>
                        ${this.state.orderDetailsData.amount}
                      </Text>
                      <Text style={styles.orderPlacementContainerText}>${this.state.orderDetailsData.tax}</Text>
                      <Text style={styles.orderPlacementContainerText}>
                      ${this.state.orderDetailsData.shipping_charge}
                      </Text>
                      <Text
                        style={styles.orderPlacementContainerTotalValueText}>
                        ${this.state.orderDetailsData.total_amount}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingBottom: 10,
                    paddingRight:10,
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={styles.statusText}>Status:</Text>
                <Text style={(() => {
                          switch (this.state.orderDetailsData.order_status) {
                            case 'delivered':
                              return styles.statusDelivered;
                            case 'shipped':
                              return styles.statusDelivered;
                            case 'rejected':
                              return styles.statusRejected;
                            case 'cancelled':
                              return styles.statusRejected;
                            case 'return':
                              return styles.statusRejected;
                            default:
                              return styles.statusOrdered;
                          }
                        })()}> {this.state.orderDetailsData.order_status}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
       {this.state.orderDetailsData.order_status === 'placed' || this.state.orderDetailsData.order_status === 'accepted'  
       ? <StickyButton cancel="Cancel" proceed="Proceed" buyer={false} sellerAction = {this.state.orderDetailsData.order_status === 'placed' ? "accepted" : "shipped"} onfetchOrder = {this.fetchOrder} {...this.props}/> : null} 
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    spinner: state.reducer.spinner,
  };
};

export default connect(
  mapStateToProps,
null
)(SellerOrderDetail);