import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  Dimensions,
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
import {CheckBox} from 'react-native-elements';
import RoundCheckbox from 'rn-round-checkbox';
import * as api from '../../../assets/api/api';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import Regions from './regions';
let filteredData = [];

class AllOrigins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      spinner: false,
      noDataAvailable: false,
      originsData: [],
      searchedData: [],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    this.fetchOrigins();
  }

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

  async UNSAFE_componentWillReceiveProps() {
    if (this.props.searchBarShow === false) {
      await this.setState({
        noDataAvailable: false,
        originsData: [],
        searchedData: [],
      });
      this.fetchOrigins();
    }
  }

  fetchOrigins = async () => {
    this.setState({spinner: true});
    let data = JSON.stringify({
      region_Id: this.props.route.params.regionId,
    });
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    axios
      .post(api.originsByIdAPI, data, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        if (res.data.data.length <= 0) {
          this.setState({noDataAvailable: true, spinner: false});
        } else {
          this.setState({spinner: false, originsData: res.data.data});
        }
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    filteredData = this.state.originsData.filter(item => {
      const itemDataOrigin = item.name.toUpperCase();
      if (this.props.searchBarText) {
        const textData = this.props.searchBarText.toUpperCase();
        if (itemDataOrigin.indexOf(textData) > -1) {
          return itemDataOrigin.indexOf(textData) > -1;
        }
      }
    });

    if (prevProps.searchBarText !== this.props.searchBarText) {
      this.setState({searchedData: filteredData});
    }
  }

  handleAllChecked = async () => {
    await this.setState({checked: !this.state.checked});
    let items = this.state.originsData;
    items.forEach(item => (item.checked = this.state.checked));
    this.setState({originsData: items});
  };

  selectOrigins = args => {
    this.setState({checked: false});
    let items = this.state.originsData;
    items.forEach(item => {
      if (item.origin_Id === args)
        if (item.checked === true) {
          return (item.checked = false);
        } else {
          return (item.checked = true);
        }
    });
    this.setState({originsData: items});
  };

  onSeeAll = () => {
    let checkList = [];
    if (this.state.checked) {
      this.state.originsData.filter(item => {
        checkList.push(item.origin_Id);
      });
    } else {
      this.state.originsData.filter(item => {
        if (item.checked || item.checked === true) {
          checkList.push(item.origin_Id);
        }
      });
    }
    this.props.onProductListingTitle('Products');
    this.props.onFeaturedProductsFiltered(null);
    this.props.onVaritieyProductsFiltered([]);
    this.props.onNanoLotProductsFiltered(false);
    this.props.onMicroLotProductsFiltered(false);
    this.props.onOriginProductsFiltered(checkList);
    this.props.navigation.navigate('Listing');
  };

  selectHandler = args => {
    this.selectOrigins(args);
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
        backgroundColor: '#ffff',
        width: this.state.width / 3 - 20,
        height: this.state.width / 3 - 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 5,

        elevation: 7,
        paddingBottom: 10,
        borderRadius: 100,
      },
      itemData: {},
      textData: {
        textAlign: 'center',
        fontFamily: 'GothamMedium',
      },
      spinnerTextStyle: {
        color: '#7ea100',
      },
    });

    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#f8f8f8',
            borderTopRightRadius: 30,
            flex: 1.0,
            borderTopLeftRadius: 30,
          }}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'GothamMedium',
                paddingLeft: 10,
                paddingBottom: 10,
                paddingTop: 10,
              }}>
              Select Origins
            </Text>
            <CheckBox
              title={'Select All'}
              fontFamily={'GothamMedium'}
              iconRight
              size={25}
              checked={this.state.checked}
              containerStyle={{
                paddingLeft: 0,
                marginLeft: 0,
                marginTop: 10,
                marginBottom: 0,
                width: 105,
                backgroundColor: '#f8f8f8',
                shadowOpacity: 0,
                borderWidth: 0,
              }}
              checkedColor={'#7ea100'}
              onPress={this.handleAllChecked}
            />
          </View>
          {this.state.noDataAvailable ? (
            <View style={styles.noData}>
              <Text style={styles.noDataText}>No Data</Text>
            </View>
          ) : (
            <View style={{paddingTop: 10}}>
              <FlatList
                style={{height: this.state.height / 2}}
                data={
                  !this.props.searchBarShow
                    ? this.state.originsData
                    : this.state.searchedData
                }
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  paddingLeft: 30,
                  paddingRight: 30,
                }}
                numColumns={2}
                keyExtractor={items => {
                  items.origin_Id;
                }}
                renderItem={({item}) => {
                  return (
                    <View style={{}}>
                      <TouchableOpacity
                        onPress={() => this.selectHandler(item.origin_Id)}>
                        <View style={styles.itemContainer}>
                          <ImageBackground
                            source={{
                              uri: item.url_thumbnail_image,
                            }}
                            style={{
                              aspectRatio: 2 / 2,

                              borderRadius: 100,
                            }}
                            imageStyle={{
                              borderRadius: 100,
                            }}
                            resizeMode="cover">
                            {this.state.checked || item.checked ?
                            <View style={{alignItems:'center',height:100,justifyContent:'center'}}>
                             <RoundCheckbox
                            size={20}
                            checked={this.state.checked || item.checked}
                            onValueChange={() => this.selectOrigins(item.origin_Id)}
                            iconColor='#ffff'
                            backgroundColor	='#7ea100'
                            />
                            </View>
                           
                            : null}  
                           
                            {/* <CheckBox
                        checked={this.state.checked || item.checked}
                        center                                     
                        checkedColor={'#7ea100'}
                        checkedIcon='dot-circle-o'                        
                        onPress={() => this.selectOrigins(item.origin_Id)}
                        textAlignVertical={'center'}
                        containerStyle={{
                          // paddingLeft: 0,
                          // paddingRight: 0,
                          paddingTop: 30,
                          paddingBottom:30,                         
                          // justifyContent: 'space-between',
                      
                          
                        }}
                      /> */}
                          </ImageBackground>
                        </View>
                        <View style={styles.itemData}>
                          <Text style={styles.textData}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          )}
        </View>
        {!this.state.noDataAvailable ? (
          <View>
            <View
              style={{
                backgroundColor: '#f8f8f8',
                paddingBottom: 10,
              }}>
              <Regions {...this.props} regionsData={this.props.regionsData} />
            </View>
            <TouchableNativeFeedback onPress={this.onSeeAll}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  backgroundColor: '#f8f8f8',
                }}>
                <Text
                  style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                    textAlignVertical: 'center',
                    color: '#004561',
                    textAlign: 'center',
                    fontSize: 18,
                    fontFamily: 'GothamMedium',
                    textAlignVertical: 'center',
                  }}>
                  Continue
                </Text>
                <Icon
                  name="chevron-right"
                  color={'#3e708f'}
                  size={25}
                  style={{textAlignVertical: 'center'}}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        ) : null}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onProductListingTitle: value =>
      dispatch({type: actionTypes.LISTING_TITLE, payload: value}),
    onOriginProductsFiltered: value =>
      dispatch({type: actionTypes.FILTER_ORIGINS_DATA, payload: value}),
    onFeaturedProductsFiltered: value =>
      dispatch({type: actionTypes.FILTER_FEATURED_DATA, payload: value}),
    onNanoLotProductsFiltered: value =>
      dispatch({type: actionTypes.FILTER_NANO_LOT_DATA, payload: value}),
    onMicroLotProductsFiltered: value =>
      dispatch({type: actionTypes.FILTER_MICRO_LOT_DATA, payload: value}),
    onVaritieyProductsFiltered: value =>
      dispatch({type: actionTypes.FILTER_VARITIES_DATA, payload: value}),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(AllOrigins);
