import 'react-native-gesture-handler';
import React, {Component, useState, useEffect} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Dimensions,
  AsyncStorage,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Components/Screens/SellerScreens/sellerHome';
import Inventory from '../Components/Screens/SellerScreens/inventory';
import OrderListing from '../Components/Screens/SellerScreens/orderListing';
import SellerNotification from '../Components/Screens/SellerScreens/sellerNotification';
import SellerOrderDetail from '../Components/Screens/SellerScreens/sellerOrderDetail';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from '../Components/utils/Search';
import {COLOR, ThemeContext, getTheme} from 'react-native-material-ui';
import SellerProfile from '../Components/Screens/SellerScreens/sellerProfile';
import EditSellerProfile from '../Components/Screens/SellerScreens/editSellerProfile';
import MyAddress from '../Components/Screens/SellerScreens/myAddress';
import AddAddress from './addAddress';
import EditAddress from './editAddress';
import {HeaderBackground} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import Reducer from '../Store/reducer';
import * as actionTypes from '../Store/action';
import {connect} from 'react-redux';
import KeyboardShift from '../Components/utils/keyboardShift';
import {StatusBar} from 'react-native';
import Dialog from 'react-native-dialog';
import axios from 'axios';
import * as api from '../assets/api/api';

const Tab = createMaterialTopTabNavigator();
const Tab2 = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const uiTheme = {
  palette: {
    primaryColor: COLOR.blue500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};
class SellerRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cashCheckout:false,
      isLogout: false,
      isLoggedIn: null,
      sellerHomeScreen: false,
      width: Dimensions.get('window').width,
      home: false,
      searchText: '',
      saveIconAddress: false,
      saveEditIconAddress: false,
      searchIcon: true,
      userData: [],
      addressData: [],
      saveIcon: false,
      countriesData:[]
    };
  }

  componentDidMount() {
    // this.fetchHomeScreenData();
    this.fetchDetails();
    this.fetchAddress();
    this.fetchCountries();
  }

  clickedSave = () => {
    this.setState({saveIcon: !this.state.saveIcon});
  };

  goBack = ({navigation}, path) => {
    if (path === 'Home') {
      navigation.navigate('Home');
    }
    this.setState({home: true});
  };

  changeTitleText = ({navigation}, param1, param2) => {
    navigation.navigate(param1, {
      searchText: param2,
    });
  };

  filterClicked = ({navigation}) => {
    navigation.navigate('All Microlots', {
      filterOn: !this.state.filterOn,
    });
  };

  clickedSaveAddress = () => {
    this.setState({saveIconAddress: !this.state.saveIconAddress});
  };

  clickedSaveEditAddress = () => {
    this.setState({saveEditIconAddress: !this.state.saveEditIconAddress});
  };

  _logout = async ({navigation}) => {
    await AsyncStorage.clear();
    navigation.navigate('Home');
  };

  fetchDetails = async () => {
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    console.log(access_token);
    await axios
      .get(api.sellerDetailsAPI, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        if (res.status) {
          this.setState({
            userData: res.data.data,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchAddress = async () => {
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    axios
      .get(api.sellerAddressAPI, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        this.setState({addressData: res.data.data.seller_addresses});
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchCountries = async () => {
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    axios
      .get(api.countriesAPI, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {       
        this.setState({countriesData: res.data.data});
      })
      .catch(err => {
        console.log(err);
      });
  };

cashCheckoutOk = ()=>{
  // this.setState({cashCheckout:false})
}

cashCheckoutCancel = () =>{  
  this.setState({cashCheckout:false})
}

  render() {
    const styles = StyleSheet.create({
      headerRightContainerStyle: {
        width: this.state.width - 20,
        alignItems: 'center',
      },
      MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
      },
    });
console.log(this.state.cashCheckout)
    return (
      <NavigationContainer>         
        <Stack.Navigator>
          <Stack.Screen
            name="Home"            
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  Microfee
                </Text>
              ),
              headerStyle: {backgroundColor: '#00aa00'},
              headerTintColor: '#ffffff',
              headerLeft: () => null,
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  <TouchableWithoutFeedback
                    onPress={() => {this.setState({cashCheckout:true})}}>
                    <Icon2
                      name="cash-refund"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                    />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('Seller Notification')}>
                    <Icon
                      name="notifications-none"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                    />
                  </TouchableWithoutFeedback>
                </View>
              ),
            })}           
          >
            {props => (
              <HomeScreen
                {...props}
                {...this.state}
               cashCheckout = {this.state.cashCheckout}
               onCashCheckoutOk = {this.cashCheckoutOk}
               onCashCheckoutCancel = {this.cashCheckoutCancel}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Order Listing"           
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  Orders
                </Text>
              ),
              headerStyle: {backgroundColor: '#00aa00'},
              headerTintColor: '#ffffff',
              headerLeft: () => null,
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  <TouchableWithoutFeedback
                    onPress={() => {this.setState({cashCheckout:true})}}>
                    <Icon2
                      name="cash-refund"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                    />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('Seller Notification')}>
                    <Icon
                      name="notifications-none"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                    />
                  </TouchableWithoutFeedback>
                </View>
              ),
            })}
            initialParams={{filterOn: this.state.filterOn}}
            {...this.props}
            >
            {props => (
              <OrderListing
                {...props}
                {...this.state}
               cashCheckout = {this.state.cashCheckout}
               onCashCheckoutOk = {this.cashCheckoutOk}
               onCashCheckoutCancel = {this.cashCheckoutCancel}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Inventory"            
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  Inventory
                </Text>
              ),
              headerStyle: {backgroundColor: '#00aa00'},
              headerTintColor: '#ffffff',
              headerLeft: () => null,
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                   <TouchableWithoutFeedback
                    onPress={() => {this.setState({cashCheckout:true})}}>
                    <Icon2
                      name="cash-refund"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                    />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('Notification')}>
                    <Icon
                      name="notifications-none"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                    />
                  </TouchableWithoutFeedback>
                </View>
              ),
            })}
            initialParams={{filterOn: this.state.filterOn}}            
            >
            {props => (
              <Inventory
                {...props}
                {...this.state}
               cashCheckout = {this.state.cashCheckout}
               onCashCheckoutOk = {this.cashCheckoutOk}
               onCashCheckoutCancel = {this.cashCheckoutCancel}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Search"
            component={Search}
            options={({navigation, route}) => ({
              animationEnabled: false,
              // headerTransparent:true,
              headerStyle: {
                backgroundColor: '#efebea',
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: '#ffffff',
              headerTitle: null,
              headerRightContainerStyle: styles.headerRightContainerStyle,
              headerLeft: () => (
                <TouchableWithoutFeedback
                  onPress={() => this.goBack({navigation})}>
                  <Icon name="chevron-left" size={35} color="black" />
                </TouchableWithoutFeedback>
              ),

              headerRight: () => (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name="search" size={25} color={'#95A5A6'} />
                  <TextInput
                    style={{
                      fontSize: 14,
                      width: this.state.width - 60,
                      fontFamily: 'GothamBook',
                    }}
                    placeholder="Search"
                    underlineColorAndroid={'#95A5A6'}
                    autoFocus={true}
                    onChangeText={text =>
                      this.changeTitleText({navigation}, 'Search', text)
                    }
                  />
                </View>
              ),
            })}
            initialParams={{keyword: this.state.searchText}}
            {...this.props}
          />

          <Stack.Screen
            name="Seller Order Detail"
            component={SellerOrderDetail}
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  Order# 1212
                </Text>
              ),
              headerStyle: {backgroundColor: '#00aa00'},
              headerTintColor: '#ffffff',
              headerLeft: () => (
                <TouchableWithoutFeedback
                  onPress={() => this.goBack({navigation}, 'Home')}>
                  <Icon name="chevron-left" size={35} color="white" />
                </TouchableWithoutFeedback>
              ),
            })}
          />

          <Stack.Screen
            name="Seller Notification"            
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  Notification
                </Text>
              ),
              headerStyle: {backgroundColor: '#00aa00'},
              headerTintColor: '#ffffff',
              headerLeft: () => (
                <TouchableWithoutFeedback
                  onPress={() => this.props.navigation.navigate.goBack(null)}>
                  <Icon name="chevron-left" size={35} color="white" />
                </TouchableWithoutFeedback>
              ),
              headerRight: () => (
                <TouchableWithoutFeedback
                    onPress={() => {this.setState({cashCheckout:true})}}>
                    <Icon2
                      name="cash-refund"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                    />
                  </TouchableWithoutFeedback>
              ),
            })}
            >
            {props => (
              <SellerNotification
                {...props}
                {...this.state}
               cashCheckout = {this.state.cashCheckout}
               onCashCheckoutOk = {this.cashCheckoutOk}
               onCashCheckoutCancel = {this.cashCheckoutCancel}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Seller Profile"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  Profile
                </Text>
              ),
              headerStyle: {backgroundColor: '#00aa00'},
              headerTintColor: '#ffffff',
              headerLeft: () => null,
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                   <TouchableWithoutFeedback
                    onPress={() => {this.setState({cashCheckout:true})}}>
                    <Icon2
                      name="cash-refund"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                    />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('Notification')}>
                    <Icon
                      name="notifications-none"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                    />
                  </TouchableWithoutFeedback>
                </View>
              ),
            })}>
            {props => (
              <SellerProfile
                {...props}
                onFetchDetails={this.fetchDetails}
                userData={this.state.userData}
                saveIcon={this.state.saveIcon}
                onLogout={this.props.onLogoutSession}
                cashCheckout = {this.state.cashCheckout}
               onCashCheckoutOk = {this.cashCheckoutOk}
               onCashCheckoutCancel = {this.cashCheckoutCancel}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Edit Seller Profile"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  Edit Profile
                </Text>
              ),
              headerStyle: {backgroundColor: '#00aa00'},
              headerTintColor: '#ffffff',
              headerLeft: () => (
                <TouchableWithoutFeedback
                  onPress={() => this.goBack({navigation}, 'My Address')}>
                  <Icon name="chevron-left" size={35} color="white" />
                </TouchableWithoutFeedback>
              ),
              headerRight: () => (
                <TouchableWithoutFeedback onPress={() => this.clickedSave()}>
                  <Icon2
                    name="content-save-outline"
                    size={24}
                    style={{padding: 10, color: '#ffffff'}}
                  />
                </TouchableWithoutFeedback>
              ),
            })}>
            {props => (
              <EditSellerProfile
                {...props}
                saveIcon={this.state.saveIcon}
                onFetchDetails={this.fetchDetails}
                userData={this.state.userData}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="My Address"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  My Address
                </Text>
              ),
              headerStyle: {backgroundColor: '#00aa00'},
              headerTintColor: '#ffffff',
              headerRightContainerStyle: styles.headerRightContainerStyle,
              headerLeft: () => (
                <TouchableWithoutFeedback
                  onPress={() => this.goBack({navigation}, 'Profile')}>
                  <Icon name="chevron-left" size={35} color="white" />
                </TouchableWithoutFeedback>
              ),
              headerRight: () => (
                <View style={{width: 300}}>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('Add Address')}>
                    <Icon
                      style={{textAlign: 'right'}}
                      name="add-circle-outline"
                      color={'white'}
                      size={24}
                    />
                  </TouchableWithoutFeedback>
                </View>
              ),
            })}>
            {props => (
              <MyAddress
                {...props}
                {...this.state}
                onFetchAddress={this.fetchAddress}
                onFetchEditAddress={this.fetchEditAddress}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Add Address"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  Add Address
                </Text>
              ),
              headerStyle: {backgroundColor: '#00aa00'},
              headerTintColor: '#ffffff',
              headerLeft: () => (
                <TouchableWithoutFeedback
                  onPress={() => this.goBack({navigation}, 'My Address')}>
                  <Icon name="chevron-left" size={35} color="white" />
                </TouchableWithoutFeedback>
              ),
              headerRight: () => (
                <TouchableWithoutFeedback
                  onPress={() => this.clickedSaveAddress()}>
                  <Icon2
                    name="content-save-outline"
                    size={24}
                    style={{padding: 10, color: '#ffffff'}}
                  />
                </TouchableWithoutFeedback>
              ),
            })}>
            {props => (
              <AddAddress {...props} onFetchAddress={this.fetchAddress} saveIconAddress = {this.state.saveIconAddress} countriesData = {this.state.countriesData}/>
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Edit Address"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  Edit Address
                </Text>
              ),
              headerStyle: {backgroundColor: '#00aa00'},
              headerTintColor: '#ffffff',
              headerLeft: () => (
                <TouchableWithoutFeedback
                  onPress={() => this.goBack({navigation}, 'My Address')}>
                  <Icon name="chevron-left" size={35} color="white" />
                </TouchableWithoutFeedback>
              ),
              headerRight: () => (
                <TouchableWithoutFeedback
                  onPress={() => this.clickedSaveEditAddress()}>
                  <Icon2
                    name="content-save-outline"
                    size={24}
                    style={{padding: 10, color: '#ffffff'}}
                  />
                </TouchableWithoutFeedback>
              ),
            })}>
            {props => (
              <EditAddress
                {...props}
                saveEditIconAddress={this.state.saveEditIconAddress}
                onFetchAddress={this.fetchAddress}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default SellerRoutes;
