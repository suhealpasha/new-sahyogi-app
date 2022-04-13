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
import NextButton from '../Components/utils/nextButton';
import {NavigationActions} from 'react-navigation';
import BackIcon from '../Components/utils/components/Icons/back';
import {RadioButton} from 'react-native-paper';
import Logo from '../Components/utils/logo';
import * as actionTypes from '../Store/action';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../assets/api/api';
import Button from '../Components/utils/components/button';
import {Label} from 'native-base';
import Close from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import ActionButton from '../Components/utils/components/actionButton';
import {ThreeSixtyOutlined} from '@material-ui/icons';
class EditCustomerInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      checked: null,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {
    this.props.onEditClicked(false)
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        backgroundColor: '#ffff',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        height: this.state.height - 120,
      },
      title: {
        fontFamily: 'AvenirNextFont',
        fontSize: 18,
        color: '#333333',
        fontWeight: '500',
        // paddingLeft:10,
        // paddingRight:10
      },
      customerDetailsContainer: {
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#ffff',
        paddingTop: 10,
        paddingBottom: 10,
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
    });

    return (
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderBottomWidth: 1,
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomColor: '#e5e5e5',
          }}>
          <BackIcon
            back={() => {
              this.props.onEditClicked(false);
            }}
          />
          <Text style={styles.title}>Customer Information</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingTop: 10}}>
            <View style={{paddingTop: 10, paddingBottom: 10}}>
              <Text style={styles.title}>Personal Details</Text>
              <View style={styles.customerDetailsContainer}>
                <Text style={styles.label}>Customer NickName *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  defaultValue='Arjun Kapoor'
                />
                <Text style={styles.label}>Customer Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Customer Name *"
                  defaultValue="Arjun Kapoor"
                />
                <Text style={styles.label}>Customer Mobile No. *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Customer Mobile No. *"
                  defaultValue="+91-9999999999"
                />
                <Text style={styles.label}>Customer Email ID *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Customer Email ID *"
                  defaultValue="arjun.kapoor@gmail.com"
                />
              </View>
            </View>
            <View style={{paddingTop: 10, paddingBottom: 10}}>
              <Text style={styles.title}>Company Details</Text>
              <View style={styles.customerDetailsContainer}>
                <Text style={styles.label}>Comapny Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Comapny Name *"
                  defaultValue="Arjun Opticals"
                />
                <Text style={styles.label}>Company GSTIN No. *</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Company GSTIN No. *'
                  defaultValue="AVHJCOP19101"
                />
                <Text style={styles.label}>Pincode *</Text>
                <TextInput style={styles.input}
                placeholder="Pincode *"
                defaultValue="562001" />
                <Text style={styles.label}>Company Address *</Text>
                <TextInput style={styles.input} 
                placeholder="Company Address *"
                defaultValue="Finacre Small Finance Bank, Sarjapur Bangalore, 568890, Karnataka." />
                <Text style={styles.label}>Locality / Town *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Locality / Town *"
                  defaultValue="Bangalore"
                />
                <Text style={styles.label}>City / District *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="City / District *"
                  defaultValue="Bangalore"
                />
                <Text style={styles.label}>State *</Text>
                <TextInput style={styles.input} 
                defaultValue="Karnataka"
                placeholder="Enter state" />
                <Text style={styles.label}>
                  Shipping Address Same As Company Address
                </Text>
                <View style={{display: 'flex', flexDirection: 'row',justifyContent:'flex-start',marginLeft:-8}}>
                  <RadioButton
                    value="first"
                    color="#ff7d01"
                    defaultValue="first"
                    status='checked'
                    // status={
                    //   this.state.checked === 'first' ? 'checked' : 'unchecked'
                    // }
                    onPress={() => this.setState({checked: 'first'})}
                  />
                  <Text style={styles.label}>Yes</Text>
                  <RadioButton
                    color="#ff7d01"
                    value="second"
                    
                    status={
                      this.state.checked === 'second' ? 'checked' : 'unchecked'
                    }
                    onPress={() => this.setState({checked: 'second'})}
                  />
                  <Text style={styles.label}>No</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onProceed: value =>
      dispatch({type: actionTypes.PROCEED_CLICKED, payload: value}),
    onEditClicked: value =>
      dispatch({type: actionTypes.EDIT_CUSTOMER_INFO, payload: value}),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(EditCustomerInformation);
