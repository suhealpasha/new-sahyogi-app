/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Animated,
  Image,
  AsyncStorage
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';
import {Provider} from 'react-redux';
import AuthRoutes from './Container/authRoutes';
import AgentRoutes from './Container/agentRoutes';
import {createStore, applyMiddleware, compose} from 'redux';
import Reducer from './Store/reducer';
import {COLOR, ThemeContext, getTheme} from 'react-native-material-ui';
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
      walkthrough:false,
      animation: new Animated.Value(1),
      isLoggedIn: false,
      isSignedIn: false,
      isSellerSignedIn: false,
      userType: null,
      isVisible: true,
      accessToken: null,
      skipButtonPress:false
    };
  }

  async componentDidMount() {
    // await AsyncStorage.removeItem('sahyogiLogin')
    // await AsyncStorage.removeItem('sahyogiWalkthrough')
    const isLoggedIn = await AsyncStorage.getItem('sahyogiLogin');
    
    const iswalkthrough = await AsyncStorage.getItem('sahyogiWalkthrough');
    if (isLoggedIn) {
      this.setState({isLoggedIn: true});
    }
    if(iswalkthrough){
      this.setState({walkthrough: true});
    }
    this.startAnimation();
    var that = this;
    setTimeout(function() {
      that.Hide_Splash_Screen();
    }, 2000);
  }

  // pressSkip = () =>{
  //   console.log('skp')
  //     this.setState({skipButtonPress:!this.state.skipButtonPress})
  // }

  pressGetstarted = () =>{    
    this.setState({walkthrough:true})
  }

  setLogin = () =>{
    this.setState({isLoggedIn:true})
  }

  setLogout = async() =>{
    await AsyncStorage.removeItem('sahyogiLogin');
    this.setState({isLoggedIn:false})
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      timing: 1000,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 1000,
      }).start();
    });
  };

  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };

  render() {

    const animatedStyle = {
      opacity: this.state.animation,
    }; 
    let Splash_Screen = (
      <Animated.View style={[styles.SplashScreen_RootView, animatedStyle]}>
        <LinearGradient
          colors={['#ffb600', '#ff5f02']}
          style={styles.linearGradient}>
          <View style={styles.SplashScreen_ChildView}>
            <Image
              source={require('./assets/splash_screen/splashscreen-with-tag-line-logo_2021-02-13/splashscreen-with-tag-line-logo.png')}
            />
          </View>
        </LinearGradient>
      </Animated.View>
    );
    const store = createStore(Reducer);
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <Provider store={store}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="#ff7d01"
            translucent={true}
            barStyle="light-content"
          />
          {
            
            this.state.isLoggedIn ? 
           
            <AgentRoutes {...this.state} setLogout={this.setLogout}/> : 
            <AuthRoutes
              {...this.state}
               
               pressGetstarted = {()=>this.pressGetstarted()}
               setLogin = {()=>this.setLogin()}
            />
         
          }         
        {/* <AuthRoutes
              {...this.state}
               pressSkip = {()=>this.pressSkip()}
               pressGetstarted = {()=>this.pressGetstarted()}
            /> */}
        </Provider>
        {this.state.isVisible === true ? Splash_Screen : null}
      </ThemeContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  SplashScreen_RootView: {},

  SplashScreen_ChildView: {},
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: '100%',
    width: '100%',
  },
});

export default App;
