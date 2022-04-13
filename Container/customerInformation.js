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
import BackButton from '../Components/utils/backButton';
import Icon from 'react-native-vector-icons/Octicons';
import Logo from '../Components/utils/logo';
import * as actionTypes from '../Store/action';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../assets/api/api';
import Button from '../Components/utils/components/button';
import {Label} from 'native-base';
import Close from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import ActionButton from '../Components/utils/components/actionButton';
class CustomerInformation extends Component {
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
      productDetailsContainer: {
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#ffff',
        paddingTop: 10,
        paddingBottom: 10,
      },
      row1: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      row2: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      row3: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      row4: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      row5: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      row6: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },

      col1: {
        fontFamily: 'AvenirNextFont',
        fontSize: 12,
        width: '40%',
        color: '#333333',
        paddingTop: 10,
        paddingBottom: 10,
      },
      col2: {
        width: '5%',
        fontSize: 12,
        fontFamily: 'AvenirNextFont',
        paddingTop: 10,
        paddingBottom: 10,
      },
      col3: {
        color: '#333333',
        width: '45%',
        fontFamily: 'AvenirNextFont',
        fontSize: 12,
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
          <Text style={styles.title}>Customer Information</Text>
          <Close
            name="closecircle"
            size={24}
            color={'#ff7d01'}
            onPress={() => this.props.onProceed(false)}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingTop: 10}}>
          <View style={{paddingTop: 10, paddingBottom: 10}}>
            <Text style={styles.title}>Personal Details</Text>
            <View style={styles.productDetailsContainer}>
              <View style={styles.row2}>
                <Text style={styles.col1}>Customer NickName</Text>
                <Text style={styles.col2}>:</Text>
                <Text style={styles.col3}>Arjun Kapoor</Text>
              </View>
              <View style={styles.row3}>
                <Text style={styles.col1}>Customer Name</Text>
                <Text style={styles.col2}>:</Text>
                <Text style={styles.col3}>Arjun Kapoor</Text>
              </View>
              <View style={styles.row4}>
                <Text style={styles.col1}>Customer Mobile No.</Text>
                <Text style={styles.col2}>:</Text>
                <Text style={styles.col3}>+91-000000000</Text>
              </View>
              <View style={styles.row5}>
                <Text style={styles.col1}>Customer Email ID</Text>
                <Text style={styles.col2}>:</Text>
                <Text style={styles.col3}>arjun.kapoor@gmail.com</Text>
              </View>
            </View>
          </View>
          <View style={{paddingTop: 10, paddingBottom: 10}}>
            <Text style={styles.title}>Company Details</Text>
            <View style={styles.productDetailsContainer}>
              <View style={styles.row2}>
                <Text style={styles.col1}>Company Name</Text>
                <Text style={styles.col2}>:</Text>
                <Text style={styles.col3}>Arjun Opticals</Text>
              </View>
              <View style={styles.row3}>
                <Text style={styles.col1}>Customer GSTN</Text>
                <Text style={styles.col2}>:</Text>
                <Text style={styles.col3}>AVHJIOP1234AD</Text>
              </View>
              <View style={styles.row4}>
                <Text style={styles.col1}>Company Address</Text>
                <Text style={styles.col2}>:</Text>
                <Text style={styles.col3}>Finacre Small Finance Bank, Sarjapur Bangalore, 568890, Karnataka.</Text>
              </View>
              <View style={styles.row5}>
                <Text style={styles.col1}>Customer Email ID</Text>
                <Text style={styles.col2}>:</Text>
                <Text style={styles.col3}>arjun.kapoor@gmail.com</Text>
              </View>
              <View style={styles.row5}>
                <Text style={styles.col1}>Shipping Address Same As Company Address</Text>
                <Text style={styles.col2}>:</Text>
                <Text style={styles.col3}>No</Text>
              </View>
              <View style={styles.row5}>
                <Text style={styles.col1}>Shipping Address</Text>
                <Text style={styles.col2}>:</Text>
                <Text style={styles.col3}>Finacre Small Finance Bank, Sarjapur Bangalore, 568890, Karnataka.</Text>
              </View>
            </View>
          </View>          
          <View />          
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
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(CustomerInformation);
