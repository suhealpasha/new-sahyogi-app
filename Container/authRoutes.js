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
    };
  }

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
              header: () => null,
            })}
            {...this.props}
          />
          <Stack.Screen
            name="Seller Type"
            component={SellerType}
            options={({navigation, route}) => ({
              animationEnabled: false,
              header: () => null,
            })}
            {...this.props}
          />
          <Stack.Screen
            name="Seller Details"
            component={SellerDetails}
            options={({navigation, route}) => ({
              animationEnabled: false,
              header: () => null,
            })}
            {...this.props}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={({navigation, route}) => ({
              animationEnabled: false,
              header: () => null,
            })}
            {...this.props}
          />
          <Stack.Screen
            name="OTP"
            component={Otp}
            options={({navigation, route}) => ({
              animationEnabled: false,
              header: () => null,
            })}
            {...this.props}
          />
          <Stack.Screen
            name="Set Password"
            component={SetPassword}
            options={({navigation, route}) => ({
              animationEnabled: false,
              header: () => null,
            })}
            {...this.props}
          />
          <Stack.Screen
            name="Forgot Password"
            component={ForgotPassword}
            options={({navigation, route}) => ({
              animationEnabled: false,
              header: () => null,
            })}
            {...this.props}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default AuthRoutes;
