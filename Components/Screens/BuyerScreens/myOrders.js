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
import {TouchableHighlight, TouchableNativeFeedback} from 'react-native-gesture-handler';
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
      comment:''
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {    
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

  ratingCompleted =(rating) => {
    console.log('Rating is: ' + rating);
  }
commentUpdate = () =>{

}
  render() {
    const items = [
      {
        name: require('../../../assets/Images/coffeeFarms/img8.png'),
        key: '8',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '3.0',
        orderNumber: 3443,
        status: 'Delivered',
        statusDate: '05-Mar-2020',
        rated: true,
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img9.png'),
        key: '9',
        origin: 'BOURBON',
        farm: 'Sta Lucia',
        ratings: '2.0',
        orderNumber: 3113,
        status: 'Ordered',
        statusDate: '05-Mar-2020',
        rated: false,
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img10.png'),
        key: '10',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '4.0',
        orderNumber: 6443,
        status: 'Rejected',
        statusDate: '25-Feb-2020',
        rated: true,
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img1.png'),
        key: '1',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '5.0',
        orderNumber: 3433,
        status: 'Return',
        statusDate: '05-Mar-2020',
        rated: false,
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img2.png'),
        key: '2',
        origin: 'BOURBON',
        farm: 'Sta Lucia',
        ratings: '3.0',
        orderNumber: 9843,
        status: 'Delivered',
        statusDate: '05-Mar-2020',
        rated: true,
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img5.png'),
        key: '5',
        origin: 'BOURBON',
        farm: 'Sta Lucia',
        ratings: '4.0',
        orderNumber: 1133,
        status: 'Delivered',
        statusDate: '05-Mar-2020',
        rated: true,
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img6.png'),
        key: '6',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '1.0',
        orderNumber: 8765,
        status: 'Delivered',
        statusDate: '05-Mar-2020',
        rated: true,
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img7.png'),
        key: '7',
        origin: 'GEISHA',
        farm: 'El Rosario',
        ratings: '4.0',
        orderNumber: 9001,
        status: 'Delivered',
        statusDate: '05-Mar-2020',
        rated: true,
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img3.png'),
        key: '3',
        origin: 'GEISHA',
        farm: 'El Rosario',
        ratings: '2.0',
        orderNumber: 5428,
        status: 'Rejected',
        statusDate: '25-Feb-2020',
        rated: true,
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img4.png'),
        key: '4',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '5.0',
        orderNumber: 1111,
        status: 'Delivered',
        statusDate: '05-Mar-2020',
        rated: true,
      },
    ];
    return (
      <View style={styles.container}>
        <FlatList
        style={{paddingLeft:10,paddingRight:10}}
          data={items}
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
              <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Order Detail')}>
                <View style={styles.itemContainer}>
                  <View style={styles.thumbnailImageContainer}>
                    <Image
                      source={item.name}
                      style={{
                        width: 130,
                        height: 100,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                      }}
                    />
                  </View>
                  <View style={styles.itemDetailContainer}>
                    <Text style={styles.itemTextOrderText}>
                      Order#: {item.orderNumber}
                    </Text>
                    <Text style={styles.itemTextVariety}>{item.verityname}</Text>
                    <Text style={styles.itemTextOrigin}>{item.originsname}</Text>
                    <Text style={styles.itemTextFarm}>{item.farm}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={(() => {
                          switch (item.status) {
                            case 'Delivered':
                              return styles.statusDelivered;
                            case 'Rejected':
                              return styles.statusRejected;
                            case 'Return':
                              return styles.statusRejected;
                            default:
                              return styles.statusOrdered;
                          }
                        })()}>
                        {item.status}
                      </Text>
                      <Text style={styles.statusOrdered}>
                        {' '}
                        on {item.statusDate}
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
              width:300,
              borderTopWidth: 1,
              textAlign: 'center',
              justifyContent: 'center',
            }}
            label="Ok"
            onPress={() => {
              this.setState({dailogBoxOpen: false});
            }}
          />
          <Dialog.Input placeholder = 'Comment' underlineColorAndroid={'#95A5A6'}  multiline={true} width={280} onChangeText={()=>{this.commentUpdate()}}/>
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
  itemTextVariety:{
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
)(MyOrders);