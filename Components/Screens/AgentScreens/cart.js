import React, {Component} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Alert,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  Switch,
  TextInput,
  ImageBackground,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import NumericInput from 'react-native-numeric-input';
import Bottomnavigation from '../../BottomNavigation/bottomNavigation';
import Close from 'react-native-vector-icons/AntDesign';
import {
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import RemoveItems from '../../utils/components/removetems';
import Coupon from '../../utils/components/coupon';
import * as actionTypes from '../../../Store/action';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StickyButton from '../../utils/components/stickyButtons';
import {connect} from 'react-redux';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import CartEmptyIcon from '../../utils/components/Icons/cartEmpty';
import FilledLikeIcon from '../../utils/components/Icons/filledLike';
import CrossIcon from '../../utils/components/Icons/cross';
import StepButton from '../../utils/components/stepButton';
import RupeeIcon from '../../utils/components/Icons/rupee';
import UpIcon from '../../utils/components/Icons/up';
import DownIcon from '../../utils/components/Icons/down';
import {borderColor} from '@material-ui/system';
const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;

const itemHeight = 69;

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      removeItems: true,
      select: null,
      disabled: true,
      collapes: false,
      collapse_id: null,
      brands: [
        {image: require('../../../assets/Images/products/pepe.png')},
        {image: require('../../../assets/Images/products/hrx.png')},
        {image: require('../../../assets/Images/products/roadster.png')},
        {image: require('../../../assets/Images/products/puma.png')},
      ],

      products: [
        {
          id: 1,
          brand_name: 'DIESEL',
          model: 'BE5002MI670',
          total_qty: 1000,
          total_price: 50800,
          collapse: false,
          collapse_id: null,
          items: [
            {
              id: 1,
              parent_id: 1,
              name: 'Light Blue Color',
              quantity: 100,
              price: 800,
              checked: false,
              item_name: 'Unisex Mirrored Oval Sunglasses BE5',
              size: 'M',
              sold_by: 'Blue Cross',
              image: require('../../../assets/Images/products/sunglasses/5.png'),
            },
            {
              id: 2,
              parent_id: 1,
              name: 'Light Grey Color',
              quantity: 100,
              price: 800,
              checked: false,
              item_name: 'Unisex Mirrored Oval Sunglasses BE5',
              size: 'M',
              sold_by: 'Blue Cross',
              image: require('../../../assets/Images/products/sunglasses/5.png'),
            },
            {
              id: 3,
              parent_id: 1,
              name: 'Gold Color',
              quantity: 100,
              price: 800,
              checked: false,
              item_name: 'Unisex Mirrored Oval Sunglasses BE5',
              size: 'M',
              sold_by: 'Blue Cross',
              image: require('../../../assets/Images/products/sunglasses/5.png'),
            },
            {
              id: 4,
              parent_id: 1,
              name: 'Pink Color',
              quantity: 80,
              price: 800,
              checked: false,
              item_name: 'Unisex Mirrored Oval Sunglasses BE5',
              size: 'M',
              sold_by: 'Blue Cross',
              image: require('../../../assets/Images/products/sunglasses/5.png'),
            },
            {
              id: 5,
              parent_id: 1,
              name: 'Black Color',
              quantity: 70,
              price: 800,
              checked: false,
              item_name: 'Unisex Mirrored Oval Sunglasses BE5',
              size: 'M',
              sold_by: 'Blue Cross',
              image: require('../../../assets/Images/products/sunglasses/5.png'),
            },
            {
              id: 6,
              parent_id: 1,
              name: 'Silver Color',
              quantity: 100,
              price: 800,
              checked: false,
              item_name: 'Unisex Mirrored Oval Sunglasses BE5',
              size: 'M',
              sold_by: 'Blue Cross',
              image: require('../../../assets/Images/products/sunglasses/5.png'),
            },
            {
              id: 7,
              parent_id: 1,
              name: 'Light Orange Color',
              quantity: 40,
              price: 800,
              checked: false,
              item_name: 'Unisex Mirrored Oval Sunglasses BE5',
              size: 'M',
              sold_by: 'Blue Cross',
              image: require('../../../assets/Images/products/sunglasses/5.png'),
            },
          ],
        },
        {
          id: 3,
          parent_id: 1,
          brand_name: 'United Colors of Benetton Sunglass',
          model: 'BE5002MI670',
          total_qty: 1000,
          total_price: 50800,
          collapse: false,
          items: [
            {
              id: 1,
              parent_id: 2,
              name: 'Light Blue Color',
              quantity: 100,
              price: 800,
              checked: false,
              item_name: 'Unisex Mirrored Oval Sunglasses BE5',
              size: 'M',
              sold_by: 'Blue Cross',
              image: require('../../../assets/Images/products/sunglasses/5.png'),
            },
            {
              id: 2,
              parent_id: 2,
              name: 'Light Grey Color',
              quantity: 100,
              price: 800,
              checked: false,
              item_name: 'Unisex Mirrored Oval Sunglasses BE5',
              size: 'M',
              sold_by: 'Blue Cross',
              image: require('../../../assets/Images/products/sunglasses/5.png'),
            },
            {
              id: 3,
              parent_id: 2,
              name: 'Gold Color',
              quantity: 100,
              price: 800,
              checked: false,
              item_name: 'Unisex Mirrored Oval Sunglasses BE5',
              size: 'M',
              sold_by: 'Blue Cross',
              image: require('../../../assets/Images/products/sunglasses/5.png'),
            },
            {
              id: 4,
              parent_id: 2,
              name: 'Pink Color',
              quantity: 80,
              price: 800,
              checked: false,
              item_name: 'Unisex Mirrored Oval Sunglasses BE5',
              size: 'M',
              sold_by: 'Blue Cross',
              image: require('../../../assets/Images/products/sunglasses/5.png'),
            },
            {
              id: 5,
              parent_id: 2,
              name: 'Black Color',
              quantity: 70,
              price: 800,
              checked: false,
              item_name: 'Unisex Mirrored Oval Sunglasses BE5',
              size: 'M',
              sold_by: 'Blue Cross',
              image: require('../../../assets/Images/products/sunglasses/5.png'),
            },
            {
              id: 6,
              parent_id: 2,
              name: 'Silver Color',
              quantity: 100,
              price: 800,
              checked: false,
              item_name: 'Unisex Mirrored Oval Sunglasses BE5',
              size: 'M',
              sold_by: 'Blue Cross',
              image: require('../../../assets/Images/products/sunglasses/5.png'),
            },
            {
              id: 7,
              parent_id: 2,
              name: 'Light Orange Color',
              quantity: 40,
              price: 800,
              checked: false,
              item_name: 'Unisex Mirrored Oval Sunglasses BE5',
              size: 'M',
              sold_by: 'Blue Cross',
              image: require('../../../assets/Images/products/sunglasses/5.png'),
            },
          ],
        },
        {
          id: 3,

          brand_name: 'Tommy Hilfiger',
          model: 'BE5002MI670',
          total_qty: 1000,
          total_price: 50800,
          collapse: false,
          items: [
            {
              parent_id: 3,
              id: 1,
              name: 'Light Orange Color',
              quantity: 40,
              price: 800,
              checked: false,
              item_name: 'Unisex Mirrored Oval Sunglasses BE5',
              size: 'M',
              sold_by: 'Blue Cross',
              image: require('../../../assets/Images/products/sunglasses/5.png'),
            },
          ],
        },
      ],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    // this.props.onTabClicked('category');
    if (this.props.searchbar) {
      this.props.closeSearch();
    }
    return true;
  }

  _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: '#e7e7e7',
          paddingLeft: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ImageBackground
          style={{
            width: 60,
            height: 60,
          }}
          resizeMode="center"
          source={item.image}
        />
      </View>
    );
  };

  placeOrderClicked = () => {
    this.props.navigation.navigate('Address');
  };

  openCoupon = async () => {
    await this.setState({removeItems: false});
    this.RBSheet.open();
  };

  openRemoveItems = async () => {
    await this.setState({removeItems: true});
    this.RBSheet.open();
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        height: this.state.height - 137,
      },
      itemContainer: {
        borderRadius: 2,
        borderBottomWidth: 1,
        borderColor: '#e7e7e7',
        marginBottom: 16,
      },
      like: {
        height: 30,
        width: 30,
        borderRadius: 50,
        shadowColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0,
        shadowRadius: 1.84,
        backgroundColor: '#ffff',
        elevation: 1,
        marginBottom: -15,
      },
      details: {
        paddingTop: 15,
        paddingLeft: 7,
        paddingRight: 7,
      },
      label: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 18,
        color: '#333333',
      },
      modelLabel: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 16,
        color: '#666666',
      },
      labelDetail: {
        fontFamily: 'AvenirNextLTPro-Regular',
        fontSize: 10,
        color: '#999999',
      },

      detailsText: {
        fontFamily: 'AvenirNextFont',
        fontSize: 10,
        color: '#999999',
      },
      detailsText1: {
        fontFamily: 'AvenirNextFont',
        fontSize: 12,
        color: '#999999',
        paddingLeft: 5,
      },
      priceText: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 14,
        color: '#333333',
        fontWeight: '500',
      },
      offerText: {
        fontFamily: 'AvenirNextFont',
        fontSize: 10,
        color: '#ff7d01',
        paddingLeft: 5,
      },
      leftText: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 10,
        color: '#ff7d01',
      },
      lable: {
        fontFamily: 'AvenirNext-Medium',
        // padding:50,
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 30,
      },
      labelColor: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 12,
        color: '#333333',
        paddingTop: 5,
        paddingBottom: 5,
        fontWeight: 'bold',
      },

      message: {
        fontSize: 14,
        fontFamily: 'AvenirNext-Medium',
        // paddingBottom:30,
        textAlign: 'center',
        color: '#999999',
        padding: 50,
      },
      coupon: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 18,
        paddingTop: 8,
        paddingBottom: 8,
        borderColor: '#c8c8c8',
      },
      pdetails: {
        fontFamily: 'AvenirNextFont',
        color: '#333333',
        padding: 5,
      },
      pdetailsfinal: {
        fontFamily: 'AvenirNextFont',
        color: '#333333',
        padding: 5,
        fontWeight:'bold'
      },
    });

    let currentPosition;
    const labels = ['Bag', 'Address', 'Payment'];
    const customStyles = {
      stepIndicatorSize: 30,
      currentStepIndicatorSize: 30,
      separatorStrokeWidth: 2,
      currentStepStrokeWidth: 1,
      stepStrokeCurrentColor: '#000000',
      stepStrokeWidth: 1,
      separatorStrokeFinishedWidth: 4,
      stepStrokeFinishedColor: '#ff7d01',
      stepStrokeUnFinishedColor: '#d8d8d8',
      separatorFinishedColor: '#7ea100',
      separatorUnFinishedColor: '#d8d8d8',
      stepIndicatorFinishedColor: '#ff7d01',
      stepIndicatorUnFinishedColor: '#ffff',
      stepIndicatorCurrentColor: '#ff7d01',
      stepIndicatorLabelFontSize: 13,
      currentStepIndicatorLabelFontSize: 13,
      stepIndicatorLabelCurrentColor: 'white',
      stepIndicatorLabelFinishedColor: 'white',
      stepIndicatorLabelUnFinishedColor: 'white',
      labelColor: '#95A5A6',
      labelSize: 13,
      currentStepLabelColor: '#333333',
      labelFontFamily: 'AvenirNext-Medium',
    };

    let cart_items = [];
    if (this.state.products) {
      this.state.products.map((i, index) => {
        const price = i.total_price;
        const qty = i.total_qty;

        cart_items.push(
          <View style={styles.itemContainer}>
            <Text style={styles.label}>{i.brand_name}</Text>
            <Text style={styles.modelLabel}>Model No: {i.model}</Text>
            <FlatList
              style={{marginTop: 10}}
              data={i.items}
              showsVerticalScrollIndicator={false}
              keyExtractor={(i, index) => {
                return index;
              }}
              renderItem={({item, index}) => {
                if (item.parent_id === this.state.collapse_id || index === 0) {
                  return (
                    <View
                      style={
                        index === 0
                          ? {
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderWidth: 1,
                              borderRadius: 4,
                              borderColor: '#e7e7e7',
                              padding: 10,
                              marginBottom: 30,
                            }
                          : {
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderWidth: 1,
                              marginBottom: 5,
                              borderRadius: 4,
                              borderColor: '#e7e7e7',
                              padding: 10,
                            }
                      }>
                      <View style={{}} />
                      <ImageBackground
                        source={item.image}
                        style={{
                          width: 120,
                          height: 130,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                          borderWidth: 2,
                          borderRadius: 4,
                          borderColor: '#dbdbdb',
                          padding: 5,
                        }}
                        resizeMode="center"
                      />
                      <View
                        style={
                          item.index === 0
                            ? {
                                width: this.state.width / 2 + 10,
                                display: 'flex',
                                padding: 5,
                                justifyContent: 'center',
                              }
                            : {
                                width: this.state.width / 2 + 10,
                                display: 'flex',
                                padding: 5,
                                justifyContent: 'center',
                              }
                        }>
                        <View style={{marginBottom: 10}}>
                          <View style={{marginBottom: 5}}>
                            <View
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                              }}>
                              <Text style={styles.labelColor}>
                                Color: {item.name}
                              </Text>

                              <Close
                                name="closecircle"
                                size={22}
                                color={'#e7e7e7'}
                                onPress={() => this.openRemoveItems()}
                              />
                            </View>

                            <Text style={styles.labelDetail}>
                              {item.item_name}
                            </Text>
                            <Text style={styles.labelDetail}>
                              Size: {item.size}
                            </Text>
                            <Text style={styles.labelDetail}>
                              Sold by: {item.sold_by}
                            </Text>
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              backgroundColor: '#d8d8d8',
                              width: 80,
                              paddingLeft: 5,
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontFamily: 'AvenirNextLTPro-Regular',
                              }}>
                              Qty:
                            </Text>
                            <NumericInput
                              containerStyle={{
                                border: 'none',
                                justifyContent: 'center',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                              type="up-down"
                              inputStyle={{
                                fontSize: 14,
                                fontFamily: 'AvenirNextLTPro-Regular',
                              }}
                              value={item.quantity}
                              onChange={value => this.setState({value})}
                              onLimitReached={(isMax, msg) =>
                                console.log(isMax, msg)
                              }
                              step={1}
                              upDownButtonsBackgroundColor="#d8d8d8"
                              valueType="real"
                              rounded={false}
                              totalHeight={30}
                              totalWidth={50}
                            />
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontFamily: 'AvenirNextLTPro-Regular',
                              }}>
                              Rs: {item.price}
                            </Text>
                          </View>
                        </View>
                        {index === 0 ? (
                          <TouchableOpacity
                          onPress={()=>{
                            this.state.collapse_id === item.parent_id ?  this.setState({collapse_id: null}) :
                            this.setState({
                              collapse_id: item.parent_id,
                            })
                          }
                          }
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              margin: 5,
                              padding: 5,
                              position: 'absolute',
                              borderRadius: 2,
                              bottom: -40,
                              paddingLeft: 5,
                              width: this.state.width / 2 - 10,
                              backgroundColor: '#ffff',
                              borderWidth: 1,
                              borderColor: '#ff7d01',
                            }}>
                            <View>
                              <Text
                                style={{
                                  color: '#ff7d01',
                                  fontFamily: 'AvenirNext-Medium',
                                  fontWeight: '500',
                                }}>
                                Total Qty: {qty}
                              </Text>
                              <Text
                                style={{
                                  color: '#ff7d01',
                                  fontFamily: 'AvenirNext-Medium',
                                  fontWeight: '500',
                                }}>
                                Total Rs: {price}
                              </Text>
                            </View>
                            <View style={{position: 'absolute', right: -10}}>
                              {this.state.collapse_id === item.parent_id ? (
                               
                                  <UpIcon />
                              
                              ) : (
                                
                                  <DownIcon />
                               
                              )}
                            </View>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    </View>
                  );
                }
              }}
            />
          </View>,
        );
      });
    }
    return (
      <View style={{flex: 1.0, backgroundColor: '#ffff'}}>
        {/* <View style={styles.container}>  */}
        {this.state.products.length > 0 ? (
          <View style={{flex: 1.0}}>
            <View style={{paddingTop: 16, paddingBottom: 0}}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels}
                renderStepIndicator={() => null}
                stepCount={3}
              />
            </View>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              style={{
                height: this.state.height / 20,
                paddingLeft: 16,
                paddingRight: 16,
              }}>
              <View>{cart_items}</View>

              <TouchableOpacity
                style={{borderBottomWidth: 1, borderBottomColor: '#c8c8c8'}}
                onPress={() => {
                  this.openCoupon();
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.coupon}>Apply Coupon</Text>
                  <Icon
                    style={{paddingBottom: 8, paddingTop: 8, marginRight: -10}}
                    name="keyboard-arrow-right"
                    // style={{paddingTop: 10}}
                    size={32}
                    color="#333333"
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.coupon}>Product Details</Text>
              <View style={{backgroundColor: '#fff4e9', padding: 10,marginBottom:20}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text style={styles.pdetails}>Taxable Amount</Text>
                    <Text style={styles.pdetails}>Packing Charges</Text>
                    <Text style={styles.pdetails}>Delivery Charges</Text>
                    <Text style={styles.pdetails}>Discount</Text>
                    <Text style={styles.pdetails}>GST</Text>
                    <Text style={styles.pdetails}>Coupon Applied</Text>
                  </View>
                  <View>
                    <Text style={styles.pdetails}>Rs 50,000</Text>
                    <Text style={styles.pdetails}>Rs 50,000</Text>
                    <Text style={styles.pdetails}>Rs 50,000</Text>
                    <Text style={styles.pdetails}>Rs 50,000</Text>
                    <Text style={styles.pdetails}>Rs 50,000</Text>
                    <Text style={styles.pdetails}>- Rs 100</Text>
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderTopColor: '#c8c8c8',
                    borderTopWidth: 1,
                  }}>
                  <Text style={styles.pdetailsfinal}>Net Payable Amount</Text>
                  <Text style={styles.pdetailsfinal}>Rs 80,000</Text>
                </View>
              </View>
            </KeyboardAwareScrollView>

            <StickyButton
              product={true}
              skip={'₹  80,000'}
              proceed="Place Order"
              proceedClicked={this.placeOrderClicked}
              extra={' ( Rs.' + 100 + ' off )'}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1.0,
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View>
              <Text style={styles.lable}>No items in cart :(</Text>
              <CartEmptyIcon />
            </View>
            <View style={{display: 'flex', alignItems: 'center'}}>
              <Text style={styles.message} numberOfLines={2}>
                You have no items in your shoping cart. Let’s go buy something.
              </Text>
              <StepButton
                title="Browse Category"
                {...this.props}
                mainCategory={true}
                closeSearch={this.props.closeSearch}
              />
            </View>
          </View>
        )}
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={
            this.state.removeItems
              ? this.state.height / 3 + 20
              : this.state.height - 50
          }
          duration={250}
          closeOnPressMask={false}
          customStyles={{
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
          }}>
          {this.state.removeItems ? (
            <RemoveItems
              close={() => {
                this.RBSheet.close();
              }}
            />
          ) : (
            <Coupon
              close={() => {
                this.RBSheet.close();
              }}
            />
          )}
        </RBSheet>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.reducer.active,
    bottomTab: state.reducer.bottomTab,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_TAB, payload: value}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
