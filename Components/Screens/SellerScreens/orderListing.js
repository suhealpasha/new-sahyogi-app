import React, {Component} from 'react';
import {
  BackHandler,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from '../../BottomNavigation/sellerBottomNavigation';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../../../assets/api/api';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      filterOn: null,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      noDataAvailable: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    this.fetchSellerOrder();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  fetchSellerOrder = async () => {
    this.setState({spinner: true});
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    axios
      .get(api.sellerOrderAPI, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        console.log('seller order==>', res.data.data);
        if (res.status) {
          if (res.data.data.length <= 0) {
            this.setState({noDataAvailable: true, spinner: false});
          } else {
          this.setState({
            spinner: false,
            sellerOrderData: res.data.data,
          });
        }
      }
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  };

  UNSAFE_componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    this.props.onBottomTabClicked('home');
    this.props.navigation.goBack(null);
    return true;
  }
 
  fetchSellerOrderDetails = (args) =>{
    this.props.onDisplayOrderNumber(args);
    this.props.navigation.navigate("Seller Order Detail",{orderId:args})
  }

  render() {
   
    const styles = StyleSheet.create({
      container: {
        flex: 1.0,
      },
      itemContainer: {
        paddingRight:10,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 0.25,
        borderColor: '#95A5A6',
        flexDirection: 'row',

      },
      noData: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: this.state.height - 110,
      },
      noDataText: {
        fontSize: 20,
        fontFamily: 'GothamBold',
      },
      itemDetailContainer: {
        paddingLeft: 10,
    
      },
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
      spinnerTextStyle: {
        color: '#00aa00',
      },
    });

    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
         {this.state.noDataAvailable ? (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>No Data</Text>
          </View>
        ) : (
        <FlatList
          data={this.state.sellerOrderData}
          numColumns={1}
          // keyExtractor = {(items)=>{items.key}}

          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() =>this.fetchSellerOrderDetails(item.order_Id)                 
                }>
                <View style={styles.itemContainer}>
                  <View style={styles.itemDetailContainer}>
                    <Text style={styles.itemTextOrderText}>
                      Order#: {item.order_Id}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}>
                      <Text style={{fontFamily: 'GothamLight', paddingTop: 5}}>
                        Buyer:
                      </Text>
                      <Text style={styles.itemTextOrigin}>
                        {' '}
                        {item.buyer_name}
                      </Text>
                    </View>
                    <Text style={styles.itemTextFarm}>{item.total_amount}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: this.state.width - 40,
                      }}>
                      <Text style={styles.itemTextOrderText}>
                        {item.order_date}
                      </Text>
                      <Text
                        style={(() => {
                          switch (item.order_status) {
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
                        })()}>
                        {item.order_status}
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
        />)
  }
        <BottomNavigation {...this.props} />
      </View>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onBottomTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_ICON, payload: value}),
  onDisplayOrderNumber: value =>
  dispatch({type: actionTypes.DISPLAY_ORDER_NUMBER, payload: value}),
};
};
export default connect(
  null,
  mapDispatchToProps,
)(Listing);
