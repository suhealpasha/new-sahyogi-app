import React, {Component} from 'react';
import {BackHandler,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Dimensions,
  AsyncStorage
} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import * as api from '../../../assets/api/api';

 class MyAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,  
      addressData:[]    
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {  
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.setState({
      addressData:this.props.addressData
    });
   
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.addressData !== this.props.addressData) {
      this.setState({addressData: this.props.addressData});
    }   
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {    
    this.props.navigation.goBack();
    return true;
  }

  editAddress = async (args) =>{   
    this.props.onAddressUpdate(args)     
    this.props.navigation.navigate('Edit Address',{addressId:args})
  }

  deleteAddress = async (args) =>{
    const data = JSON.stringify({
      address_Id:args,      
    });
    const access_token = await AsyncStorage.getItem('isLoggedIn')
      await axios.post(api.buyerAddressDeleteAPI,data,
      {headers:{
        "access_token" : access_token,
        'accept': 'application/json',
      'accept-language': 'en_US',
      'content-type': 'application/x-www-form-urlencoded'}} )
      .then(res =>{
      if(res.status) {
        Toast.show('Address Deleted')
        this.props.onFetchAddress();
        this.props.onfetchBuyerCart();
      }

      })
      .catch(err =>{console.log(err)})
  
  }

  setDefaultAddress = async (args) =>{
    const data = JSON.stringify({     
      new_default_address_id:args     
    });

    console.log(data)
    const access_token = await AsyncStorage.getItem('isLoggedIn')
      await axios.post(api.buyerAddressUpdateDefaultAPI,data,
      {headers:{
        "access_token" : access_token,
        'accept': 'application/json',
      'accept-language': 'en_US',
      'content-type': 'application/x-www-form-urlencoded'}} )
      .then(res =>{
      if(res.status) {
        Toast.show('Default address set.')       
        this.props.onFetchAddress();
        this.props.onfetchBuyerCart();
        this.props.navigation.goBack(null);
      }

      })
      .catch(err =>{console.log(err)}) 

  }

  render() {    
  
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        // paddingLeft: 10,
        // paddingRight: 10,   
        backgroundColor: '#7ea100',
        // paddingTop:10
      },
      itemContainer: {
        flexDirection: 'row',
        borderBottomWidth: 0.25,
        borderBottomColor: '#95A5A6',
        width: this.state.width - 20,       
        paddingTop: 10,
      },
      itemContainerActive: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#7ea100',
        width: this.state.width - 20,     
        paddingTop: 10,
        
      },
      itemContainerData: {
        width: this.state.width - 110,
        marginLeft:5
      },
      itemContainerName: {
        fontSize: 20,
        fontFamily: 'GothamBook',
   
      },
      itemContainerAddress: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: 'GothamLight',
  
        paddingTop: 10,
      },
      itemContainerMobile: {
        paddingTop: 10,
   
        lineHeight: 20,
        fontFamily: 'GothamLight',

      },
      itemContainerActions: {   
         flexDirection:'column',
         height:120,        
         width:80,
         marginRight:5
      },
      actions:{
          height:50,         
          justifyContent:'center',
          alignItems:'center'
      },
      viewall: {
        color: '#3e708f',
        borderRadius: 10,
        fontSize: 12,
        fontFamily: 'GothamMedium',
        // paddingTop: 10,
        // paddingBottom: 10,
        // paddingLeft: 10,
        // paddingRight: 10,
        textAlign: 'center',
      },

    });  
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#f8f8f8',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}>
        <FlatList
          data={this.state.addressData}
          style={{paddingTop:20,paddingLeft:10,paddingRight:10}}
          keyExtractor = {(items)=>{items.address_Id}}
          numColumns={1}
          renderItem={({item}) => {           
            return (
              <View style={item.is_default === '1' ? styles. itemContainerActive :styles.itemContainer}>
                <View style={styles.itemContainerData}>              
                 <Text style={styles.itemContainerName}>{item.name}</Text>                
            <Text style={styles.itemContainerAddress}>{item.door_number},{item.address},{item.city}, {item.state_name}-{item.zip}</Text>
                  <Text style={styles.itemContainerMobile}>{item.contact_no}</Text>
                </View>
                <View style={styles.itemContainerActions}>
                  <Text style={styles.viewall} onPress={()=>{this.setDefaultAddress(item.address_Id)}}>Set as defult</Text>
                    <View style={styles.actions}>
                  <Icon  name='edit' size={25} color={'#95A5A6'} onPress={()=>{this.editAddress(item.address_Id)}}/>
                  </View>
                  <View  style={styles.actions}>
                  <Icon name='delete' size={25} color={'#95A5A6'} onPress={()=>{this.deleteAddress(item.address_Id)}} />
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {    
    onAddressUpdate: value =>
      dispatch({type: actionTypes.ADDRESS_UPDATE, payload: value}),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(MyAddress)