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
import ProductDescription from '../utils/productDescription';
import ProductAction from '../utils/productAction';
class ProductDescriptionTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      favouriteColor:'grey'
    };
  }

  favoutiteClicked = () =>{
      if(this.state.favouriteColor==='grey'){
          this.setState({favouriteColor:'red'})
    }
    else{
        this.setState({favouriteColor:'grey'})
    }
  }

  render() {
    const items = [
      {
        name: require('../../assets/Images/coffeeFarms/img1.png'),
        key: '1',
        origin: 'EL SALVADOR',
        variety: 'Pacamara',
        farm: 'Las Delicias',
        altitude: '1500 Ft',
        notes: 'Peach,Chocolate,Honey',
        ratings: 5,
        process:'Natural'
      },
    ];

    const styles = StyleSheet.create({
      
      container: {       
    
        height: 100,
        width: this.state.width,
        alignItems:'center'
      },
      originHeaderContainer: {
        width: this.state.width,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: 10,
        paddingRight: 10,
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
        width: this.state.width,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: 10,
        paddingRight: 10,
        height: 160,
        backgroundColor: 'white',
      },
    })

    return (    
        
      <View style={styles.container}>
        <View style={styles.originHeaderContainer}>
           
          <View style={{width:this.state.width-50,}}>
          <Text style={styles.headerText}>EL SALVADOR</Text>
          </View>
          <View style={{width:30,}}>
          <Icon name='favorite' size={30} color={this.state.favouriteColor} onPress={()=>{this.favoutiteClicked()}}/>
          </View>
        </View>
        <View style={styles.productImageContainer}>
          <Image
            source={require('../../assets/Images/coffeeFarms/img1.png')}
            style={{height: 160, width: this.state.width - 20}}
          />
        </View>
        
        <ProductDescription />
        <ProductAction />
      </View>
      
      
    );
  }
}
export default ProductDescriptionTemplate;
