import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  BackHandler,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
 class FeaturedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,      
      currentSelecteditem:0,
      featuredProductsData:[]
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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
    // this.props.onToggleOpen();
    // this.props.onBottomTabClicked('home');
    this.props.navigation.goBack(null);
    return true;
  }

  functionHandler = (arg1,arg2) =>{
    this.props.onFeaturedProductsFiltered(true);
    this.productDetails(arg1,arg2);
    // this.props.onToggleOpen();
  }

  render() {

    const styles = StyleSheet.create({
      detailsButton: {
        backgroundColor: 'orange',
        paddingBottom: 10,
        paddingTop: 10,
        borderWidth: 1,
        borderColor: '#fff',
      },
      detailsButtonText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
      },
      ratingStyle: {
        backgroundColor: '#00ac00',
        color: 'white',
        lineHeight: 20,
        fontSize: 14,
        width: 45,
      },
      itemContainer: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        width: this.state.width / 1.5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        paddingBottom: 10,
        borderRadius: 5,
        marginRight: 10,
        marginLeft:10
      },
      imageContainer:{
        backgroundColor:'grey',
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        aspectRatio:2/1
      },
      itemDetailContainer: {   
 
        paddingLeft: 10,
        paddingRight: 10,
      },
      itemTextVariety:{
        fontFamily: 'GothamBold',
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
      
      },
      ratingStyle: {
        justifyContent: 'center',
        textAlignVertical: 'center',
        fontSize: 14,
        fontFamily: 'GothamLight',
      },
    });

      
  
   
    return (
      <View style={{flex: 1.0}}>
      <FlatList
          data={this.props.featuredProductsData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={items => {
            items.product_Id;
          }}
          renderItem={({item}) => {
            let ratingIcon = (
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="star"
                  size={20}
                  color="#ffbd4a"
                  style={{
                    justifyContent: 'center',
                    textAlignVertical: 'center',
                  }}
                />
                <Text style={styles.ratingStyle}>{item.avg_rating}</Text>
              </View>
            );
            return (
              <TouchableNativeFeedback
                onPress={() =>
                this.functionHandler(item.product_Id, item.verityname)
                }>
                <View style={styles.itemContainer}>
                   <View style={{display:'flex',top:5,zIndex:1,position:'absolute',flexDirection:'row',backgroundColor:'#cc0038',width:'40%',color:'white'}}>
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
                  <View style={styles.imageContainer}>
                   
                    <ImageBackground
                      source={{
                        uri: item.thumbnail_image,
                      }}
                      style={{
                        aspectRatio: 2 / 1,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}
                      imageStyle={{
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}
                      // resizeMode=""
                    />
                  </View>
                  <View style={styles.itemDetailContainer}>
                    <Text style={styles.itemTextVariety}>
                      {item.verityname}
                    </Text>
                    <Text style={styles.itemTextOrigin}>
                      {item.originsname}
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.itemTextFarm}>{item.farm}</Text>
                      {ratingIcon}
                    </View>
                  </View>
                </View>
              </TouchableNativeFeedback>
            );
          }}
        />
    </View>
    );
  }
}



const mapDispatchToProps = dispatch => {
  return {
    onDisplayVarietyName: value =>
      dispatch({type: actionTypes.DISPLAY_VARIETY_NAME, payload: value}),
      onFeaturedProductsFiltered: value =>
      dispatch({type: actionTypes.FILTER_FEATURED_DATA, payload: value}),
  };
};

export default connect(
 null,
  mapDispatchToProps,
)(FeaturedItems);