import 'react-native-gesture-handler';
import React, {Component, useState, useEffect} from 'react';
import {BackHandler,StyleSheet,Text,View,Button,TouchableOpacity,TextInput,Dimensions,AsyncStorage,Image,Animated} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {COLOR, ThemeContext, getTheme} from 'react-native-material-ui';
import SignIn from './signIn';
import SignUp from './signUp';
import Register from './register';
import Otp from './otp';
import SetPassword from './setPassword';
import ForgotPassword from './forgotPassword';
import SellerType from './sellerType';
import SellerDetails from './sellerDetails';
import {HeaderBackground} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import * as actionTypes from '../Store/action';
import {connect} from 'react-redux';
import KeyboardShift from '../Components/utils/keyboardShift';
import {StatusBar} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import * as api from '../assets/api/api';
import axios from 'axios';

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
class AuthRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogout: false,
      isLoggedIn: null,
      sellerHomeScreen: false,
      width: Dimensions.get('window').width,
      home: false,
      searchText: '',
      filterOn: false,
      sortOn: null,
      searchIcon: true,
      countriesData:[],
    };
  }

  componentDidMount(){
    this.fetchCountries();
  }

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

  goBack = ({navigation}, path) => {
    navigation.goBack(null);
    // this.setState({filterOn:false})
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

  sortClicked = ({navigation}) => {
    this.setState({sortOn: true});
    navigation.navigate('All Microlots', {
      sortOn: this.state.sortOn,
    });
  };

  _logout = async ({navigation}) => {
    await AsyncStorage.clear();
    navigation.navigate('Home');
  };

  _logoutUserSession = () => {
    console.log('Session Closed');
    this.setState({isLogout: true});
    this.props.testFunc();
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
            name="Sign In"
            options={({navigation, route}) => ({
              animationEnabled: false,
              header: () => null,
            })}>
            {props => <SignIn {...props} onSignIn = {this.props.onSignedIn} onSellerSignIn = {this.props.onSellerSignedIn}/>}
          </Stack.Screen>

          <Stack.Screen
            name="Sign Up"
            component={SignUp}
            options={({navigation, route}) => ({
              animationEnabled: false,
              title: 'Register As',
              headerStyle: {
                backgroundColor: '#7ea100'
              },
              headerTitleStyle:{ fontFamily:'GothamMedium',
              fontSize:22},
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
            })}
            {...this.props}
          />
          <Stack.Screen
            name="Seller Type"
            component={SellerType}
            options={({navigation, route}) => ({
              animationEnabled: false,
              title: 'Who are you?',
              headerStyle: {
                backgroundColor: '#7ea100',
               
              },
              headerTitleAlign: 'center',
              headerTitleStyle:{ fontFamily:'GothamMedium',
              fontSize:22},
              headerTintColor: '#fff',
            })}
            {...this.props}
          />
          <Stack.Screen
            name="Seller Details"          
            options={({navigation, route}) => ({
              animationEnabled: false,
              title: 'Contact Details',
              headerStyle: {
                backgroundColor: '#7ea100',
               
              },
              headerTitleAlign: 'center',
              headerTitleStyle:{ fontFamily:'GothamMedium',
              fontSize:22},
              headerTintColor: '#fff',
            })}
          
          >
            {props => (
              <SellerDetails {...props} countriesData = {this.state.countriesData} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Register"
            component={Register}
            options={({navigation, route}) => ({
              animationEnabled: false,
              title: 'Fill User Details',
              headerStyle: {
                backgroundColor: '#7ea100',
               
              },
              headerTitleAlign: 'center',
              headerTitleStyle:{ fontFamily:'GothamMedium',
              fontSize:22},
              headerTintColor: '#fff',
            })}
            {...this.props}
          />
          <Stack.Screen
            name="OTP"
            component={Otp}
            options={({navigation, route}) => ({
              animationEnabled: false,
              title: 'OTP',
              headerStyle: {
                backgroundColor: '#7ea100',
               
              },
              headerTitleAlign: 'center',
              headerTitleStyle:{ fontFamily:'GothamMedium',
              fontSize:22},
              headerTintColor: '#fff',
            })}
            {...this.props}
          />
          <Stack.Screen
            name="Set Password"
            component={SetPassword}
            options={({navigation, route}) => ({
              animationEnabled: false,
               title: 'Register Now',
              headerStyle: {
                backgroundColor: '#7ea100',
               
              },
              headerTitleAlign: 'center',
              headerTitleStyle:{ fontFamily:'GothamMedium',
              fontSize:22},
              headerTintColor: '#fff',
            })}
            {...this.props}
          />
          <Stack.Screen
            name="Forgot Password"
            component={ForgotPassword}
            options={({navigation, route}) => ({
              animationEnabled: false,
               title: 'Forgot Password',
              headerStyle: {
                backgroundColor: '#7ea100',
               
              },
              headerTitleAlign: 'center',
              headerTitleStyle:{ fontFamily:'GothamMedium',
              fontSize:22},
              headerTintColor: '#fff',
            })}
            {...this.props}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default AuthRoutes;
