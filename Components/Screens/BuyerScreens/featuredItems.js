import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class FeaturedItems extends Component {
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
  
   componentDidMount(){
   this.setState({featuredProductsData:this.props.featuredProductsData})
  }

  render() {

    let images = [];
    this.props.featuredProductsData.map(item =>{
      images.push(item.thumbnail_image)
    })
   
    return (
      <View style={styles.container}>
        <SliderBox
          images={images}
          sliderBoxHeight={200}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
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
                    size={13}
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
    color: '#95A5A6',
  
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
    fontSize: 13,
    width: 45,
  },
});
