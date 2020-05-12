import React, {Component} from 'react';
import {BackHandler,
  AsyncStorage,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Dimensions,
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import * as api from '../../../assets/api/api';
import axios from 'axios';

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
    this.setState({
      addressData:this.props.addressData
    });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
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
    await axios.post(api.sellerAddressDeleteAPI,data,
    {headers:{
      "access_token" : access_token,
      'accept': 'application/json',
    'accept-language': 'en_US',
    'content-type': 'application/x-www-form-urlencoded'}} )
    .then(res =>{
    if(res.status) {
      Toast.show('Address Deleted')
      this.props.onFetchAddress();
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
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        backgroundColor: '#efebea',
      },
      itemContainer: {
        flexDirection: 'row',
        borderBottomWidth: 0.25,
        borderBottomColor: '#95A5A6',
        width: this.state.width - 20,
        height: 120,
        paddingTop: 10,
      },
      itemContainerData: {
        width: this.state.width - 100,
        
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
         width:80
      },
      actions:{
          height:60,         
          justifyContent:'center',
          alignItems:'center'
      }
    });

    return (
      <View style={styles.container}>
      <FlatList
        data={this.state.addressData}
        keyExtractor = {(items)=>{items.address_Id}}
        numColumns={1}
        renderItem={({item}) => {
          return (
            <View style={styles.itemContainer}>
              <View style={styles.itemContainerData}>
                <Text style={styles.itemContainerName}>{item.name}</Text>
          <Text style={styles.itemContainerAddress}>{item.door_number},{item.address},{item.city}, {item.state}-{item.zip}</Text>
                <Text style={styles.itemContainerMobile}>{item.contact_no}</Text>
              </View>
              <View style={styles.itemContainerActions}>
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
)(MyAddress); 
