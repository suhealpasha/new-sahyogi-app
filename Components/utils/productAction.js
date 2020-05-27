import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Picker,
  Button,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumericInput from 'react-native-numeric-input';
import SwitchButton from 'switch-button-react-native';
import axios from 'axios';
import * as api from '../../assets/api/api';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import * as actionTypes from '../../Store/action';
import {connect} from 'react-redux';

class ProductAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      productData: [],
      favouriteColor: 'grey',
      activeButton: '',
      activeSwitch: 1,
      price: 0,
      value: 1,
      availableQuantity: 0,
      productId: null,
    };
  }

  componentDidMount() {
    this.setState({productData: this.props.productData});
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.onProductAddToCartDetails([
      this.state.productId,
      this.state.activeButton,     
      this.state.value,
      this.state.price
    ]);
  }

  favoutiteClicked = async () => {
    this.setState({spinner: true});
    let data;
    if (this.props.productData.wishlist) {
      data = JSON.stringify({
        flag: false,
        product_Id: this.props.productData.product_Id,
      });
    } else {
      data = JSON.stringify({
        flag: true,
        product_Id: this.props.productData.product_Id,
      });
    }

    const access_token = await AsyncStorage.getItem('isLoggedIn');
    await axios
      .post(api.buyerWishlistAddOrRemoveAPI, data, {
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
          this.props.onFetchProduct();
        }
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  };

  activateUnitsButton = (param1, param2, param3, param4) => {
    this.setState({
      activeButton: param1,
      price: param2,
      availableQuantity: param3,
      productId: param4,
    });
  };

  render() {
    const styles = StyleSheet.create({
      productActionsContainer: {
        alignItems: 'center',
        paddingTop: 10,
        width: this.state.width - 20,
      },
      actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
      },

      priceText: {
        fontFamily: 'Gotham Black Regular',
        color: '#004561',
        fontSize: 25,
      },
      unitsContainer: {
        flexDirection: 'column',
        width: '50%',
        paddingBottom: 10,
        paddingTop: 10,
      },
      unavailableText: {
        color: 'red',
        fontSize: 12,
        paddingTop: 5,
        paddingBottom: 5,
      },

      quantityContainer: {
        flexDirection: 'row',
        width: '50%',
        paddingBottom: 10,
        paddingTop: 10,
      },
      unitsButton: {
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: '#95A5A6',
        paddingLeft: 5,
        paddingRight: 5,
        marginRight: 5,
        marginBottom: 5,
      },
      unitsActiveButton: {
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: '#004561',
        paddingLeft: 5,
        paddingRight: 5,
        marginRight: 5,
        marginBottom: 5,
      },
      unitsButtonText: {
        fontFamily: 'GothamLight',
        fontSize: 12,
        color: 'grey',
      },
      unitsActiveButtonText: {
        fontFamily: 'GothamBold',
        color: '#004561',
        fontSize: 12,
      },
      lotsPageSwitchContainer: {
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        width: '50%',
        alignItems: 'center',
      },
      lotsPageSwitchButton: {
        borderWidth: 1,
        borderColor: '#3e708f',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#004561',
        borderRadius: 100,
      },
      ratingStyle: {
        backgroundColor: '#00ac00',
        color: 'white',
        lineHeight: 20,
        justifyContent: 'center',
        textAlignVertical: 'center',
        fontSize: 14,
        width: 50,
        paddingRight: 5,
        paddingLeft: 5,
      },
      spinnerTextStyle: {
        color: '#00aa00',
      },
    });

    let microUnits, nanoUnits;

    if (this.props.productData.nano) {
      {
        this.props.productData.nano.length >= 1
          ? (nanoUnits = this.props.productData.nano.map(i => {
              return (
                <TouchableOpacity
                  style={
                    this.state.activeButton === i.unit_Id
                      ? styles.unitsActiveButton
                      : styles.unitsButton
                  }
                  onPress={() =>
                    this.activateUnitsButton(
                      i.unit_Id,
                      i.price,
                      i.available_quantity,
                      i.product_Id,
                    )
                  }>
                  <Text
                    style={
                      this.state.activeButton === i.unit_Id
                        ? styles.unitsActiveButtonText
                        : styles.unitsButtonText
                    }>
                    {i.unit_name}
                  </Text>
                </TouchableOpacity>
              );
            }))
          : this.setState({unavailableNanoUnits: true});
      }
    }

    if (this.props.productData.micro) {
      {
        this.props.productData.micro.length >= 1
          ? (microUnits = this.props.productData.micro.map(i => {
              return (
                <TouchableOpacity
                  style={
                    this.state.activeButton === i.unit_Id
                      ? styles.unitsActiveButton
                      : styles.unitsButton
                  }
                  onPress={() =>
                    this.activateUnitsButton(
                      i.unit_Id,
                      i.price,
                      i.available_quantity,
                      i.product_Id,
                    )
                  }>
                  <Text
                    style={
                      this.state.activeButton === i.unit_Id
                        ? styles.unitsActiveButtonText
                        : styles.unitsButtonText
                    }>
                    {i.unit_name}
                  </Text>
                </TouchableOpacity>
              );
            }))
          : this.setState({unavailableMicroUnits: true});
      }
    }

    this.state.activeButton
      ? this.props.onBuyProduct(false)
      : this.props.onBuyProduct(true);

    let noItem = <Text style={styles.unavailableText}>No Item available</Text>;
    return (
      <View style={styles.productActionsContainer}>
        <Spinner
          visible={this.props.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.actionsContainer}>
          <View style={{width: '60%'}}>
            <Text style={styles.priceText}>
              $ {''}
              {this.state.activeButton === ''
                ? 0
                : this.state.value * this.state.price}
            </Text>
          </View>
          <View style={{flexDirection: 'row', width: '40%'}}>
            <View style={styles.ratingStyle}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  justifyContent: 'space-between',
                }}>
                {this.props.productData.rating}{' '}
                <Icon
                  name="star"
                  size={12}
                  style={{
                    justifyContent: 'center',
                    textAlignVertical: 'center',
                  }}
                />
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'GothamLight',
                fontSize: 10,
                textAlignVertical: 'center',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              {this.props.productData.avg_rating}: ratings
            </Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <View style={styles.unitsContainer}>
            <View style={{paddingTop: 10, paddingBottom: 10}}>
              <Text
                style={{
                  fontFamily: 'GothamLight',
                  fontSize: 15,
                  textAlignVertical: 'center',
                }}>
                Units:
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              {this.state.activeSwitch === 1
                ? this.props.productData.nano &&
                  this.props.productData.nano.length >= 1
                  ? nanoUnits
                  : noItem
                : this.props.productData.micro &&
                  this.props.productData.micro.length >= 1
                ? microUnits
                : noItem}
            </View>
          </View>
          <View style={styles.lotsPageSwitchContainer}>
            <View>
              <SwitchButton
                onValueChange={val => {
                  if (val === 1) {
                    if (this.props.productData.nano.length >= 1) {
                      this.setState({
                        availableQuantity: null,
                        activeButton: '',
                        value: 1,
                        activeSwitch: val,
                      });
                    } else {
                      this.setState({activeButton: '', activeSwitch: 1});
                      this.setState({unavailableNanoUnits: true});
                      // Toast.show('No Nano Lots');
                    }
                  } else {
                    if (this.props.productData.micro.length >= 1) {
                      this.setState({
                        availableQuantity: null,
                        activeButton: '',
                        value: 1,
                        activeSwitch: val,
                      });
                    } else {
                      this.setState({activeButton: '', activeSwitch: 2});
                      this.setState({unavailableMicroUnits: true});
                      // Toast.show('No Micro Lots');
                      return;
                    }
                  }
                }}
                // this is necessary for this component
                text1="N" // optional: first text in switch button --- default ON
                text2="M" // optional: second text in switch button --- default OFF
                switchWidth={80} // optional: switch width --- default 44
                switchHeight={30} // optional: switch height --- default 100
                switchdirection="ltl" // optional: switch button direction ( ltr and rtl ) --- default ltr
                switchBorderRadius={0} // optional: switch border radius --- default oval
                switchSpeedChange={100} // optional: button change speed --- default 100
                switchBorderColor="#95A5A6" // optional: switch border color --- default #d4d4d4
                switchBackgroundColor="white" // optional: switch background color --- default #fff
                btnBorderColor="#004561" // optional: button border color --- default #00a4b9
                btnBackgroundColor="#004561" // optional: button background color --- default #00bcd4
                fontColor="#004561" // optional: text font color --- default #b1b1b1
                activeFontColor="#fff" // optional: active font color --- default #fff
              />
            </View>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <View style={styles.quantityContainer}>
            <Text
              style={{
                fontFamily: 'GothamLight',
                fontSize: 15,
                textAlignVertical: 'center',
                paddingRight: 10,
              }}>
              Quantity
            </Text>
            <NumericInput
              value={this.state.value}
              onChange={value => this.setState({value: value})}
              totalWidth={80}
              totalHeight={30}
              minValue={1}
              maxValue={
                this.state.activeButton !== ''
                  ? Number.parseInt(this.state.availableQuantity, 10)
                  : 1
              }
              onLimitReached={(isMax, msg) => {
                this.state.activeButton === ''
                  ? Toast.show('Select the units.')
                  : Toast.show('Quantity is not available.');
              }}
            />
          </View>
          <View style={styles.lotsPageSwitchContainer}>
            <Icon
              name={
                this.props.productData.wishlist === false
                  ? 'favorite-border'
                  : 'favorite'
              }
              size={30}
              color={this.props.productData.wishlist ? 'red' : 'grey'}
              onPress={() => {
                this.favoutiteClicked();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    spinner: state.reducer.spinner,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBuyProduct: value =>
      dispatch({type: actionTypes.BUY_PRODUCT, payload: value}),
    onProductAddToCartDetails: value =>
      dispatch({type: actionTypes.PRODUCT_CART_DETAILS, payload: value}),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductAction);
