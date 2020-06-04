import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
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
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

class AllRegions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      regionsData:[]
    };
  }

  fetchOrigins = (args,args1) => { 
    this.props.onDisplayRegionName(args1)        
    this.props.navigation.navigate('All Origins',{regionId:args})
  };
 
  render() {

    const styles = StyleSheet.create({
      container: {
        flex: 1.0,
        backgroundColor: '#efebea',
        // paddingLeft:5,paddingRight:5,
        paddingTop: 10
      },
      noData: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: this.state.height - 150,
      },
      noDataText: {
        fontSize: 20,
        fontFamily: 'GothamBold',
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
      spinnerTextStyle: {
        color: '#00aa00',
      },
    });
   
    return (
      <View style={styles.container} >
          
            <FlatList data={this.props.allRegionsData}
            columnWrapperStyle={{marginLeft:10,marginRight:10,justifyContent:'space-between' }}
            numColumns={2}
            keyExtractor = {(items)=>{items.region_Id}}          
            renderItem = {({item})=>{
     
            return(   
               <TouchableNativeFeedback  
                onPress={() => this.fetchOrigins(item.region_Id,item.name) }>
                  <View style={styles.itemContainer}>
                      <ImageBackground
                        source={{
                          uri: item.url_thumbnail_image,
                        }}
                        style={{width: this.state.width / 2 - 15,
                          height: undefined,
                          aspectRatio: 2/1,
                           }}
                        // resizeMode='stretch'
                        >                       
                      </ImageBackground>
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

const styles = StyleSheet.create({
 
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
)(AllRegions);