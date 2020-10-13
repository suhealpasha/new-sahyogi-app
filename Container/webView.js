import React, {Component} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Dimensions,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import {Input, ThemeConsumer} from 'react-native-elements';

import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import NextButton from '../Components/utils/nextButton';
import {NavigationActions} from 'react-navigation';
import BackButton from '../Components/utils/backButton';
import Logo from '../Components/utils/logo';
import * as actionTypes from '../Store/action';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../assets/api/api';
import {HelperText,TextInput} from 'react-native-paper';
import HTMLView from 'react-native-htmlview';
class Webview extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
 
  }

  
  render() {
    const styles = StyleSheet.create({
     web:{
       paddingLeft:10,
       paddingRight:10
     }
    });
    const htmlContent = `<p>
    <i>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    </i>
    </p>`;
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        style={{backgroundColor: '#ffff',paddingTop:30}}
        scrollEnabled={true}>
          <View style={styles.web}>
        <HTMLView
        value={htmlContent}
        stylesheet={styles.web}
      />
      </View>
      </KeyboardAwareScrollView>
    );
  }
}


export default connect(
  null,
  null,
)(Webview);
