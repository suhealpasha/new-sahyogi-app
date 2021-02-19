import React, {Component} from 'react';
import {
  AsyncStorage,
  BackHandler,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavigation from '../../BottomNavigation/bottomNavigation';
import ProductAction from '../../utils/productAction';
import {Button} from 'react-native-paper';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../../../assets/api/api';
import Toast from 'react-native-simple-toast';
import { ConfirmDialog } from 'react-native-simple-dialogs';
class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      noDataAvailable:false,
      height: Dimensions.get('window').height,
      buyerWishlistData: [],
      dialogVisible:false,
      singleDelete:null,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    console.log("inside Wishlist",this.props.open)
    if(this.props.open){      
      this.props.onToggleOpen();
    }
    this.fetchBuyerWishlist();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  fetchBuyerWishlist = async () => {
    this.setState({spinner: true});
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    axios
      .get(api.buyerWishlistAPI, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        if (res.status) {
          if(res.data.data.length <= 0){
            this.setState({noDataAvailable:true,spinner:false})
          }
          else{
            this.setState({
              spinner: false,
              buyerWishlistData: res.data.data,
            });
          }
         
        }
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    this.props.onBottomTabClicked('home');
    this.props.navigation.goBack(null);
    return true;
  }

  _deleteWishlist = async param1 => {
    this.setState({dialogVisible:false,singleDelete:null})
    let data;
    data = JSON.stringify({
      flag: false,
      product_Id: param1,
    });
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    await axios
      .post(api.buyerWishlistAddOrRemoveAPI, data, {
        headers: {
          access_token: access_token,
          accept: 'application/json',
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        console.log(res)
        if (res.status) {
          this.setState({spinner: false});
          Toast.show('Removed from wishlist');
          this.fetchBuyerWishlist();
        }
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  };

  _deleteAllWishlist = async () => {
    this.setState({dialogVisible:false})
    const access_token = await AsyncStorage.getItem('isLoggedIn');

    await axios
      .post(
        api.buyerWishlistRemoveAll,
        {},
        {
          headers: {
            access_token: access_token,
            accept: 'application/json',
            'accept-language': 'en_US',
            'content-type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then(res => {
        console.log(res)
        if (res.status) {
          this.setState({spinner: false});
          Toast.show('Removed all from wishlist');
          this.fetchBuyerWishlist();
        }
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  };

  singleDelete = (args) =>{
 this.setState({dialogVisible:true,singleDelete:args})
  }

  render() {
    const styles = StyleSheet.create({
      outerContainer: {
        flex: 1.0,
        backgroundColor: '#7ea100',
      },
      noData: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: this.state.height - 150,
      },
      noDataText: {
        fontSize: 20,
        fontFamily: 'GothamBold',
      },
      container: {
        flex: 1.0,
        paddingTop: 10,
         marginTop:10,
         backgroundColor: '#f8f8f8',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
      },
      itemContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
      itemDetailContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
      },
      itemTextVariety: {
        fontFamily: 'GothamBold',
        fontSize: 14,
        paddingTop: 5,
      },
      itemTextOrigin: {
        fontSize: 12,
        justifyContent: 'space-around',
        fontFamily: 'GothamMedium',
        color: '#5C5C5C',
      },
      itemTextFarm: {
        fontSize: 12,
        justifyContent: 'space-around',
        fontFamily: 'GothamMedium',
        color: '#95A5A6',
      },
      ratingStyle: {
        justifyContent: 'center',
        textAlignVertical: 'center',
        fontSize: 14,
        fontFamily: 'GothamLight',
      },
      clearAllButton: {
        borderTopWidth: 0.25,
        borderColor: '#95A5A6',
      },
      spinnerTextStyle: {
        color: '#7ea100',
      },
    });
    return (
      <View style={styles.outerContainer}>
        
        <View style={styles.container}>
        <ConfirmDialog
    title="Delete Wishlist"
    message="Are you sure to delete?"
    visible={this.state.dialogVisible}
    onTouchOutside={() => this.setState({dialogVisible: false})}
    positiveButton={{
        title: "YES",
        onPress: () =>{this.state.singleDelete !== null ? this._deleteWishlist(this.state.singleDelete) : this._deleteAllWishlist()}
    }}
    negativeButton={{
        title: "NO",
        onPress: () => this.setState({dialogVisible: false})
    }}
/>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          {this.state.noDataAvailable ? <View style={styles.noData}>
            <Text style={styles.noDataText}>No Data</Text>
          </View> :     
          <FlatList
          style={{           
            marginTop: 10,
           
          }}
            data={
              this.state.buyerWishlistData &&
              this.state.buyerWishlistData.length
                ? this.state.buyerWishlistData
                : null
            }
            numColumns={1}
            keyExtractor={items => {
              items.product_Id;
            }}
            renderItem={({item}) => {
              let ratingIcon = (
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="star"
                    size={20}
                    color="#ffbd4a"
                    style={{
                      justifyContent: 'center',
                      textAlignVertical: 'center',
                    }}
                  />
                  <Text style={styles.ratingStyle}>
                    {item.avg_rating}
                  </Text>
                </View>
              );
              return (
                <View style={{paddingLeft: 10, paddingRight: 10}}>
                  <View style={styles.itemContainer}>
                    <View style={styles.thumbnailImageContainer}>
                      <Image
                         source={{
                          uri: item.thumbnail_image,
                        }}
                        style={{
                          width: 130,
                          height: 110,
                          borderTopLeftRadius: 5,
                          borderBottomLeftRadius: 5,
                        }}
                      />
                    </View>
                    <View style={styles.itemDetailContainer}>
                      <View style={{flexDirection: 'row', paddingTop: 10}}>
                        <View style={{width: '50%'}}>
                          <Text style={styles.itemTextVariety}>
                            {item.verityname}
                          </Text>
                        </View>
                        <View style={{width: '50%'}}>
                          <TouchableWithoutFeedback>
                            <Icon2
                              name="delete-outline"
                              size={25}
                              color={'red'}
                              onPress={() => {
                                this.singleDelete(item.product_Id)
                               
                              }}
                            />
                          </TouchableWithoutFeedback>
                        </View>
                      </View>
                      <Text style={styles.itemTextOrigin}>
                        {item.originsname}
                      </Text>
                      <Text style={styles.itemTextFarm}>{item.farm}</Text>
                      {ratingIcon}
                    </View>
                  </View>
                </View>
              );
            }}
          />
          }
          {!this.state.noDataAvailable ? 
          <TouchableOpacity
            style={styles.clearAllButton}
            // onPress={this._deleteAllWishlist}
            onPress={()=>{this.setState({dialogVisible:true})}}
            >
            <Text
              style={{
                textAlign: 'center',
                color: '#004561',
                fontSize: 14,
                fontFamily: 'GothamMedium',
                paddingTop: 15,
                paddingBottom: 15,
              }}>
              Clear Wishlist
            </Text>
          </TouchableOpacity>
          : null}
        </View>
        <BottomNavigation {...this.props} {...this.state} />
      </View>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onBottomTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_ICON, payload: value}),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(Wishlist);
