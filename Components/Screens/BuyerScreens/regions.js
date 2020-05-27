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
  Dimensions
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
                <Card style={{backgroundColor: 'white'}}>
                  <CardImage
                    source={{
                      uri: item.url_thumbnail_image,
                    }}
                    style={{width:this.state.width/ 2.2 - 10 }}
                  />

                  <CardTitle
                    subtitle={item.name}
                    style={{
                      borderTopWidth: 1,
                      marginTop: 10,
                      paddingBottom: 10,
                      paddingTop:5,
                    }}
                  />
                </Card>
              </TouchableNativeFeedback>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  regionstyles: {
    // marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
});

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
