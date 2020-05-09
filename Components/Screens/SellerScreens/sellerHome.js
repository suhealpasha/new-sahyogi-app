import React, {Component} from 'react';
import {StyleSheet, Text, View,AsyncStorage,} from 'react-native';
import {ImageBackground, TouchableHighlight, Alert, Image} from 'react-native';
import SellerHomeScreen from './sellerHomeScreen';
import Toolbar from '../../Toolbar/toolbar';
import BottomNavigation from '../../BottomNavigation/sellerBottomNavigation';
import {COLOR, ThemeContext, getTheme, Icon} from 'react-native-material-ui';
import {createStackNavigator} from '@react-navigation/stack';
import {Navigator, NativeModules} from 'react-native';
import 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import Reducer from "../../../Store/reducer";
import * as actionTypes from '../../../Store/action';
import { connect} from 'react-redux';

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
  }

 
  render() {   
       
    return (
      
      <ThemeContext.Provider value={getTheme(uiTheme)}> 
     
      <View style={styles.container}>             
       <SellerHomeScreen {...this.props} {...this.state}/>  
          
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