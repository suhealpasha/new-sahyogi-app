import React, {Component} from 'react';
import {BackHandler,StyleSheet, Text, View, AsyncStorage} from 'react-native';
import {ImageBackground, TouchableHighlight, Alert, Image} from 'react-native';
import HomeScreen from './homeSceen';
import SellerHomeScreen from '../SellerScreens/sellerHomeScreen';
import Toolbar from '../../Toolbar/toolbar';
import BottomNavigation from '../../BottomNavigation/bottomNavigation';
import {COLOR, ThemeContext, getTheme, Icon} from 'react-native-material-ui';
import {createStackNavigator} from '@react-navigation/stack';
import {Navigator, NativeModules} from 'react-native';
import 'react-native-gesture-handler';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import Reducer from '../../../Store/reducer';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';

const Tab = createMaterialBottomTabNavigator();
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount() {
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
    console.log('clicked back button')
    BackHandler.exitApp();
    return true;
  }

  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <View style={styles.container}>
          <HomeScreen {...this.props} {...this.state} />
        </View>
        <BottomNavigation {...this.props} {...this.state} />
      </ThemeContext.Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
