import React, {Component} from 'react';
import {StyleSheet,FlatList,View,Text,Image,ScrollView,Dimensions,TouchableWithoutFeedback,TouchableOpacity,} from 'react-native';
import {Card,CardTitle,CardContent,CardAction,CardButton,CardImage,} from 'react-native-material-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavigation from '../../BottomNavigation/bottomNavigation';
import ProductAction from '../../utils/productAction';
import { Button } from 'react-native-paper';
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
  render() {
    const items = [
      {
        message: 'LA Savaldor new nano lots are available for sale, Kindly checkout for new stocks',
        date:'18-Mar-2020',
        seenStatus:false       
       },
       {
        message: '10% Discount on all the products,Terms & conditions applied.',
        date:'02-Mar-2020',
        seenStatus:false       
       },
       {
        message: 'We are currently delivering all kind of coffe lots in all regions of Europe.',
        date:'15-Mar-2020',
        seenStatus:true       
       },
    ];
    console.log('insdide notify',this.props.notificationData)
    return (
   
      <View style={styles.container}>
        <FlatList
          data={this.props.notificationData}
          numColumns={1}
          // keyExtractor = {(items)=>{items.key}}

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
              <TouchableOpacity onPress={() => console.log('parent')} pointerEvents = {'box-none'}>
                <View style={item.status !== 'unread' ? styles.itemContainer:styles.itemContainerUnread}>
               <Text style={item.status !== 'unread' ?styles.notificationTextStyle:styles.notificationUnreadTextStyle}>{item.notification_text}</Text>
                <Text style={styles.dateText}>{item.updated_date}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
     
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor:'#efebea',
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
