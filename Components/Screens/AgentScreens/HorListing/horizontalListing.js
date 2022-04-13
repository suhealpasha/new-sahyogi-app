import React, {Component} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Alert,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  Switch,
  TextInput,
  ImageBackground,
} from 'react-native';

import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import LikeIcon from '../../../utils/components/Icons/like';
import FilledLikeIcon from '../../../utils/components/Icons/filledLike';
import {connect} from 'react-redux';
import * as actionTypes from '../../../../Store/action';

const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width - 10;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;

const itemHeight = 100;

class HorizontalListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      products:[
        {'id':1,'name':'MARC LOUIS','details':'Unisex Mirrored Oval Sunglass','shades':'10 Shades','offer':'','price':800,'left':'','image':require('../../../../assets/Images/products/sunglasses/1.png'),'liked':true},
        {'id':2,'name':'United Colors of Benetton','details':'Unisex Polarised & UV Protec','shades':'10 Shades','offer':'','price':7888,'left':'','image':require('../../../../assets/Images/products/sunglasses/2.png'),'liked':true},
        {'id':3,'name':'DIESEL','details':'Unisex Mirrored Oval Sunglass','shades':'10 Shades','offer':'(50% off)','price':5666,'left':'Only Few Left1','image':require('../../../../assets/Images/products/sunglasses/3.png'),'liked':false},
        
      ]
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {   
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.props.navigation.navigate("Home");
    this.props.onTabClicked('home')
    return true;  
  }

  

  render() {
    const styles = StyleSheet.create({
      itemContainer:{
        height:270,
        borderRadius:2,
        borderWidth:1,
        borderColor:'#e7e7e7',
        marginBottom: 16,
        marginRight:10,
        width:this.state.width / 2 - 24
      },
      like:{
        
        height:30,
        width:30,
        borderRadius:50,
        shadowColor: '#000',
        alignItems:'center',
        justifyContent:'center',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0,
        shadowRadius: 1.84,
        backgroundColor:'#ffff',
        elevation: 1,marginBottom:-15
      },
      details:{
        paddingTop:15,
        paddingLeft:7,
        paddingRight:7,
      },
      label:{
        fontFamily:'AvenirNext-Medium',        
        fontSize:12,
        color:'#333333'
      },
      detailsText:{
        fontFamily:'AvenirNextFont',
        fontSize:10,
        color:'#999999'
      },
      detailsText1:{
        fontFamily:'AvenirNextFont',
        fontSize:12,
        color:'#999999',
        paddingLeft:5
      },
      priceText:{
        fontFamily:'AvenirNext-Medium',        
        fontSize:14,
        color:'#333333',
        fontWeight:'500'
      },
      offerText:{
        fontFamily:'AvenirNextFont',
        fontSize:10,
        color:'#ff7d01',
        paddingLeft:5
      },
      leftText:{
        fontFamily:'AvenirNext-Medium',
        fontSize:10,
        color:'#ff7d01',
       
      }
    });

    let headerMenu = [],
      data = [],
      footwear = [];

    return (
      <FlatList data={this.state.products}
             style={{
              // paddingLeft: 16,
              // paddingRight: 16,
              marginTop: 10,
              marginBottom: 10,
            }}
            horizontal={true}
           
          
            keyExtractor = {(items)=>{items.id}}          
            renderItem = {({item})=>{
 
            return(   
               <TouchableNativeFeedback  
                onPress={() => this.props.navigation.navigate('PRODUCTDETAILS') }
                >
                  <View style={styles.itemContainer}>
                      <ImageBackground
                        source={item.image}
                        style={{
                         width:this.state.width / 2 - 34,
                         height:148,
                         justifyContent:'flex-end',
                         alignItems:'flex-end',
                         
                        }}
                        
                            resizeMode='contain'
                        >   
                        {item.liked ? <View style={styles.like}><FilledLikeIcon /></View>  : <View style={styles.like}><LikeIcon /></View>}                    
                      </ImageBackground>   
                      <View style={styles.details}>
                      <Text style={styles.label}>{item.name}</Text>   
                      <Text style={styles.detailsText}>{item.details+"\n"}</Text>  
                      <View style={{display:'flex',flexDirection:'row'}}>
                       
                        <Text style={styles.detailsText1}>{item.shades}</Text>
                      </View>
                      <View style={{display:'flex',flexDirection:'row',paddingTop:5,alignItems:'center'}}>                        
                        <Text style={styles.priceText}>₹ {item.price}</Text>
                        <Text style={styles.offerText}>{item.offer}</Text>
                      </View>
                      <Text style={styles.leftText}>{item.left}</Text>
                      </View>
               
                    </View>
                    
                </TouchableNativeFeedback>
                 
            );
            }}
            />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_TAB, payload: value}),
  }
 
};
export default connect(
  null,
  mapDispatchToProps,
)(HorizontalListing);
