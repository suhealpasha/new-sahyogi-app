import 'react-native-gesture-handler';
import React, {Component, useState, useEffect} from 'react';
import {
  BackHandler,
  TouchableWithoutFeedback,
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
} from 'react-native';
import Settings from '../Components/Screens/AgentScreens/settings';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {COLOR, ThemeContext, getTheme} from 'react-native-material-ui';
import Notification from 'react-native-vector-icons/SimpleLineIcons';
import Home from '../Components/Screens/AgentScreens/home';
import Category from '../Components/Screens/AgentScreens/category';
import CartIcon from '../Components/utils/components/Icons/cart';
import LikeIcon from '../Components/utils/components/Icons/like';
import BackIcon from '../Components/utils/components/Icons/back';
import SearchIcon from '../Components/utils/components/Icons/search';
import FilterIcon from '../Components/utils/components/Icons/filter';
import SearchClear from 'react-native-vector-icons/AntDesign';
import MyOffers from '../Components/Screens/AgentScreens/myOffers';
import MyOrders from '../Components/Screens/AgentScreens/myOrders';
import OrderDetails from '../Components/Screens/AgentScreens/orderDetails';
import OrderHelpcenter from '../Components/Screens/AgentScreens/orderHelpcenter';
import ShareIcon from '../Components/utils/components/Icons/share';
import Filter from '../Components/utils/filter';
import ProductDetails from '../Components/Screens/AgentScreens/ProductDetail/productDetails';
import FramesIcon from '../Components/utils/components/Icons/frames';
import {connect} from 'react-redux';
import * as actionTypes from '../Store/action';
import SearchCustomer from './searchCustomers';
import Search from '../Components/Screens/AgentScreens/search';
import MainCategory from '../Components/Screens/AgentScreens/maincategory';
import Wishlist from '../Components/Screens/AgentScreens/wishlist';
import Cart from '../Components/Screens/AgentScreens/cart';
import Address from '../Components/Screens/AgentScreens/address';
import PlacedOrder from '../Components/Screens/AgentScreens/OrderPlaced';
import Profile from '../Components/Screens/AgentScreens/profile';
import Tc from '../Components/Screens/AgentScreens/tc';
import ContactUs from '../Components/Screens/AgentScreens/contactUs';
import Feedback from '../Components/Screens/AgentScreens/feedback';
import AgentAddress from '../Components/Screens/AgentScreens/agentAddress';
import ProfileDetails from '../Components/Screens/AgentScreens/profileDetails';
import AddCustomer from '../Components/Screens/AgentScreens/addCustomer';
import BankDetails from '../Components/Screens/AgentScreens/bankDetails';
import CompanyDetails from '../Components/Screens/AgentScreens/companyDetails';
import {result} from 'validate.js';
const Stack = createStackNavigator();

class AgentRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogout: false,
      isLoggedIn: null,
      width: Dimensions.get('window').width,
      searchbar: false,
      customers: [
        {key: 1, name: 'Ashok Opticals, Bangalore'},
        {key: 2, name: 'Ashok Opticals, Hubali'},
        {key: 3, name: 'Ashok Opticals, Bangalore'},
        {key: 4, name: 'Ashok Opticals, Bangalore'},
        {key: 5, name: 'Ashok Opticals, Rothak'},
        {key: 6, name: 'Ashok Opticals, Lucknow'},
        {key: 7, name: 'Ashok Opticals, Bangalore'},
        {key: 8, name: 'Ashok Opticals, Bangalore'},
        {key: 9, name: 'Ashok Opticals, Bangalore'},
        {key: 10, name: 'Ashok Opticals, Rothak'},
        {key: 11, name: 'Ashok Opticals, Lucknow'},
        {key: 12, name: 'Ashok Opticals, Bangalore'},
        {key: 13, name: 'Ashok Opticals, Bangalore'},
        {key: 14, name: 'Ashok Opticals, Bangalore'},
        {key: 15, name: 'Ashok Opticals, Rothak'},
        {key: 16, name: 'Ashok Opticals, Lucknow'},
        {key: 17, name: 'Birla Opticals, Bangalore'},
        {key: 18, name: 'Chauhan Opticals, Bangalore'},
        {key: 19, name: 'Birla Opticals, Bangalore'},
      ],
      searchText: '',
      mostSearched: [],
    };
  }

  changeTitleText = ({navigation}, param1, param2) => {
    navigation.navigate(param1, {
      searchText: param2,
    });
  };

  async componentDidMount() {
    // await AsyncStorage.removeItem('history');
    // let exisitingData = await AsyncStorage.getItem('history');
    // console.log("Old data==>",exisitingData);
  }

  clickedSearch = () => {
    this.setState({searchbar: !this.state.searchbar, searchText: ''});
  };

  goBack = async ({navigation}, path) => {
    if (path === 'Home') {
      navigation.navigate('Home');
      await this.props.onTabClicked('home',100);
    } else if (path === 'Category') {
      navigation.navigate('Category',{'search':false});
      await this.props.onTabClicked('category',125);
    }
    else if (path === 'MainCategory') {
      if(this.state.searchbar){
        this.clickedSearch();
      }
      navigation.navigate('MainCategory',{'search':false});
      await this.props.onTabClicked('category',125);
    }
  };

  updateSearch = search => {
    this.setState({searchText: search});
  };

  addSearchHistory = async ({navigation}) => {
    let mostSearchedArray = [];
    let exisitingData = await AsyncStorage.getItem('history');
    exisitingData = exisitingData ? exisitingData.split(',') : [];
    exisitingData.push(this.state.searchText);
    await AsyncStorage.setItem('history', exisitingData.toString());
    const yourArrayWithoutDuplicates = [...new Set(exisitingData)];
    let duplicates = [...exisitingData];
    yourArrayWithoutDuplicates.forEach(item => {
      const i = duplicates.indexOf(item);
      duplicates = duplicates
        .slice(0, i)
        .concat(duplicates.slice(i + 1, duplicates.length));
    });
    duplicates.sort();
    var current = null;
    var cnt = 0;
    let result = [];
    for (var i = 0; i < duplicates.length; i++) {
      if (duplicates[i] != current) {
        if (cnt > 0) {
          result.push({name: current, times: cnt});
        }
        current = duplicates[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 0) {
      result.push({name: current, times: cnt});
    }

    result = result.sort((a, b) => (a.times < b.times ? 1 : -1));

    result.map((i, index) => {
      if (result.length >= 3) {
        if (index <= 2) {
          mostSearchedArray.push(i.name);
        }
      } else {
        mostSearchedArray.push(i.name);
      }
    });
    await this.setState({mostSearched: mostSearchedArray});
    navigation.navigate('Category',{'search':true})
    await this.props.onTabClicked('category',125)
  };

  navigate = async ({navigation}) => {
    let mostSearchedArray = [];
    let exisitingData = await AsyncStorage.getItem('history');
    exisitingData = exisitingData ? exisitingData.split(',') : [];   
    const yourArrayWithoutDuplicates = [...new Set(exisitingData)];
    let duplicates = [...exisitingData];
    yourArrayWithoutDuplicates.forEach(item => {
      const i = duplicates.indexOf(item);
      duplicates = duplicates
        .slice(0, i)
        .concat(duplicates.slice(i + 1, duplicates.length));
    });
    duplicates.sort();
    var current = null;
    var cnt = 0;
    let result = [];
    for (var i = 0; i < duplicates.length; i++) {
      if (duplicates[i] != current) {
        if (cnt > 0) {
          result.push({name: current, times: cnt});
        }
        current = duplicates[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 0) {
      result.push({name: current, times: cnt});
    }

    result = result.sort((a, b) => (a.times < b.times ? 1 : -1));
    console.log(result)
    result.map((i, index) => {
      if (result.length >= 3) {
        if (index <= 2) {
          mostSearchedArray.push(i.name);
        }
      } else {
        mostSearchedArray.push(i.name);
      }
    });
    await this.setState({mostSearched: mostSearchedArray});
    await navigation.navigate('Search');
  };

  share = () =>{
  Share.open(options)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    err && console.log(err);
  });
}

  render() {
    const newData = this.state.customers.filter(item => {
      const itemName = item.name.toUpperCase();
      if (this.state.searchText) {
        const textData = this.state.searchText.toUpperCase();
        return itemName.indexOf(textData) > -1;
      }
    });

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

    let categoryTitle = [
      <View>
        <Text
          style={{
            fontWeight: '600',
            flex: 1,
            fontFamily: 'AvenirNext-DemiBold',
            fontSize: 20,
            color: '#333333',
          }}>
          1000 Items
        </Text>
      </View>,
    ];
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SearchCustomer"
            options={({navigation, route}) =>
              !this.state.searchbar
                ? {
                    animationEnabled: false,
                    headerTitle: (
                      <Text
                        style={{
                          fontWeight: '500',
                          flex: 1,
                          fontFamily: 'AvenirNextFont',
                          fontSize: 20,
                          color: '#333333',
                        }}>
                        Search Customer
                      </Text>
                    ),
                    headerLeft: () => null,
                    headerLeftContainerStyle: {paddingLeft: 16},
                    headerRight: () => (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: this.state.width / 5,
                          marginRight: 16,
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity onPress={() => this.clickedSearch()}>
                          <SearchIcon />
                        </TouchableOpacity>
                        <TouchableWithoutFeedback
                          onPress={() => this.clickedSave()}>
                          <FilterIcon color="#FF7D01" />
                        </TouchableWithoutFeedback>
                      </View>
                    ),
                  }
                : {
                    animationEnabled: false,
                    headerTitle: () => null,
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => this.goBack({navigation}, 'Home')}>
                        <BackIcon style={{marginLeft: 10}} />
                      </TouchableOpacity>
                    ),
                    headerLeftContainerStyle: {paddingLeft: 16},
                    headerRight: () => (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: 16,
                        }}>
                        <TextInput
                          style={{
                            fontSize: 14,
                            width: this.state.width - 64,
                            fontFamily: 'GothamBook',
                            color: '#999999',
                            padding: 16,
                          }}
                          placeholder="Search your customers"
                          onChangeText={this.updateSearch}
                          // value={this.state.searchBarText}
                          // underlineColorAndroid={'#95A5A6'}
                          // autoFocus={true}
                          // onChangeText={text =>
                          //   this.changeTitleText({navigation}, 'Search', text)
                          // }
                        />
                        <SearchClear
                          name="closecircle"
                          size={20}
                          color={'#ff7d01'}
                          onPress={() => this.clickedSearch()}
                        />
                      </View>
                    ),
                  }
            }
            // initialParams={{keyword: this.state.searchText}}
          >
            {props => (
              <SearchCustomer
                {...this.state}
                {...props}
                newData={newData}
                pressSkip={() => this.props.pressSkip()}
                clickedSearch={() => {
                  this.clickedSearch();
                }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Home"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: (
                <Text
                  style={{
                    fontWeight: 'bold',
                    flex: 1,
                    fontFamily: 'AvenirNext-DemiBold',
                    fontSize: 20,
                    color: '#333333',
                  }}>
                  Hi Divya!
                </Text>
              ),

              headerLeft: () => null,
              headerLeftContainerStyle: {paddingLeft: 16},
              headerRight: () => (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: this.state.width / 2.5,
                    marginRight: 16,
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => this.navigate({navigation}, 'Search')}>
                    <SearchIcon />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('Wishlist')} >  
                    <LikeIcon />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <CartIcon   />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.clickedSearch()}>
                    <Notification name="bell" size={20} color="#ff7d01" />
                  </TouchableOpacity>
                </View>
              ),
            })}>
            {props => (
              <Home
                {...this.state}
                {...props}
                closeSearch={() => this.clickedSearch()}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Search"
            options={({navigation, route}) =>
              !this.state.searchbar
                ? {
                    animationEnabled: false,
                    headerTitle: (
                      <Text
                        style={{
                          fontWeight: 'bold',
                          flex: 1,
                          fontFamily: 'AvenirNext-DemiBold',
                          fontSize: 20,
                          color: '#333333',
                        }}>
                        Hi Divya!
                      </Text>
                    ),

                    headerLeft: () => null,
                    headerLeftContainerStyle: {paddingLeft: 16},
                    headerRight: () => (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: this.state.width / 2.5,
                          marginRight: 16,
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity onPress={() => this.clickedSearch()}>
                          <SearchIcon />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Wishlist')} >  
                    <LikeIcon />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                          <CartIcon />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.clickedSearch()}>
                          <Notification name="bell" size={20} color="#ff7d01" />
                        </TouchableOpacity>
                      </View>
                    ),
                  }
                : {
                    animationEnabled: false,
                    headerTitle: () => null,
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}>
                        <BackIcon style={{marginLeft: 10}} />
                      </TouchableOpacity>
                    ),
                    headerLeftContainerStyle: {paddingLeft: 16},
                    headerRight: () => (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: 16,
                        }}>
                        <TextInput
                          style={{
                            fontSize: 14,
                            width: this.state.width - 64,
                            fontFamily: 'GothamBook',
                            color: '#999999',
                            padding: 16,
                          }}
                          placeholder="Search"
                          onChangeText={this.updateSearch}
                          onBlur={()=>this.addSearchHistory({navigation})}
                          // value={this.state.searchBarText}
                          // underlineColorAndroid={'#95A5A6'}
                          // autoFocus={true}
                          // onChangeText={text =>
                          //   this.changeTitleText({navigation}, 'Search', text)
                          // }
                        />
                        <SearchClear
                          name="closecircle"
                          size={20}
                          color={'#ff7d01'}
                          onPress={() => this.clickedSearch()}
                        />
                      </View>
                    ),
                  }
            }>
            {props => (
              <Search
                {...this.state}
                {...props}
                closeSearch={() => this.clickedSearch()}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="MainCategory"
            options={({navigation, route}) =>
            
              !this.state.searchbar
                ? {
                 
                    animationEnabled: false,
                    headerTitle: ({style, children: title}) => {
                      return (
                        <View>
                          <Text
                            style={{
                              fontWeight: '600',
                              flex: 1,
                              fontFamily: 'AvenirNext-DemiBold',
                              fontSize: 20,
                              color: '#333333',
                            }}
                            >
                            Category
                          </Text>
                         
                        </View>
                      );
                    },
                    headerLeft: () => null,
                    // (
                    //   <TouchableOpacity
                    //     onPress={() => this.goBack({navigation}, 'Home')}>
                    //     <BackIcon style={{marginLeft: 10}} />
                    //   </TouchableOpacity>
                    // ),
                    headerLeftContainerStyle: {paddingLeft: 16},
                    headerStyle:{elevation:0},
                    headerRight: () => (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: this.state.width / 3,
                          marginRight: 16,
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity onPress={() => this.clickedSearch()}>
                          <SearchIcon />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Wishlist')} >  
                    <LikeIcon />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                          <CartIcon />
                        </TouchableOpacity>
                      </View>
                    ),
                  }
                : {
                    animationEnabled: false,
                    headerTitle: () => null,
                    // headerLeft: props => (
                    //   <HeaderBackButton
                    //     {...props}
                    //     onPress={() => this.navigate({navigation}, 'Category')}
                    //   />
                    // ),
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => this.goBack({navigation}, 'Home')}>
                        <BackIcon style={{marginLeft: 20}} />
                      </TouchableOpacity>
                    ),
                    headerLeftContainerStyle: {paddingLeft: 16},
                    headerRight: () => (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: 16,
                        }}>
                        <TextInput
                          style={{
                            fontSize: 14,
                            width: this.state.width - 64,
                            fontFamily: 'GothamBook',
                            color: '#999999',
                            padding: 16,
                          }}
                          placeholder="Search brand and products"
                          // underlineColorAndroid={'#95A5A6'}
                          // autoFocus={true}
                          // onChangeText={text =>
                          //   this.changeTitleText({navigation}, 'Search', text)
                          // }
                        />
                        <SearchClear
                          name="closecircle"
                          size={20}
                          color={'#ff7d01'}
                          onPress={() => this.clickedSearch()}
                        />
                      </View>
                    ),
                  }
            }>
            {props => (
              <MainCategory
                {...this.state}
                {...props}
                closeSearch={() => this.clickedSearch()}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Category"
            options={({navigation, route}) =>
              !this.state.searchbar
                ? {
                    animationEnabled: false,
                    headerTitle: ({style, children: title}) => {
                      return (
                        <View>
                          <Text
                            style={{
                              fontWeight: '600',
                              flex: 1,
                              fontFamily: 'AvenirNext-DemiBold',
                              fontSize: 20,
                              color: '#333333',
                            }}
                            numberOfLines={2}>
                            Sunglass
                          </Text>
                          <Text
                            style={{
                              flex: 1,
                              fontFamily: 'AvenirNextFont',
                              fontSize: 12,
                              color: '#666666',
                            }}
                            numberOfLines={2}>
                            5000 Items
                          </Text>
                        </View>
                      );
                    },
                    headerLeft: () => null,
                    // (
                    //   <TouchableOpacity
                    //     onPress={() => this.goBack({navigation}, 'Home')}>
                    //     <BackIcon style={{marginLeft: 10}} />
                    //   </TouchableOpacity>
                    // ),
                    headerLeftContainerStyle: {paddingLeft: 16},
                    headerRight: () => (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: this.state.width / 3,
                          marginRight: 16,
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity onPress={() => this.clickedSearch()}>
                          <SearchIcon />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Wishlist')} >  
                    <LikeIcon />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                          <CartIcon />
                        </TouchableOpacity>
                      </View>
                    ),
                  }
                : {
                    animationEnabled: false,
                    headerTitle: () => null,
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => this.goBack({navigation}, 'MainCategory')}>
                        <BackIcon style={{marginLeft: 20}} />
                      </TouchableOpacity>
                    ),
                    headerLeftContainerStyle: {paddingLeft: 16},
                    headerRight: () => (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: 16,
                        }}>
                        <TextInput
                          style={{
                            fontSize: 14,
                            width: this.state.width - 64,
                            fontFamily: 'GothamBook',
                            color: '#999999',
                            padding: 16,
                          }}
                          placeholder="Search brand and products"
                          // underlineColorAndroid={'#95A5A6'}
                          // autoFocus={true}
                          // onChangeText={text =>
                          //   this.changeTitleText({navigation}, 'Search', text)
                          // }
                        />
                        <SearchClear
                          name="closecircle"
                          size={20}
                          color={'#ff7d01'}
                          onPress={() => this.clickedSearch()}
                        />
                      </View>
                    ),
                  }
            }>
            {props => (
              <Category
                {...this.state}
                {...props}
                closeSearch={() => this.clickedSearch()}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Filter"
            options={({navigation, route}) =>
              !this.state.searchbar
                ? {
                    animationEnabled: false,
                    headerTitle: ({style, children: title}) => {
                      return (
                        <View>
                          <Text
                            style={{
                              fontWeight: '600',
                              flex: 1,
                              fontFamily: 'AvenirNext-DemiBold',
                              fontSize: 20,
                              color: '#333333',
                            }}
                            numberOfLines={2}>
                            Filters
                          </Text>
                        </View>
                      );
                    },
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => this.goBack({navigation}, 'Category')}>
                        <BackIcon style={{marginLeft: 10}} />
                      </TouchableOpacity>
                    ),
                    headerLeftContainerStyle: {paddingLeft: 16},
                    headerRight: () => (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginRight: 16,
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity onPress={() => this.clickedSearch()}>
                          <SearchIcon />
                        </TouchableOpacity>
                      </View>
                    ),
                  }
                : {
                    headerTitle: () => null,
                    headerLeft: props => (
                      <HeaderBackButton
                        {...props}
                        onPress={() => {
                          // Do something
                        }}
                      />
                    ),
                    headerRight: () => (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: 16,
                        }}>
                        <TextInput
                          style={{
                            fontSize: 14,
                            width: this.state.width - 64,
                            fontFamily: 'GothamBook',
                            color: '#999999',
                            padding: 16,
                          }}
                          placeholder="Search brand and products"
                          // underlineColorAndroid={'#95A5A6'}
                          autoFocus={true}
                          // onChangeText={text =>
                          //   this.changeTitleText({navigation}, 'Search', text)
                          // }
                        />
                        <SearchClear
                          name="closecircle"
                          size={20}
                          color={'#ff7d01'}
                          onPress={() => this.clickedSearch()}
                        />
                      </View>
                    ),
                  }
            }>
            {props => <Filter {...this.state} {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="PRODUCTDETAILS"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: ({style, children: title}) => {
                return (
                  <View style={{width: '70%'}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        flex: 1,
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#333333',
                      }}
                      numberOfLines={1}>
                      United Colors Of Benetton
                    </Text>
                  </View>
                );
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}>
                  <BackIcon style={{marginLeft: 10}} />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {paddingLeft: 16},
              headerRight: () => (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: this.state.width / 3 - 20,
                    marginRight: 16,
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity>
                    <ShareIcon onPress={() => this.share()}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('Wishlist')} >  
                    <LikeIcon />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <CartIcon />
                  </TouchableOpacity>
                </View>
              ),
            })}>
            {props => <ProductDetails {...this.state} {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="Wishlist"
            options={({navigation, route}) =>
              !this.state.searchbar
                ? {
                    animationEnabled: false,
                    headerTitle: ({style, children: title}) => {
                      return (
                        <View>
                          <Text
                            style={{
                              fontWeight: '600',
                              flex: 1,
                              fontFamily: 'AvenirNext-DemiBold',
                              fontSize: 20,
                              color: '#333333',
                            }}
                            numberOfLines={2}>
                            Wishlist
                          </Text>
                          
                        </View>
                      );
                    },
                    headerLeft: () => null,
                    // (
                    //   <TouchableOpacity
                    //     onPress={() => this.goBack({navigation}, 'Home')}>
                    //     <BackIcon style={{marginLeft: 10}} />
                    //   </TouchableOpacity>
                    // ),
                    headerLeftContainerStyle: {paddingLeft: 16},
                    headerRight: () => (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: this.state.width / 5,
                          marginRight: 16,
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity onPress={() => this.clickedSearch()}>
                          <SearchIcon />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                          <CartIcon />
                        </TouchableOpacity>
                      </View>
                    ),
                  }
                : {
                    animationEnabled: false,
                    headerTitle: () => null,
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => this.goBack({navigation}, 'MainCategory')}>
                        <BackIcon style={{marginLeft: 20}} />
                      </TouchableOpacity>
                    ),
                    headerLeftContainerStyle: {paddingLeft: 16},
                    headerRight: () => (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: 16,
                        }}>
                        <TextInput
                          style={{
                            fontSize: 14,
                            width: this.state.width - 64,
                            fontFamily: 'GothamBook',
                            color: '#999999',
                            padding: 16,
                          }}
                          placeholder="Search brand and products"
                          // underlineColorAndroid={'#95A5A6'}
                          // autoFocus={true}
                          // onChangeText={text =>
                          //   this.changeTitleText({navigation}, 'Search', text)
                          // }
                        />
                        <SearchClear
                          name="closecircle"
                          size={20}
                          color={'#ff7d01'}
                          onPress={() => this.clickedSearch()}
                        />
                      </View>
                    ),
                  }
            }>
            {props => (
              <Wishlist
                {...this.state}
                {...props}
                closeSearch={() => this.clickedSearch()}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Cart"
            options={({navigation, route}) =>
              !this.state.searchbar
                ? {
                    animationEnabled: false,
                    headerTitle: ({style, children: title}) => {
                      return (
                        <View>
                          <Text
                            style={{
                              fontWeight: '600',
                              flex: 1,
                              fontFamily: 'AvenirNext-DemiBold',
                              fontSize: 20,
                              color: '#333333',
                            }}
                            numberOfLines={2}>
                            Shopping Bag
                          </Text>
                          
                        </View>
                      );
                    },
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <BackIcon style={{marginLeft: 10}} />
                      </TouchableOpacity>
                    ),
                    // (
                    //   <TouchableOpacity
                    //     onPress={() => this.goBack({navigation}, 'Home')}>
                    //     <BackIcon style={{marginLeft: 10}} />
                    //   </TouchableOpacity>
                    // ),
                    headerLeftContainerStyle: {paddingLeft: 16},
                    headerRight: () => (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: this.state.width / 5,
                          marginRight: 16,
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity onPress={() => this.clickedSearch()}>
                          <SearchIcon />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => navigation.navigate('Wishlist')} >  
                    <LikeIcon />
                  </TouchableOpacity>
                      </View>
                    ),
                  }
                : {
                    animationEnabled: false,
                    headerTitle: () => null,
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => this.goBack({navigation}, 'Cart')}>
                        <BackIcon style={{marginLeft: 20}} />
                      </TouchableOpacity>
                    ),
                    headerLeftContainerStyle: {paddingLeft: 16},
                    headerRight: () => (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: 16,
                        }}>
                        <TextInput
                          style={{
                            fontSize: 14,
                            width: this.state.width - 64,
                            fontFamily: 'GothamBook',
                            color: '#999999',
                            padding: 16,
                          }}
                          placeholder="Search brand and products"
                          // underlineColorAndroid={'#95A5A6'}
                          // autoFocus={true}
                          // onChangeText={text =>
                          //   this.changeTitleText({navigation}, 'Search', text)
                          // }
                        />
                        <SearchClear
                          name="closecircle"
                          size={20}
                          color={'#ff7d01'}
                          onPress={() => this.clickedSearch()}
                        />
                      </View>
                    ),
                  }
            }>
            {props => (
              <Cart
                {...this.state}
                {...props}
                closeSearch={() => this.clickedSearch()}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Address"
            options={({navigation, route}) =>
              !this.state.searchbar
                ? {
                    animationEnabled: false,
                    headerTitle: ({style, children: title}) => {
                      return (
                        <View>
                          <Text
                            style={{
                              fontWeight: '600',
                              flex: 1,
                              fontFamily: 'AvenirNext-DemiBold',
                              fontSize: 20,
                              color: '#333333',
                            }}
                            numberOfLines={2}>
                            Address
                          </Text>
                          
                        </View>
                      );
                    },
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <BackIcon style={{marginLeft: 10}} />
                      </TouchableOpacity>
                    ),
                    // (
                    //   <TouchableOpacity
                    //     onPress={() => this.goBack({navigation}, 'Home')}>
                    //     <BackIcon style={{marginLeft: 10}} />
                    //   </TouchableOpacity>
                    // ),
                    headerLeftContainerStyle: {paddingLeft: 16},
                    headerRight: () => (
                      <View
                        style={{
                        marginRight: 16,                     
                        }}>
                                      
                        <TouchableOpacity onPress={() => navigation.navigate('Wishlist')} >  
                    <LikeIcon />
                  </TouchableOpacity>
                      </View>
                    ),
                  }
                : {
                    animationEnabled: false,
                    headerTitle: () => null,
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => this.goBack({navigation}, 'Cart')}>
                        <BackIcon style={{marginLeft: 20}} />
                      </TouchableOpacity>
                    ),
                    headerLeftContainerStyle: {paddingLeft: 16},
                    headerRight: () => (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: 16,
                        }}>
                        <TextInput
                          style={{
                            fontSize: 14,
                            width: this.state.width - 64,
                            fontFamily: 'GothamBook',
                            color: '#999999',
                            padding: 16,
                          }}
                          placeholder="Search brand and products"
                          // underlineColorAndroid={'#95A5A6'}
                          // autoFocus={true}
                          // onChangeText={text =>
                          //   this.changeTitleText({navigation}, 'Search', text)
                          // }
                        />
                        <SearchClear
                          name="closecircle"
                          size={20}
                          color={'#ff7d01'}
                          onPress={() => this.clickedSearch()}
                        />
                      </View>
                    ),
                  }
            }>
            {props => (
              <Address
                {...this.state}
                {...props}
                closeSearch={() => this.clickedSearch()}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Placed"
            options={{
              animationEnabled: false,
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },

              headerTitle: () => null,
              headerLeft: () => null,
            }}>
            {props => (
              <PlacedOrder
                {...this.state}
                {...props}
              
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="AddCustomer"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: ({style, children: title}) => {
                return (
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        flex: 1,
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#333333',
                      }}
                      numberOfLines={1}>
                      Add Customer
                    </Text>
                  </View>
                );
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}>
                  <BackIcon style={{marginLeft: 10}} />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {paddingLeft: 16},
              headerRight: () => null,
            })}>
            {props => <AddCustomer {...this.state} {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="Profile"
            options={{
              animationEnabled: false,
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,            
                height:0
              },

              headerTitle: () => null,
              headerLeft: () => null,
            }}
           >
            {props => (
              <Profile
                {...this.state}
                {...props}
                closeSearch={() => this.clickedSearch()}
                setLogout={this.props.setLogout}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="ProfileDetails"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: ({style, children: title}) => {
                return (
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        flex: 1,
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#333333',
                      }}
                      numberOfLines={1}>
                      Profile Details
                    </Text>
                  </View>
                );
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}>
                  <BackIcon style={{marginLeft: 10}} />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {paddingLeft: 16},
              headerRight: () => null,
            })}>
            {props => <ProfileDetails {...this.state} {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="CompanyDetails"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: ({style, children: title}) => {
                return (
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        flex: 1,
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#333333',
                      }}
                      numberOfLines={1}>
                      Company Details
                    </Text>
                  </View>
                );
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}>
                  <BackIcon style={{marginLeft: 10}} />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {paddingLeft: 16},
              headerRight: () => null,
            })}>
            {props => <CompanyDetails {...this.state} {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="BankDetails"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: ({style, children: title}) => {
                return (
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        flex: 1,
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#333333',
                      }}
                      numberOfLines={1}>
                      Bank Details
                    </Text>
                  </View>
                );
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}>
                  <BackIcon style={{marginLeft: 10}} />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {paddingLeft: 16},
              headerRight: () => null,
            })}>
            {props => <BankDetails {...this.state} {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="AgentAddress"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: ({style, children: title}) => {
                return (
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        flex: 1,
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#333333',
                      }}
                      numberOfLines={1}>
                      Manage Shipping Address
                    </Text>
                  </View>
                );
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}>
                  <BackIcon style={{marginLeft: 10}} />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {paddingLeft: 16},
              headerRight: () => null,
            })}>
            {props => <AgentAddress {...this.state} {...props} />}
          </Stack.Screen>
         
          <Stack.Screen
            name="MyOffers"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: ({style, children: title}) => {
                return (
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        flex: 1,
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#333333',
                      }}
                      numberOfLines={1}>
                      My Offers
                    </Text>
                  </View>
                );
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}>
                  <BackIcon style={{marginLeft: 10}} />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {paddingLeft: 16},
              headerRight: () => null,
            })}>
            {props => <MyOffers {...this.state} {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="MyOrders"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: ({style, children: title}) => {
                return (
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        flex: 1,
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#333333',
                      }}
                      numberOfLines={1}>
                      My Orders
                    </Text>
                  </View>
                );
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}>
                  <BackIcon style={{marginLeft: 10}} />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {paddingLeft: 16},
              headerRight: () => null,
            })}>
            {props => <MyOrders {...this.state} {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="OrderDetails"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: ({style, children: title}) => {
                return (
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        flex: 1,
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#333333',
                      }}
                      numberOfLines={1}>
                      Item Details
                    </Text>
                  </View>
                );
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}>
                  <BackIcon style={{marginLeft: 10}} />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {paddingLeft: 16},
              headerRight: () => null,
            })}>
            {props => <OrderDetails {...this.state} {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="OrderHelpCenter"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: ({style, children: title}) => {
                return (
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        flex: 1,
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#333333',
                      }}
                      numberOfLines={1}>
                      Help Center
                    </Text>
                  </View>
                );
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}>
                  <BackIcon style={{marginLeft: 10}} />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {paddingLeft: 16},
              headerRight: () => null,
            })}>
            {props => <OrderHelpcenter {...this.state} {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="Feedback"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: ({style, children: title}) => {
                return (
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        flex: 1,
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#333333',
                      }}
                      numberOfLines={1}>
                      App Feedback
                    </Text>
                  </View>
                );
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}>
                  <BackIcon style={{marginLeft: 10}} />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {paddingLeft: 16},
              headerRight: () => null,
            })}>
            {props => <Feedback {...this.state} {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="TC"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: ({style, children: title}) => {
                return (
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        flex: 1,
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#333333',
                      }}
                      numberOfLines={1}>
                      Terms & Conditions
                    </Text>
                  </View>
                );
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}>
                  <BackIcon style={{marginLeft: 10}} />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {paddingLeft: 16},
              headerRight: () => null,
            })}>
            {props => <Tc {...this.state} {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="Settings"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: ({style, children: title}) => {
                return (
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        flex: 1,
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#333333',
                      }}
                      numberOfLines={1}>
                      Settings
                    </Text>
                  </View>
                );
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}>
                  <BackIcon style={{marginLeft: 10}} />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {paddingLeft: 16},
              headerRight: () => null,
            })}>
            {props => <Settings {...this.state} {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="ContactUs"
            options={({navigation, route}) => ({
              animationEnabled: false,
              headerTitle: ({style, children: title}) => {
                return (
                  <View style={{width: '100%'}}>
                    <Text
                      style={{
                        fontWeight: '600',
                        flex: 1,
                        fontFamily: 'AvenirNext-DemiBold',
                        fontSize: 20,
                        color: '#333333',
                      }}
                      numberOfLines={1}>
                      Contact Us
                    </Text>
                  </View>
                );
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}>
                  <BackIcon style={{marginLeft: 10}} />
                </TouchableOpacity>
              ),
              headerLeftContainerStyle: {paddingLeft: 16},
              headerRight: () => null,
            })}>
            {props => <ContactUs {...this.state} {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTabClicked: (value,value2 )=>
      dispatch({type: actionTypes.ACTIVE_TAB, payload: value,payload2:value2}),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(AgentRoutes);
