import React, {Component} from 'react';
import {StyleSheet,FlatList,View,Text,Image,ScrollView,Dimensions,TouchableWithoutFeedback,TouchableOpacity,AsyncStorage} from 'react-native';
import {Card,CardTitle,CardContent,CardAction,CardButton,CardImage,} from 'react-native-material-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavigation from '../../BottomNavigation/bottomNavigation';
import ProductAction from '../../utils/productAction';
import { Button } from 'react-native-paper';
import * as api from '../../../assets/api/api'; 
import axios from 'axios';

export default class Notification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
    }; 
  }

  _deleteNotification = (e) =>{

    console.log('Child')
  }

  sawNotification = async (args) =>{
    const access_token = await AsyncStorage.getItem('isLoggedIn');  
    const data = JSON.stringify({
      notification_id: args,
      
    });    
    axios
      .post(api.buyerUpdateNotificationAPI, data, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {       
        this.props.onFetchNotification();
      })
      .catch(err => {
        console.log(err);
      });
    
  }
  render() {
   
    console.log('insdide notify',this.props.notificationData)
    return (
   
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#f8f8f8',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            height:this.state.height
          }}>
        <FlatList
          data={this.props.notificationData}
          numColumns={1}
          // keyExtractor = {(items)=>{items.key}}
          style={{paddingTop:30}}
          renderItem={({item}) => {
            let ratingIcon = (
                <View style={{flexDirection:'row'}}>
              <Text style={styles.ratingStyle}>
                {'  '}
                {item.ratings}{' '}
                <Icon
                  name="star"
                  size={13}
                  style={{
                    justifyContent: 'center',
                    textAlignVertical: 'center',
                  }}
                />
                {'  '}
              </Text>
              <Text style={{fontFamily:'GothamLight',fontSize:10,textAlignVertical:'center',paddingLeft:10,paddingRight:10}}>100:Ratings</Text>
              </View>
            );
            return (
              <TouchableOpacity onPress={() => this.sawNotification(item.buyer_nofication_id)} pointerEvents = {'box-none'}>
                <View style={item.status !== 'unread' ? styles.itemContainer:styles.itemContainerUnread}>
               <Text style={item.status !== 'unread' ?styles.notificationTextStyle:styles.notificationUnreadTextStyle}>{item.notification_text}</Text>
                <Text style={styles.dateText}>{item.updated_date}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
     </View>
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor:'#7ea100',
    paddingBottom: 10,
   
    
  },
  itemContainer: {
    borderBottomWidth:0.25,     
    backgroundColor: 'white',
    height:80
   
  },
  notificationTextStyle:{
    paddingBottom:10,
    paddingTop:10,
    paddingRight:10,
    paddingLeft:10,
    fontFamily:'GothamBook'
  },
  itemContainerUnread: {
    borderBottomWidth:0.25,     
    backgroundColor: '#e8f7e6',
    
    height:80,
  
   
  },
  notificationUnreadTextStyle:{
    paddingBottom:10,
    paddingTop:10,
    paddingRight:10,
    paddingLeft:10,
    fontFamily:'GothamBook',
    fontWeight:'bold'
  },
  dateText:{
textAlign:'right',
paddingRight:10,
paddingLeft:10,
color:'#004561',
fontFamily:'GothamBook',

  }
  
});
