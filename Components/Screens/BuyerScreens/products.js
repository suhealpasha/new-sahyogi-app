import React, { Component } from 'react';
import {Dimensions,StyleSheet,FlatList,View,Text, Image,ScrollView , Button,TouchableOpacity} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableHighlight, TouchableNativeFeedback } from 'react-native-gesture-handler';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';

class LatestProducts extends Component{

    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
        };
      }

    productDetails=(args, args1)=>{
      this.props.onDisplayVarietyName(args1);
      this.props.navigation.navigate('Product Description', {productId: args});
        }

    render(){  
       
     
        return(     
         
        <View style={{ flex: 1.0}} >          
        <FlatList data={this.props.latestProductsData}
        columnWrapperStyle={{justifyContent:'space-between', }}
        numColumns={2}
        keyExtractor = {(items)=>{items.product_Id}}      
        renderItem = {({item})=>{
        let ratingIcon = <Text style={styles.ratingStyle} >{'  '}{item.avg_rating}{' '}<Icon name="star" size={13} style={{justifyContent:'center',textAlignVertical:'center'}}/>{'  '}</Text>
        let ratings =  <Text style={{color:'black',fontFamily:'GothamLight',fontSize:10,textAlignVertical:'center',paddingLeft:10,paddingRight:10}}>{'   '}{item.rating}:ratings</Text>
        return(   
           <TouchableNativeFeedback style={{width:(this.state.width/2)-5}} onPress={()=>this.productDetails(item.product_Id,item.verityname)}>
            <Card style={{backgroundColor:'white'}}>
               <CardImage 
                     source={{
                        uri: item.thumbnail_image,
                      }}
                    style={{resizeMode: 'contain'}}
                    />
         
             <CardTitle subtitle={item.verityname}/> 
             <CardContent text={item.regionname} />            
             <CardContent text={item.farm} style={{paddingBottom:10}}/>      
             <CardContent text={[ratingIcon,ratings]}  style={{paddingBottom:10}} />              
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
 
    detailsButton:{               
        backgroundColor:'orange',
        paddingBottom:10,
        paddingTop:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
      detailsButtonText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
      },
      ratingStyle:{
        backgroundColor: '#00ac00',
        color: 'white',
        lineHeight: 20,   
        fontSize: 13,
        width: 45,
               
      }
}
   
  );

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