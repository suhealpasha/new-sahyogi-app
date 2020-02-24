import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './Components/Screens/home';
import AllMicroLots from './Components/Screens/allMicroLots';
import AllNanoLots from './Components/Screens/allNanoLots';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Search from './Components/utils/Search';
import {HeaderBackground} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import Reducer from './Store/reducer';
import * as actionTypes from './Store/action';
import {connect} from 'react-redux';
import ProductDescriptionTemplate from './Components/Screens/productDescriptionTemplate';

const Tab = createMaterialTopTabNavigator();
const Tab2 = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      home:false,
      searchText:'',
      searchResult:[]
    };
  }

  goBack = ({navigation}) => {
    navigation.navigate('Home');
    this.setState({home:true})
  };

  searchActivate = () =>{

  }

  render() {
    const styles = StyleSheet.create({
      headerRightContainerStyle: {
        width: this.state.width,
        alignItems: 'center',
       
      },
   
  
    });

    const store = createStore(Reducer);

    return (
      <Provider store={store} >
        <NavigationContainer > 
          <Stack.Navigator>
            <Stack.Screen
            
               name="Home"
              component={HomeScreen}
              options={({navigation, route}) => ({
                headerTitle: 'Microfee',
                headerStyle:{backgroundColor:'#00aa00'},
                headerTintColor:'#ffffff',
              
                headerRight: () => (
                  <View style={{flexDirection: 'row'}} >
                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                      <Icon
                        name="notifications"
                        size={23}
                        style={{padding: 10, color: '#ffffff'}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                      <Icon
                        name="shopping-cart"
                        size={23}
                        style={{padding: 10, color: '#ffffff'}}
                      />
                    </TouchableOpacity>
                  </View>
                ),
              })}
              {...this.state}
            />

            <Stack.Screen
              name="All Microlots"
              component={AllMicroLots}
              options={({navigation, route}) => ({
                headerTitle: 'All Microlots',
                headerRightContainerStyle: styles.headerRightContainerStyle,
                headerLeft: () => (
                  <TouchableOpacity  onPress={() => this.goBack({navigation})}>
                  <Icon
                    name="chevron-left"                   
                    size={35}
                    color="black"
                  />
                  </TouchableOpacity>)
              })}
            />
            <Stack.Screen
              name="All Nanolots"
              component={AllNanoLots}
              options={({navigation, route}) => ({
                headerTitle: 'All Nanolots',
                headerRightContainerStyle: styles.headerRightContainerStyle,
                headerLeft: () => (
                  <TouchableOpacity  onPress={() => this.goBack({navigation})}>
                  <Icon
                    name="chevron-left"                   
                    size={35}
                    color="black"
                  />
                  </TouchableOpacity>)
              })}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={({navigation, route}) => ({                
                headerTitle: null,
                headerRightContainerStyle: styles.headerRightContainerStyle,
                headerLeft: () => (
                  <TouchableOpacity  onPress={() => this.goBack({navigation})}>
                  <Icon
                    name="chevron-left"                   
                    size={35}
                    color="black"
                  />
                  </TouchableOpacity>
                ),

                headerRight: () => (
                  <TextInput
                    style={{height: 50, fontSize: 20}}
                    placeholder="Search"
                    autoFocus={true}
                    onChangeText={text=>{this.setState({searchText:text})}}
                  />
                ),
              })}
             
             
            />
             <Stack.Screen
              name="Product Description"
              component={ProductDescriptionTemplate}
              options={({navigation, route}) => ({
                headerTitle: 'Product Details',
                headerRightContainerStyle: styles.headerRightContainerStyle,
                headerLeft: () => (
                  <TouchableOpacity  onPress={() => this.goBack({navigation})}>
                  <Icon
                    name="chevron-left"                   
                    size={35}
                    color="black"
                  />
                  </TouchableOpacity>)
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
export default App;
