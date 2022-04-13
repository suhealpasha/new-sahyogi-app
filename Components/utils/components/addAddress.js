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
import {RadioButton} from 'react-native-paper';
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

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      home: true,
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
        marginBottom: 30,
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
      label: {
        fontWeight: '600',
        paddingTop: 10,

        color: '#333333',
        fontFamily: 'AvenirNextFont',
        fontWeight: 'bold',
        fontSize: 14,
      },
      input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        fontSize: 14,
        fontFamily: 'AvenirNextFont',
        marginBottom: 10,
        padding: 0,
      },
      customerDetailsContainer: {
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#ffff',
        paddingTop: 10,
        paddingBottom: 10,
      },
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
          <Text style={styles.title}>Add Address </Text>
          <Close
            name="closecircle"
            size={24}
            color={'#ff7d01'}
            onPress={() => this.props.close()}
          />
        </View>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraHeight={true}>
          <View style={{paddingTop: 10, marginBottom: 20}}>
            <View style={{paddingTop: 10, paddingBottom: 10}}>
              <Text style={styles.title}>Contact Us</Text>
              <Text
                style={{
                  color: '#999999',
                  fontSize: 14,
                  fontFamily: 'AvenirNextFont',
                }}>
                Fill the deatils and create add new address.
              </Text>
              <View style={styles.customerDetailsContainer}>
                <Text style={styles.label}>Full Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                />

                <Text style={styles.label}>Mobile No. *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Mobile No. *"
                />
                <Text style={styles.label}>Pincode *</Text>
                <TextInput style={styles.input} placeholder="Enter Pincode *" />
                <Text style={styles.label}>
                  Address (Home No, Building, Street, Area) *
                </Text>
                <TextInput style={styles.input} placeholder="Enter Address *" />
                <Text style={styles.label}>Locality / Town *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Locality / Town *"
                />
                <Text style={styles.label}>City / District *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter City / District *"
                />
                <Text style={styles.label}>State *</Text>
                <TextInput style={styles.input} placeholder="Enter state" />
              </View>
            </View>
            <View style={{}}>
              <Text style={styles.title}>Save Address As</Text>
              <View
                style={{
                  paddingTop: 10,
                  paddingBottom: 40,
                  display: 'flex',
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: '#dddddd',
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.RBSheet.open();
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: this.state.home ? '#ff7d01' : '#999999',
                    padding: 10,
                    marginRight: 10,
                    width: 70,
                  }}>
                  <Text
                    style={{
                      color: this.state.home ? '#ff7d01' : '#999999',
                      fontSize: 12,
                      fontFamily: 'AvenirNextFont',
                      textAlign: 'center',
                    }}>
                    Home
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.RBSheet.open();
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: !this.state.home ? '#ff7d01' : '#999999',
                    padding: 10,
                    width: 70,
                  }}>
                  <Text
                    style={{
                      color: !this.state.home ? '#ff7d01' : '#999999',
                      fontSize: 12,
                      fontFamily: 'AvenirNextFont',
                      textAlign: 'center',
                    }}>
                    Work
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{display:'flex',flexDirection:'row',alignItems:'center',marginBottom:10}}>
              <CheckBox
                //  isChecked={item.checked }
                checkedCheckBoxColor="#ff7d01"
                checkBoxColor="#666666"
                containerStyle={{marginLeft:0,padding:0}}
              
              />
              <Text style={{fontFamily:'AvenirNextFont',color:'#666666'}}>Make this as my default address.</Text>
              </View>
             
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default AddAddress;
