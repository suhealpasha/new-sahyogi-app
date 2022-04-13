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
import StickyButton from './stickyButtons';
import {CheckBox} from 'react-native-elements';
import {Input, ThemeConsumer} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../../../assets/api/api';
import NocouponIcon from './Icons/nocoupon';
import {Label} from 'native-base';
import Close from 'react-native-vector-icons/AntDesign';

class ChooseAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      coupons: [
        {
          title: 'FREE100',
          details:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply.',
          status: true,
        },
        {
          title: 'FREE150',
          details:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply.',
          status: false,
        },
        {
          title: 'FREE500',
          details:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply.',
          status: false,
        },
      ],
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

  addWishlist = () => {
    console.log('asdad');
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1.0,
        backgroundColor: '#ffff',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom:30
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
      lable: {
        fontFamily: 'AvenirNext-Medium',
        // padding:50,
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 30,
      },
      applay: {
        fontFamily: 'AvenirNextFont',
        color: '#ff7d01',
        fontSize: 14,
        fontWeight: '500',
      },
      inputContainer: {
        display: 'flex',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      address: {
        paddingBottom: 20,
        marginBottom: 20,
        borderBottomColor: '#c8c8c8',
        borderBottomWidth: 1,
      },
      address2: {
        paddingBottom: 20,
        marginBottom: 20,
        borderBottomColor: '#c8c8c8',
        borderBottomWidth: 1,
      },
      name: {
        fontFamily: 'AvenirNextFont',
        fontSize: 18,
        color: '#333333',
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
      },
      addressdetails: {
        fontFamily: 'AvenirNextFont',
        fontSize: 18,
        color: '#666666',
      },
    });

    const default_address = this.props.address.map((i, index) => {
      if (i.status) {
        return (
          <View style={styles.address}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
              <CheckBox
                center={false}
                containerStyle={{marginLeft:-10}}                
                checkedColor="#ff7d01"
                uncheckedColor='#999999'
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={i.status}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.name}>{i.name}</Text>
                <Text style={{marginLeft: 10, fontSize: 12, color: '#999999'}}>
                  (Default)
                </Text>
              </View>
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 12,
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 10,
                  backgroundColor: '#fff4e9',
                }}>
                {i.type}
              </Text>
            </View>
            <Text style={styles.addressdetails}>{i.address}</Text>
            <View
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              display:'flex',
              flexDirection:'row'
             
            }}>
            <TouchableOpacity
              onPress={() => {
                this.RBSheet.open();
              }}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#ff7d01',
                padding: 10,
                marginRight:10,
                width:70,
              
              }}>
              <Text
                style={{
                  color: '#ff7d01',
                  fontSize: 12,
                  fontFamily: 'AvenirNextFont',
                  textAlign:'center'
                }}>
                Remove
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.RBSheet.open();
              }}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#ff7d01',
                padding: 10,
                width:70,
              }}>
              <Text
                style={{
                  color: '#ff7d01',
                  fontSize: 12,
                  fontFamily: 'AvenirNextFont',
                  textAlign:'center'
                }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          </View>
        );
      }
    });

    const other_address = this.props.address.map((i, index) => {
      if (!i.status) {
        return (
          <View style={styles.address2}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
              <CheckBox
                center={false}
                containerStyle={{marginLeft:-10}}                
                checkedColor="#ff7d01"
                uncheckedColor='#999999'
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={i.status}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.name}>{i.name}</Text>
              
              </View>
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 12,
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 10,
                  backgroundColor: '#fff4e9',
                }}>
                {i.type}
              </Text>
            </View>
            <Text style={styles.addressdetails}>{i.address}</Text>
          </View>
        );
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
          <Text style={styles.title}>Choose Address </Text>
          <Close
            name="closecircle"
            size={24}
            color={'#ff7d01'}
            onPress={() => this.props.close()}
          />
        </View>
        <KeyboardAwareScrollView  showsVerticalScrollIndicator={false} >
          <View
            style={{
              paddingTop: 10,
              paddingBottom: 20,
              alignItems: 'center',
              marginBottom: 10,
              marginTop: 10,
              marginBottom: 20,
              borderBottomColor: '#c8c8c8',
              borderBottomWidth: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.addAddress();
              }}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#ff7d01',
                padding: 10,
              }}>
              <Text
                style={{
                  color: '#ff7d01',
                  fontSize: 12,
                  fontFamily: 'AvenirNextFont',
                }}>
                Add New Address
              </Text>
            </TouchableOpacity>
          </View>
          {default_address}
          <Text style={{fontFamily:'AvenirNextFont',fontSize:18}}>Other Address</Text>
          {other_address}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default ChooseAddress;
