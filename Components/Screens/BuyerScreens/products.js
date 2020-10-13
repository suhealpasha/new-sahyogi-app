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
  ImageBackground,
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

  
  functionHandler = (arg1,arg2) =>{
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
        width: this.state.width / 2.4,
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
      imageContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        aspectRatio: 2 / 1,
      },
      itemDetailContainer: {
        paddingLeft: 10,
        paddingRight: 10,
      },
      itemTextVariety: {
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
          data={this.props.latestProductsData}
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
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(LatestProducts);
