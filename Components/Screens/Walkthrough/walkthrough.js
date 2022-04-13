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
  Dimensions,
  AsyncStorage
} from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';
import Screen1 from './screen1';
import Screen2 from './screen2';
import Screen3 from './screen3';
import Screen4 from './screen4';
import Button from '../../utils/components/button';
// import StickyButton from '../../utils/components/stickyButtons';
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    
  },
  text: {
    color: '#666666',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 30,
    fontFamily:'AvenirNextFont'
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    backgroundColor: 'pink',
  },

  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

const slides = [
  {
    key: 'k1',
    title: 'Online Shopping',
    text:
      'Place online order for multiple brands with ease and secure platform.',
    screen: <Screen1 />,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,  
    button:false 
  },
  {
    key: 'k2',
    title: 'Delivery',
    text: 'Now get your order delivered directly from Manufacture / Dealer at best offers.',
    screen: <Screen2 />,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#F4B1BA',
    button:false
  },
  {
    key: 'k3',
    title: 'Secure Transaction',
    text: 'Easy Return / Exchange with 100% money back gurantee.',
    screen: <Screen3 />,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image, 
    button:false
  },
  {
    key: 'k4',
    title: 'Constant Support',
    text: 'Get constant support from us throughout your journey.',
    screen: <Screen4 />,
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    button:true,
    buttonStyle:styles.button
  },
];
class Walkthrough extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_Main_App: false,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };
  }

 

  renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: this.state.height,
        }}>
        <View style={{height: this.state.height / 2}}>
          {item.screen}
          <View style={{marginTop:30}}>
            <Text style={{color:'#333333',fontFamily:'AvenirNextFont',fontSize:22,textAlign:'center',fontWeight:'600',paddingLeft:45,paddingRight:45,}}>{item.title}</Text>
          </View>
          <View>
            <Text style={styles.text}>{item.text}</Text>
            {item.button ?<Button {...this.props} disabled={false} title='Get Started' marginTop='10' pressGetstarted={()=>this.props.pressGetstarted()} walkthrough={true}/> :null}
          </View>
        </View>
      </View>
    );
  };
  on_Done_all_slides = () => {
    this.setState({show_Main_App: true});
  };
  on_Skip_slides = () => {
    this.setState({show_Main_App: true});
  };
  render() {
    if (this.state.show_Main_App) {
      return (
        <View style={styles.MainContainer}>
          <Text style={{textAlign: 'center', fontSize: 20, color: '#000'}}>
            This is your main App screen After App Walkthrough.
          </Text>
        </View>
      );
    } else {
      return (
        <AppIntroSlider
          data={slides}
          renderItem={this.renderItem}
          //  onDone={this.onDone}
          showSkipButton={true}
          onSkip={this._onSkip}
          showDoneButton={false}
          //  renderDoneButton={this.renderDoneButton}
          renderNextButton={this.renderNextButton}
          
          dotStyle={{
            backgroundColor: '#d8d8d8',
            width: 9,
            borderRadius: 2,
            height: 5,
          }}
          activeDotStyle={ {
            backgroundColor: '#ff7d01',
            width: 23,
            borderRadius: 2,
            height: 5,
          }}
        />
      );
    }
  }
}

export default Walkthrough;
