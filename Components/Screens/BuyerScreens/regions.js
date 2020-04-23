import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TouchableOpacity
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

class Regions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOn: null,
      regionsData: [],
    };
  }

  componentDidMount() {
    this.setState({regionsData: this.props.regionsData});
  }

  fetchOrigins = (args,args1) => {       
    this.props.onDisplayRegionName(args1)    
    this.props.navigation.navigate('All Origins',{regionId:args})
  };

  render() {
    let size = 3;
    let items = this.props.regionsData.slice(0, size);
    return (
      <View style={styles.regionstyles}>
        <FlatList
          data={items}
          horizontal={true}
          keyExtractor = {(items)=>{items.region_Id}}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{width: 175}}
                onPress={()=>this.fetchOrigins(item.region_Id,item.name)}>
                <Card style={{backgroundColor: 'white'}}>
                  <CardImage
                    source={{
                      uri: item.url_thumbnail_image,
                    }}
                    style={{resizeMode: 'contain'}}
                  />

                  <CardTitle
                    subtitle={item.name}
                    style={{
                      borderTopWidth: 1,
                      marginTop: 10,
                      paddingBottom: 10,
                    }}
                  />
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  regionstyles: {
    marginHorizontal: 5,
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