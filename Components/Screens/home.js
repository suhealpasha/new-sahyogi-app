import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ImageBackground, TouchableHighlight, Alert, Image} from 'react-native';
import HomeScreen from './homeSceen';
import Toolbar from '../Toolbar/toolbar';
import BottomNavigation from '../BottomNavigation/bottomNavigation';
import {COLOR, ThemeContext, getTheme, Icon} from 'react-native-material-ui';
import {createStackNavigator} from '@react-navigation/stack';
import {Navigator, NativeModules} from 'react-native';
import 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import AllMicroLots from './allMicroLots';
import AllNanoLots from './allNanoLots';
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
    this.state = {};
  }

  

  render() {
 
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        {/* <Toolbar /> */}
       
        <View style={styles.container}>
      
          <HomeScreen {...this.props} />
        
        </View>
       
        <BottomNavigation {...this.props}/>
       
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
