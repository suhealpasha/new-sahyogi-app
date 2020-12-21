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
import Stars from 'react-native-stars';
import NumericInput from 'react-native-numeric-input';
import SwitchButton from 'switch-button-react-native';
import axios from 'axios';
import * as api from '../../assets/api/api';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import * as actionTypes from '../../Store/action';
import {connect} from 'react-redux';
import {RadioButton} from 'react-native-paper';

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
      unitId: null,
      wishlistButtonDisable: false,
    };
  }

  componentDidMount() {
    this.setState({productData: this.props.productData});
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.onProductAddToCartDetails([
      this.state.productId,
      this.state.unitId,
      this.state.value,
      this.state.price,
      this.state.activeButton,
    ]);
  }

  favoutiteClicked = async () => {
    this.setState({wishlistButtonDisable: true});
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
          this.onFetchProduct();
          this.setState({wishlistButtonDisable: false});
        }
      })
      .catch(err => {
        this.setState({wishlistButtonDisable: false});
        console.log(err);
      });
  };

  activateUnitsButton = (param1, param2, param3, param4, param5) => {
    this.setState({
      activeButton: param1,
      price: param2,
      availableQuantity: param3,
      productId: param4,
      unitId: param5,
    });
  };

  render() {
    const styles = StyleSheet.create({
      productActionsContainer: {
        alignItems: 'center',
        paddingTop: 10,
        width: this.state.width ,
        paddingRight:10,
        paddingLeft:10
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
        textAlign:'center',
        justifyContent:'center',
 
        width:'50%',
      
      },
      unitsContainer: {
        flexDirection: 'column',
        width: '100%',
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
        paddingBottom: 10,
        paddingTop: 10,
        width: '100%',
 
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
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
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
        justifyContent: 'center',
        textAlignVertical: 'center',
        fontSize: 16,
        fontFamily: 'GothamLight',
      },
      spinnerTextStyle: {
        color: '#7ea100',
      },
    });

    let microUnits, nanoUnits;
    let cents = <Text>.00</Text>
    if (this.props.productData.nano) {
      {
        this.props.productData.nano.length >= 1
          ? (nanoUnits = this.props.productData.nano.map(i => {
              return (
                <TouchableOpacity
                  style={
                    this.state.activeButton === i.inventory_id
                      ? styles.unitsActiveButton
                      : styles.unitsButton
                  }
                  onPress={() =>
                    this.activateUnitsButton(
                      i.inventory_id,
                      i.price,
                      i.available_quantity,
                      i.product_Id,
                      i.unit_Id,
                    )
                  }>
                  <Text
                    style={
                      this.state.activeButton === i.inventory_id
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
                    this.state.activeButton === i.inventory_id
                      ? styles.unitsActiveButton
                      : styles.unitsButton
                  }
                  onPress={() =>
                    this.activateUnitsButton(
                      i.inventory_id,
                      i.price,
                      i.available_quantity,
                      i.product_Id,
                      i.unit_Id,
                    )
                  }>
                  <Text
                    style={
                      this.state.activeButton === i.inventory_id
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
    const data1 = [
      {
        label: 'data 1',
      },
      {
        label: 'data 2',
      },
    ];
    return (
      <View style={styles.productActionsContainer}>
        <Spinner
          visible={this.props.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.actionsContainer}>
          <View>
            <View>
             
              <View style={styles.quantityContainer}>
              
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton
                  color='#7ea100'
                    status={
                      this.state.activeSwitch === 1 ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      if ( this.props.productData.nano && this.props.productData.nano.length >= 1) {
                        this.setState({
                          availableQuantity: 0,
                          activeButton: '',
                          value: 1,
                          activeSwitch: 1,
                        });
                      } else {
                        this.setState({activeButton: '', activeSwitch: 1});
                        this.setState({unavailableNanoUnits: true});
                        // Toast.show('No Nano Lots');
                      }
                    }}
                  />
                  <Text
                   onPress={() => {
                    if ( this.props.productData.nano && this.props.productData.nano.length >= 1) {
                      this.setState({
                        availableQuantity: 0,
                        activeButton: '',
                        value: 1,
                        activeSwitch: 1,
                      });
                    } else {
                      this.setState({activeButton: '', activeSwitch: 1});
                      this.setState({unavailableNanoUnits: true});
                      // Toast.show('No Nano Lots');
                    }
                  }}
                    style={{textAlign: 'center', fontFamily: 'GothamMedium'}}>
                    Nano Lots
                   
                  </Text>
                  <RadioButton
                    value="second"
                    color='#7ea100'
                    status={
                      this.state.activeSwitch === 2 ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      if ( this.props.productData.micro && this.props.productData.micro.length >= 1) {
                        this.setState({
                          availableQuantity: 0,
                          activeButton: '',
                          value: 1,
                          activeSwitch: 2,
                        });
                      }
                      else {
                        this.setState({activeButton: '', activeSwitch: 2});
                        this.setState({unavailableMicroUnits: true});
                        // Toast.show('No Nano Lots');
                      }
                    }}
                  />
                  <Text
                    style={{textAlign: 'center', fontFamily: 'GothamMedium'}}
                    onPress={() => {
                      if ( this.props.productData.micro && this.props.productData.micro.length >= 1) {
                        this.setState({
                          availableQuantity: 0,
                          activeButton: '',
                          value: 1,
                          activeSwitch: 2,
                        });
                      }
                      else {
                        this.setState({activeButton: '', activeSwitch: 2});
                        this.setState({unavailableMicroUnits: true});
                        // Toast.show('No Nano Lots');
                      }
                    }}
                    >
                    Micro Lots

                  </Text>
                </View>
              </View>
            </View>
          </View>
        
        </View>
        <View style={styles.actionsContainer}>
          <View style={styles.unitsContainer}>
            <View style={{paddingTop: 10, paddingBottom: 10}}>
              <Text
                style={{
                  fontFamily: 'GothamLight',
                  fontSize: 17,
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
          
        </View>
        <View style={styles.actionsContainer}>
          <View style={styles.quantityContainer}>
            <Text
              style={{
                fontFamily: 'GothamLight',
                fontSize: 17,
                textAlignVertical: 'center',
                paddingRight: 10,              
              }}>
              Quantity
            </Text>
            <NumericInput
           containerStyle={{marginTop:10}}
              editable={
                Number.parseInt(this.state.availableQuantity, 10) > 0 &&
                this.state.activeButton !== ''
                  ? true
                  : false
              }
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
            <View style={styles.lotsPageSwitchContainer}>
            <Text style={styles.priceText}>
              $ {''}
              {this.state.activeButton === ''
                ? 0
                : this.state.value * this.state.price}<Text>.00</Text>  
            </Text>
          </View>
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
