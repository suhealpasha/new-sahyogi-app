import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Dimensions,
  TouchableOpacity,
  AppRegistry,
  navigation,
} from 'react-native';
import {Toolbar, COLOR, BottomNavigation, Icon} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import MicroLots from './microLots';
import NanoLots from './nanoLots';
import FeaturedItems from './featuredItems';
import Origins from './origins';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as actionTypes from '../../Store/action'
import { connect} from 'react-redux';

const Tab = createMaterialBottomTabNavigator();

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
    };
  }

  

  render() {
    
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgb(0,70,99)',
      },
      featuredItems: {
        width: '100%',
        padding: 5,
        height: 240,
      },
      microLots: {
        width: '100%',
        height: 460,
        padding: 5,
        },
      nanoLots: {
        width: '100%',
        height: 460,
        padding: 5,
      },
      origins: {
        width: '100%',
        height: 100,
        padding: 5,
      },
    });

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.featuredItems}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <Text style={{color: 'white'}}>Featured Items</Text>
            </View>
            <FeaturedItems />
          </View>
          <View style={styles.microLots}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <Text style={{color: 'white'}}>MicroLots</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('All Microlots')}>
                <Text style={{color: 'rgb(0,216,0)'}}>View All>></Text>
              </TouchableOpacity>
            </View>
            <MicroLots {...this.props}/>
          </View>
          <View style={styles.nanoLots}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <Text style={{color: 'white'}}>NanoLots</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('All Nanolots')}>
                <Text style={{color: 'rgb(0,216,0)'}}>View All>></Text>
              </TouchableOpacity>
            </View>
            <NanoLots />
          </View>
          <View style={styles.origins}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <Text style={{color: 'white'}}>Origins</Text>
              <Text
                style={{color: 'rgb(0,216,0)'}}
                onPress={() => Linking.openURL('http://google.com')}>
                View All>>
              </Text>
            </View>
            <Origins />
          </View>
        </View>
      
      </ScrollView>
  
    );
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onBottomTabClicked:(value)=>dispatch({type:actionTypes.ACTIVE_ICON,payload:value})
    }

}
export default  connect(null,mapDispatchToProps)(HomeScreen);
