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
import * as actionTypes from '../../../Store/action';
import RightArrowIcon from '../../utils/components/Icons/rightArrow';
import {connect} from 'react-redux';
import StepIndicator from 'react-native-step-indicator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;

const itemHeight = 69;

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      notification: false,
      imageQty: false,
      controlFlow: false,
      orders: [
        {
          order_no: '1234-5678-9000-3453',
          items: [
            {
              name: 'United Colors of Benetton Sunglass',
              model: 'BE5002MI670',
              size: 'M',
              qty: 1000,
              total: 50000,
              status: 1,
              placed_date: '26 Oct',
              delivery_date: '06 Nov',
              image: require('../../../assets/Images/products/sunglasses/3.png'),
              courier_name: 'Ecom Express',
              tracking_no: 12345555,
              detais: [
                {
                  date: '27 Oct',
                  info: 'Shipped to Logistics',
                },
                {
                  date: '28 Oct',
                  info: 'Shipped to Transitions',
                },
                {
                  date: '29 Oct',
                  info: 'Out to delivery',
                },
              ],
            },
          ],
        },
      ],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props.searchbar);
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

  render() {
    let currentPosition;
    const labels = ['Bag', 'Address', 'Payment'];
    const customStyles = {
      stepIndicatorSize: 10,
      currentStepIndicatorSize: 10,
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
      stepIndicatorUnFinishedColor: '#d8d8d8',
      stepIndicatorCurrentColor: '#ff7d01',
      stepIndicatorLabelFontSize: 13,
      currentStepIndicatorLabelFontSize: 13,
      stepIndicatorLabelCurrentColor: 'white',
      stepIndicatorLabelFinishedColor: 'white',
      stepIndicatorLabelUnFinishedColor: 'white',
    };
    const styles = StyleSheet.create({
      button: {
        width: '100%',
        padding: 20,
      },
      buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#ff7d01',
      },
      order_item: {
        borderWidth: 1,
        marginTop: 10,
        borderColor: '#e7e7e7',
        borderRadius: 5,
        padding: 10,
      },
      verticleLine: {
        height: 20,
        width: 2,
        backgroundColor: '#e7e7e7',
        alignItems:'center'
      },
      helpContainer:{
          marginTop:10,
          backgroundColor:'#fff4e9',
          padding:10
      }
    });

    let order = [];
    if (this.state.orders.length > 0) {
      this.state.orders.map((i, index) => {
        let order_items = [];
        i.items.map((i, index) => {
          order_items.push(
            <View style={styles.order_item}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <Image
                  source={i.image}
                  style={{
                    width: 100,
                    height: 100,

                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: '#dbdbdb',
                    padding: 5,
                  }}
                  resizeMode="cover"
                />
                <View style={{marginLeft: 10, marginRight: 10, width: '60%'}}>
                  <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                    {i.name}
                  </Text>
                  <Text style={{fontSize: 12}}>Model No: {i.model}</Text>
                  <Text style={{fontSize: 10, color: '#666666'}}>
                    Size: {i.size}
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                    Total Qty: {i.qty}
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                    Total Rs.: {i.total}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  padding: 8,
                  marginTop: 10,
                  width: 110,
                  borderColor: '#ff7d01',
                  borderRadius: 5,
                }}>
                <Text style={{color: '#ff7d01'}}>Cancel Order</Text>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{width: '15%'}}>
                  <Text style={{color: '#999999', fontSize: 12}}>
                    Placed {i.placed_date}
                  </Text>
                </View>
                <View style={{width: '70%'}}>
                  <StepIndicator
                    customStyles={customStyles}
                    currentPosition={currentPosition}
                    renderStepIndicator={() => null}
                    stepCount={5}
                  />
                </View>
                <View style={{width: '15%'}}>
                  <Text style={{color: '#999999', fontSize: 12}}>
                    Delivery {i.delivery_date}
                  </Text>
                </View>
              </View>
              <View style={{marginTop:10,borderBottomWidth:1,paddingBottom:10,borderBottomColor:'#e5e5e5'}}>
                <Text style={{color: '#999999', fontSize: 12}}>Courier Name: {i.courier_name}</Text>
                <Text style={{color: '#999999', fontSize: 12}}>Tracking No.: {i.tracking_no}</Text>
              </View>
              <View style={{marginTop:10,marginBottom:20}}>
              {i.detais.map((i,index)=>{
                  return (
                  <View style={{display:'flex',justifyContent:'center'}}>
                  <View style={{display:'flex',flexDirection:'row'}}>
                      <View style={{marginRight:20}}>
                          <Text style={{fontWeight:'bold' ,fontSize: 12}}>{i.date}</Text></View>
                      <View><Text  style={{color: '#999999', fontSize: 12}}>{i.info}</Text></View></View>
                  <View style={styles.verticleLine}></View>
                  </View>
                  )
              })}
              </View>
              <TouchableOpacity>
              <Text  style={{fontWeight:'bold',color:'#ff7d01'}}>More</Text>
              </TouchableOpacity>
            </View>,
          );
        });
        order.push(
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {order_items}
          </View>,
        );
      });
    }

    return (
      <View style={{flex: 1, backgroundColor: '#ffff'}}>
        <KeyboardAwareScrollView
          extraHeight={false}
          scrollEnabled={true}
          style={{paddingLeft: 16, paddingRight: 16}}>
              <View style={styles.helpContainer}>
                  <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                  <Text style={{fontWeight:'bold',fontSize:16}}>Need Help ?</Text>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('OrderHelpCenter')}>
                  <RightArrowIcon />
                  </TouchableOpacity>
                
                  </View>
                  <Text style={{color:'#666666'}}>
                Are you facing any problem with this order? Contact  us, we will bwe able to help!
                </Text>
              </View>
          {order}
        </KeyboardAwareScrollView>    
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
)(OrderDetails);
