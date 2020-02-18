import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {StyleSheet, Text, View,Button,TouchableOpacity,} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './Components/Screens/home';
import AllMicroLots from './Components/Screens/allMicroLots';
import AllNanoLots from './Components/Screens/allNanoLots';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderBackground } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AccessAlarm from '@material-ui/icons/AccessAlarm';
const Tab = createMaterialTopTabNavigator();
const Tab2 = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
 
    }
}
render(){
 
  return (
  
    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}        
        options={({ navigation, route }) => ({
          headerTitle: 'Microfee',
          headerRight: () =>( 
               <View style={{flexDirection:'row'}}>
              
              <TouchableOpacity onPress={() => navigation.navigate('')}>
              <Icon name="notifications"  size={23} style={{padding:10,color:'grey'}}/> 
                  </TouchableOpacity>  
                  <TouchableOpacity onPress={() => navigation.navigate('')}>
                <Icon name="shopping-cart" size={23}  style={{padding:10,color:'grey'}}/> 
                  </TouchableOpacity> 
                 </View>)

        })}
           
           />
         
        <Stack.Screen name="All Microlots" component={AllMicroLots} options={{title: 'All Microlots'}} />
        <Stack.Screen name="All Nanolots" component={AllNanoLots} options={{title: 'All Nanolots'}} />        
     </Stack.Navigator>    
     {/* <NavigationContainer>
  <Tab2.Navigator>
      <Tab2.Screen name="Home" component={HomeScreen} />     
     </Tab2.Navigator> */}
   
 </NavigationContainer>
  );


}
}