import React, {Component} from 'react';
import {TouchableWithoutFeedback,BackHandler,AsyncStorage,StyleSheet,FlatList,View,Text,Image,ScrollView,Button,Dimensions,TouchableOpacity,AppRegistry,navigation} from 'react-native';
import {Toolbar, COLOR, BottomNavigation, Icon} from 'react-native-material-ui';
import PropTypes from 'prop-types';
import Products from './products';
import FeaturedItems from './featuredItems';
import Regions from './regions';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import KeyboardShift from '../../utils/keyboardShift';
import {YellowBox} from 'react-native';
import Dashboard from 'react-native-dashboard';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
const Tab = createMaterialBottomTabNavigator();

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,    
      regionsData:[] 
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount(){   
    this.setState({regionsData:this.props.regionsData})
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.regionsData !== this.props.regionsData){
      this.setState({regionsData:this.props.regionsData})
    }
    
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
    console.log('Home backbutton')
    BackHandler.exitApp();
    return true;
  }
  
  
navigationHandler = (arg) =>{
  this.props.onBottomTabClicked('order listing')
  this.props.navigation.navigate('Order Listing')
}

onSeeAll = () =>{
  this.props.navigation.navigate('Listing')
}

  render() {
    const items = [
      {name: 'Total Orders', background: '#3498db', value: '$25000'},
      {name: 'Total Revenue', background: '#ef0202', value: '500'},
      {name: 'Refunds', background: '#efcf02', value: '$300'},
      {name: 'Average Revenue', background: '#02ef1d', value: '$1500'},
    ];

    const orders = [
      {
        key: '8',
        buyerName: 'Adam Smith',
        amount: '$5000',
        orderNumber: 3443,
        status: 'Delivered',
        orderDate: '05-Mar-2020',
        rated: true,
      },
      {
        key: '9',
        buyerName: 'Philis Smith',
        amount: '$550',
        orderNumber: 3113,
        status: 'Ordered',
        orderDate: '05-Mar-2020',
        rated: false,
      },
      {
        key: '10',
        buyerName: 'Sandra J Jhonson',
        amount: '$8000',
        orderNumber: 6443,
        status: 'Rejected',
        orderDate: '25-Feb-2020',
        rated: true,
      },
    ];

    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#efebea',
      },
      featuredItems: {
        width: '100%',
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
      },
      microLots: {
        width: '100%',
        flexDirection: 'column',
        paddingLeft: 5,
        paddingRight: 5,
      },
      nanoLots: {
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5,
      },
      regions: {
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5,
      },
      viewall: {
        color: '#3e708f',
        borderRadius: 10,
        fontSize: 14,
        fontFamily: 'GothamBold',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
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
      microalign: {
        paddingBottom: 10,
        paddingTop: 10,
        color: '#004561',
        textAlignVertical: 'center',
        fontFamily: 'Gotham Black Regular',
      },

      textData: {
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
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
        fontSize: 20,
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
      <ScrollView>        
          <View style={styles.container}>
            <View style={styles.featuredItems}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: 5,
                  paddingRight: 5,
                }}>
                <Text style={styles.microalign}>Featured Items</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('All Featured')
                  }>
                  <Text style={styles.viewall}>View All</Text>
                </TouchableOpacity>
              </View>
              <FeaturedItems />
            </View>
            <View style={styles.microLots}>
              <View
                style={{
                  display: 'flex',

                  paddingLeft: 5,
                  paddingRight: 5,
                }}>
                <Text style={styles.microalign}>Products</Text>
              </View>
              <Products {...this.props} />
              <View
                style={{
                  marginTop: 10,
                  borderTopWidth: 0.25,
                  borderColor: '#95A5A6',
                  borderBottomWidth: 0.25,
                }}>
                <TouchableWithoutFeedback
                  onPress={this.onSeeAll}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.viewall}>See All</Text>
                    <Icon name="chevron-right" color={'#3e708f'} size={25} />
                  </View>
                  </TouchableWithoutFeedback>
              </View>
            </View>

            <View style={styles.regions}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: 5,
                  paddingRight: 5,
                }}>
                <Text style={styles.microalign}>Regions</Text>
                <Text
                  style={styles.viewall}
                  onPress={() => this.props.navigation.navigate('All Regions')}>
                  View All
                </Text>
              </View>
              <Regions {...this.props} regionsData = {this.state.regionsData} />
            </View>
          </View>
        
      </ScrollView>
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
  };
};
export default connect(null, mapDispatchToProps)(HomeScreen);
