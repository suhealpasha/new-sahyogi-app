import React, {Component} from 'react';
import {
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
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      active10Button: false,
      active20Button: false,
      active50Button: true,
    };
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
        ratings: '1.1',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img3.png'),
        key: '1',
        origin: 'GEISHA',
        farm: 'El Rosario',
        ratings: '3.6',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img3.png'),
        key: '1',
        origin: 'GEISHA',
        farm: 'El Rosario',
        ratings: '3.6',
      },
     
    ];
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
       
   
      
      },
      itemListContainer: {},
      itemContainer: {
        marginBottom: 10,
        flexDirection: 'column',
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
        paddingBottom: 10,
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
        fontSize: 20,
        fontFamily: 'Gotham Black Regular',
      },
      orderPlacementContainerText:{
        paddingBottom:10,
        paddingTop:10,
        fontFamily:'GothamBook',
       lineHeight:20
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
        marginRight: 10,
        marginLeft: 10,
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
                        100:ratings
                      </Text>
                    </View>
                  );
                  return (
                    <TouchableOpacity
                      onPress={() => console.log('parent')}
                      pointerEvents={'box-none'}>
                      <View style={styles.itemContainer}>
                        <View style={{flexDirection: 'column'}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <View style={styles.itemDetailContainer}>
                              <View
                                style={{flexDirection: 'row', paddingTop: 10}}>
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
                                    paddingRight: 10,
                                  }}>
                                  Quantity:{' '}
                                </Text>
                                <NumericInput
                                  totalWidth={80}
                                  totalHeight={30}
                                  minValue={1}
                                />
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
                                  <Text style={styles.unitsText}>10lbs</Text>
                                </View>
                              </View>
                            </View>
                            <View style={styles.thumbnailImageContainer}>
                              <Image
                                source={item.name}
                                style={{
                                  width: 130,
                                  resizeMode: 'cover',
                                  height: 125,

                                  borderTopRightRadius: 5,
                                  borderBottomRightRadius: 5,
                                }}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              borderColor: '#95A5A6',
                              borderTopWidth: 0.25,
                              justifyContent: 'space-between',
                            }}>
                            <View style={styles.AddToCartButton}>
                              <Text style={styles.cartText}>$360</Text>
                            </View>

                            <TouchableOpacity
                              style={{
                                width: '50%',
                                borderLeftWidth: 0.25,
                                color: '#95A5A6',
                                justifyContent: 'center',
                              }}
                              onPress={() => navigate('HomeScreen')}>
                              <Text style={styles.placeOrderButtonText}>
                                Remove
                              </Text>
                            </TouchableOpacity>
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
                  <View style={{width:'50%'}}>
                    <Text style={styles.orderPlacementContainerHeaderText}>
                      Address
                    </Text>
                    <Text style={styles.orderPlacementContainerText}>
                      #268/5,xrz,street,
                      pqr city, 123 state,US-560106.
                    </Text>
                  </View>
                  <View>
                  <TouchableOpacity style={styles.loginButton} onPress={this.props.click}>
        <Text style={styles.buttonTextStyle}>Change</Text>
            </TouchableOpacity>
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
                        <Text style={styles.orderPlacementContainerText}>Total Amt</Text>
                      </View>
                      <View style={{width:'50%'}}>
                      <Text style={styles.orderPlacementContainerText}>$340</Text>
                        <Text style={styles.orderPlacementContainerText}>0</Text>
                        <Text style={styles.orderPlacementContainerText}>$20</Text>
                        <Text style={styles.orderPlacementContainerText}>$360</Text>

                      </View>
                    </View>
                  </View>
              </View>
            </View>

        </View>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            borderColor: '#95A5A6',
            borderTopWidth: 0.25,
            justifyContent: 'space-between',
            backgroundColor:'white',
            
          }}>
          <View style={styles.totalAmount} >
            <Text style={styles.totalAmountText}>$360</Text>
          </View>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => navigate('HomeScreen')}
            underlayColor="#fff">
            <Text style={styles.buyText}>Place order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
