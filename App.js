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
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {COLOR, ThemeContext, getTheme} from 'react-native-material-ui';
import {HeaderBackground} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import Reducer from './Store/reducer';
import * as actionTypes from './Store/action';
import {connect} from 'react-redux';
import ProductDescriptionTemplate from './Components/Screens/BuyerScreens/productDescriptionTemplate';
import KeyboardShift from './Components/utils/keyboardShift';
import {StatusBar} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import AuthRoutes from './Container/authRoutes';
import BuyerRoutes from './Container/buyerRoutes';
import SellerRoutes from './Container/sellerRoutes';

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
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isSignedIn: false,
      isSellerSignedIn:false,
      userType: null,
      isVisible: true,
      width: Dimensions.get('window').width,
      accessToken: null,
    };
  }

  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };

  async componentDidMount() {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    const user = await AsyncStorage.getItem('userType');
    if (isLoggedIn) {
      this.setState({isLoggedIn: true, userType: user});
    }

    var that = this;
    setTimeout(function() {
      that.Hide_Splash_Screen();
    }, 5000);
  }

  onLogoutSession = () => {
    this.setState({isLoggedIn: false});
    this.setState({isSignedIn: false});
  };

  onsignIn = async () => {  
    this.setState({isSignedIn: true,isSellerSignedIn:false});
  };

  onsellersignIn = async () => {   
    this.setState({isSignedIn:true,isSellerSignedIn:true});
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
      SplashScreen_RootView: {
        justifyContent: 'center',
        flex: 1,

        position: 'absolute',
        width: '100%',
        height: '100%',
      },

      SplashScreen_ChildView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efebea',
        flex: 1,
      },
    });

    const store = createStore(Reducer);

    let Splash_Screen = (
      <Animated.View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Image
            source={require('./assets/Images/logos/Logo_Microffee.png')}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
      </Animated.View>
    );
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <Provider store={store}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="#007b00"
            translucent={true}
            barStyle="light-content"
          />
          {this.state.isLoggedIn || this.state.isSignedIn ? (
            this.state.isSellerSignedIn ? (
              <SellerRoutes onLogoutSession={this.onLogoutSession} />
            ) : (
              <BuyerRoutes onLogoutSession={this.onLogoutSession} />
            )
          ) : (
            <AuthRoutes
              {...this.state}
              onSignedIn={this.onsignIn}
              onSellerSignedIn={this.onsellersignIn}
            />
          )}
        </Provider>
        {this.state.isVisible === true ? Splash_Screen : null}
      </ThemeContext.Provider>
    );
  }
}
export default App;
