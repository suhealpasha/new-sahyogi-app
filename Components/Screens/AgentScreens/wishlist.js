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
import Bottomnavigation from '../../BottomNavigation/bottomNavigation';
import {TouchableNativeFeedback, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import FilledLikeIcon from '../../utils/components/Icons/filledLike';
import LikeIcon from '../../utils/components/Icons/like';
import Shade from '../../utils/components/Icons/shade';
import TailButton from '../../utils/components/tailButton';
import RupeeIcon from '../../utils/components/Icons/rupee';
import WishlistEmptyIcon from '../../utils/components/Icons/wishlistEmpty';
import StepButton from '../../utils/components/stepButton';
const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;


const itemHeight = 69;

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      select: null,
      disabled: true,
      brands:[{'image':require('../../../assets/Images/products/pepe.png')},{'image':require('../../../assets/Images/products/hrx.png')},{'image':require('../../../assets/Images/products/roadster.png')},{'image':require('../../../assets/Images/products/puma.png')}],
      products:[
      {'id':1,'name':'MARC LOUIS','details':'Unisex Mirrored Oval Sunglass','shades':'10 Shades','offer':'','price':800,'left':'','image':require('../../../assets/Images/products/sunglasses/1.png'),'liked':true},
      {'id':2,'name':'United Colors of Benetton','details':'Unisex Polarised & UV Protec','shades':'10 Shades','offer':'','price':7888,'left':'','image':require('../../../assets/Images/products/sunglasses/2.png'),'liked':true},
      {'id':3,'name':'DIESEL','details':'Unisex Mirrored Oval Sunglass','shades':'10 Shades','offer':'(50% off)','price':5666,'left':'Only Few Left1','image':require('../../../assets/Images/products/sunglasses/3.png'),'liked':true},
      {'id':4,'name':'MARC LOUIS','details':'Unisex Mirrored Oval Sunglass','shades':'10 Shades','offer':'','price':1600,'left':'','image':require('../../../assets/Images/products/sunglasses/4.png'),'liked':true},
      {'id':5,'name':'Puma','details':'Unisex Polarised & UV Protec','shades':'10 Shades','offer':'','price':900,'left':'','image':require('../../../assets/Images/products/sunglasses/5.png'),'liked':true},
      {'id':6,'name':'Puma','details':'Unisex Mirrored Oval Sunglass','shades':'10 Shades','offer':'(50% off)','price':546,'left':'Only Few Left1','image':require('../../../assets/Images/products/sunglasses/6.png'),'liked':true},
      {'id':7,'name':'MARC LOUIS','details':'Unisex Polarised & UV Protec','shades':'10 Shades','offer':'','price':900,'left':'','image':require('../../../assets/Images/products/sunglasses/7.png'),'liked':true},
    ]
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props.searchbar)
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
    this.props.navigation.goBack(null);
    // this.props.onTabClicked('category');
    if (this.props.searchbar) {
      this.props.closeSearch();
    }
    return true;
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={{
        width: 80,
        height:80,
        borderRadius:50,
        borderWidth:1,
        borderColor:'#e7e7e7',
        paddingLeft:5,
        justifyContent:'center',
        alignItems:'center',
       
        }}>
      <ImageBackground
          style={{
            width: 60,
            height:60,
           
            }}
         resizeMode='center'
          source={item.image}
        />     
      </View>
             
    );
  };

  render() {
    const styles = StyleSheet.create({
      container:{
        height:this.state.height - 137
      },
      itemContainer:{
        height:270,
        borderRadius:2,
        borderWidth:1,
        borderColor:'#e7e7e7',
        marginBottom: 16,
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
       
      },
      lable:{
        fontFamily:'AvenirNext-Medium',
        // padding:50,
        fontSize:20,
        textAlign:'center',
        paddingBottom:30
      },
      message:{
        fontSize:14,
        fontFamily:'AvenirNext-Medium',
        // paddingBottom:30,
        textAlign:'center',
        color:'#999999',
        padding:50

      }
    });

   

    return (
      <View style={{flex: 1.0, backgroundColor: '#ffff'}}>
        {/* <View style={styles.container}>  */}
        {this.state.products.length > 0 ?
        <View style={{flex: 1.0,}}>
        <KeyboardAwareScrollView extraHeight={false} scrollEnabled={true} showsVerticalScrollIndicator={false} >
        
       
        
          <FlatList data={this.state.products}
             style={{
              paddingLeft: 16,
              paddingRight: 16,
              marginTop: 10,
              marginBottom: 10,
            }}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={2}
            keyExtractor = {(items)=>{items.id}}          
            renderItem = {({item})=>{
            if(item.liked){
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
                        <Shade />
                        <Text style={styles.detailsText1}>{item.shades}</Text>
                      </View>
                      <View style={{display:'flex',flexDirection:'row',paddingTop:5,alignItems:'center'}}>   
                      <RupeeIcon/>                     
                        <Text style={styles.priceText}> {item.price}</Text>
                        <Text style={styles.offerText}>{item.offer}</Text>
                      </View>
                      <Text style={styles.leftText}>{item.left}</Text>
                      </View>
               
                    </View>
                    
                </TouchableNativeFeedback>
                 
            );
            }
            }}
            />
          
    
          </KeyboardAwareScrollView>
              <Bottomnavigation {...this.props} closeSearch={()=>this.props.closeSearch()}/>
              </View>
          :
        <View style={{flex:1.0,alignItems:'center',justifyContent:'space-around'}}>
          <View>
          <Text style={styles.lable}>Your Wishlist is empty :(</Text>
          <WishlistEmptyIcon />
          </View>
          <View style={{display:'flex',alignItems:'center'}}>
          <Text style={styles.message} numberOfLines={2}>
          Explore more and shortlist some items.
          </Text>
          <StepButton title="Browse Category"  {...this.props} mainCategory={true} closeSearch={this.props.closeSearch}/>
          </View>
          </View>
         }
        {/* </View> */}
        
    
      </View>     
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.reducer.active,
    bottomTab:state.reducer.bottomTab
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_TAB, payload: value}),
  }
 
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wishlist);
