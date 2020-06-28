import React, {Component} from 'react';
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
  AsyncStorage,
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductDescription from '../../utils/productDescription';
import ProductAction from '../../utils/productAction';
import {SliderBox} from 'react-native-image-slider-box';
import StepIndicator from 'react-native-step-indicator';
import ConfirmButton from '../../utils/confirmButton';
import axios from 'axios';
import * as api from '../../../assets/api/api';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

class ProductDescriptionTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      orderDetailsData: [],
      thumbnailImages: [require('../../../assets/Images/coffeeFarms/img4.png')],
    };
  }

  componentDidMount() {
    this.fetchOrder();
  }

  fetchOrder = async () => {
    this.setState({spinner: true});
    let data = JSON.stringify({
      Id: this.props.route.params.itemId,
      order_Id: this.props.orderNumber,
    });
    console.log(data)
    this.setState({spinner: true});
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    axios
      .post(api.buyerOrderDetailsAPI, data, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        console.log(res.data);
        this.setState({spinner: false, orderDetailsData: res.data.data});
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  };

  cancelOrder = async () => {
    this.setState({spinner: true});
    let data = JSON.stringify({
      orderStatus: 'cancelled',
      order_Id: this.props.orderNumber,
    });
    this.setState({spinner: true});
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    axios
      .post(api.orderStatusUpdateAPI, data, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        console.log(res.data);
        this.setState({spinner: false});
        this.props.onFetchBuyerOrders();
        this.props.navigation.navigate('My Orders');
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  };

  fetchProductDetails = (args, args1) => {
    this.props.onDisplayVarietyName(args1);
    this.props.navigation.navigate('Product Description', {productId: args});
  };

  render() {
    const styles = StyleSheet.create({
      parentContaier: {
        backgroundColor: '#efebea',
        paddingBottom: 10,
      },
      container: {
        width: this.state.width,
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 10,
      },
      originHeaderContainer: {
        width: this.state.width,
        paddingBottom: 10,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
      },
      headerText: {
        color: 'rgb(0,70,99)',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
      },
      productImageContainer: {
        justifyContent: 'center',
        width: '100%',
        height: 190,
      },
      buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      },
      AddToCartButton: {
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderColor: '#95A5A6',
        width: '50%',
        paddingTop: 5,
        paddingBottom: 5,
      },
      buyButton: {
        backgroundColor: '#004561',
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderColor: '#95A5A6',
        width: '50%',
        paddingTop: 5,
        paddingBottom: 5,
      },
      cartText: {
        color: '#004561',
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        fontFamily: 'Gotham Black Regular',
      },
      buyText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        fontFamily: 'Gotham Black Regular',
      },
      productDescriptionContainer: {
        paddingTop: 10,
      },
      productDetailsContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingBottom: 10,
      },
      productDetailHeader: {
        flexDirection: 'column',
        width: 100,
      },
      productDetailHeaderText: {
        fontFamily: 'GothamBold',
        padding: 2,
        fontSize: 15,
      },
      productDetail: {
        flexDirection: 'column',
      },
      productDetailText: {
        fontSize: 15,
        fontFamily: 'GothamMedium',
        padding: 2,
      },
      priceText: {
        fontFamily: 'Gotham Black Regular',
        color: '#004561',
        fontSize: 25,
      },
      viewall: {
        color: '#3e708f',
        borderRadius: 10,
        fontSize: 12,
        fontFamily: 'GothamBold',
        paddingTop: 10,
        paddingBottom: 10,
      },
      orderPlacementContainer: {
        flex: 1.0,
        flexDirection: 'column',
        paddingTop: 10,
      },
      orderPlacementContainerHeaderText: {
        fontSize: 20,
        fontFamily: 'Gotham Black Regular',
        paddingBottom: 10,
      },
      orderPlacementContainerText: {
        paddingBottom: 10,
        paddingTop: 10,
        fontFamily: 'GothamBook',
        lineHeight: 5,
      },
      orderPlacementContainerTextFinal: {
        paddingBottom: 10,
        paddingTop: 10,
        fontFamily: 'GothamBook',
        fontWeight: 'bold',
        borderBottomWidth: 0.25,
        borderTopWidth: 0.25,
        borderColor: '#95A5A6',
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
      itemContainerName: {
        fontSize: 20,
        fontFamily: 'GothamBook',
      },
      itemContainerAddress: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: 'GothamLight',
        paddingTop: 10,
      },
      itemContainerMobile: {
        paddingTop: 10,
        lineHeight: 20,
        fontFamily: 'GothamLight',
      },
      spinnerTextStyle: {
        color: '#00aa00',
      },
      rejected: {
        fontFamily: 'GothamMedium',
        paddingTop: 10,
        fontSize: 12,
        color: 'red',
      },
      delivered: {
        fontFamily: 'GothamMedium',
        paddingTop: 10,
        fontSize: 12,
        color: 'green',
      },
    });

    let imageList = [],
      unitPrice,
      proId,
      lotName,
      quantity,
      unitName,
      totalPrice,
      tax,
      shipping,
      totalAmount,
      buyerAddress,
      door,
      street,
      mobile,
      city,
      state,
      zip,
      addressName,
      addressFormating,
      addressId,
      cartId,
      orderStatus,
      currentPosition;
    if (this.state.orderDetailsData) {
      if (this.state.orderDetailsData.images) {
        this.state.orderDetailsData.images.length >= 1
          ? this.state.orderDetailsData.images.map(i => {
              imageList.push(i.url_image);
            })
          : null;
      }
      unitPrice = this.state.orderDetailsData.unit_price;
      totalPrice = this.state.orderDetailsData.total_price;
      proId = this.state.orderDetailsData.product_Id;
      tax = this.state.orderDetailsData.tax;
      lotName = this.state.orderDetailsData.lot_name;
      unitName = this.state.orderDetailsData.unit_name;
      quantity = this.state.orderDetailsData.quantity;
      shipping = this.state.orderDetailsData.shipping_charge;
      totalAmount = this.state.orderDetailsData.total_amount;
      orderStatus = this.state.orderDetailsData.order_status;
      if (orderStatus === 'placed' || orderStatus === 'rejected') {
        currentPosition = 0;
      } else if (orderStatus === 'shipped') {
        currentPosition = 1;
      } else {
        currentPosition = 2;
      }

      buyerAddress = Object.values(this.state.orderDetailsData).map(i => {
        if (this.state.orderDetailsData.buyer_address) {
          if (i.address) {
            return (
              i.door_number +
              ',' +
              i.address +
              ',' +
              i.city +
              ',' +
              i.state_name +
              '-' +
              i.zip +
              '\n' +
              i.contact_no
            );
          }
        }
      });
      addressName = Object.values(this.state.orderDetailsData).map(i => {
        if (this.state.orderDetailsData.buyer_address) {
          if (i.address) {
            return i.name;
          }
        }
      });
    }

    const labels = ['Ordered', 'Shipped', 'Delivered'];
    const customStyles = {
      stepIndicatorSize: 30,
      currentStepIndicatorSize: 30,
      separatorStrokeWidth: 2,
      currentStepStrokeWidth: 3,
      stepStrokeCurrentColor: '#00aa00',
      stepStrokeWidth: 3,
      separatorStrokeFinishedWidth: 4,
      stepStrokeFinishedColor: '#00aa00',
      stepStrokeUnFinishedColor: '#95A5A6',
      separatorFinishedColor: '#00aa00',
      separatorUnFinishedColor: '#95A5A6',
      stepIndicatorFinishedColor: '#00aa00',
      stepIndicatorUnFinishedColor: '#95A5A6',
      stepIndicatorCurrentColor: '#00aa00',
      stepIndicatorLabelFontSize: 13,
      currentStepIndicatorLabelFontSize: 13,
      stepIndicatorLabelCurrentColor: 'white',
      stepIndicatorLabelFinishedColor: 'white',
      stepIndicatorLabelUnFinishedColor: 'white',
      labelColor: '#95A5A6',
      labelSize: 13,
      currentStepLabelColor: '#00aa00',
      labelFontFamily: 'GothamLight',
    };

    return (
      <View style={styles.parentContaier}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <ScrollView>
          <View style={styles.productImageContainer}>
            <SliderBox
              images={
                this.state.orderDetailsData.images &&
                this.state.orderDetailsData.images.length >= 1
                  ? imageList
                  : this.state.thumbnailImages
              }
              sliderBoxHeight={190}
              onCurrentImagePressed={index =>
                console.warn(`image ${index} pressed`)
              }
              dotColor="#3e708f"
              inactiveDotColor="#95A5A6"
              autoplay
              circleLoop
              parentWidth={this.state.width}
              ImageComponentStyle={{}}
            />
          </View>

          <View style={styles.container}>
            <View style={styles.productDescriptionContainer}>
              <View style={{flex: 1.0}}>
                <View>
                  <View style={styles.productDetailsContainer}>
                    <View style={styles.productDetailHeader}>
                      <Text style={styles.productDetailHeaderText}>
                        Variety
                      </Text>
                      <Text style={styles.productDetailHeaderText}>Origin</Text>
                      <Text style={styles.productDetailHeaderText}>Farm</Text>
                    </View>
                    <View style={styles.productDetail}>
                      <Text style={styles.productDetailText}>
                        : {this.state.orderDetailsData.verityname}
                      </Text>
                      <Text style={styles.productDetailText}>
                        : {this.state.orderDetailsData.originsname}
                      </Text>
                      <Text style={styles.productDetailText}>
                        : {this.state.orderDetailsData.farm}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderBottomWidth: 0.25,
                      paddingBottom: 10,
                      borderColor: '#95A5A6',
                    }}>
                    <View>
                      <Text style={styles.priceText}>
                        ${this.state.orderDetailsData.total_price}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.fetchProductDetails(
                            proId,
                            this.state.orderDetailsData.verityname,
                          )
                        }>
                        <Text style={styles.viewall}>View Detail</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {orderStatus === 'placed' ||
                orderStatus === 'shipped' ||
                orderStatus === 'deliverd' ? (
                  <View
                    style={{
                      paddingBottom: 10,
                      paddingTop: 10,
                      borderBottomWidth: 0.25,
                      borderColor: '#95A5A6',
                    }}>
                    <StepIndicator
                      customStyles={customStyles}
                      currentPosition={currentPosition}
                      labels={labels}
                      stepCount={3}
                    />
                    {orderStatus === 'placed' ? (
                      <ConfirmButton
                        buttonName="Cancel"
                        cancelOrder={this.cancelOrder}
                      />
                    ) : null}
                  </View>
                ) : orderStatus === 'rejected' ? (
                  <Text style={styles.rejected}>Rejected !</Text>
                ) : orderStatus === 'cancelled' ? (
                  <Text style={styles.rejected}>Cancelled !</Text>
                ) : null}

                <View style={styles.orderPlacementContainer}>
                  <View style={{flexDirection: 'column'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomWidth: 0.25,
                        borderColor: '#95A5A6',
                      }}>
                      <View style={{width: '50%', paddingBottom: 10}}>
                        <Text style={styles.orderPlacementContainerHeaderText}>
                          Shipping Details
                        </Text>
                        <Text style={styles.itemContainerName}>
                          {addressName}
                        </Text>
                        <Text style={styles.itemContainerAddress}>
                          {buyerAddress}
                        </Text>
                      </View>
                    </View>
                    <View style={{paddingTop: 10}}>
                      <Text style={styles.orderPlacementContainerHeaderText}>
                        Price Details
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{width: '50%'}}>
                          <Text style={styles.orderPlacementContainerText}>
                            Unit Price
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            Lot
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            Quantity
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            Unit
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            Sub Total
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            Tax
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            Shipping
                          </Text>
                          <Text style={styles.orderPlacementContainerTextFinal}>
                            Total Amt
                          </Text>
                        </View>
                        <View style={{width: '50%'}}>
                          <Text style={styles.orderPlacementContainerText}>
                            {unitPrice}
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            {lotName}
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            {quantity}
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            {unitName}
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            {totalPrice}
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            {tax}
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            {shipping}
                          </Text>
                          <Text style={styles.orderPlacementContainerTextFinal}>
                            {totalAmount}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    orderNumber: state.reducer.orderNumber,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDisplayVarietyName: value =>
      dispatch({type: actionTypes.DISPLAY_VARIETY_NAME, payload: value}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDescriptionTemplate);
