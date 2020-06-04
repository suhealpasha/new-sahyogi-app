import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
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
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

class Regions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOn: null,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
  }

  fetchOrigins = (args, args1) => {
    this.props.onDisplayRegionName(args1);
    this.props.navigation.navigate('All Origins', {regionId: args});
  };

  render() {
    const styles = StyleSheet.create({
      regionstyles: {
        // marginHorizontal: 5,
      
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
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
        marginLeft:10
        
      },
      imageContainer:{
        backgroundColor:'grey',      
        aspectRatio:2/1
      },
      itemData: {
        borderTopWidth: 1,
        borderColor: '#95A5A6',
      },
      textData: {
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        fontFamily: 'Gotham Black Regular',
      },
    });
    return (
      <View style={styles.regionstyles}>
        <FlatList
          data={this.props.regionsData}
          horizontal={true}
          keyExtractor={items => {
            items.region_Id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableNativeFeedback
                style={{width:this.state.width/ 2.2 }}
                onPress={() => this.fetchOrigins(item.region_Id, item.name)}>
                <View style={styles.itemContainer}>
                     <View style={styles.imageContainer}>
                      <ImageBackground
                        source={{
                          uri: item.url_thumbnail_image,
                        }}
                        style={{width: this.state.width / 2 - 15 ,
                         aspectRatio:2/1,                     
                           }}
                     
                        // resizeMode='stretch'
                        >                       
                      </ImageBackground>
                      </View>
                      <View style={styles.itemData}>
                        <Text style={styles.textData}>{item.name}</Text>
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
    onDisplayRegionName: value =>
      dispatch({type: actionTypes.DISPLAY_REGION_NAME, payload: value}),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(Regions);
