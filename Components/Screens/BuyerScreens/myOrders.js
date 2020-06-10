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

class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailogBoxOpen: false,
      comment: '',
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
    this.props.navigation.navigate('Order Detail', {productId: args});
  };

  ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
  };
  commentUpdate = () => {};
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{paddingLeft: 10, paddingRight: 10}}
          data={this.props.buyerOrderData}
          numColumns={1}
          // keyExtractor = {(items)=>{items.key}}

          renderItem={({item}) => {
            let ratingIcon = item.rated ? (
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
                <Text style={styles.ratingStyle}>
                  {'  '}
                  {item.ratings}{' '}
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
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.setState({dailogBoxOpen: true});
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
                onPress={() =>this.fetchOrderDetails(item.product_Id,item.order_Id)}>
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
                            case 'rejected':
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
            defaultRating={5}
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
              this.setState({dailogBoxOpen: false});
            }}
          />
          <Dialog.Input
            placeholder="Comment"
            underlineColorAndroid={'#95A5A6'}
            multiline={true}
            width={280}
            onChangeText={() => {
              this.commentUpdate();
            }}
          />
        </Dialog.Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,

    paddingBottom: 10,
    paddingTop: 10,
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
    fontFamily: 'Gotham Black Regular',
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
    borderRadius: 5,
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
