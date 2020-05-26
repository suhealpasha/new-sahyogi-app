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
  Dimensions,
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
  TouchableOpacity,
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

class ProductDescriptionTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      spinner: false,
      productData: [],
      thumbnailImages: [
        require('../../../assets/Images/coffeeFarms/img4.png')
          
      ],
    };
  }

  componentDidMount() {
    this.fetchProduct();
    this.props.onBuyProduct(true);  
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
       this.setState({spinner: false, productData: res.data.data});
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  };

  render() {
   
    const styles = StyleSheet.create({
      outerContaier: {
        flex: 1.0,
        backgroundColor: '#efebea',
      },
      innerContainer: {
        flex: 1.0,
      },
      spinnerTextStyle: {
        color: '#00aa00',
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
    });
    let imageList=[]
    if(this.state.productData.images){
        this.state.productData.images.length >=1 
          ? this.state.productData.images.map(i=>{
            imageList.push(i.url_image)
          })
          :null
        }
    
    return (
      <View style={styles.outerContaier}>
        <KeyboardAwareScrollView resetScrollToCoords={{x: 10, y: 0}}  scrollEnabled={true}>
          <View style={styles.innerContainer}>
            <Spinner
              visible={this.state.spinner}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />

            <View style={styles.productImageContainer}>
              <SliderBox
                images={this.state.productData.images && this.state.productData.images.length >=1  ? imageList : this.state.thumbnailImages}
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
              <ProductDescription {...this.state}/>
              <ProductAction {...this.state} onFetchProduct = {this.fetchProduct} />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <StickyButton cancel="Add to Cart" proceed="Buy Now" {...this.props} buy={this.props.buyProduct} buyer={true}   onfetchBuyerCart={this.props.onfetchBuyerCart}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    buyProduct: state.reducer.buyProduct,
  };
};
const mapDispatchToProps = dispatch => {
  return {   
      onBuyProduct:value =>
      dispatch({type: actionTypes.BUY_PRODUCT, payload: value}), 
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)( ProductDescriptionTemplate);
