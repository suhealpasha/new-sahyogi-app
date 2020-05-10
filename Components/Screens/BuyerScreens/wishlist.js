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

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      height: Dimensions.get('window').height,
      buyerWishlistData: [],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
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
          this.setState({
            spinner: false,
            buyerWishlistData: res.data.data,
          });
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

  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />

          <FlatList
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
                  <Text style={styles.ratingStyle}>
                    {'  '}
                    {item.avg_rating}{' '}
                    <Icon
                      name="star"
                      size={12}
                      style={{
                        justifyContent: 'center',
                        textAlignVertical: 'center',
                      }}
                    />
                    {'  '}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'GothamLight',
                      fontSize: 10,
                      textAlignVertical: 'center',
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}>
                    {item.rating}: ratings
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
                          height: 120,
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
                              color={'#95A5A6'}
                              onPress={() => {
                                this._deleteWishlist(item.product_Id);
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

          <TouchableOpacity
            style={styles.clearAllButton}
            onPress={this._deleteAllWishlist}>
            <Text
              style={{
                textAlign: 'center',
                color: '#004561',
                fontSize: 14,
                fontFamily: 'GothamMedium',
                paddingTop: 15,
                paddingBottom: 15,
              }}>
              Clear All
            </Text>
          </TouchableOpacity>
        </View>
        <BottomNavigation {...this.props} {...this.state} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1.0,
  },
  container: {
    flex: 1.0,
    paddingTop: 10,
    backgroundColor: '#efebea',
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
    fontFamily: 'Gotham Black Regular',
    fontSize: 14,
    paddingTop: 5,
  },
  itemTextOrigin: {
    fontSize: 12,
    justifyContent: 'space-around',
    fontFamily: 'GothamMedium',
    color: '#95A5A6',
  },
  itemTextFarm: {
    fontSize: 12,
    justifyContent: 'space-around',
    fontFamily: 'GothamMedium',
    color: '#95A5A6',
    paddingBottom: 10,
  },
  ratingStyle: {
    backgroundColor: '#00ac00',
    color: 'white',
    lineHeight: 20,
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    width: 45,
  },
  clearAllButton: {
    borderTopWidth: 0.25,
    borderColor: '#95A5A6',
  },
  spinnerTextStyle: {
    color: '#00aa00',
  },
});

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
