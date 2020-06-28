import React, {Component} from 'react';
import {BackHandler,AsyncStorage,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Dimensions
} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Card,CardTitle,CardContent,CardAction,CardButton,CardImage,} from 'react-native-material-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from '../../BottomNavigation/sellerBottomNavigation';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../../../assets/api/api';

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      filterOn:null,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      sellerInventoryData: [],
      noDataAvailable: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

componentDidMount() {
  this.fetchSellerInventory();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  fetchSellerInventory = async () => {
    this.setState({spinner: true});
    const access_token = await AsyncStorage.getItem('isLoggedIn');  
    const data = JSON.stringify({
      product_Id:null
    }) 
    axios
      .post(api.sellerInventoryAPI,data,{
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        if (res.status) {
          if (res.data.data.length <= 0) {
            this.setState({noDataAvailable: true, spinner: false});
          } else {
          this.setState({
            spinner: false,
            sellerInventoryData: res.data.data,
          });
        }
      }
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  };

  UNSAFE_componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {  
    BackHandler.exitApp();   
    return true;
  }
  

 

  render() {    
    
    const styles = StyleSheet.create({
      container: {
        flex: 1.0,      
      },
      itemContainer: {
        width: this.state.width,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 0.25,
        borderColor: '#95A5A6',
        flexDirection: 'row',    
        backgroundColor: 'white',
      },
      itemDetailContainer: {},
      noData: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: this.state.height - 110,
      },
      noDataText: {
        fontSize: 20,
        fontFamily: 'GothamBold',
      },
      spinnerTextStyle: {
        color: '#00aa00',
      },
      itemTextOrderText: {
        fontSize: 12,
        fontFamily: 'GothamLight',
        paddingLeft: 10,
        paddingRight: 10,
      },
      itemTextVariety: {
        fontFamily: 'Gotham Black Regular',
        fontSize: 14,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
      },
      itemTextOrigin: {
        fontSize: 12,
        justifyContent: 'space-around',
        fontFamily: 'GothamMedium',
        color: '#5C5C5C',    
        paddingTop:5,
        paddingLeft:10,
        paddingRight:10,
      },
      itemTextFarm: {
        fontSize: 12,
        justifyContent: 'space-around',
        fontFamily: 'GothamMedium',
        color: '#95A5A6',
        paddingBottom: 10,
        paddingTop:5,
        paddingLeft:10,
        paddingRight:10,
      },
     
    });

    return (
      <View style={styles.container}>
         <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
           {this.state.noDataAvailable ? (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>No Data</Text>
          </View>
        ) : (
         <FlatList
              data={this.state.sellerInventoryData}
              numColumns={1}
              // keyExtractor = {(items)=>{items.key}}

              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    // onPress={() =>
                    //   this.props.navigation.navigate('Order Detail')
                    // }
                    >
                    <View style={styles.itemContainer}>
                      <View style={styles.itemDetailContainer}>
                      
                        <View
                          style={{
                            flexDirection: 'row',
                            paddingLeft: 5,
                            paddingRight: 5,
                          }}>
                         
                          <Text style={styles.itemTextVariety}>
                            
                            {item.verity_name}
                          </Text>
                        </View>
                        <Text style={styles.itemTextOrigin}>{item.origin_name}</Text>                        
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: this.state.width - 40,
                            
                          }}>
                            
                            <Text style={styles.itemTextFarm}>{item.farm}</Text>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{fontFamily:'GothamMedium'}}>
                            Price:  
                        <Text style={item.avilable}>{' '}{item.price}</Text>
                          </Text>
                        </View>
                          
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: this.state.width - 40,
                            
                          }}>
                            
                            <Text style={styles.itemTextOrderText}>
                          Orders: {item.orders}
                        </Text>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{fontFamily:'GothamMedium'}}>
                             Available:  
                        <Text style={item.avilable < 5 ? {color:'red'} :{color:'green'}}>{' '}{item.available_quantity}</Text>
                          </Text>
                        </View>
                          
                        </View>
                      </View>
                    
                    </View>
                  </TouchableOpacity>
                );
              }}
            /> )}  
       <BottomNavigation {...this.props}/>
      </View>
    );
  }
}


