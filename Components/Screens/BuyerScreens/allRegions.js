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
        backgroundColor: '#7ea100',   
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
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        width: this.state.width / 2 - 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 5,

        elevation: 7,
        paddingBottom: 10,
        borderRadius: 5,
      },    
    
      textData: {
        textAlign:'center',
        fontFamily: 'GothamMedium',
      },
      spinnerTextStyle: {
        color: '#7ea100',
      },
    });
   
    return (
      <View style={styles.container} >
            <View style={{backgroundColor:'#f8f8f8',borderTopRightRadius: 30,
             borderTopLeftRadius: 30}}>
                <View style={{height: this.state.height - 60}}>
            <FlatList data={this.props.allRegionsData}
             style={{
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 10,
              marginBottom: 10,
            }}
             columnWrapperStyle={{justifyContent: 'space-between'}}
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
                        style={{
                          aspectRatio: 2 / 1,
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                        }}
                        imageStyle={{
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                        }}
                            // resizeMode='center'
                        >                       
                      </ImageBackground>                     
                    </View>
                    <View style={styles.itemData}>
                        <Text style={styles.textData}>{item.name}</Text>
                      </View>
                </TouchableNativeFeedback>
                 
            );
            }}
            />
            </View>
            </View>
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