import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
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

class AllRegions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regionsData:[]
    };
  }

  fetchOrigins = (args,args1) => { 
    this.props.onDisplayRegionName(args1)        
    this.props.navigation.navigate('All Origins',{regionId:args})
  };
 
  render() {
   
    return (
      <View style={{ flex: 1.0,paddingLeft:5,paddingRight:5}} >
          
            <FlatList data={this.props.regionsData}
            columnWrapperStyle={{justifyContent:'space-between', }}
            numColumns={2}
            keyExtractor = {(items)=>{items.region_Id}}          
            renderItem = {({item})=>{
     
            return(   
               <TouchableOpacity style={{width:175}} 
                onPress={() => this.fetchOrigins(item.region_Id,item.name) }>
                <Card style={{backgroundColor:'white'}}>
                   <CardImage 
                        source= {{                    
                          uri:
                          item.url_thumbnail_image
                        }}
                        style={{resizeMode: 'contain'}}
                        />
             
                 <CardTitle subtitle={item.name}  style={{borderTopWidth:1,paddingBottom:5}}/>                            
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