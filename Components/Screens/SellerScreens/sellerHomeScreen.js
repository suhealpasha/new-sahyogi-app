import React, {Component} from 'react';
import {BackHandler,AsyncStorage,StyleSheet,FlatList,View,Text,Image,ScrollView,Button,Dimensions,TouchableOpacity,AppRegistry,navigation,} from 'react-native';
import {Toolbar, COLOR, BottomNavigation, Icon} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import KeyboardShift from '../../utils/keyboardShift';
import {YellowBox} from 'react-native';
import Dashboard from 'react-native-dashboard';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
const Tab = createMaterialBottomTabNavigator();

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      sellerHomeScreen: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  async componentDidMount() {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn === '2') {
      this.setState({sellerHomeScreen: true});
    }
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
    BackHandler.exitApp();
    return true;
  }
navigationHandler = (arg) =>{
  this.props.onBottomTabClicked('order listing')
  this.props.navigation.navigate('Order Listing')
}

intToString = (value)=>{
  var newValue = value;
  if (value >= 1000) {
      var suffixes = ["", "k", "m", "b","t"];
      var suffixNum = Math.floor( (""+value).length/3 );
      var shortValue = '';
      for (var precision = 2; precision >= 1; precision--) {
          shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
          var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
          if (dotLessShortValue.length <= 2) { break; }
      }
      if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
      newValue = shortValue+suffixes[suffixNum];
  }
  return newValue;
}

  render() {
    const items = [
      {name: 'Total Orders', background: '#3498db', value: 25000},
      {name: 'Total Revenue', background: '#ef0202', value: 500},
      {name: 'Refunds', background: '#efcf02', value: 300},
      {name: 'Average Revenue', background: '#02ef1d', value: 1500},
    ];

    const orders = [
      {
        key: '8',
        buyerName: 'Adam Smith',
        amount: '$5000',
        orderNumber: 3443,
        status: 'Delivered',
        orderDate: '05-Mar-2020',
        rated: true,
      },
      {
        key: '9',
        buyerName: 'Philis Smith',
        amount: '$550',
        orderNumber: 3113,
        status: 'Ordered',
        orderDate: '05-Mar-2020',
        rated: false,
      },
      {
        key: '10',
        buyerName: 'Sandra J Jhonson',
        amount: '$8000',
        orderNumber: 6443,
        status: 'Rejected',
        orderDate: '25-Feb-2020',
        rated: true,
      },
    ];

    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#efebea',
      },
      featuredItems: {
        width: '100%',
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
      },
      microLots: {
        width: '100%',
        flexDirection: 'column',
        paddingLeft: 5,
        paddingRight: 5,
      },
      nanoLots: {
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5,
      },
      regions: {
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5,
      },
      viewall: {
        color: '#3e708f',
        borderRadius: 10,
        fontSize: 12,
        fontFamily: 'GothamBold',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
      },
      viewallRecentOrders: {
        color: '#3e708f',
        borderRadius: 10,
        fontSize: 12,
        fontFamily: 'GothamBold',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
      },
      microalign: {
        paddingBottom: 10,
        paddingTop: 10,
        color: '#004561',
        textAlignVertical: 'center',
        fontFamily: 'Gotham Black Regular',
      },

      textData: {
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        fontFamily: 'Gotham Black Regular',
        color: 'white',
      },
      textDataValue: {
        paddingTop: 15,
        paddingLeft: 5,
        paddingRight: 5,
        fontFamily: 'Gotham Black Regular',
        color: 'white',
        fontSize: 25,
      },
      recentOrders: {
        borderTopWidth: 0.25,
        borderBottomWidth: 0.25,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#95A5A6',
      },
      recentOrdersHeader: {
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: 'GothamMedium',
      },
      itemContainer: {
        width: this.state.width,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 0.25,
        borderColor: '#95A5A6',
        flexDirection: 'row',

        backgroundColor: 'white',
      },
      itemDetailContainer: {},
      itemTextOrderText: {
        fontSize: 12,
        fontFamily: 'GothamLight',
        paddingLeft: 5,
        paddingRight: 5,
      },
      itemTextOrigin: {
        fontFamily: 'Gotham Black Regular',
        fontSize: 14,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
      },
      itemTextFarm: {
        fontSize: 12,
        justifyContent: 'space-around',
        fontFamily: 'GothamMedium',
        fontSize: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
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

    return (
      <ScrollView>
       
          <View style={styles.container}>
            <FlatList
              data={items}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              numColumns={2}
              // keyExtractor = {(items)=>{items.key}}

              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingBottom: 10,
                    }}>
                    <View
                      style={{
                        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2 ,
                        width: Dimensions.get('window').width / 2 - 20,
                        height: Dimensions.get('window').width / 2 - 20,
                        backgroundColor:item.background,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                      }}>
                      <Text style={styles.textData}>{item.name}</Text>
                    <Text style={styles.textDataValue}>{item.name !== 'Total Orders' ? '$':null }{this.intToString(item.value)}</Text>                    
                    </View>
                  </View>
                );
              }}
            />

            <View style={styles.recentOrders}>
              <Text style={styles.recentOrdersHeader}>RECENT ORDERS</Text>
            </View>
            <FlatList
              data={orders}
              numColumns={1}
              // keyExtractor = {(items)=>{items.key}}

              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Seller Order Detail')
                    }>
                    <View style={styles.itemContainer}>
                      <View style={styles.itemDetailContainer}>
                        <Text style={styles.itemTextOrderText}>
                          Order#: {item.orderNumber}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            paddingLeft: 5,
                            paddingRight: 5,
                          }}>
                          <Text
                            style={{fontFamily: 'GothamLight', paddingTop: 5}}>
                            Buyer:
                          </Text>
                          <Text style={styles.itemTextOrigin}>
                            {' '}
                            {item.buyerName}
                          </Text>
                        </View>
                        <Text style={styles.itemTextFarm}>{item.amount}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: this.state.width - 40,
                          }}>
                          <Text style={styles.itemTextOrderText}>
                            {item.orderDate}
                          </Text>
                          <Text
                            style={(() => {
                              switch (item.status) {
                                case 'Delivered':
                                  return styles.statusDelivered;
                                case 'Rejected':
                                  return styles.statusRejected;
                                case 'Return':
                                  return styles.statusRejected;
                                default:
                                  return styles.statusOrdered;
                              }
                            })()}>
                            {item.status}
                          </Text>
                        </View>
                      </View>
                      <View style={{justifyContent: 'center'}}>
                        <Icon name="chevron-right" size={25} />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
             <View
                style={{ paddingTop:5,paddingBottom:5
                                 
                }}>
                <TouchableOpacity
                  onPress={() => this.navigationHandler('Order Listing')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width:this.state.width
                    }}>
                    <Text style={styles.viewallRecentOrders}>See All</Text>
                    <Icon name="chevron-right" color={'#3e708f'} size={25} />
                  </View>
                </TouchableOpacity>
              </View>
          </View>      
      </ScrollView>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     sellerUser: state.reducer.sellerUser,
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    onBottomTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_ICON, payload: value}),
  };
};
export default connect(null, mapDispatchToProps)(HomeScreen);
