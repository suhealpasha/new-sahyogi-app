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
  Picker,
  TextInput,
} from 'react-native';
import StickyButton from './stickyButtons';
import {CheckBox} from 'react-native-elements';
import {RadioButton} from 'react-native-paper';
import {Input, ThemeConsumer} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {NavigationActions} from 'react-navigation';
import UploadIcon from '../components/Icons/upload';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../../../assets/api/api';
import NocouponIcon from './Icons/nocoupon';
import {Label} from 'native-base';
import Close from 'react-native-vector-icons/AntDesign';

class AddBank extends Component {
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
      },
      upload:{
        backgroundColor:'#fff4e9',
        padding:20,
        marginTop:20,
        width:'40%',
        display:'flex',
        alignItems:'center',
        textAlign:'center',
        borderWidth:1,
        borderStyle:'dashed',
        borderRadius: 1,
        borderColor:'#ff7d01'
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
          <Text style={styles.title}>Bank Account Details </Text>
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
            <View style={styles.customerDetailsContainer}>
              <Text style={styles.label}>Account Number*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Account Number"
              />
              <Text style={styles.label}>Confirm your Account Number *</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your Account Number *"
              />
              <Text style={styles.label}>Account Holder Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Account Holder Name *"
              />
              <Text style={styles.label}>IFSC Code *</Text>
              <TextInput style={styles.input} placeholder="IFSC Code *" />
              <Text style={styles.label}>Account type *</Text>
              <Picker
                selectedValue={this.state.selectedValue}
                style={{marginLeft: -9, width: '100%'}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({selectedValue: itemValue})
                }>
                <Picker.Item label="Savings Account" value="savings" />
                <Picker.Item label="Current Account" value="current" />
              </Picker>
              <Text style={styles.label}>Upload Cheque Image / Passbook</Text>
              <View style={{display:'flex',justifyContent:'center',flexDirection:'row'}}>
              <TouchableOpacity style={styles.upload}>
              <UploadIcon />
              <Text style={{color:'#999999',fontSize:10,fontFamily:'AvenirNextFont'}}>Upload Image</Text>
          </TouchableOpacity>
              </View>
              
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default AddBank;
