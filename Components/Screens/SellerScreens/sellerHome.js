import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage} from 'react-native';
import {ImageBackground, TouchableHighlight, Alert, Image} from 'react-native';
import SellerHomeScreen from './sellerHomeScreen';
import Toolbar from '../../Toolbar/toolbar';
import BottomNavigation from '../../BottomNavigation/sellerBottomNavigation';
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
import {AlertPrompt} from 'react-native-alert-prompt';
import Dialog from 'react-native-dialog';

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
        <View style={styles.container}>
          <Dialog.Container
            contentStyle={{
              alignItems: 'center',
              paddingBottom: 0,
              paddingRight: 0,
              paddingLeft: 0,
            }}
            visible={this.props.cashCheckout}>
            <Dialog.Title
              style={{textAlign: 'center', fontFamily: 'GothamMedium'}}>
              CashOut
            </Dialog.Title>
            <Dialog.Description
              style={{textAlign: 'center', fontFamily: 'GothamLight'}}>
              Request.
            </Dialog.Description>
            <Dialog.Input
              placeholder="Description"
              underlineColorAndroid={'#95A5A6'}
              multiline={true}
              width={280}
              onChangeText={comment=>{this.props.onCashoutComment(comment)}}
            />
            <Dialog.Button
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                color: '#004561',
                fontFamily: 'GothamBold',
                paddingLeft: 0,
                paddingRight: 0,
                borderColor: 'grey',
                textAlign: 'center',
                justifyContent: 'center',
                marginRight:20
              }}
              label="Ok"
              onPress={()=>{this.props.onCashCheckoutOk()}}
            />
            <Dialog.Button label="Cancel"
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                color: '#004561',
                fontFamily: 'GothamBold',
                paddingLeft: 0,
                paddingRight: 0,
                borderColor: 'grey',
                textAlign: 'center',
                justifyContent: 'center',
                marginLeft:20
              }}
              onPress={()=>{this.props.onCashCheckoutCancel()}}
              />
          </Dialog.Container>

          <SellerHomeScreen {...this.props} {...this.state} />
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
