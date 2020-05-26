import React, {Component} from 'react';
import {BackHandler,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Dimensions
} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from '../../BottomNavigation/sellerBottomNavigation';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOn:null,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  UNSAFE_componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {  
    this.props.onBottomTabClicked('home');
    this.props.navigation.goBack(null);
    return true;
  }
  
  

  componentDidUpdate(prevProps, prevState) {  
    console.log(this.props.route.params.filterOn) 
    if(this.props.route.params.filterOn ){
      this.RBSheet.open()
    }
  
  }
  

 

  render() {
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
      {
        key: '1',
        buyerName: 'Saumel paul',
        amount: '$7866',
        orderNumber: 1008,
        status: 'Approved',
        orderDate: '08-Mar-2020',
        rated: true,
      },
      {
        key: '2',
        buyerName: 'Thomson Philis',
        amount: '$3000',
        orderNumber: 1443,
        status: 'Ordered',
        orderDate: '05-Feb-2020',
        rated: true,
      },
      {
        key: '3',
        buyerName: 'James Cook',
        amount: '$760',
        orderNumber: 7646,
        status: 'Rejected',
        orderDate: '08-Jan-2020',
        rated: true,
      },
    ];
    const styles = StyleSheet.create({
      container: {
        flex: 1.0,
        
     
       
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
      <View style={styles.container}>
         <FlatList
              data={orders}
              numColumns={1}
              // keyExtractor = {(items)=>{items.key}}

              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Seller Order Detail')
                    }>
                    <View style={styles.itemContainer}>
                      <View style={styles.itemDetailContainer}>
                        <Text style={styles.itemTextOrderText}>
                          Order#: {item.orderNumber}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            paddingLeft: 5,
                            paddingRight: 5,
                          }}>
                          <Text
                            style={{fontFamily: 'GothamLight', paddingTop: 5}}>
                            Buyer:
                          </Text>
                          <Text style={styles.itemTextOrigin}>
                            {' '}
                            {item.buyerName}
                          </Text>
                        </View>
                        <Text style={styles.itemTextFarm}>{item.amount}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: this.state.width - 40,
                            
                          }}>
                          <Text style={styles.itemTextOrderText}>
                            {item.orderDate}
                          </Text>
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
                        </View>
                      </View>
                      <View style={{justifyContent: 'center'}}>
                        <Icon name="chevron-right" size={25} />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />       
       <BottomNavigation {...this.props}/>
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
export default connect(
  null,
  mapDispatchToProps,
)(Listing); 

