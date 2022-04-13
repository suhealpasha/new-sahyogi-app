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
import {Input, ThemeConsumer} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../../../assets/api/api';
import NocouponIcon from '../../utils/components/Icons/nocoupon'
import {Label} from 'native-base';
import Close from 'react-native-vector-icons/AntDesign';


class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      coupons: [{
        title:'FREE100',
        details:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply.',
        status:true
      },
      {
        title:'FREE150',
        details:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply.',
        status:false
      },
      {
        title:'FREE500',
        details:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply.',
        status:false
      }
    ]
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
      lable:{
        fontFamily:'AvenirNext-Medium',
        // padding:50,
        fontSize:20,
        textAlign:'center',
        paddingBottom:30
      },
      applay:{
        fontFamily:'AvenirNextFont',
        color:'#ff7d01',
        fontSize:14,
        fontWeight:'500'
      },
      inputContainer:{
       display:'flex',
       borderBottomColor:'#dddddd',
       borderBottomWidth:1,
       flexDirection:'row',
       justifyContent:'space-between'
      },
      input: {
        fontSize: 14,
        fontFamily: 'AvenirNextFont',
        marginBottom: 10,
        padding: 0,
      },
      couponTitle:{
        fontSize:18,
        fontFamily:'AvenirNextFont',
        fontWeight:'bold'
      },
      coupon:{
        borderBottomWidth:1,
        borderBottomColor:'#e5e5e5',
        paddingTop:10,
        paddingBottom:10
      },
      details:{
        fontFamily:'AvenirNextFont',
        color:'#999999',
        fontSize:14

      },
      applied:{
        borderWidth:1,
      borderStyle:'dashed',
      borderRadius: 1,
      padding:10,
      borderColor:'#ff7d01',
      marginTop:20,
      marginBottom:10,
      marginRight:10,
      marginLeft:10
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
          <Text style={styles.title}>Available Coupons </Text>
          <Close
            name="closecircle"
            size={24}
            color={'#ff7d01'}
            onPress={() => this.props.close()}
          />
        </View>
       <KeyboardAwareScrollView>
          {this.state.coupons.length > 0 ? 
          <View style={{paddingTop:10}}>
            <View style={styles.inputContainer}>
             <TextInput
                  style={styles.input}
                  placeholder="Enter Coupon Code"
                                  />
              <TouchableOpacity><Text style={styles.applay}>Apply</Text></TouchableOpacity>
              </View>
              <FlatList
                        style={{marginTop: 10}}
                        data={this.state.coupons}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(i, index) => {
                          return index;
                        }}
                        renderItem={({item, index}) => {                     
                          return (
                            <View>
                            <View style={styles.coupon}>
                              <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10,alignItems:'center'}}>
                                <Text style={styles.couponTitle}>{item.title}</Text>
                                {item.status ? 
                                 <TouchableOpacity><Text style={styles.applay}>Remove</Text></TouchableOpacity>
                                :
                                <TouchableOpacity><Text style={styles.applay}>Apply</Text></TouchableOpacity>
                        }
                              </View>
                              <Text style={styles.details}>
                                {item.details}
                              </Text>
                            </View>
                            {item.status === true ?
                            <View style={styles.applied}>
                              <Text style={{fontFamily:'AvenirNextFont',color:'#ff7d01',fontSize:14,fontWeight:'500'}}>Coupon Applied</Text>
                              <Icon name='checkcircle' size={24} color='#05be38' style={{position:'absolute',right:-10,top:-10}}/>
                              <Text style={{fontFamily:'AvenirNextFont',color:'#ff7d01',fontSize:12}}>Cuppon is applied for current items.</Text>
                              </View>

                            :null}
                            </View>
                          )
                          }}
                          />
          </View>
          :
          <View style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            <View style={{paddingTop:100}}><Text  style={styles.lable}>No Coupons are available</Text></View>         
          <View><NocouponIcon /></View>        
          </View>
          }
       </KeyboardAwareScrollView>
      
      </View>
      
 
    );
  }
}

export default Coupon;
