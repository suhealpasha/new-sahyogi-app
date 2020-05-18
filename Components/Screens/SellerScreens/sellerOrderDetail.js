import React, {Component} from 'react';
import {BackHandler,
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
import NumericInput from 'react-native-numeric-input';
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
import {YellowBox} from 'react-native';
import ConfirmButton from '../../utils/confirmButton';
import StickyButton from '../../utils/stickyButtons';
import * as actionTypes from '../../../Store/action';
import { connect} from 'react-redux'
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      active10Button: false,
      active20Button: false,
      active50Button: true,
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
   
    this.props.navigation.goBack();
    return true;
  }

  _deleteCart = e => {
    console.log('Child');
  };
  activateUnitsButton = param1 => {
    if (param1 === 'active10Button') {
      if (this.state.active10Button) {
        this.setState({active10Button: false});
      } else {
        this.setState({active10Button: true});
      }
    }
  };

  render() {
    const items = [
      {
        name: require('../../../assets/Images/coffeeFarms/img2.png'),
        key: '2',
        origin: 'BOURBON',
        farm: 'Sta Lucia',
        quantity:1,
        unit:'1lbs',
        price:'$2500',
        total:'$2500'

      },
      {
        name: require('../../../assets/Images/coffeeFarms/img3.png'),
        key: '1',
        origin: 'GEISHA',
        farm: 'El Rosario',
        quantity:5,
        unit:'10lbs',
        price:'$12500',
        total:'$102500'
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img3.png'),
        key: '1',
        origin: 'GEISHA',
        farm: 'El Rosario',
        quantity:2,
        unit:'5lbs',
        price:'$500',
        total:'$1000'
      },
     
    ];
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
            
      },
      productHeaderText:{
        fontSize: 20,
        fontFamily: 'Gotham Black Regular',
        paddingRight:10,
        paddingLeft:10,
        paddingTop:10,
        paddingBottom:10
      },
      itemListContainer: {},
      itemContainer: {
      borderBottomWidth:0.25,
      borderColor:'#95A5A6',
        flexDirection: 'column',
     
        backgroundColor: 'white',
       
      },
      itemDetailContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        
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
      quantityContainer: {
        flexDirection: 'row',
      },
      unitsContainer: {
        flexDirection: 'row',
        paddingTop: 10,
       
      },
      placeOrderButtonText: {
        fontFamily: 'GothamLight',
        color: 'black',
        textAlign: 'center',
        fontSize: 14,
      },
      priceText: {
        fontFamily: 'Gotham Black Regular',
        color: '#004561',
        fontSize: 25,
      },
      orderPlacementContainer: {
        flex: 1.0,
        flexDirection: 'column',
        paddingTop: 10,
      
       
      },
      orderPlacementContainerHeaderText: {
        fontSize:14,
        fontFamily: 'GothamLight',
        borderTopWidth:0.25,
        borderBottomWidth:0.25,
        borderColor:'#95A5A6',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10
      },
      orderPlacementContainerText:{
        paddingBottom:10,
        paddingTop:10,
        fontFamily:'GothamBook',
       lineHeight:20,
       paddingLeft:10,
        paddingRight:10
      },
      orderPlacementContainerTotalText:{
        paddingBottom:10,
        paddingTop:10,
        fontFamily:'GothamBook',
        fontSize:20,
       lineHeight:20,
       paddingLeft:10,
        paddingRight:10
      },
      orderPlacementContainerTotalValueText:{
        paddingBottom:10,
        paddingTop:10,
        fontFamily:'Gotham Black Regular',
        fontSize:20,
       lineHeight:20,
       paddingLeft:10,
        paddingRight:10
      },
      statusText:{
        fontFamily:'GothamMedium',
        paddingLeft:10,
        paddingRight:10
      },
      orderPlaceButton: {
        backgroundColor: '#004561',
        borderTopWidth: 2,
        borderColor: '#95A5A6',
      },
      AddToCartButton: {
        marginBottom: 5,
        marginTop: 5,

        width: '50%',
        paddingTop: 5,
        paddingBottom: 5,
      },
      unitsText: {
        fontFamily: 'GothamBook',
        fontSize: 14,      
        marginLeft:5,
      },
      buyButton: {
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: '#00aa00',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginRight: 10,
      },
      cartText: {
        fontFamily: 'Gotham Black Regular',
        fontSize: 20,
        textAlignVertical: 'center',
        textAlign: 'center',
      },
      buyText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        padding: 10,
        fontFamily: 'GothamMedium',
      },
      totalAmount:{       
        justifyContent:'center',
        width:'50%'
      },
      totalAmountText:{
        textAlign:'center',
        fontFamily: 'Gotham Black Regular',
        fontSize: 25,
        textAlignVertical: 'center',
        textAlign: 'center',
      },
      loginButton: {
        borderWidth: 1,
        borderColor: '#3e708f',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#004561',
      
      
       
      },
      buttonTextStyle:{
        color:'white',
        fontFamily: 'GothamMedium',
        fontSize: 14,
        paddingLeft:10,
        paddingRight:10
      }
    });

    return (
      <View style={{flex:1.0}}>
         <ScrollView>
        <View style={styles.container}>
         
            <View style={styles.itemListContainer}>
            <Text style={styles.productHeaderText}>
                      Products
                    </Text>
              <FlatList
                data={items}
                numColumns={1}
                // keyExtractor = {(items)=>{items.key}}

                renderItem={({item}) => {                 
                  return (
                    <TouchableOpacity
                      onPress={() => console.log('parent')}
                      pointerEvents={'box-none'}>
                      <View style={styles.itemContainer}>
                        <View style={{flexDirection: 'column'}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              
                            }}>
                               <View style={styles.thumbnailImageContainer}>
                              <Image
                                source={item.name}
                                style={{
                                  width: 130,
                                  resizeMode: 'cover',
                                  height: 125,

                                }}
                              />
                            </View>
                            <View style={styles.itemDetailContainer}>
                              
                              <View
                                style={{flexDirection: 'row', paddingTop: 5,}}>
                                <Text style={styles.itemTextOrigin}>
                                  {item.origin}
                                </Text>
                              </View>

                              <Text style={styles.itemTextFarm}>
                                {item.farm}
                              </Text>
                              <View style={styles.quantityContainer}>
                                <Text
                                  style={{
                                    fontFamily: 'GothamLight',
                                    fontSize: 15,
                                    textAlignVertical: 'center',
                                    
                                  }}>
                                  Quantity:
                                </Text>
                                <Text  style={styles.unitsText}>{item.quantity}</Text>
                              </View>
                              <View style={styles.unitsContainer}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'flex-start',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: 'GothamLight',
                                      fontSize: 15,
                                      textAlignVertical: 'center',
                                    }}>
                                    Units:
                                  </Text>
                                  <Text style={styles.unitsText}>{item.unit}</Text>
                                </View>                                
                              </View>
                              <View style={styles.unitsContainer}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'flex-start',
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: 'GothamLight',
                                      fontSize: 15,
                                      textAlignVertical: 'center',
                                    }}>
                                    Price:
                                  </Text>
                                  <Text style={styles.unitsText}>{item.price}</Text>
                                </View>                                
                              </View>
                            </View>
                           
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              borderColor: '#95A5A6',
                              borderTopWidth: 0.25,
                             
                            }}>
                            <View style={styles.AddToCartButton}>
                              <Text style={{fontFamily:'GothamBook',textAlign:'center',fontSize:16}}>Total</Text>
                            </View>

                            <View
                              style={{
                                width: '50%',
                                borderLeftWidth: 0.25,
                                color: '#95A5A6',
                                justifyContent: 'center',
                              }}
                              onPress={() => navigate('HomeScreen')}>
                              <Text style={styles.cartText}>{item.total}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <View style={styles.orderPlacementContainer}>
              <View style={{flexDirection: 'column'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                   
                  }}>
                  <View style={{ width:this.state.width}}>
                   
                    <Text style={styles.orderPlacementContainerHeaderText}>
                      Shipping Details
                    </Text>
                    <View style={{width:'50%'}}>
                    <Text style={styles.orderPlacementContainerText}>
                    105 Vista Oxford Dr,Richmond Hill GA,31324,
                    </Text>
                    <Text style={styles.orderPlacementContainerText}>
                  (325) 698-2333
                    </Text>
                  </View>
                  </View>
                  <View>
                
                  </View>
                </View>
                <View style={{}}>
                    <Text style={styles.orderPlacementContainerHeaderText}>
                      Price Details
                    </Text>
                    <View style={{flexDirection:'row'}}>
                      <View style={{width:'50%'}}>

                        <Text style={styles.orderPlacementContainerText}>Total</Text>
                        <Text style={styles.orderPlacementContainerText}>Tax</Text>
                        <Text style={styles.orderPlacementContainerText}>Shipping</Text>
                        <Text style={styles.orderPlacementContainerTotalText}>Total Amount</Text>
                      </View>
                      <View style={{width:'50%'}}>
                      <Text style={styles.orderPlacementContainerText}>$340</Text>
                        <Text style={styles.orderPlacementContainerText}>0</Text>
                        <Text style={styles.orderPlacementContainerText}>$20</Text>
                        <Text style={styles.orderPlacementContainerTotalValueText}>$360</Text>

                      </View>
                    </View>
                  </View>
                  <View style={{flexDirection:'row',paddingBottom:10,justifyContent:'flex-end'}}>
                    <Text style={styles.statusText}>
                      Status:
                    </Text>
                    <Text style={styles.statusText}>
                      {' '}Ordered
                    </Text>
                  </View>
              </View>
            </View>

        </View>
        </ScrollView>
       <StickyButton cancel='Cancel' proceed='Proceed' buyer={false}/>
      </View>
    );
  }
}
