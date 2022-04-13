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
import ActionButton from '../../utils/components/actionButton';
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
import ChooseAddress from '../../utils/components/chooseAddress';
import AddAddress from '../../utils/components/addAddress';
const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;

const itemHeight = 69;

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      add:false,
      address:[{
        name:'Anuj',
        address:'Finacre Small Finance Bank, Sarjapur Bangalore, 568890,Karnataka.',
        type:'Office',
        status:true,
      },
      {
        name:'Anuj',
        address:'Finacre Small Finance Bank, Sarjapur Bangalore, 568890,Karnataka.',
        type:'Home',
        status:false,
      },{
        name:'Anuj',
        address:'Finacre Small Finance Bank, Sarjapur Bangalore, 568890,Karnataka.',
        type:'Other',
        status:false,
      },{
        name:'Anuj',
        address:'Finacre Small Finance Bank, Sarjapur Bangalore, 568890,Karnataka.',
        type:'Office',
        status:false,
      },{
        name:'Anuj',
        address:'Finacre Small Finance Bank, Sarjapur Bangalore, 568890,Karnataka.',
        type:'Other',
        status:false,
      }
    ],
      products: [
        {
          id: 1,
          image: require('../../../assets/Images/products/sunglasses/4.png'),
          date: '6 Aug 2021',
          details: '',
        },
        {
          id: 2,
          image: require('../../../assets/Images/products/sunglasses/2.png'),
          date: '8 Aug 2021',
          details: '',
        },
        {
          id: 3,
          image: require('../../../assets/Images/products/tshirt2.png'),
          date: '9 Sep 2021',
          details: '',
        },
        {
          id: 4,
          image: require('../../../assets/Images/products/pant.png'),
          date: '13 Jul 2021',
          details: '',
        },
        {
          id: 5,
          image: require('../../../assets/Images/products/sunglasses/3.png'),
          date: '16 Aug 2021',
          details: '',
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
    this.props.navigation.navigate('Placed');
  };

  addAddress = () =>{
    this.setState({add:true})
  }

  closeAll = () =>{
    this.RBSheet.close();
    this.setState({add:false})
  }



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
        marginRight: 10,
      },
      couponCount: {
        fontFamily: 'AvenirNext-Medium',
        color: '#999999',
      },
      pdetails: {
        fontFamily: 'AvenirNextFont',
        color: '#333333',
        padding: 5,
      },
      pdetailsFree: {
        fontFamily: 'AvenirNextFont',
        color: '#00a236',
        padding: 5,
      },
      pdetailsfinal: {
        fontFamily: 'AvenirNextFont',
        color: '#333333',
        padding: 5,
        fontWeight: 'bold',
      },
      address: {
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10,
        marginBottom: 20,
        borderBottomColor: '#c8c8c8',
        borderBottomWidth: 2,
      },
      name: {
        fontFamily: 'AvenirNextFont',
        fontSize: 18,
        color: '#333333',
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
      },
      addressdetails: {
        fontFamily: 'AvenirNextFont',
        fontSize: 18,
        color: '#666666',
      },
      productsContainer: {
        borderColor: '#c8c8c8',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
      },
    });

    let currentPosition = 1;
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
      separatorFinishedColor: '#ff7d01',
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

    let products = [];
    if (this.state.products) {
      this.state.products.map((i, index) => {
        products.push(
          <View>
            <View style={styles.productsContainer}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <ImageBackground
                  source={i.image}
                  style={{
                    width: 80,
                    height: 80,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    borderWidth: 1,
                    borderRadius: 2,
                    borderColor: '#dbdbdb',
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                  resizeMode="center"
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'AvenirNextFont',
                      color: '#999999',
                    }}>
                    Estimated Delivery{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'AvenirNextFont',
                      fontWeight: 'bold',
                    }}>
                    {i.date}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({});
                }}>
                <DownIcon />
              </TouchableOpacity>
            </View>
          </View>,
        );
      });
    }

   const default_address = this.state.address.map((i,index)=>{
     if(i.status){
       return( <View style={styles.address}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.name}>{i.name}</Text>
            <Text
              style={{marginLeft: 10, fontSize: 12, color: '#999999'}}>
              (Default)
            </Text>
          </View>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 12,
              paddingTop: 5,
              paddingBottom: 5,
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 10,
              backgroundColor: '#fff4e9',
            }}>
            {i.type}
          </Text>
        </View>
        <Text style={styles.addressdetails}>
         {i.address}
        </Text>
        <View
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 10,
          }}>
          <TouchableOpacity
          onPress={()=>{this.RBSheet.open()}}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#ff7d01',
              padding: 10,
            }}>
            <Text
              style={{
                color: '#ff7d01',
                fontSize: 12,
                fontFamily: 'AvenirNextFont',
              }}>
              Change or Add Address
            </Text>
          </TouchableOpacity>
        </View>
      </View>)
     }
   })

    return (
      <View style={{flex: 1.0, backgroundColor: '#ffff'}}>
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
           {default_address}
            {products}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderTopColor: '#c8c8c8',
                borderTopWidth: 1,
              }}>
              <Text style={styles.coupon}>Price Details</Text>
              <Text style={styles.couponCount}>(40 Items)</Text>
            </View>
            <View
              style={{
                backgroundColor: '#fff4e9',
                padding: 10,
                marginBottom: 20,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={styles.pdetails}>Order Total</Text>
                  <Text style={styles.pdetails}>Delivery Charges</Text>
                </View>
                <View>
                  <Text style={styles.pdetails}>Rs 80,000</Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.pdetails}>Rs 100</Text>
                    <Text style={styles.pdetailsFree}>Free</Text>
                  </View>
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
            proceed="Continue"
            proceedClicked={this.placeOrderClicked}
            extra={' ( Rs.' + 100 + ' off )'}
          />
        </View>

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
            {this.state.add ?
            <AddAddress 
            address={this.state.address}
            close={() => {this.closeAll()}}
            />
            :
         <ChooseAddress 
         address={this.state.address}
         addAddress={()=>this.addAddress()}
         close={() => {this.closeAll ()}}
         />
      }
         <ActionButton buttonText={this.state.add ? 'Add Address' : 'Confirm'} product={false} address={true}/>
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
)(Address);
