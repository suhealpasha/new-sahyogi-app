import 'react-native-gesture-handler';
import React, {Component, useState, useEffect} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
  AsyncStorage,
  Image,
  Animated,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Components/Screens/BuyerScreens/home';
import Varities from '../Components/Screens/BuyerScreens/varities';
import RegionsOrigins from '../Components/Screens/BuyerScreens/regionsOrigins';
import Listing from '../Components/Screens/BuyerScreens/listing';
import Inventory from '../Components/Screens/SellerScreens/inventory';
import OrderListing from '../Components/Screens/SellerScreens/orderListing';
import AllRegions from '../Components/Screens/BuyerScreens/allRegions';
import AllOrigins from '../Components/Screens/BuyerScreens/allOrigins';
import Wishlist from '../Components/Screens/BuyerScreens/wishlist';
import Profile from '../Components/Screens/BuyerScreens/Profile';
import Notification from '../Components/Screens/BuyerScreens/notification';
import SellerNotification from '../Components/Screens/SellerScreens/sellerNotification';
import OrderDetail from '../Components/Screens/BuyerScreens/orderDetail';
import SellerOrderDetail from '../Components/Screens/SellerScreens/sellerOrderDetail';
import Cart from '../Components/Screens/BuyerScreens/cart';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from '../Components/utils/Search';
import {
  COLOR,
  ThemeContext,
  getTheme,
  Badge,
  Icon3,
  Avatar,
} from 'react-native-material-ui';
import MyAddress from '../Components/Screens/BuyerScreens/myAddress';
import EditAddress from './editAddress';
import AddAddress from './addAddress';
import MyOrders from '../Components/Screens/BuyerScreens/myOrders';
import EditProfile from '../Components/Screens/BuyerScreens/editProfile';
import {connect} from 'react-redux';
import ProductDescriptionTemplate from '../Components/Screens/BuyerScreens/productDescriptionTemplate';
import {SearchBar} from 'react-native-elements';
import axios from 'axios';
import * as api from '../assets/api/api';

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
class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogout: false,
      isLoggedIn: null,
      sellerHomeScreen: false,
      width: Dimensions.get('window').width,
      home: false,
      searchText: '',
      searchBarShow: false,
      searchBarText: '',
      clickedIcon: null,
      functionalIcon: false,
      searchIcon: true,
      saveIcon: false,
      saveIconAddress: false,
      saveEditIconAddress: false,
      user_name: '',
      mobile: '',
      email: '',
      profilePic: '',
      gender: '',
      addressData: [],
      editAddressData: [],
      countriesData:[],
      featuredProductsData: [],
      latestProductsData: [],
      regionsData: [],
      allRegionsData: [],
      buyerCartData: [],
      cartCount: null,
      buyerOrderData:[],
      notificationCount:null
    };
  }

  componentDidMount() {
    this.fetchHomeScreenData();
    this.fetchDetails();
    this.fetchAddress();
    this.fetchAllRegions();
    this.fetchBuyerCart();
    this.fetchCountries();
    this.fetchBuyerOrders();
  }

  goBack = ({navigation}, path) => {
    if (path === 'Home') {
      navigation.navigate('Home');
    } else {
      navigation.goBack(null);
    }
    if (path === 'Listing') {
      this.clickedIcon('Filter');
    }
    this.setState({home: true});
  };

  changeTitleText = ({navigation}, param1, param2) => {
    navigation.navigate(param1, {
      searchText: param2,
    });
  };

  clickedIcon = async arg => {
    await this.setState({
      functionalIcon: !this.state.functionalIcon,
      clickedIcon: arg,
    });
  };

  clickedSave = () => {
    this.setState({saveIcon: !this.state.saveIcon});
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

  _logoutUserSession = () => {
    this.setState({isLogout: true});
    this.props.testFunc();
  };

  fetchHomeScreenData = async () => {
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    await axios
      .get(api.buyerHomeAPI, {
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
            featuredProductsData: res.data.data.featured_products,
            latestProductsData: res.data.data.latest_products,
            regionsData: res.data.data.regions,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchDetails = async () => {
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    console.log(access_token);
    await axios
      .get(api.buyerDetailsAPI, {
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
            user_name: res.data.data.first_name,
            mobile: res.data.data.mobile_no,
            email: res.data.data.email,
            profilePic: res.data.data.profile_pic,
            gender: res.data.data.gender,
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
      .get(api.buyerAddressAPI, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {        
        this.setState({addressData: res.data.data.buyer_addresses});
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchAllRegions = async () => {
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    axios
      .get(api.regionsAPI, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        this.setState({allRegionsData: res.data.data});
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

  fetchBuyerCart = async () => {
    this.setState({spinner: true});
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    axios
      .get(api.buyerProductsCartData, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {           
        if (res.status) {
          if(res.data.data === null){ this.setState({noDataAvailable: true, spinner: false,cartCount:null});}
          else{
            if (res.data.data.cart_list.length <= 0) {
              this.setState({noDataAvailable: true, spinner: false,cartCount:null});
            } else { 
              
              let count = res.data.data.cart_list.length;            
              this.setState({
                spinner: false,
                cartCount:count,
                buyerCartData: res.data.data,
              });
            }
          } 
           }
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  };

  fetchBuyerOrders = async () => {
    
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    axios
      .get(api.buyerOrderListAPI, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {          
        this.setState({buyerOrderData: res.data.data});
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateSearch = search => {
    this.setState({searchBarText: search});
  };

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
                  microffee
                </Text>
              ),
              headerStyle: {backgroundColor: '#00aa00'},
              headerTintColor: '#ffffff',
              headerLeft: () => null,
              headerRight: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingRight: 10,
                    paddingLeft: 10,
                  }}>
                    {this.state.notificationCount > 0 ? 
                  <Badge
                    size={15}
                    text={3}
                    style={{
                      container: {top: 5, right: 0, backgroundColor: '#3e708f'},
                    }}>
                    <Icon2
                      name="bell-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Notification')}
                    />
                  </Badge>
                  :
                 <Icon2
                      name="bell-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Notification')}
                    /> 
                  }
                  { this.state.cartCount > 0 ? 
                  <Badge
                    size={15}
                    text={this.state.cartCount}
                    style={{
                      container: {top: 5, right: 0, backgroundColor: '#3e708f'},
                    }}>
                    <Icon2
                      name="cart-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Cart')}
                    />
                  </Badge>
                  :
                <Icon2
                      name="cart-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Cart')}
                    /> 
                  }
                </View>
              ),
            })}>
            {props => (
              <HomeScreen
                {...props}
                {...this.state}
                featuredProductsData={this.state.featuredProductsData}
                regionsData={this.state.regionsData}
                latestProductsData={this.state.latestProductsData}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Listing"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  {this.props.listingTitle}
                </Text>
              ),
              headerStyle: {backgroundColor: '#00aa00'},
              headerTintColor: '#ffffff',
              headerLeft: () => (
                <TouchableWithoutFeedback
                  onPress={() => this.goBack({navigation})}>
                  <Icon name="chevron-left" size={35} color="white" />
                </TouchableWithoutFeedback>
              ),
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  <TouchableWithoutFeedback
                    onPress={() => this.clickedIcon('Sort')}>
                    <Icon2
                      name="sort"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                    />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => this.clickedIcon('Filter')}>
                    <Icon
                      name="filter-list"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                    />
                  </TouchableWithoutFeedback>
                </View>
              ),
            })}
            initialParams={{filterOn: this.state.filterOn}}>
            {props => (
              <Listing
                {...props}
                clickedIcon={this.state.clickedIcon}
                functionalIcon={this.state.functionalIcon}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="All Regions"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  All Regions
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
            })}>
            {props => (
              <AllRegions
                {...props}
                allRegionsData={this.state.allRegionsData}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="All Origins"
            options={
              !this.state.searchBarShow
                ? ({navigation, route}) => ({
                    animationEnabled: false,
                    headerTitle: (
                      <Text
                        style={{
                          textAlign: 'center',
                          flex: 1,
                          fontFamily: 'Gotham Black Regular',
                        }}>
                        {this.props.regionName}
                      </Text>
                    ),
                    headerStyle: {backgroundColor: '#00aa00'},
                    headerTintColor: '#ffffff',
                    headerLeft: () => (
                      <TouchableWithoutFeedback
                        onPress={() =>
                          this.goBack({navigation}, 'All Regions')
                        }>
                        <Icon name="chevron-left" size={35} color="white" />
                      </TouchableWithoutFeedback>
                    ),
                    headerRight: () => (
                      <View style={{flexDirection: 'row'}}>
                        <TouchableWithoutFeedback
                          onPress={() => this.setState({searchBarShow: true})}>
                          <Icon
                            name="search"
                            size={24}
                            style={{padding: 10, color: '#ffffff'}}
                          />
                        </TouchableWithoutFeedback>
                      </View>
                    ),
                  })
                : ({navigation, route}) => ({
                    headerTitle: () => null,
                    headerLeft: () => (
                      <SearchBar
                        platform="android"
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={this.state.searchBarText}
                        cancelIcon
                        inputContainerStyle={{width: this.state.width}}
                        onCancel={() => {
                          this.setState({searchBarShow: false});
                        }}
                      />
                    ),
                  })
            }>
            {props => (
              <AllOrigins
                {...props}
                searchBarText={this.state.searchBarText}
                searchBarShow={this.state.searchBarShow}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Varities"
            options={
              !this.state.searchBarShow
                ? ({navigation, route}) => ({
                    animationEnabled: false,
                    headerTitle: (
                      <Text
                        style={{
                          textAlign: 'center',
                          flex: 1,
                          fontFamily: 'Gotham Black Regular',
                        }}>
                        Varities
                      </Text>
                    ),
                    headerStyle: {backgroundColor: '#00aa00'},
                    headerTintColor: '#ffffff',
                    headerLeft: () => (
                      <TouchableWithoutFeedback
                        onPress={() => this.goBack({navigation}, 'Listing')}>
                        <Icon name="chevron-left" size={35} color="white" />
                      </TouchableWithoutFeedback>
                    ),
                    headerRight: () => (
                      <View style={{flexDirection: 'row'}}>
                        <TouchableWithoutFeedback
                          onPress={() => this.setState({searchBarShow: true})}>
                          <Icon
                            name="search"
                            size={24}
                            style={{padding: 10, color: '#ffffff'}}
                          />
                        </TouchableWithoutFeedback>
                      </View>
                    ),
                  })
                : ({navigation, route}) => ({
                    headerTitle: () => null,
                    headerLeft: () => (
                      <SearchBar
                        platform="android"
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={this.state.searchBarText}
                        cancelIcon
                        inputContainerStyle={{width: this.state.width}}
                        onCancel={() => {
                          this.setState({searchBarShow: false});
                        }}
                      />
                    ),
                  })
            }>
            {props => (
              <Varities
                {...props}
                onClickedIcon={() => this.clickedIcon('Filter')}
                searchBarText={this.state.searchBarText}
                searchBarShow={this.state.searchBarShow}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Regions and Origins"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  Regions and Origins
                </Text>
              ),
              headerStyle: {backgroundColor: '#00aa00'},
              headerTintColor: '#ffffff',
              headerLeft: () => (
                <TouchableWithoutFeedback
                  onPress={() => this.goBack({navigation}, 'Listing')}>
                  <Icon name="chevron-left" size={35} color="white" />
                </TouchableWithoutFeedback>
              ),
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('')}>
                    <Icon
                      name="search"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                    />
                  </TouchableWithoutFeedback>
                </View>
              ),
            })}
            initialParams={{filterOn: this.state.filterOn}}>
            {props => (
              <RegionsOrigins
                {...props}
                onClickedIcon={() => this.clickedIcon('Filter')}
                allRegionsData={this.state.allRegionsData}
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
            name="Cart"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  Cart
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
              headerRight: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingRight: 10,
                    paddingLeft: 10,
                  }}>
                    {this.state.notificationCount > 0 ? 
                  <Badge
                    size={15}
                    text={3}
                    style={{
                      container: {top: 5, right: 0, backgroundColor: '#3e708f'},
                    }}>
                    <Icon2
                      name="bell-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Notification')}
                    />
                  </Badge>
                  :
                 <Icon2
                      name="bell-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Notification')}
                    /> 
                  }                 
                </View>
              ),
            })}>
            {props => (
              <Cart {...props}  {...this.state} buyerCartData={this.state.buyerCartData} cartCount ={this.state.cartCount} onfetchBuyerCart={this.fetchBuyerCart} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Wishlist"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  Wishlist
                </Text>
              ),
              headerStyle: {backgroundColor: '#00aa00'},
              headerTintColor: '#ffffff',
              headerLeft: () => null,
              headerRight: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingRight: 10,
                    paddingLeft: 10,
                  }}>
                    {this.state.notificationCount > 0 ? 
                  <Badge
                    size={15}
                    text={3}
                    style={{
                      container: {top: 5, right: 0, backgroundColor: '#3e708f'},
                    }}>
                    <Icon2
                      name="bell-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Notification')}
                    />
                  </Badge>
                  :
                 <Icon2
                      name="bell-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Notification')}
                    /> 
                  }
                  { this.state.cartCount > 0 ? 
                  <Badge
                    size={15}
                    text={this.state.cartCount}
                    style={{
                      container: {top: 5, right: 0, backgroundColor: '#3e708f'},
                    }}>
                    <Icon2
                      name="cart-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Cart')}
                    />
                  </Badge>
                  :
                <Icon2
                      name="cart-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Cart')}
                    /> 
                  }
                </View>
              ),
            })}>
            {props => <Wishlist {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="Profile"
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
                <View
                  style={{
                    flexDirection: 'row',
                    paddingRight: 10,
                    paddingLeft: 10,
                  }}>
                    {this.state.notificationCount > 0 ? 
                  <Badge
                    size={15}
                    text={3}
                    style={{
                      container: {top: 5, right: 0, backgroundColor: '#3e708f'},
                    }}>
                    <Icon2
                      name="bell-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Notification')}
                    />
                  </Badge>
                  :
                 <Icon2
                      name="bell-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Notification')}
                    /> 
                  }
                  { this.state.cartCount > 0 ? 
                  <Badge
                    size={15}
                    text={this.state.cartCount}
                    style={{
                      container: {top: 5, right: 0, backgroundColor: '#3e708f'},
                    }}>
                    <Icon2
                      name="cart-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Cart')}
                    />
                  </Badge>
                  :
                <Icon2
                      name="cart-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Cart')}
                    /> 
                  }
                </View>
              ),
            })}
            {...this.props}>
            {props => (
              <Profile
                {...props}
                onFetchDetails={this.fetchDetails}               
                onLogout={this.props.onLogoutSession}
                saveIcon={this.state.saveIcon}
                name={this.state.user_name}
                mobile={this.state.mobile}
                email={this.state.email}
                profilePic={this.state.profilePic}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Edit Profile"
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
              <EditProfile
                {...props}
                saveIcon={this.state.saveIcon}
                onFetchDetails={this.fetchDetails}
                onFetchAddress={this.fetchAddress}
                name={this.state.user_name}
                mobile={this.state.mobile}
                email={this.state.email}
                profilePic={this.state.profilePic}
                gender={this.state.gender}
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
                onfetchBuyerCart={this.fetchBuyerCart}
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
              <AddAddress {...props} onFetchAddress={this.fetchAddress} saveIconAddress = {this.state.saveIconAddress} countriesData={this.state.countriesData} onfetchBuyerCart={this.fetchBuyerCart}/>
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
                countriesData={this.state.countriesData}
                onfetchBuyerCart={this.fetchBuyerCart}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Notification"
            component={Notification}
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
                  onPress={() => this.goBack({navigation}, 'Home')}>
                  <Icon name="chevron-left" size={35} color="white" />
                </TouchableWithoutFeedback>
              ),
              headerRight: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingRight: 10,
                    paddingLeft: 10,
                  }}>                    
                  { this.state.cartCount > 0 ? 
                  <Badge
                    size={15}
                    text={this.state.cartCount}
                    style={{
                      container: {top: 5, right: 0, backgroundColor: '#3e708f'},
                    }}>
                    <Icon2
                      name="cart-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Cart')}
                    />
                  </Badge>
                  :
                <Icon2
                      name="cart-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Cart')}
                    /> 
                  }
                </View>
              ),
            })}
            {...this.props}
          />
          <Stack.Screen
            name="Product Description"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  {this.props.varietyName}
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
              headerRight: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingRight: 10,
                    paddingLeft: 10,
                  }}>
                    {this.state.notificationCount > 0 ? 
                  <Badge
                    size={15}
                    text={3}
                    style={{
                      container: {top: 5, right: 0, backgroundColor: '#3e708f'},
                    }}>
                    <Icon2
                      name="bell-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Notification')}
                    />
                  </Badge>
                  :
                 <Icon2
                      name="bell-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Notification')}
                    /> 
                  }
                  { this.state.cartCount > 0 ? 
                  <Badge
                    size={15}
                    text={this.state.cartCount}
                    style={{
                      container: {top: 5, right: 0, backgroundColor: '#3e708f'},
                    }}>
                    <Icon2
                      name="cart-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Cart')}
                    />
                  </Badge>
                  :
                <Icon2
                      name="cart-outline"
                      size={24}
                      style={{padding: 10, color: '#ffffff'}}
                      onPress={() => navigation.navigate('Cart')}
                    /> 
                  }
                </View>
              ),
            })}>
            {props => <ProductDescriptionTemplate {...props} onfetchBuyerCart={this.fetchBuyerCart}/>}
          </Stack.Screen>

          <Stack.Screen
            name="My Orders"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  My Orders
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
                <View style={{flexDirection: 'row'}}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.setState({searchIcon: !this.state.searchIcon})
                    }>
                    {this.state.searchIcon ? (
                      <Icon
                        name="search"
                        size={24}
                        style={{padding: 10, color: '#ffffff'}}
                      />
                    ) : (
                      <TextInput
                        style={{
                          height: 50,
                          fontSize: 20,
                          padding: 10,
                          width: 150,
                        }}
                        placeholder="Search"
                        autoFocus={true}
                        onChangeText={text =>
                          this.changeTitleText({navigation}, 'My Orders', text)
                        }
                      />
                    )}
                  </TouchableWithoutFeedback>
                </View>
              ),
            })}>
            {props => <MyOrders {...props} {...this.state}  onFetchBuyerOrders={this.fetchBuyerOrders}
                buyerOrderData={this.state.buyerOrderData}/>}
          </Stack.Screen>
          <Stack.Screen
            name="Order Detail"            
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    fontFamily: 'Gotham Black Regular',
                  }}>
                  Order #{this.props.orderNumber}
                </Text>
              ),
              headerStyle: {backgroundColor: '#00aa00'},
              headerTintColor: '#ffffff',
              headerLeft: () => (
                <TouchableWithoutFeedback
                  onPress={() => this.goBack({navigation}, 'My Orders')}>
                  <Icon name="chevron-left" size={35} color="white" />
                </TouchableWithoutFeedback>
              ),
            })}
          >
            {props => <OrderDetail {...props} {...this.state}  />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    addressId: state.reducer.addressId,
    regionName: state.reducer.regionName,
    varietyName: state.reducer.varietyName,
    orderNumber: state.reducer.orderNumber,
    listingTitle: state.reducer.listingTitle,
  };
};
export default connect(
  mapStateToProps,
  null,
)(Routes);
