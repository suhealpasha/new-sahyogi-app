import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  TouchableNativeFeedback,
  AsyncStorage,
  Dimensions
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import BottomNavigation from '../../BottomNavigation/bottomNavigation';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Dialog from 'react-native-dialog';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Rating, AirbnbRating} from 'react-native-ratings';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../../../assets/api/api';
import axios from 'axios';
class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      dailogBoxOpen: false,
      comment: '',
      buyerRating: null,
      productId: null,
      ratingId: null
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    this.props.onBottomTabClicked('profile');
    this.props.navigation.goBack(null);
    return true;
  }

  fetchOrderDetails = (args, args1) => {
    this.props.onDisplayOrderNumber(args1);
    this.props.navigation.navigate('Order Detail',{itemId: args});
  };

  ratingCompleted = async (rating) => { 
    this.setState({buyerRating: rating});
  };

  giveRatings = async () => {
    this.setState({dailogBoxOpen: false});
    let data;
    if(this.state.ratingId === null){
      data = JSON.stringify({
        rating: this.state.buyerRating,
        comment: this.state.comment,
        product_Id: this.state.productId,
      });
    }
    else{
      data = JSON.stringify({
        rating_Id: this.state.ratingId,
        rating: this.state.buyerRating,
        comment: this.state.comment,
        product_Id: this.state.productId,
      });
    }    
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    if(this.state.buyerRating){
    axios
      .post(api.buyerAddOrUpdateFeedbackAPI, data, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {       
        this.props.onFetchBuyerOrders();
      })
      .catch(err => {
        console.log(err);
      });
    }
    
  };
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1.0,
        backgroundColor: '#7ea100',
        height:this.state.height
      },
      itemContainer: {
        paddingRight: 10,
        justifyContent: 'space-between',
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
      itemDetailContainer: {},
      itemTextOrderText: {
        fontSize: 10,
        fontFamily: 'GothamLight',
        paddingTop: 5,
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
        paddingBottom:10
      },
      ratingStyle: {
        justifyContent: 'center',
        textAlignVertical: 'center',
        fontSize: 14,
        fontFamily: 'GothamLight',
      },
      statusDelivered: {
        fontFamily: 'GothamMedium',
        color: 'green',
        paddingBottom: 5,
        fontSize: 12,
      },
      statusRejected: {
        fontFamily: 'GothamMedium',
        color: 'red',
        paddingBottom: 5,
        fontSize: 12,
      },
      statusOrdered: {
        fontFamily: 'GothamMedium',
        paddingBottom: 5,
        fontSize: 12,
      },
      itemTextPrice: {
        fontFamily: 'Gotham Black Regular',
        fontSize: 14,
        marginLeft: 5,
      },
    });
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#f8f8f8',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            height:this.state.height,
            paddingTop:20
          }}>
        <FlatList
          style={{paddingLeft: 10, paddingRight: 10,paddingTop:10}}
          data={this.props.buyerOrderData}
          numColumns={1}
          // keyExtractor = {(items)=>{items.key}}

          renderItem={({item}) => {
            let ratingIcon = item.feedback ? (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: 'GothamLight',
                    fontSize: 10,
                    textAlignVertical: 'center',

                    paddingRight: 10,
                    textAlign: 'left',
                  }}>
                  Your Ratings
                </Text>
                <TouchableOpacity
                onPress={() => {
                this.setState({dailogBoxOpen: true,productId:item.product_Id,ratingId:item.feedback.rating_Id})
                }}>
                {/* <Text style={styles.ratingStyle}>
                  {'  '}
                  {item.feedback.rating}{' '}
                  <Icon
                    name="star"
                    size={12}
                    style={{
                      justifyContent: 'center',
                      textAlignVertical: 'center',
                    }}
                  />
                  {'  '}
                </Text> */}
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
                          {item.feedback.rating}
                        </Text>
                      </View>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    dailogBoxOpen: true,
                    productId: item.product_Id,
                  });
                }}>
                <Text
                  style={{
                    fontFamily: 'GothamLight',
                    fontSize: 10,
                    textAlignVertical: 'center',
                    color: '#3e708f',
                    paddingRight: 10,
                    textAlign: 'left',
                  }}>
                  Give Your Ratings
                </Text>
              </TouchableOpacity>
            );
            return (
              <TouchableNativeFeedback
                onPress={() =>
                  this.fetchOrderDetails(item.order_item_id, item.order_Id)
                }>
                <View style={styles.itemContainer}>
                  <View style={styles.thumbnailImageContainer}>
                    <Image
                      source={{
                        uri: item.thumbnail_image_url,
                      }}
                      style={{
                        width: 130,
                        height: 140,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                      }}
                    />
                  </View>
                  <View style={styles.itemDetailContainer}>
                    <Text style={styles.itemTextOrderText}>
                      Order#: {item.order_Id}
                    </Text>
                    <Text style={styles.itemTextVariety}>
                      {item.verityname}
                    </Text>
                    <Text style={styles.itemTextOrigin}>
                      {item.originsname}
                    </Text>
                    <Text style={styles.itemTextFarm}>{item.farm}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.statusOrdered}>Price</Text>
                      <Text style={styles.itemTextPrice}>
                        $ {item.total_price}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={(() => {
                          switch (item.order_status) {
                            case 'delivered':
                              return styles.statusDelivered;
                            case 'shipped':
                              return styles.statusDelivered;
                            case 'rejected':
                              return styles.statusRejected;
                            case 'cancelled':
                              return styles.statusRejected;
                            case 'return':
                              return styles.statusRejected;
                            default:
                              return styles.statusOrdered;
                          }
                        })()}>
                        {item.order_status}
                      </Text>
                      <Text style={styles.statusOrdered}>
                        {' '}
                        on {item.order_date}
                      </Text>
                    </View>
                    {ratingIcon}
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Icon name="chevron-right" size={25} />
                  </View>
                </View>
              </TouchableNativeFeedback>
            );
          }}
        />
        <Dialog.Container
          contentStyle={{
            alignItems: 'center',
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
          }}
          visible={this.state.dailogBoxOpen}>
          <Dialog.Title
            style={{textAlign: 'center', fontFamily: 'GothamMedium'}}>
            Your Rating
          </Dialog.Title>

          <AirbnbRating
            count={5}
            defaultRating={0}
            size={25}
            showRating={false}
            onFinishRating={this.ratingCompleted}
          />
          <Dialog.Button
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              color: '#004561',
              fontFamily: 'GothamBold',
              paddingLeft: 0,
              paddingRight: 0,
              borderColor: 'grey',
              width: 300,
              borderTopWidth: 1,
              textAlign: 'center',
              justifyContent: 'center',
            }}
            label="Ok"
            onPress={() => {
              this.giveRatings();
            }}
          />
          <Dialog.Input
            placeholder="Comment"
            underlineColorAndroid={'#95A5A6'}
            multiline={true}
            width={280}
            onChangeText={comm => {
              this.setState({comment: comm});
            }}
          />
        </Dialog.Container>
      </View>
      </View>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onBottomTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_ICON, payload: value}),
    onDisplayOrderNumber: value =>
      dispatch({type: actionTypes.DISPLAY_ORDER_NUMBER, payload: value}),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(MyOrders);
