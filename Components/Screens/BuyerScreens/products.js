import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';

class LatestProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
    };
  }

  productDetails = (args, args1) => {
    this.props.onDisplayVarietyName(args1);
    this.props.navigation.navigate('Product Description', {productId: args});
  };

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
        marginBottom: 10,
        backgroundColor: 'white',      
        width:this.state.width / 2 - 15,        
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        paddingBottom: 10,
        borderRadius:5
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
    return (
      <View style={{flex: 1.0}}>
        <FlatList
          data={this.props.latestProductsData}
          columnWrapperStyle={{paddingLeft:5,paddingRight:5,justifyContent:'space-between'}}
          numColumns={2}
          keyExtractor={items => {
            items.product_Id;
          }}
          renderItem={({item}) => {
            let ratingIcon = (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.ratingStyle}>
                  {'  '}
                  {item.avg_rating}{' '}
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
                  {item.rating}: ratings
                </Text>
              </View>
            );
            return (
              <TouchableNativeFeedback                
                onPress={() =>
                  this.productDetails(item.product_Id, item.verityname)
                }>
                   <View style={styles.itemContainer}>
                     <View style={styles.imageContainer}>
                      <ImageBackground
                        source={{
                          uri: item.thumbnail_image,
                        }}
                        style={{width: this.state.width / 2 - 15,
                         aspectRatio:2/1,
                         borderTopLeftRadius:5,borderTopRightRadius:5
                           }}
                           imageStyle={{ borderTopLeftRadius:5,borderTopRightRadius:5 }}
                        // resizeMode='stretch'
                        >                       
                      </ImageBackground>
                      </View>
                      <View style={styles.itemDetailContainer}>
                    <Text style={styles.itemTextVariety}>{item.verityname}</Text>
                    <Text style={styles.itemTextOrigin}>{item.originsname}</Text>
                    <Text style={styles.itemTextFarm}>{item.farm}</Text>
                    {ratingIcon}
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
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(LatestProducts);
