import React, {Component} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  Switch,
  TextInput,
} from 'react-native';
import {Input, ThemeConsumer} from 'react-native-elements';

import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/Octicons';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../../../assets/api/api';

import {Label} from 'native-base';
import Close from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';

class GenderFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {
    // this.props.onProceed(false);
   
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        backgroundColor: '#ffff',        
        paddingTop: 16,
        paddingLeft:16,
        paddingRight:16,
        height:this.state.height
      },
      title: {
        fontFamily: 'AvenirNextFont',
        fontSize: 18,
        color: '#333333',
        fontWeight: '500',
      },
      item:{
        fontFamily: 'AvenirNextFont',
        fontSize: 14,
        color: '#666666',
        paddingTop:10,
        paddingBottom:10
      }
     
    });

    return (
    
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomColor: '#e5e5e5',
          }}>
          <Text style={styles.title}>Gender</Text>
          <Close
            name="closecircle"
            size={24}
            color={'#ff7d01'}
            onPress={() => this.props.closeSelectGender()}
          />
        </View>
        <ScrollView>
        <View style={{paddingTop: 10}}>
            <TouchableHighlight onPress={()=>{}} ><Text style={styles.item}>Boys</Text></TouchableHighlight>     
            <TouchableHighlight onPress={()=>{}}><Text style={styles.item}>Girls</Text></TouchableHighlight>   
            <TouchableHighlight onPress={()=>{}}><Text style={styles.item}>Men</Text></TouchableHighlight> 
            <TouchableHighlight onPress={()=>{}}><Text style={styles.item}>Women</Text></TouchableHighlight> 
        </View>     
        </ScrollView>   
      </View>
    );
  }
}



export default GenderFilter;
