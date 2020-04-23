import React, {Component} from 'react';

import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Dimensions,
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
  TouchableOpacity
} from 'react-native-material-cards';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductDescription from '../../utils/productDescription';
import ProductAction from '../../utils/productAction';
import { SliderBox } from "react-native-image-slider-box";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import StickyButton from '../../utils/stickyButtons';
class ProductDescriptionTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,      
      productOrigin:'EL SALVADOR',
      items : [ 
             
        require('../../../assets/Images/coffeeFarms/img4.png')  ,  
        require('../../../assets/Images/coffeeFarms/img5.png')  ,  
        require('../../../assets/Images/coffeeFarms/img6.png')  ,  
        require('../../../assets/Images/coffeeFarms/img7.png') , 
        require('../../../assets/Images/coffeeFarms/img1.png')  ,
        
    ]  
    };
  }


  render() {
    
    const styles = StyleSheet.create({
      parentContaier:{     
      height:this.state.height - 80,
     
      },
      container: {       
        backgroundColor: '#efebea',     
        width: this.state.width,
        alignItems:'center',
        paddingRight:10,
        paddingLeft:10,
    
      
      },
      originHeaderContainer: {
        width: this.state.width,        
        paddingBottom: 10,
      
        height: 50,
        alignItems: 'center',
        flexDirection:'row'
      },
      headerText: {
        color: 'rgb(0,70,99)',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign:'center'
      },
      productImageContainer: {      
        justifyContent:'center',  
        width:'100%',
        height:190     
       
      },
      buttonContainer:{              
        flexDirection:'row',
        width:'100%' ,
        alignItems: 'center',              
      
      },
      AddToCartButton:{                        
        borderTopWidth: 2,  
        borderLeftWidth:2,           
        borderColor: '#95A5A6',
        width:'50%',
        paddingTop:5,
        paddingBottom:5
      },
      buyButton:{               
          backgroundColor:'#004561',              
          borderTopWidth: 2,
          borderRightWidth:2,             
        borderColor: '#95A5A6',
          width:'50%',
          paddingTop:5,
          paddingBottom:5
        },
        cartText:{
          color:'#004561',
          textAlign:'center',
          fontSize:20,
          padding:10,
          fontFamily:'Gotham Black Regular',
          
      },
        buyText:{
            color:'#fff',
            textAlign:'center',
            fontSize:20,
            padding:10,
            fontFamily:'Gotham Black Regular',
        },
    })

    return (   
  
      <View style={styles.parentContaier}>   
          <KeyboardAwareScrollView enableOnAndroid={true}>
          <View style={styles.productImageContainer}>
          <SliderBox images={this.state.items} 
            sliderBoxHeight={190}
            onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
            dotColor="#3e708f"
            inactiveDotColor="#95A5A6"
            autoplay
            circleLoop          
            parentWidth={this.state.width}
            ImageComponentStyle={{}}
            />     
            </View> 
            
      <View style={styles.container}>        
      <ScrollView> 
        <ProductDescription />
        <ProductAction />
        </ScrollView>  
        </View>
       
        </KeyboardAwareScrollView>  
        
        <StickyButton cancel = 'Add to Cart' proceed = 'Buy Now'/>
      </View>
      
      
    );
  }
}
export default ProductDescriptionTemplate;
