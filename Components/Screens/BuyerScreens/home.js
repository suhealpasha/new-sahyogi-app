import React, {Component} from 'react';
import {BackHandler,StyleSheet, Text, View, AsyncStorage} from 'react-native';
import {ImageBackground, TouchableHighlight, Alert, Image,TouchableOpacity,  Dimensions,} from 'react-native';
import HomeScreen from './homeSceen';
import SellerHomeScreen from '../SellerScreens/sellerHomeScreen';
import Toolbar from '../../Toolbar/toolbar';
import BottomNavigation from '../../BottomNavigation/bottomNavigation';
import {COLOR, ThemeContext, getTheme, Icon} from 'react-native-material-ui';
import {createStackNavigator} from '@react-navigation/stack';
import {Navigator, NativeModules} from 'react-native';
import 'react-native-gesture-handler';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import Reducer from '../../../Store/reducer';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import MenuDrawer from 'react-native-side-drawer';
import Spinner from 'react-native-loading-spinner-overlay';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const uiTheme = {
  palette: {
    primaryColor: COLOR.blue500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  
  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {

    if(this.props.open){
      this.props.onToggleOpen();
    }
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {   
    BackHandler.exitApp();
    return true;
  }

  drawerRouteHandler = (args , args2) =>{
    this.props.onToggleOpen();
    if(args === 'Listing'){
      if(args2 === null){
    this.props.onProductListingTitle('Products');
    this.props.navigation.navigate(args,{sideDrawer:true})
      }
      else if(args2 === "Nano"){        
        this.props.onProductListingTitle('Products');
        this.props.navigation.navigate(args,{nano:true})
      }
      else{
        this.props.onProductListingTitle('Products');
        this.props.navigation.navigate(args,{micro:true})
      }
    }
   

    else{
      this.props.navigation.navigate(args)
    }
  }

  drawerContent = () => {
    return (
      <View onPress={this.toggleOpen} style={styles.animatedBox}>
        <View>
       <TouchableOpacity style={styles.itemContainer} onPress = {()=>this.drawerRouteHandler('All Regions',null)}><Text style={styles.textData}>Regions / Origin</Text></TouchableOpacity>
       <TouchableOpacity  style={styles.itemContainer} onPress = {()=>this.drawerRouteHandler('Varities',null)}><Text style={styles.textData}>Variety</Text></TouchableOpacity>
       <TouchableOpacity  style={styles.itemContainer} onPress = {()=>this.drawerRouteHandler('Listing',null)}><Text style={styles.textData}>New to Oldest</Text></TouchableOpacity>
       <TouchableOpacity  style={styles.itemContainer} onPress = {()=>this.drawerRouteHandler('Listing','Nano')}><Text style={styles.textData}>Nano Lots</Text></TouchableOpacity>
       <TouchableOpacity  style={styles.itemContainer} onPress = {()=>this.drawerRouteHandler('Listing','Micro')}><Text style={styles.textData}>Micro Lots</Text></TouchableOpacity>
       </View>
       <View  style={styles.imageContainer}>
       <ImageBackground
        source={require('../../../assets/Images/logos/Microffee_png.png')}
                      style={{                 
                        width: 100,
                        height: 100, 
                        resizeMode:'cover',                    
                      aspectRatio:1/1  
                      }}
                      
                      resizeMode="stretch"
                    />
       </View>
     
      </View>
    );
  };

  close = () =>{
    // this.props.onToggleOpen();
    console.log("there")
  }
  render() {

  

    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <View style={styles.container}>
        <MenuDrawer 
          open={this.props.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={80}
          animationTime={250}
          overlay={true}
          opacity={0.4}
          
        >
          </MenuDrawer>
        
          <HomeScreen {...this.props} {...this.state} onToggleOpen = {this.props.onToggleOpen} />
        
        </View>
        <BottomNavigation {...this.props} {...this.state} onToggleOpen = {this.props.onToggleOpen}/>
      </ThemeContext.Provider>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onBottomTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_ICON, payload: value}),
    onProductListingTitle: value =>
      dispatch({type: actionTypes.LISTING_TITLE, payload: value}),
    onFeaturedProductsFiltered: value =>
      dispatch({type: actionTypes.FILTER_FEATURED_DATA, payload: value}),
    onNanoLotProductsFiltered: value =>
      dispatch({type: actionTypes.FILTER_NANO_LOT_DATA, payload: value}),
    onMicroLotProductsFiltered: value =>
      dispatch({type: actionTypes.FILTER_MICRO_LOT_DATA, payload: value}),
    onOriginProductsFiltered: value =>
      dispatch({type: actionTypes.FILTER_ORIGINS_DATA, payload: value}),
    onVaritieyProductsFiltered: value =>
      dispatch({type: actionTypes.FILTER_VARITIES_DATA, payload: value}),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)( App);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    justifyContent: "center",
    zIndex: 0
  },
  animatedBox: {
    flex: 1.0,
    backgroundColor: "#ffff",
    justifyContent:'space-between',
    paddingBottom:130
  },
  itemContainer:{
  padding:20,
  },
  textData:{
    fontFamily:'GothamMedium',
    fontSize:14
  },
  imageContainer:{
    // marginBottom:50,
    width:'100%',  
    alignItems:'center',

   
  }
});