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
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';

 class FeaturedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,      
      currentSelecteditem:0,
      featuredProductsData:[]
    };
   
  }

  updateImageDetails = ( image ) => {
    this.setState({currentSelecteditem:image})
  };

  productDetails=(args, args1)=>{
    this.props.onDisplayVarietyName(args1);
    this.props.navigation.navigate('Product Description', {productId: args});
      }
  
   componentDidMount(){
   this.setState({featuredProductsData:this.props.featuredProductsData})
  }

  render() {

    let images = [];
    this.props.featuredProductsData.map(item =>{
      images.push(item.thumbnail_image)
    })
   
    return (
      <TouchableOpacity onPress ={()=>{this.productDetails(this.props.featuredProductsData[this.state.currentSelecteditem].product_Id,this.props.featuredProductsData[this.state.currentSelecteditem].verityname)}}>
      <View style={styles.container}>
        <SliderBox
          images={images}
          sliderBoxHeight={200}          
          currentImageEmitter={index => this.updateImageDetails(index)}
          dotColor="#3e708f"
          inactiveDotColor="#95A5A6"
          autoplay
          circleLoop
          parentWidth={this.state.width - 20}
          ImageComponentStyle={{borderTopLeftRadius: 15,borderTopRightRadius: 15}}
        />
        <View style={{paddingLeft:10,paddingRight:5,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>

        <View>      
        <Text  style={styles.itemTextVariety}>{this.props.featuredProductsData && this.props.featuredProductsData.length ? this.props.featuredProductsData[this.state.currentSelecteditem].verityname : null}</Text>        
        <Text style={styles.itemTextOrigin}>{ this.props.featuredProductsData && this.props.featuredProductsData.length? this.props.featuredProductsData[this.state.currentSelecteditem].originsname : null}</Text>
        <Text style={styles.itemTextFarm}>{ this.props.featuredProductsData && this.props.featuredProductsData.length? this.props.featuredProductsData[this.state.currentSelecteditem].farm : null}</Text>
        </View>
        <View>
        <View style={{flexDirection: 'row'}}>
                <Text style={styles.ratingStyle}>
                  {'  '}
                  { this.props.featuredProductsData && this.props.featuredProductsData.length? this.props.featuredProductsData[this.state.currentSelecteditem].avg_rating : null}{' '}
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
                  { this.props.featuredProductsData && this.props.featuredProductsData.length? this.props.featuredProductsData[this.state.currentSelecteditem].rating : null}: ratings
                </Text>
              </View>
              </View>
      </View>
      </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    borderRadius:15,
    paddingBottom:10
  },
  itemTextVariety:{
    fontFamily: 'Gotham Black Regular',
    fontSize: 14,
    paddingTop: 5,
  },
  itemTextOrigin: {
    fontSize: 12,
    justifyContent: 'space-around',
    fontFamily: 'GothamMedium',
    color: '#5C5C5C',
  
  },
  itemTextFarm: {
    fontSize: 12,
    justifyContent: 'space-around',
    fontFamily: 'GothamMedium',
    color: '#95A5A6',
    paddingBottom: 10,
  },
  ratingStyle: {
    backgroundColor: '#00ac00',
    color: 'white',
    lineHeight: 20,
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    width: 45,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onDisplayVarietyName: value =>
      dispatch({type: actionTypes.DISPLAY_VARIETY_NAME, payload: value}),
  };
};

export default connect(
 null,
  mapDispatchToProps,
)(FeaturedItems);