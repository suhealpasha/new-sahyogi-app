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
        borderRadius: 5,
        marginRight:10,
        marginLeft:10
      },
      imageContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        aspectRatio: 2 / 1,
      },
      itemDetailContainer: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
      },
      itemData:{
     
      },
      textData:{
        textAlign:'center',
        fontFamily: 'GothamMedium',
      
      }
    
    });
    return (
      <View style={styles.regionstyles}>
        <FlatList
          data={this.props.regionsData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={items => {
            items.region_Id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableNativeFeedback
                style={{width:this.state.width / 2.1  - 10}}
                onPress={() => this.fetchOrigins(item.region_Id, item.name)}>
                <View style={styles.itemContainer}>
                     <View style={styles.imageContainer}>
                     <ImageBackground
                      source={{
                        uri: item.url_thumbnail_image,
                      }}
                      style={{
                        aspectRatio: 2 / 1,
                   
                      }}
                      imageStyle={{
                        borderRadius:10
                      }}
                        resizeMode="stretch"
                    />
                      </View>                    
                    </View>
                    <View style={styles.itemData}>
                        <Text style={styles.textData}>{item.name}</Text>
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
