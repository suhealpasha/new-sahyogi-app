import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  AsyncStorage,BackHandler
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
import { TouchableHighlight, TouchableOpacity,TouchableNativeFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import * as api from '../../../assets/api/api';
import Spinner from 'react-native-loading-spinner-overlay';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';

class AllFeaturedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner:false,    
     allFeaturedProductsData:[],
  
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount(){
    // this.fetchFeaturedProducts();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  fetchFeaturedProducts = async () => {
    this.setState({spinner:true})
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    await axios
      .get(api.buyerAllFeaturedProductAPI, {
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
            spinner:false,
            allFeaturedProductsData: res.data.data,
          });
        }
      })
      .catch(err => {
        this.setState({spinner:false})
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
     this.props.navigation.goBack(null);
    return true;
  }

  productDetails=(args, args1)=>{
    this.props.onDisplayVarietyName(args1);
    this.props.navigation.navigate('Product Description', {productId: args});
      }


  render() {  
    
    
    return (
      <View style={styles.container}>
         <Spinner
              visible={this.state.spinner}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
        <FlatList
          data={this.state.allFeaturedProductsData}
          style={{paddingLeft: 10, paddingRight: 10}}
          numColumns={1}
          keyExtractor = {(items)=>{items.product_Id}}

          renderItem={({item}) => {
            let ratingIcon = (
                <View style={{flexDirection:'row'}}>
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
            <Text style={{fontFamily:'GothamLight',fontSize:10,textAlignVertical:'center',paddingLeft:10,paddingRight:10}}>{item.rating}:ratings</Text>
              </View>
            );
            return (
              <TouchableNativeFeedback onPress={() => this.productDetails(item.product_Id,item.verityname)}>
                <View style={styles.itemContainer}>
                  <View style={styles.thumbnailImageContainer}>
                    <Image
                      source={{
                        uri: item.thumbnail_image,
                      }}
                      style={{
                        width: 130,
                        height: 100,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                      }}
                    />
                  </View>
                  <View style={styles.itemDetailContainer}>
                  <Text style={styles.itemTextVariety}>{item.verityname}</Text>
                    <Text style={styles.itemTextOrigin}>{item.originsname}</Text>
                    <Text style={styles.itemTextFarm}>{item.farm}</Text>
                   {ratingIcon}
                  </View>
                </View>
              </TouchableNativeFeedback>
            );
          }}
        />
      </View>)
  }
}

const styles = StyleSheet.create({
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
    paddingTop:10,
    paddingBottom:10
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
    borderRadius:5
  },
  spinnerTextStyle: {
    color: '#00aa00',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onDisplayVarietyName: value =>
      dispatch({type: actionTypes.DISPLAY_VARIETY_NAME, payload: value}),
  };
};

export default connect(
 null,
  mapDispatchToProps,
)(AllFeaturedItems);