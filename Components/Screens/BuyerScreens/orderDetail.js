import React, {Component} from 'react';

import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductDescription from '../../utils/productDescription';
import ProductAction from '../../utils/productAction';
import {SliderBox} from 'react-native-image-slider-box';
import StepIndicator from 'react-native-step-indicator';
import ConfirmButton from '../../utils/confirmButton';

class ProductDescriptionTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      currentPosition: 0,
      productOrigin: 'EL SALVADOR',
      items: [
        require('../../../assets/Images/coffeeFarms/img4.png'),
        require('../../../assets/Images/coffeeFarms/img5.png'),
        require('../../../assets/Images/coffeeFarms/img6.png'),
        require('../../../assets/Images/coffeeFarms/img7.png'),
        require('../../../assets/Images/coffeeFarms/img1.png'),
      ],
    };
  }

  render() {
    const items = [
      {
        name: require('../../../assets/Images/coffeeFarms/img1.png'),
        key: '1',
        origin: 'EL SALVADOR',
        variety: 'Pacamara',
        farm: 'Las Delicias',
        altitude: '1500 Ft',
        notes: 'Peach,Chocolate,Honey',
        ratings: 5,
        process: 'Natural',
      },
    ];

    const styles = StyleSheet.create({
      parentContaier: {
        backgroundColor: '#efebea',
        paddingBottom:10
      },
      container: {
        width: this.state.width,
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 10,
      },
      originHeaderContainer: {
        width: this.state.width,
        paddingBottom: 10,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
      },
      headerText: {
        color: 'rgb(0,70,99)',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
      },
      productImageContainer: {
        justifyContent: 'center',
        width: '100%',
        height: 190,
      },
      buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      },
      AddToCartButton: {
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderColor: '#95A5A6',
        width: '50%',
        paddingTop: 5,
        paddingBottom: 5,
      },
      buyButton: {
        backgroundColor: '#004561',
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderColor: '#95A5A6',
        width: '50%',
        paddingTop: 5,
        paddingBottom: 5,
      },
      cartText: {
        color: '#004561',
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        fontFamily: 'Gotham Black Regular',
      },
      buyText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        fontFamily: 'Gotham Black Regular',
      },
      productDescriptionContainer: {
        paddingTop: 10,
      },
      productDetailsContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingBottom: 10,
      },
      productDetailHeader: {
        flexDirection: 'column',
        width: 100,
      },
      productDetailHeaderText: {
        fontFamily: 'GothamBold',
        padding: 2,
        fontSize: 15,
      },
      productDetail: {
        flexDirection: 'column',
      },
      productDetailText: {
        fontSize: 15,
        fontFamily: 'GothamMedium',
        padding: 2,
      },
      priceText: {
        fontFamily: 'Gotham Black Regular',
        color: '#004561',
        fontSize: 25,
      },
      viewall: {
        color: '#3e708f',
        borderRadius: 10,
        fontSize: 12,
        fontFamily: 'GothamBold',
        paddingTop: 10,
        paddingBottom: 10,
      },
      orderPlacementContainer: {
        flex: 1.0,
        flexDirection: 'column',
        paddingTop: 10,        
      },
      orderPlacementContainerHeaderText: {
        fontSize: 20,
        fontFamily: 'Gotham Black Regular',
        paddingBottom: 10,
      },
      orderPlacementContainerText: {
        paddingBottom: 10,
        paddingTop: 10,
        fontFamily: 'GothamBook',
        lineHeight: 5,
      },
      orderPlacementContainerTextFinal: {
        paddingBottom: 10,
        paddingTop: 10,
        fontFamily: 'GothamBook',      
        fontWeight:'bold',
        borderBottomWidth:0.25,
        borderTopWidth:0.25, 
        borderColor:'#95A5A6'       
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
      totalAmount: {
        justifyContent: 'center',
        width: '50%',
      },
      totalAmountText: {
        textAlign: 'center',
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
      buttonTextStyle: {
        color: 'white',
        fontFamily: 'GothamMedium',
        fontSize: 14,
        paddingLeft: 10,
        paddingRight: 10,
      },
      itemContainerName: {
        fontSize: 20,
        fontFamily: 'GothamBook',
      },
      itemContainerAddress: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: 'GothamLight',
        paddingTop: 10,
      },
      itemContainerMobile: {
        paddingTop: 10,
        lineHeight: 20,
        fontFamily: 'GothamLight',
      },
    });

    const labels = ['Ordered', 'Shipped', 'Delivered'];
    const customStyles = {
      stepIndicatorSize: 30,
      currentStepIndicatorSize: 30,
      separatorStrokeWidth: 2,
      currentStepStrokeWidth: 3,
      stepStrokeCurrentColor: '#00aa00',
      stepStrokeWidth: 3,
      separatorStrokeFinishedWidth: 4,
      stepStrokeFinishedColor: '#00aa00',
      stepStrokeUnFinishedColor: '#95A5A6',
      separatorFinishedColor: '#00aa00',
      separatorUnFinishedColor: '#95A5A6',
      stepIndicatorFinishedColor: '#00aa00',
      stepIndicatorUnFinishedColor: '#95A5A6',
      stepIndicatorCurrentColor: '#00aa00',
      stepIndicatorLabelFontSize: 13,
      currentStepIndicatorLabelFontSize: 13,
      stepIndicatorLabelCurrentColor: 'white',
      stepIndicatorLabelFinishedColor: 'white',
      stepIndicatorLabelUnFinishedColor: 'white',
      labelColor: '#95A5A6',
      labelSize: 13,
      currentStepLabelColor: '#00aa00',
      labelFontFamily: 'GothamLight',
    };

    return (
      <View style={styles.parentContaier}>
        <ScrollView>
          <View style={styles.productImageContainer}>
            <SliderBox
              images={this.state.items}
              sliderBoxHeight={190}
              onCurrentImagePressed={index =>
                console.warn(`image ${index} pressed`)
              }
              dotColor="#3e708f"
              inactiveDotColor="#95A5A6"
              autoplay
              circleLoop
              parentWidth={this.state.width}
              ImageComponentStyle={{}}
            />
          </View>

          <View style={styles.container}>
            <View style={styles.productDescriptionContainer}>
              <View style={{flex: 1.0}}>
                <View>
                  <FlatList
                    data={items}
                    numColumns={2}
                    renderItem={({item}) => {
                      return (
                        <View style={styles.productDetailsContainer}>
                          <View style={styles.productDetailHeader}>
                            <Text style={styles.productDetailHeaderText}>
                              Origin
                            </Text>
                            <Text style={styles.productDetailHeaderText}>
                              Variety
                            </Text>
                            <Text style={styles.productDetailHeaderText}>
                              Farm
                            </Text>
                          </View>
                          <View style={styles.productDetail}>
                            <Text style={styles.productDetailText}>
                              : {item.origin}
                            </Text>
                            <Text style={styles.productDetailText}>
                              : {item.variety}
                            </Text>
                            <Text style={styles.productDetailText}>
                              : {item.farm}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderBottomWidth:0.25,
                      paddingBottom:10,
                      borderColor:'#95A5A6'
                    }}>
                    <View>
                      <Text style={styles.priceText}>$100.00</Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('Product Description')
                        }>
                        <Text style={styles.viewall}>View Detail</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{paddingBottom: 10, paddingTop: 10,borderBottomWidth:0.25,borderColor:'#95A5A6'}}>
                  <StepIndicator
                    customStyles={customStyles}
                    currentPosition={this.state.currentPosition}
                    labels={labels}
                    stepCount={3}
                  />
                  <ConfirmButton buttonName="Cancel" />
                </View>
                <View style={styles.orderPlacementContainer}>
                  <View style={{flexDirection: 'column'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomWidth:0.25,
                        borderColor:'#95A5A6'
                      }}>
                      <View style={{width: '50%',paddingBottom:10}}>
                        <Text style={styles.orderPlacementContainerHeaderText}>
                          Shipping Details
                        </Text>
                        <Text style={styles.itemContainerName}>Smith Adam</Text>
                        <Text style={styles.itemContainerAddress}>
                          704 Oxford Dr, Richmond Hill GA,31324
                        </Text>
                        <Text style={styles.itemContainerMobile}>
                          (912) 727-3506
                        </Text>
                      </View>
                    </View>
                    <View style={{paddingTop: 10}}>
                      <Text style={styles.orderPlacementContainerHeaderText}>
                        Price Details
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{width: '50%'}}>
                          <Text style={styles.orderPlacementContainerText}>
                            Unit Price
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            Lot
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            Quantity
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            Unit
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            Sub Total
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            Tax
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            Shipping
                          </Text>
                          <Text style={styles.orderPlacementContainerTextFinal}>
                            Total Amt
                          </Text>
                        </View>
                        <View style={{width: '50%'}}>
                          <Text style={styles.orderPlacementContainerText}>
                            $340
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            Microlot
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            2
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            10 lbs
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            $680
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            0
                          </Text>
                          <Text style={styles.orderPlacementContainerText}>
                            $20
                          </Text>
                          <Text style={styles.orderPlacementContainerTextFinal}>
                            $700
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default ProductDescriptionTemplate;
