import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  BackHandler,
  Dimensions
} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from '../../BottomNavigation/bottomNavigation';
import ProductAction from '../../utils/productAction';
import RBSheet from 'react-native-raw-bottom-sheet';
import Filter from '../../utils/filter';
import Sort from '../../utils/sort';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import axios from 'axios';
import * as api from '../../../assets/api/api';
import Spinner from 'react-native-loading-spinner-overlay';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      spinner:false,
      noDataAvailable: false,
      clickedIcon: null,      
     newItems:[],
     allProductsData:[],
     filtering:false
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {   
    this.fetchProducts();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  fetchProducts = async () => {
    this.setState({spinner:true})
    const access_token = await AsyncStorage.getItem('isLoggedIn');
   const data = {
      "featured":this.props.filterFeaturedData ? this.props.filterFeaturedData : null,
      "origin_Id":this.props.filterOriginsData.length ? String(this.props.filterOriginsData) : null,
      "lot": this.props.filterNanoLotData && this.props.filterMicroLotData || !this.props.filterNanoLotData && !this.props.filterMicroLotData ? null : this.props.filterNanoLotData ? 'Nano' : 'Micro',
      "verity_Id":this.props.filterVaritiesData.length ? String(this.props.filterVaritiesData) : null,   
    }
    console.log(data)
    await axios
      .post(api.buyerAllProductAPI,
       data
        ,{
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
                spinner:false,
                allProductsData: res.data.data,
              });
            }         
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

  UNSAFE_componentWillReceiveProps() {   
    this.RBSheet.open();
  }

  sorting = args => {
    const newArray = this.state.allProductsData;
    switch (args) {
      case 'first':
        console.log('popular');
        return;
      case 'second':
        newArray.sort((a, b) => {          
          return  Date.parse(a.rating) <  Date.parse(b.rating);
        });
        this.setState({
          items: newArray,
        });
        this.RBSheet.close();
        return;
      case 'third':
        newArray.sort((a, b) => {
          return  parseFloat(a.rating) <  parseFloat(b.rating);
        });
        this.setState({
          items: newArray,
        });
        this.RBSheet.close();
        return;
      case 'forth':
        newArray.sort((a, b) => {
          return  parseFloat(a.rating) >  parseFloat(b.rating);
        });
        this.setState({
          items: newArray,
        });
        this.RBSheet.close();
        return;
      case 'fifth':
        newArray.sort((a, b) => {
          return a.verityname > b.verityname;
        });
        this.setState({
          items: newArray,
        });
        this.RBSheet.close();
        return;
    }
  };

  filtering= args => {       
        this.RBSheet.close();    
        this.fetchProducts();
  };
  
  fetchProductDetails = (args, args1) => {
    this.props.onDisplayVarietyName(args1);
    this.props.navigation.navigate('Product Description', {productId: args});
  };

  render() {  
    
    const styles = StyleSheet.create({
      container: {
        flex: 1.0,
        paddingBottom: 10,
        paddingTop: 10,
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
        paddingBottom:10,
        paddingTop:10,
        paddingLeft: 10,
        paddingRight: 10,
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
      },
      spinnerTextStyle: {
        color: '#00aa00',
      },
    });
  
    let optionsComponet;
    if (this.props.clickedIcon === 'Sort') {
      optionsComponet = (
        <Sort {...this.props} onSorting={args => this.sorting(args)} />
      );
    } else {
      optionsComponet = (
        <Filter
          {...this.props}
          resetClickedIcon={() => {
            this.RBSheet.close();
          }}
          onFiltering = {this.filtering}
        />
      );
    }

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
          style={{paddingLeft: 10, paddingRight: 10}}
          data={this.state.allProductsData}          
          numColumns={1}
          keyExtractor = {(items)=>{items.product_Id}}

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
              <TouchableNativeFeedback
              onPress={() => this.fetchProductDetails(item.product_Id, item.verityname)}>
                <View style={styles.itemContainer}>
                  <View style={styles.thumbnailImageContainer}>
                    <Image
                      source={{
                        uri: item.thumbnail_image,
                      }}
                      style={{
                        width: 150,
                        height: undefined,
                        aspectRatio:3/2,
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
        />)
  }

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={280}
          duration={250}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}>
          {optionsComponet}
        </RBSheet>
      </View>
    );
  }
}




const mapStateToProps = state => {
  return {
  filterFeaturedData:state.reducer.filterFeaturedData,
  filterOriginsData:state.reducer.filterOriginsData,
  filterNanoLotData:state.reducer.filterNanoLotData,
  filterMicroLotData:state.reducer.filterMicroLotData,
  filterVaritiesData: state.reducer.filterVaritiesData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDisplayVarietyName: value =>
      dispatch({type: actionTypes.DISPLAY_VARIETY_NAME, payload: value}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listing)