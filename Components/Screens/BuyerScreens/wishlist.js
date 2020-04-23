import React, {Component} from 'react';
import {
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
import { connect} from 'react-redux'

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
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
    this.props.onBottomTabClicked('home');
    this.props.navigation.navigate('Home');
    return true;
  }
  _deleteWishlist = e => {
    console.log('Child');
  };
  render() {
    const items = [
      {
        name: require('../../../assets/Images/coffeeFarms/img1.png'),
        key: '0',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '4.0',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img1.png'),
        key: '1',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '4.0',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img2.png'),
        key: '2',
        origin: 'BOURBON',
        farm: 'Sta Lucia',
        ratings: '1.1',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img3.png'),
        key: '3',
        origin: 'GEISHA',
        farm: 'El Rosario',
        ratings: '3.6',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img4.png'),
        key: '4',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '4.0',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img5.png'),
        key: '5',
        origin: 'BOURBON',
        farm: 'Sta Lucia',
        ratings: '4.5',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img6.png'),
        key: '6',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '2.0',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img7.png'),
        key: '7',
        origin: 'GEISHA',
        farm: 'El Rosario',
        ratings: '1.5',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img8.png'),
        key: '8',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '5.5',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img9.png'),
        key: '9',
        origin: 'BOURBON',
        farm: 'Sta Lucia',
        ratings: '4.0',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img10.png'),
        key: '10',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '5.0',
      },
    ];
    return (
     <View style={styles.outerContainer}>

     
      <View style={styles.container}>
        <FlatList
          data={items}
          numColumns={1}
          // keyExtractor = {(items)=>{items.key}}

          renderItem={({item}) => {
            let ratingIcon = (
              <View style={{flexDirection: 'row'}}>
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
                <Text
                  style={{
                    fontFamily: 'GothamLight',
                    fontSize: 10,
                    textAlignVertical: 'center',
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}>
                  100:Ratings
                </Text>
              </View>
            );
            return (
                <View style={{paddingLeft:10,paddingRight:10}}>
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
                    <View style={{flexDirection: 'row', paddingTop: 10}}>
                      <View style={{width: '50%'}}>
                        <Text style={styles.itemTextOrigin}>{item.origin}</Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <TouchableWithoutFeedback>
                          <Icon2
                            name="delete-outline"
                            size={25}
                            color={'#95A5A6'}
                            onPress={() => {
                              this._deleteWishlist();
                            }}></Icon2>
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                    <Text style={styles.itemTextFarm}>{item.farm}</Text>
                    {ratingIcon}
                  </View>
                </View>
     </View>
            );
          }}
        />
        <TouchableOpacity pressDelay={10}>
          <Text
            style={{
              paddingBottom: 10,
              paddingTop: 10,
              textAlign: 'center',
              color: '#004561',
              textAlign: 'center',
              fontSize: 14,
              fontFamily: 'GothamMedium',
              textAlignVertical: 'center',
            }}>
            Clear All
          </Text>
        </TouchableOpacity>    
      </View>
      <BottomNavigation {...this.props} {...this.state}/>
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
export default connect(null,mapDispatchToProps)(Wishlist);

const styles = StyleSheet.create({
  outerContainer:{
    flex: 1.0,   
  },
  container: {
    flex: 1.0, 
    paddingBottom: 10,
    paddingTop: 10,
   
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
  itemTextOrigin: {
    fontFamily: 'Gotham Black Regular',
    fontSize: 14,
    paddingTop: 5,
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
    fontSize: 13,
    width: 45,
  },
});
