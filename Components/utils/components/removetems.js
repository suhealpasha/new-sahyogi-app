import React, {Component} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  FlatList,
  Alert,
  Dimensions,
  AsyncStorage,
  ImageBackground,
  TouchableOpacity,
  Switch,
  TextInput,
} from 'react-native';
import StickyButton from '../../utils/components/stickyButtons';
import {Input, ThemeConsumer} from 'react-native-elements';
import CheckBox from 'react-native-check-box';
import RupeeIcon from './Icons/rupee';
import NumericInput from 'react-native-numeric-input';
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
import {ScrollView} from 'react-native-gesture-handler';

class RemoveItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      item: {
        id: 1,
        brand_name: 'DIESEL',
        model: 'BE5002MI670',
        image: require('../../../assets/Images/products/sunglasses/5.png'),
      },
    };
  }

  componentDidMount() {}

  componentWillUnmount() {
    // this.props.onProceed(false);
  }

  selectItem = (args, i) => {
    let items = this.state.similarColor;
    items[i].checked = items[i].checked ? !items[i].checked : true;
    this.setState({similarColor: items});
  };

  addWishlist = () =>{
    console.log('asdad')
  }

  render() {
    const styles = StyleSheet.create({
      container: {
   flex:1.0,
        backgroundColor: '#ffff',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
    
      },
      title: {
        fontFamily: 'AvenirNextFont',
        fontSize: 18,
        color: '#333333',
        fontWeight: '500',
      },
      productDetailsContainer: {
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#ffff',
        paddingTop: 10,
        paddingBottom: 10,
      },
      headerText: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 18,
        color: '#333333',
      },
      text: {
        fontFamily: 'AvenirNextLTPro-Regular',
        color: '#666666',
        fontSize: 12,
        width: '65%',
        letterSpacing: 1,
        paddingBottom: 10,
        paddingTop: 10,
      },
      label: {
        fontFamily: 'AvenirNextLTPro-Regular',
        color: '#666666',
        padding: 5,
      },
      name:{
        fontFamily:'AvenirNext-Medium',
        fontSize:12,
        color:'#666666',
        fontWeight:'500',
        flexShrink: 1
      },
      model:{
        fontFamily:'AvenirNext-Medium',
        fontSize:10,
        color:'#999999',
        flexShrink: 1
      },
      warning:{
        fontFamily:'AvenirNext-Medium',
        fontSize:12,
        color:'#333333',
        fontWeight:'500',
        flexShrink: 1
      }
    });

    return (
      <View style={{flex:1.0}}>
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
          <Text style={styles.title}>Remove / Wishlist Item </Text>
          <Close
            name="closecircle"
            size={24}
            color={'#ff7d01'}
            onPress={() => this.props.close()}
          />
        </View>
        <View style={{padding:20, display: 'flex', flexDirection: 'row'}} >
         

          <ImageBackground
            source={this.state.item.image}
            style={{
              width: 110,
              height: 110,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              borderWidth: 1,
              borderRadius: 4,
              borderColor: '#dbdbdb',
          
            }}
            resizeMode="center"
          />
        
        <View style={{padding:16,flexDirection: 'column',width:this.state.width / 2  + 16}}>
          <Text style={styles.name}>{this.state.item.brand_name}</Text>
          <Text style={styles.model}>{this.state.item.model}</Text>
          <Text style={styles.warning}>Are you sure you want to remove or wishlist this item?</Text>
        </View>
      </View>
      
      </View>
      <StickyButton
              cart={true}
              skip='Remove'
              proceed="Move to Wishlish"
              proceedClicked={this.addWishlist}
             
            />
      </View>
    );
  }
}

export default RemoveItems;
