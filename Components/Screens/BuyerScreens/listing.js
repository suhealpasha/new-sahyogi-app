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
  Dimensions,
  ImageBackground,
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
import NextButton from '../../utils/nextButton';
class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      spinner: false,
      noDataAvailable: false,
      clickedIcon: null,
      newItems: [],
      allProductsData: [],
      filtering: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  async componentDidMount() {
    await this.fetchProducts();
    if( this.props.route.params.sideDrawer){
      this.sorting('second')
    }
    else if( this.props.route.params.nano){    
    this.props.onOriginProductsFiltered([]);
    this.props.onVaritieyProductsFiltered([]);
    this.props.onNanoLotProductsFiltered(true);
    this.props.onMicroLotProductsFiltered(false);
    this.RBSheet.close();
    
    }
    else if(this.props.route.params.micro){     
    this.props.onOriginProductsFiltered([]);
    this.props.onVaritieyProductsFiltered([]);
    this.props.onNanoLotProductsFiltered(false);
    this.props.onMicroLotProductsFiltered(true);
    this.RBSheet.close();
    }
  
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  fetchProducts = async () => {
    this.setState({spinner: true});
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    const data = {
      featured: this.props.filterFeaturedData
        ? this.props.filterFeaturedData
        : null,
      origin_Id: this.props.filterOriginsData.length
        ? String(this.props.filterOriginsData)
        : null,
      lot:
        (this.props.filterNanoLotData && this.props.filterMicroLotData) ||
        (!this.props.filterNanoLotData && !this.props.filterMicroLotData)
          ? null
          : this.props.filterNanoLotData
          ? 'Nano'
          : 'Micro',
      verity_Id: this.props.filterVaritiesData.length
        ? String(this.props.filterVaritiesData)
        : null,
    };
    await axios
      .post(api.buyerAllProductAPI, data, {
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
              allProductsData: res.data.data,
            });
            if(res.data.data.length % 2 !== 0){
              this.state.allProductsData.push({dummy: '\n'});
            }
            this.state.allProductsData.push({button: 'Region / Origin'});
            this.state.allProductsData.push({
              button: this.props.filterFeaturedData
                ? 'All Products'
                : 'Fetured Products',
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
       if(a.updated_date){
          return Date.parse(a.updated_date ) < Date.parse(a.updated_date);
       }
        });
        this.setState({
          items: newArray,
        });
        this.RBSheet.close();
        return;
      case 'third':
        newArray.sort((a, b) => {
          if(a.avg_rating){
          return parseFloat(a.avg_rating) < parseFloat(b.avg_rating);
          }
        });
        this.setState({
          items: newArray,
        });
        this.RBSheet.close();
        return;
      case 'forth':
        newArray.sort((a, b) => {
          if(a.avg_rating){
          return parseFloat(a.avg_rating) > parseFloat(b.avg_rating);
          }
        });
        this.setState({
          items: newArray,
        });
        this.RBSheet.close();
        return;
      case 'fifth':
        newArray.sort((a, b) => {
          if(a.verityname){
          return a.verityname > b.verityname;
          }
        });
        this.setState({
          items: newArray,
        });
        this.RBSheet.close();
        return;
    }
  };

  filtering = args => {
    this.RBSheet.close();
    this.fetchProducts();
  };

  fetchProductDetails = (args, args1) => {
    this.props.onDisplayVarietyName(args1);
    this.props.navigation.navigate('Product Description', {productId: args});
  };

  onSeeAll = args => {
    this.RBSheet.close();
    this.props.onProductListingTitle(args);
    if (args === 'Products') {
      this.props.onFeaturedProductsFiltered(false);
    } else {
      this.props.onFeaturedProductsFiltered(true);
    }
    this.props.onOriginProductsFiltered([]);
    this.props.onVaritieyProductsFiltered([]);
    this.props.onNanoLotProductsFiltered(false);
    this.props.onMicroLotProductsFiltered(false);
    this.fetchProducts();
  };

  render() {
    const styles = StyleSheet.create({
      container: {
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
      itemContainer: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        width: this.state.width / 2 - 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 5,

        elevation: 7,
        paddingBottom: 10,
        borderRadius: 5,
      },
      itemDetailContainer: {
        paddingLeft: 10,
        paddingRight: 10,
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
      spinnerTextStyle: {
        color: '#7ea100',
      },
      loginButton: {
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: '#7ea100',
        borderRadius: 50,
      },
      buttonText: {
        color: '#fff',
        fontFamily: 'GothamMedium',
        fontSize: 14,
      },
      imageContainer: {
        backgroundColor: 'grey',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        aspectRatio: 2 / 1,
      },
    });
    let index = 0;
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
          onFiltering={this.filtering}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#f8f8f8',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}>
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
            <View>
              <View style={{height: this.state.height - 60}}>
                <FlatList
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginTop: 10,
                    marginBottom: 30,
                  }}
                  data={this.state.allProductsData}
                  columnWrapperStyle={{justifyContent: 'space-between'}}
                  //   ListFooterComponent={() => <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',paddingTop:10,paddingBottom:20}}>
                  //   <TouchableOpacity style={styles.loginButton} >
                  // <Text style={styles.buttonText}>Regions / Origins</Text>
                  //     </TouchableOpacity>
                  //     <TouchableOpacity style={styles.loginButton}  onPress={() => this.onSeeAll('All Featured Crops')}>
                  // <Text style={styles.buttonText}>Featured Product</Text>
                  //     </TouchableOpacity>
                  // </View>}
                  numColumns={2}
                  keyExtractor={items => {
                    items.product_Id;
                  }}
                  renderItem={({item}) => {
                    let itemType = Object.keys(item)[0];
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
                    return itemType !== 'button'  ? (
                      <TouchableNativeFeedback
                        style={itemType === 'dummy' ? {display: 'none'} : null}
                        onPress={() =>
                          this.fetchProductDetails(
                            item.product_Id,
                            item.verityname,
                          )                          
                        }>
                        <View style={styles.itemContainer}>
                          <View style={styles.imageContainer}>
                            <ImageBackground
                              source={{
                                uri: item.thumbnail_image,
                              }}
                              style={{
                                aspectRatio: 2 / 1,
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                              }}
                              imageStyle={{
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                              }}
                              // resizeMode='stretch'
                            />
                          </View>
                          <View style={styles.itemDetailContainer}>
                            <Text style={styles.itemTextVariety}>
                              {item.verityname}
                            </Text>
                            <Text style={styles.itemTextOrigin}>
                              {item.originsname}
                            </Text>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <Text style={styles.itemTextFarm}>
                                {item.farm}
                              </Text>
                              {ratingIcon}
                            </View>
                          </View>
                        </View>
                      </TouchableNativeFeedback>
                    )                 
                                    
                    :(
                      <View
                        style={{
                          display: 'flex',
                          width: this.state.width / 2 - 20,
                        }}>
                        <TouchableOpacity
                          style={styles.loginButton}
                          onPress={() => {
                            switch (item.button) {
                              case 'Region / Origin':
                                this.props.navigation.navigate('All Regions');
                                break;
                              case 'All Products':
                                this.onSeeAll('Products');
                                break;
                              case 'Fetured Products':
                                this.onSeeAll('All Featured Crops');
                                break;
                            }
                          }}>
                          <Text style={styles.buttonText}>{item.button}</Text>
                        </TouchableOpacity>
                      </View>
                    );                 
                  }}
                
                />
              </View>
            </View>
          )}

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
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    filterFeaturedData: state.reducer.filterFeaturedData,
    filterOriginsData: state.reducer.filterOriginsData,
    filterNanoLotData: state.reducer.filterNanoLotData,
    filterMicroLotData: state.reducer.filterMicroLotData,
    filterVaritiesData: state.reducer.filterVaritiesData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDisplayVarietyName: value =>
      dispatch({type: actionTypes.DISPLAY_VARIETY_NAME, payload: value}),
    onProductListingTitle: value =>
      dispatch({type: actionTypes.LISTING_TITLE, payload: value}),
    onFeaturedProductsFiltered: value =>
      dispatch({type: actionTypes.FILTER_FEATURED_DATA, payload: value}),
    onNanoLotProductsFiltered: value =>
      dispatch({type: actionTypes.FILTER_NANO_LOT_DATA, payload: value}),
    onMicroLotProductsFiltered: value =>
      dispatch({type: actionTypes.FILTER_MICRO_LOT_DATA, payload: value}),
    onOriginProductsFiltered: value =>
      dispatch({type: actionTypes.FILTER_ORIGINS_DATA, payload: value}),
    onVaritieyProductsFiltered: value =>
      dispatch({type: actionTypes.FILTER_VARITIES_DATA, payload: value}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listing);
