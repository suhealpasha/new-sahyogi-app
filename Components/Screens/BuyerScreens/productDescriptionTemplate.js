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
import {TouchableHighlight} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import ProductDescription from '../../utils/productDescription';
import ProductAction from '../../utils/productAction';
import {SliderBox} from 'react-native-image-slider-box';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import StickyButton from '../../utils/stickyButtons';
import * as api from '../../../assets/api/api';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
class ProductDescriptionTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      spinner: false,
      productData: [],
      thumbnailImages: [require('../../../assets/Images/coffeeFarms/img4.png')],
      dropUp: true,
      favouriteColor: 'grey',
      wishlistButtonDisable:false
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    // if(this.props.open){
    //   this.props.onToggleOpen();
    // }
    this.fetchProduct();
    this.props.onBuyProduct(true);
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
    if(this.props.open){   
      this.props.onToggleOpen();
    }
    // this.props.onBottomTabClicked('home');
    this.props.navigation.goBack(null);
    return true;
  }
  
  fetchProduct = async () => {
    this.setState({spinner: true});
    let data = JSON.stringify({
      product_Id: this.props.route.params.productId,
    });
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    axios
      .post(api.buyerProductByIdAPI, data, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        console.log(res.data.data);
        this.setState({spinner: false, productData: res.data.data});
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  };

  favoutiteClicked = async () => { 
    this.setState({wishlistButtonDisable:true})
    let data;
    if (this.state.productData.wishlist) {
      data = JSON.stringify({
        flag: false,
        product_Id: this.state.productData.product_Id,
      });
    } else {
      data = JSON.stringify({
        flag: true,
        product_Id: this.state.productData.product_Id,
      });
    }

    const access_token = await AsyncStorage.getItem('isLoggedIn');
    await axios
      .post(api.buyerWishlistAddOrRemoveAPI, data, {
        headers: {
          access_token: access_token,
          accept: 'application/json',
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        console.log(res)
        if (res.status) {        
          this.fetchProduct();
          this.setState({wishlistButtonDisable:false})
        }
      })
      .catch(err => {
        this.setState({wishlistButtonDisable:false})
        console.log(err);
      });
  };

  render() {
    const styles = StyleSheet.create({
      outerContaier: {
        flex: 1.0,
         backgroundColor: '#f8f8f8',
      },
      innerContainer: {
        flex: 1.0,
        alignItems:'flex-end'
      },
      spinnerTextStyle: {
        color: '#7ea100',
      },
      container: {
        flex: 1.0,
        paddingTop:10,
        // paddingLeft: 10,
        // paddingRight: 10,
        backgroundColor:'#f8f8f8'
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
        width: '100%',
        height: 190,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      
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
    });
    let imageList = [];
    if (this.state.productData.images) {
      this.state.productData.images.length >= 1
        ? this.state.productData.images.map(i => {  
            imageList.push(i.url_image);
          })
        : null;
    }

    return (
      <View style={styles.outerContaier}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 10, y: 0}}
          scrollEnabled={true}
          
          >
          <View style={styles.innerContainer}>
            <Spinner
              visible={this.state.spinner}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
              <TouchableNativeFeedback 
            disabled={this.state.wishlistButtonDisable}
            onPress={() => {
                this.favoutiteClicked();
              }}>
            <Icon1
            name={
              this.state.productData.wishlist === false
                ? 'heart-circle'
                : 'heart-circle'
            }
       
            size={32}
            color={this.state.productData.wishlist ? 'red' : 'white'}
              style={{
                top: 150,
                position: 'absolute',
                zIndex: 1,
                paddingRight:10,
                
              }}
            />
            </TouchableNativeFeedback>
            <View style={{backgroundColor:'#7ea100'}}>
            <View style={styles.productImageContainer}>
              {this.props.filterFeaturedData ?
               <View style={{display:'flex',flexDirection:'row',backgroundColor:'#cc0038',width:'50%',padding:10,color:'white',top:36,left:0,zIndex:1,borderTopLeftRadius:30,borderBottomRightRadius:30}}>
               <Icon
             name="star"
             size={16}
             color="white"
             style={{
               justifyContent: 'center',
               textAlignVertical: 'center',
             }}
           />
                 <Text style={{color:'white',fontSize:14,fontFamily:'GothamMedium'}}>FEATURED</Text></View>
              :null}
           
              <SliderBox
             
                images={
                  this.state.productData.images &&
                  this.state.productData.images.length >= 1
                    ? imageList
                    : this.state.thumbnailImages
                }
                sliderBoxHeight={190}
                onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)
                }
                dotColor="#3e708f"
                inactiveDotColor="#95A5A6"
                autoplay
                circleLoop
                parentWidth={this.state.width}
                ImageComponentStyle={{
                  width: '100%',
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                
                }}
              />
            </View>
            </View>
            <View style={styles.container}>
              <Collapse
                onToggle={() => this.setState({dropUp: !this.state.dropUp})}
                isCollapsed={true}
                style={{backgroundColor: '#ffff',borderBottomWidth:0.5, borderBottomColor: '#95A5A6',}}>
                <CollapseHeader>
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      borderBottomColor: '#95A5A6',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingTop: 10,
                      width: this.state.width ,
                      paddingLeft:10,
                      paddingRight:10

                    }}>
                    <Text
                      style={{
                        color: '#004561',
                        fontFamily: 'GothamMedium',
                        fontSize: 20,
                        fontWeight: '500',
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}>
                      Profile
                    </Text>
                    {!this.state.dropUp ? (
                      <Icon
                        name="arrow-down-drop-circle-outline"
                        size={30}
                        color="#727c8e"
                        style={{
                          justifyContent: 'center',
                          textAlignVertical: 'center',
                        }}
                      />
                    ) : (
                      <Icon
                        name="arrow-up-drop-circle-outline"
                        size={30}
                        color="#727c8e"
                        style={{
                          justifyContent: 'center',
                          textAlignVertical: 'center',
                        }}
                      />
                    )}
                  </View>
                </CollapseHeader>
                <CollapseBody>
                  <ProductDescription {...this.state} />
                </CollapseBody>
              </Collapse>

              <ProductAction
                {...this.state}
                onFetchProduct={this.fetchProduct}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <StickyButton
          cancel="Add to Cart"
          proceed="Buy Now"
          {...this.props}
          buy={this.props.buyProduct}
          buyer={true}
          onfetchBuyerCart={this.props.onfetchBuyerCart}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    buyProduct: state.reducer.buyProduct,
    filterFeaturedData: state.reducer.filterFeaturedData,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onBuyProduct: value =>
      dispatch({type: actionTypes.BUY_PRODUCT, payload: value}),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDescriptionTemplate);
