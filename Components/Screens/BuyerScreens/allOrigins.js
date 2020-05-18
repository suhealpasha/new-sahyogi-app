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
import * as api from '../../../assets/api/api';
import {
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';

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
  }

  componentDidMount() {
    this.fetchOrigins();
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

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1.0,
        backgroundColor: '#efebea',
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
        backgroundColor: 'white',      
        width:this.state.width / 2 - 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,

        paddingBottom: 10,
      },
      itemData: {
        borderTopWidth: 0.25,
        borderColor: '#95A5A6',
      },
      textData: {
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        fontFamily: 'Gotham Black Regular',
      },
      spinnerTextStyle: {
        color: '#00aa00',
      },
    });

    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      
        <Text style={{fontFamily:'GothamMedium',paddingLeft:10,paddingBottom:10,paddingTop:10}}>Select Origins</Text>
        <CheckBox
          title={'Select All'}
          fontFamily={'GothamMedium'}
          iconRight
          checked={this.state.checked}
          containerStyle={{
            paddingLeft:0,
            marginLeft: 0,
            marginTop: 0,
            marginBottom: 0,
            width:105,
            backgroundColor:'#efebea'
            
          }}
          checkedColor={'#00aa00'}
          onPress={this.handleAllChecked}
        />
        </View>
        {this.state.noDataAvailable ? (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>No Data</Text>
          </View>
        ) : (
          <View style={{flex: 1.0, paddingTop: 10}}>
            <FlatList
              data={
                !this.props.searchBarShow
                  ? this.state.originsData
                  : this.state.searchedData
              }
              columnWrapperStyle={{justifyContent: 'space-between'}}
              numColumns={2}
              keyExtractor={items => {
                items.origin_Id;
              }}
              renderItem={({item}) => {
                return (
                  <View style={{paddingLeft: 10, paddingRight: 10}}>
                    <View style={styles.itemContainer}>
                      <ImageBackground
                        source={{
                          uri: item.url_thumbnail_image,
                        }}
                        style={{width: this.state.width / 2 - 20, height: 120}}
                        resizeMode='stretch'
                        >
                        <CheckBox
                          checked={this.state.checked || item.checked}
                          right
                          checkedColor={'#00aa00'}
                          onPress={() => this.selectOrigins(item.origin_Id)}
                          containerStyle={{
                            paddingLeft: 0,
                            paddingRight: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                            justifyContent: 'space-between',
                          }}
                        />
                      </ImageBackground>
                      <View style={styles.itemData}>
                        <Text style={styles.textData}>{item.name}</Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        )}

        {!this.state.noDataAvailable ? (
          <View>
            <TouchableNativeFeedback onPress={this.onSeeAll}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Text
                  style={{
                    paddingTop: 15,
                    paddingBottom: 15,
                    textAlignVertical: 'center',
                    color: '#004561',
                    textAlign: 'center',
                    fontSize: 14,
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
      onFeaturedProductsFiltered:  value =>
      dispatch({type: actionTypes.FILTER_FEATURED_DATA, payload: value}),
      onNanoLotProductsFiltered:  value =>
      dispatch({type: actionTypes.FILTER_NANO_LOT_DATA, payload: value}),   
      onMicroLotProductsFiltered:  value =>
      dispatch({type: actionTypes.FILTER_MICRO_LOT_DATA, payload: value}),     
      onVaritieyProductsFiltered:value =>
      dispatch({type: actionTypes.FILTER_VARITIES_DATA, payload: value}), 
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(AllOrigins);
