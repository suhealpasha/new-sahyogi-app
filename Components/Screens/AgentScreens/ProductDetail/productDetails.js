import React, {Component} from 'react';
import {
  AsyncStorage,
  BackHandler,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableNativeFeedback,
  ImageBackground,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import AvailableShades from '../../../../Container/similarShades';
import ActionButton from '../../../utils/components/actionButton';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StickyButton from '../../../utils/components/stickyButtons';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import axios from 'axios';
import Shade from '../../../utils/components/Icons/shade';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import LikeIcon from '../../../utils/components/Icons/like';
import FilledLikeIcon from '../../../utils/components/Icons/filledLike';
import RBSheet from 'react-native-raw-bottom-sheet';
import SimilarItems from '../../../utils/components/similarItems';
import RupeeIcon from '../../../utils/components/Icons/rupee';

import { ThreeSixty } from '@material-ui/icons';
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      rbOpen:false,
      proceed:false,      
      activeSlide: 1,
      data: [
        {
          image: require('../../../../assets/Images/products/sunglasses/d1.png'),
        },
        {
          image: require('../../../../assets/Images/products/sunglasses/d2.png'),
        },
        {
          image: require('../../../../assets/Images/products/sunglasses/d3.png'),
        },
      ],
      details: {
        shades: '10',
        name: 'United Colors of Benetton',
        detail: 'Unisex Mirrored Oval Sunglasses Model No: BE5002MI670',

        offer: '50%',
        min: 'Min.Order:100 Pieces',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is',
        products: [
          {id: 1, name: 'Product Name', price: 50000},
          {id: 2, name: 'Product Name', price: 50000},
          {id: 3, name: 'Product Name', price: 50000},
          {id: 4, name: 'Product Name', price: 50000},
          {id: 5, name: 'Product Name', price: 50000},
          {id: 6, name: 'Product Name', price: 50000},
          {id: 7, name: 'Product Name', price: 50000},
        ],
        size: 'M',
        measure: 'Product Measurement: Lens Width 51.0mm',
        code: 232323,
        soldby: 'Flashstar Commerce',
        manufacturer:
          'Pioneer Exports LTD Unit No. 512-765, 5th Floor, Pe………………., Bangalore',
        contry: 'China',
        total: 800,
      },
      similarProducts: [
        {
          id: 1,
          name: 'MARC LOUIS',
          details: 'Unisex Mirrored Oval Sunglass',
          shades: '10 Shades',
          offer: '',
          price: 800,
          left: '',
          image: require('../../../../assets/Images/products/sunglasses/1.png'),
          liked: true,
        },
        {
          id: 2,
          name: 'United Colors of Benetton',
          details: 'Unisex Polarised & UV Protec',
          shades: '10 Shades',
          offer: '',
          price: 7888,
          left: '',
          image: require('../../../../assets/Images/products/sunglasses/2.png'),
          liked: true,
        },
        {
          id: 3,
          name: 'DIESEL',
          details: 'Unisex Mirrored Oval Sunglass',
          shades: '10 Shades',
          offer: '(50% off)',
          price: 5666,
          left: 'Only Few Left1',
          image: require('../../../../assets/Images/products/sunglasses/3.png'),
          liked: false,
        },
        {
          id: 4,
          name: 'MARC LOUIS',
          details: 'Unisex Mirrored Oval Sunglass',
          shades: '10 Shades',
          offer: '',
          price: 1600,
          left: '',
          image: require('../../../../assets/Images/products/sunglasses/4.png'),
          liked: true,
        },
        {
          id: 5,
          name: 'Puma',
          details: 'Unisex Polarised & UV Protec',
          shades: '10 Shades',
          offer: '',
          price: 900,
          left: '',
          image: require('../../../../assets/Images/products/sunglasses/5.png'),
          liked: false,
        },
        {
          id: 6,
          name: 'Puma',
          details: 'Unisex Mirrored Oval Sunglass',
          shades: '10 Shades',
          offer: '(50% off)',
          price: 546,
          left: 'Only Few Left1',
          image: require('../../../../assets/Images/products/sunglasses/6.png'),
          liked: true,
        },
        {
          id: 7,
          name: 'MARC LOUIS',
          details: 'Unisex Polarised & UV Protec',
          shades: '10 Shades',
          offer: '',
          price: 900,
          left: '',
          image: require('../../../../assets/Images/products/sunglasses/7.png'),
          liked: true,
        },
        {
          id: 8,
          name: 'United Colors of Benetton',
          details: 'Unisex Mirrored Oval Sunglass',
          shades: '10 Shades',
          offer: '',
          price: 2000,
          left: '',
          image: require('../../../../assets/Images/products/sunglasses/8.png'),
          liked: false,
        },
        {
          id: 9,
          name: 'MARC LOUIS',
          details: 'Unisex Polarised & UV Protec',
          shades: '10 Shades',
          offer: '',
          price: 4566,
          left: 'Only Few Left1',
          image: require('../../../../assets/Images/products/sunglasses/9.png'),
          liked: true,
        },
        {
          id: 10,
          name: 'DIESEL',
          details: 'Unisex Mirrored Oval Sunglass',
          shades: '10 Shades',
          offer: '',
          price: 7890,
          left: '',
          image: require('../../../../assets/Images/products/sunglasses/10.png'),
          liked: false,
        },
        {
          id: 11,
          name: 'MARC LOUIS',
          details: 'Unisex Polarised & UV Protec',
          shades: '10 Shades',
          offer: '(50% off)',
          price: 900,
          left: '',
          image: require('../../../../assets/Images/products/sunglasses/11.png'),
          liked: true,
        },
      ],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.rbOpen !== this.state.rbOpen){
    this.RBSheet.close(); 
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    // this.props.onTabClicked('category');
    if (this.props.searchbar) {
      this.props.closeSearch();
    }
    return true;
  }

  productProceed = async () =>{
    await this.setState({proceed:true})
    this.RBSheet.open();
  }

  productProceedClose = async () =>{
    await this.setState({proceed:false})
    this.RBSheet.close();
  }

  _renderItem = ({item, index}) => {
    return (
      <ImageBackground
        style={{
          width: this.state.width,
          height: this.state.height / 2,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
        resizeMode="cover"
        source={item.image}>
        <TouchableOpacity
          style={{
            width: 80,
            backgroundColor: '#ffff',
            paddingBottom: 5,
            paddingTop: 5,
            height: 30,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            borderColor: '#ff7d01',
            marginBottom: 100,
            marginRight: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
          onPress={async ()  =>  {
            await this.setState({proceed:false})
            this.RBSheet.open();
          }}>
          <Shade />
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'AvenirNext-DemiBold',
              color: '#ff7d01',
            }}>
            {this.state.details.shades}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  };

  get pagination() {
    return (
      <Pagination
        dotsLength={this.state.data.length}
        activeDotIndex={this.state.activeSlide}
        containerStyle={{backgroundColor: '#ffff'}}
        dotStyle={{
          width: 30,
          height: 10,
          borderRadius: 5,

          backgroundColor: '#eeeeee',
          borderWidth: 1,
          borderColor: '#ff7d01',
        }}
        inactiveDotStyle={{
          borderWidth: 0,
          width: 20,
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    const styles = StyleSheet.create({
      detailsContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#ffff',
        height: this.state.height - 70,
        borderBottomWidth: 2,
        borderBottomColor: '#c8c8c8',
      },
      detailsContainer2: {
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#ffff',
        height: this.state.height - 220,
        borderBottomWidth: 2,
        borderBottomColor: '#c8c8c8',
      },
      detailsContainer3: {
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#ffff',
        height: this.state.height / 2 - 100,
      },
      headerText: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 18,
        color: '#333333',
      },
      title: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 16,
        paddingLeft:5,
        color: '#333333',
      },
      headerText1: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 18,
        color: '#333333',
        paddingTop: 10,
      },
      headerText2: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 18,
        color: '#333333',
        paddingTop: 10,
        width: '80%',
      },
      text: {
        fontFamily: 'AvenirNextLTPro-Regular',
        color: '#666666',
        fontSize: 12,
        width: '65%',
        letterSpacing: 1,
        paddingBottom: 10,
        paddingTop: 10,
      },
      text1: {
        fontFamily: 'AvenirNextLTPro-Regular',
        color: '#999999',
        fontSize: 14,
        width: '100%',
        letterSpacing: 1,
        paddingBottom: 10,
        paddingTop: 10,
      },
      text2: {
        fontFamily: 'AvenirNextLTPro-Regular',
        color: '#666666',
        fontSize: 12,
        width: '100%',
        letterSpacing: 1,
        paddingBottom: 10,
        paddingTop: 10,
      },
      productContainerOdd: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'pink',
        paddingBottom: 10,
        paddingTop: 10,
        opacity: 0.7,
      },
      productContainerEven: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 10,
        paddingTop: 10,
      },
      productLabel1: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 14,
        color: '#333333',
        width: '40%',
      },
      productLabel2: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 14,
        color: '#333333',
        width: '60%',
        paddingLeft: 10,
        // borderLeftColor:'#d5d5d5',
        // borderLeftWidth:1
      },
      itemContainer: {
        height: 270,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#e7e7e7',
        marginBottom: 16,
        width: this.state.width / 2 - 24,
        marginRight: 16,
      },
      like: {
        height: 30,
        width: 30,
        borderRadius: 50,
        shadowColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0,
        shadowRadius: 1.84,
        backgroundColor: '#ffff',
        elevation: 1,
        marginBottom: -15,
      },
      details: {
        paddingTop: 15,
        paddingLeft: 7,
        paddingRight: 7,
      },
      label: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 12,
        color: '#333333',
      },
      detailsText: {
        fontFamily: 'AvenirNextFont',
        fontSize: 10,
        color: '#999999',
      },
      detailsText1: {
        fontFamily: 'AvenirNextFont',
        fontSize: 12,
        color: '#999999',
        paddingLeft: 5,
      },
      priceText: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 14,
        color: '#333333',
        fontWeight: '500',
      },
      offerText: {
        fontFamily: 'AvenirNextFont',
        fontSize: 10,
        color: '#ff7d01',
        paddingLeft: 5,
      },
      leftText: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 10,
        color: '#ff7d01',
      },
    });

    return (
      <View style={{flex: 1.0}}>
     
          <KeyboardAwareScrollView>
            <View style={{height: this.state.height / 2}}>
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                data={this.state.data}
                renderItem={this._renderItem}
                sliderWidth={this.state.width}
                itemWidth={this.state.width}
                onSnapToItem={index => this.setState({activeSlide: index})}
              />
              {this.pagination}
            </View>

            <View style={styles.detailsContainer}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#c8c8c8',
                  paddingBottom: 10,
                }}>
                <Text style={styles.headerText}>{this.state.details.name}</Text>
                <Text style={styles.text} numberOfLines={2}>
                  {this.state.details.detail}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}>
                  <View
                    style={{
                      width: '30%',
                      borderRightWidth: 1,
                      borderRightColor: '#c8c8c8',
                      
                    }}>
                      <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                      <RupeeIcon />
                    <Text style={styles.title}>
                     {this.state.details.total}
                    </Text>
                      </View>
                    
                    <Text
                      style={{
                        color: '#ff7d01',
                        fontSize: 12,
                        fontFamily: 'AvenirNextLTPro-Regular',
                      }}>
                      ({this.state.details.offer})
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      alignContent: 'center',
                      width: '70%',
                    }}>
                    <Text style={styles.title}>{this.state.details.min}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#c8c8c8',
                  paddingBottom: 10,
                }}>
                <Text style={styles.headerText1}>Product Description</Text>
                <Text style={styles.text1} numberOfLines={2}>
                  {this.state.details.description}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#c8c8c8',
                  paddingBottom: 10,
                }}>
                <Text style={styles.headerText1}>Product Details</Text>
                <FlatList
                  data={this.state.details.products}
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  numColumns={1}
                  keyExtractor={items => {
                    items.id;
                  }}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={
                          item.id % 2 === 1
                            ? styles.productContainerOdd
                            : styles.productContainerEven
                        }>
                        <Text style={styles.productLabel1}>{item.name}</Text>
                        <Text style={styles.productLabel2}>
                          RS {item.price}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
              <View
                style={{
                  //   borderBottomWidth: 1,
                  //   borderBottomColor: '#c8c8c8',
                  paddingBottom: 10,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.headerText1}>Product Size/Dimension</Text>
                  <TouchableWithoutFeedback>
                    <Text
                      style={{
                        color: '#ff7d01',
                        fontSize: 12,
                        fontFamily: 'AvenirNext-Medium',
                      }}>
                      Size Chart
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
                <Text style={styles.text2} numberOfLines={2}>
                  Size:{this.state.details.size + '\n'}
                  {this.state.details.measure}
                </Text>
              </View>
            </View>
            <View style={styles.detailsContainer2}>
              <View
                style={{
                  //   borderBottomWidth: 1,
                  //   borderBottomColor: '#c8c8c8',
                  paddingBottom: 10,
                }}>
                <Text style={styles.headerText1}>View Similar Products</Text>
                <FlatList
                  data={this.state.similarProducts}
                  style={{
                    //   paddingLeft: 16,
                    //   paddingRight: 16,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={items => {
                    items.id;
                  }}
                  renderItem={({item}) => {
                    return (
                      <TouchableNativeFeedback
                        onPress={() =>
                          this.props.navigation.navigate('PRODUCTDETAILS')
                        }>
                        <View style={styles.itemContainer}>
                          <ImageBackground
                            source={item.image}
                            style={{
                              width: this.state.width / 2 - 34,
                              height: 148,
                              justifyContent: 'flex-end',
                              alignItems: 'flex-end',
                            }}
                            resizeMode="contain">
                            {item.liked ? (
                              <View style={styles.like}>
                                <FilledLikeIcon />
                              </View>
                            ) : (
                              <View style={styles.like}>
                                <LikeIcon />
                              </View>
                            )}
                          </ImageBackground>
                          <View style={styles.details}>
                            <Text style={styles.label}>{item.name}</Text>
                            <Text style={styles.detailsText}>
                              {item.details + '\n'}
                            </Text>
                            <View
                              style={{display: 'flex', flexDirection: 'row'}}>
                              <Shade />
                              <Text style={styles.detailsText1}>
                                {item.shades}
                              </Text>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                paddingTop: 5,
                                alignItems: 'center',
                              }}>
                              <Text style={styles.priceText}>
                                ₹ {item.price}
                              </Text>
                              <Text style={styles.offerText}>{item.offer}</Text>
                            </View>
                            <Text style={styles.leftText}>{item.left}</Text>
                          </View>
                        </View>
                      </TouchableNativeFeedback>
                    );
                  }}
                />
              </View>

              <View
                style={{
                  //   borderBottomWidth: 1,
                  //   borderBottomColor: '#c8c8c8',
                  paddingBottom: 10,
                }}>
                <View
                  style={{
                    paddingBottom: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderTopColor: '#c8c8c8',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.headerText2} numberOfLines={1}>
                    More Sunglass By United Colors of Benetton{' '}
                  </Text>
                  <Icon
                    name="keyboard-arrow-right"
                    size={32}
                    style={{paddingTop: 10}}
                    color="#333333"
                  />
                </View>
                <View
                  style={{
                    paddingBottom: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderTopColor: '#c8c8c8',
                  }}>
                  <Text style={styles.headerText2} numberOfLines={1}>
                    More Grey Sunglass{' '}
                  </Text>
                  <Icon
                    name="keyboard-arrow-right"
                    size={32}
                    style={{paddingTop: 10}}
                    color="#333333"
                  />
                </View>
                <View
                  style={{
                    paddingBottom: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderTopColor: '#c8c8c8',
                  }}>
                  <Text style={styles.headerText2} numberOfLines={1}>
                    More Sunglass{' '}
                  </Text>
                  <Icon
                    name="keyboard-arrow-right"
                    style={{paddingTop: 10}}
                    size={32}
                    color="#333333"
                  />
                </View>
              </View>
            </View>
            <View style={styles.detailsContainer3}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#c8c8c8',
                  paddingBottom: 10,
                }}>
                <Text style={styles.headerText2}>More Informtion</Text>
                <Text style={styles.text1} numberOfLines={2}>
                  Product Code: {this.state.details.code}
                </Text>
                <Text style={styles.text1} numberOfLines={2}>
                  Sold By: {this.state.details.soldby}
                </Text>
                <Text style={styles.headerText2}>Manufacture Details</Text>
                <Text style={styles.text1} numberOfLines={2}>
                  {this.state.details.manufacturer}
                </Text>
                <Text style={styles.headerText2}>Country Of Origin</Text>
                <Text style={styles.text1} numberOfLines={2}>
                  {this.state.details.contry}
                </Text>
              </View>
            </View>
          </KeyboardAwareScrollView>
         
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={ this.state.proceed ? this.state.height - 50  : this.state.height / 2  }
            duration={250}
            closeOnPressMask={false}
            customStyles={{
              container: {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
            }}>
              {this.state.proceed ?
              <>
              <SimilarItems details={this.state.details} productProceedClose ={this.productProceedClose }/>
              <ActionButton buttonText={"Add To Bag"}  product ={true}/>
              </>
              :
            <AvailableShades rbclose={()=>{this.setState({rbOpen:!this.state.rbOpen})}} {...this.props} />
              }
          </RBSheet>
          
        <StickyButton
          product={true}
          skip={'₹ ' + this.state.details.total}
          proceed="Proceed"
          proceedClicked={this.productProceed}
          extra={' (' + this.state.details.offer + ' off)'}
        />
      </View>
    );
  }
}

export default ProductDetails;
