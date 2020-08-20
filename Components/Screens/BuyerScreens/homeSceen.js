import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  BackHandler,
  AsyncStorage,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Dimensions,
  TouchableOpacity,
  AppRegistry,
  navigation,
} from 'react-native';
import {Toolbar, COLOR, BottomNavigation, Icon} from 'react-native-material-ui';
import Products from './products';
import FeaturedItems from './featuredItems';
import Regions from './regions';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      regionsData: [],
      featuredProductsData: [],
      latestProductsData: [],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      regionsData: this.props.regionsData,
      featuredProductsData: this.props.featuredProductsData,
      latestProductsData: this.props.latestProductsData,
    });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.regionsData !== this.props.regionsData) {
      this.setState({regionsData: this.props.regionsData});
    }
    if (prevProps.featuredProductsData !== this.props.featuredProductsData) {
      this.setState({featuredProductsData: this.props.featuredProductsData});
    }
    if (prevProps.latestProductsData !== this.props.latestProductsData) {
      this.setState({latestProductsData: this.props.latestProductsData});
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  navigationHandler = arg => {
    this.props.onBottomTabClicked('order listing');
    this.props.navigation.navigate('Order Listing');
  };

  onSeeAll = args => {
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
    this.props.navigation.navigate('Listing');
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
       backgroundColor:'#f8f8f8'
      },
      featuredItems: {
        width: '100%',
        paddingTop: 10,
        // paddingLeft: 10,
        // paddingRight: 10,
      },
      microLots: {
        width: '100%',
        flexDirection: 'column',
        paddingLeft: 5,
        paddingRight: 5,
      },
      regions: {
        width: '100%',
        
      },
      viewallfeatured: {
        color: '#3e708f',
        borderRadius: 10,
        fontSize: 14,
        fontFamily: 'GothamMedium',
        paddingTop: 10,
        paddingBottom: 10,
      },
      seeAll: {
        color: '#3e708f',
        borderRadius: 10,
        fontSize: 14,
        fontFamily: 'GothamMedium',
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
      },
      viewall: {
        color: '#3e708f',
        borderRadius: 10,
        fontSize: 14,
        fontFamily: 'GothamMedium',
        paddingTop: 10,
        paddingBottom: 10,
      },
      viewallRecentOrders: {
        color: '#3e708f',
        borderRadius: 10,
        fontSize: 12,
        fontFamily: 'GothamBold',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
      },
      featuredalign: {
        paddingTop: 10,
        paddingBottom: 10,
        color: '#004561',
        textAlignVertical: 'center',
        fontFamily: 'GothamMedium',
        paddingLeft:10,
        paddingRight:10
      },
      microalign: {
        paddingBottom: 10,
        paddingTop: 10,
        color: '#004561',
        textAlignVertical: 'center',
        fontFamily: 'GothamMedium',
      },

      textData: {
        paddingTop: 5,

        fontFamily: 'Gotham Black Regular',
        color: 'white',
      },
      textDataValue: {
        paddingTop: 15,
        paddingLeft: 5,
        paddingRight: 5,
        fontFamily: 'Gotham Black Regular',
        color: 'white',
        fontSize: 25,
      },
      recentOrders: {
        borderTopWidth: 0.25,
        borderBottomWidth: 0.25,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#95A5A6',
      },
      recentOrdersHeader: {
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: 'GothamMedium',
      },
      itemContainer: {
        width: this.state.width,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 0.25,
        borderColor: '#95A5A6',
        flexDirection: 'row',

        backgroundColor: 'white',
      },
      itemDetailContainer: {},
      itemTextOrderText: {
        fontSize: 12,
        fontFamily: 'GothamLight',
        paddingLeft: 5,
        paddingRight: 5,
      },
      itemTextOrigin: {
        fontFamily: 'Gotham Black Regular',
        fontSize: 14,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
      },
      itemTextFarm: {
        fontSize: 12,
        justifyContent: 'space-around',
        fontFamily: 'GothamMedium',      
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
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

    return (
      <View style={{backgroundColor:'#7ea100'}}>
      <View style={{ backgroundColor: '#f8f8f8',
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30, }}>
      <ScrollView style={{marginTop:30}}>
        <View style={{backgroundColor: '#7ea100',}}>
          <View style={styles.container}>          
            <View style={styles.regions}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: 10,
                  paddingRight: 10,
                  // paddingTop: 10,
               
                }}>
                <Text style={styles.microalign}>Featured Crops</Text>
                <Text
                  style={styles.viewall}
                  onPress={() => this.onSeeAll('All Featured Crops')}>
                  View All
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 0.25,
                  marginLeft: 10,
                  marginRight: 10,
                }}
              />
               <FeaturedItems
                {...this.props}
                featuredProductsData={this.state.featuredProductsData}
              />
            </View>

            <View style={styles.regions}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 10,
               
                }}>
                <Text style={styles.microalign}>Latest Products</Text>
                <Text
                  style={styles.viewall}
                  onPress={() => this.onSeeAll('Products')}>
                  View All
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 0.25,
                  marginLeft: 10,
                  marginRight: 10,
                }}
              />
              <Products
                {...this.props}
                latestProductsData={this.state.latestProductsData}
              />
            </View>
            <View style={styles.regions}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                }}>
                <Text style={styles.microalign}>Origins/Regions</Text>
                <Text
                  style={styles.viewall}
                  onPress={() => this.props.navigation.navigate('All Regions')}>
                  View All
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 0.25,
                  marginLeft: 10,
                  marginRight: 10,
                }}
              />
              <Regions {...this.props} regionsData={this.state.regionsData} />
            </View>
          </View>
        </View>
      </ScrollView>
      </View>
      </View>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     sellerUser: state.reducer.sellerUser,
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    onBottomTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_ICON, payload: value}),
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
  null,
  mapDispatchToProps,
)(HomeScreen);
