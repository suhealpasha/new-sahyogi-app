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


import OrderDone from '../../utils/components/Icons/orderDone';
import ActionButton from '../../utils/components/actionButton';
const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;

const itemHeight = 69;

class OrderPlaced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props.searchbar);
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

browse = ()=>{
 this.props.navigation.navigate('Home')
}
 

  render() {
    const styles = StyleSheet.create({
     
      lable: {
        fontFamily: 'AvenirNext-Medium',
        // padding:50,
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 30,
      },
      message: {
        fontSize: 14,
        fontFamily: 'AvenirNext-Medium',
        // paddingBottom:30,
        textAlign: 'center',
        color: '#999999',
        padding: 60,
      },
      thanks:{
        fontFamily:'AvenirNext-Medium',
        fontSize:22,
        color:'#333333',
        fontWeight:'500'
      }

     
    });

    
    

    return (
      <View
            style={{
              backgroundColor:'#ffff',
              flex: 1.0,
              alignItems: 'center',
              justifyContent:'center'
            }}>
              <View style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <View>
            <OrderDone />
            </View>
            <View style={{display: 'flex', alignItems: 'center',paddingTop:30}}>
              <Text style={styles.thanks}>Thanks for buying</Text>
              <Text style={styles.message} numberOfLines={2}>
              Your order will be shipped in 5 - 6 working days
              </Text>
             
            </View>
            </View>
            <ActionButton order={true} buttonText='Continue Shopping' browse={this.browse}/>
          </View>
    );
  }
}



export default OrderPlaced;
