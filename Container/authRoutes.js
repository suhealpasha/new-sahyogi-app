import 'react-native-gesture-handler';
import React, {Component, useState, useEffect} from 'react';
import {
  BackHandler,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Dimensions,
  AsyncStorage,
  Image,
  Animated,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {COLOR, ThemeContext, getTheme} from 'react-native-material-ui';
import LoginPartner from './loginPartner';

import Walkthrough from '../Components/Screens/Walkthrough/walkthrough';
import SearchIcon from '../Components/utils/components/Icons/search';
import FilterIcon from '../Components/utils/components/Icons/filter';
import BackIcon from '../Components/utils/components/Icons/back';
import SearchClear from 'react-native-vector-icons/AntDesign';
const Stack = createStackNavigator();

class AuthRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walkthrough: false,
      isLogout: false,
      isLoggedIn: null,
      width: Dimensions.get('window').width,
      searchbar: false,
     
    };
  }

  async componentDidMount() {
    // const walkthrough_display = await AsyncStorage.getItem('sahyogiWalkthrough');
    // if(walkthrough_display){this.setState({walkthrough:true})}
  }

  goBack = async ({navigation}, path) => {
    if (path === 'SearchCustomer') {
      navigation.navigate('SearchCustomer');
    } else if (path === 'LoginPartner') {
      navigation.navigate('LoginPartner');
    }
  };

  pressGetstarted = async () => {
    await this.setState({walkthrough: false});
  };

  clickedSearch = () => {
    this.setState({searchbar: !this.state.searchbar});
  };
  render() {    
    const styles = StyleSheet.create({
      headerRightContainerStyle: {
        width: this.state.width - 20,
        alignItems: 'center',
      },
      MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
      },
    });

    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.props.walkthrough === false ? (
            <Stack.Screen
              name="Walkthrough"
              options={({navigation, route}) => ({
                animationEnabled: false,
                header: () => null,
              })}>
              {props => (
                <Walkthrough
                  {...props}
                  pressGetstarted={() => {
                    this.props.pressGetstarted();
                  }}
                />
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen
              name="LoginPartner"
              options={{
                animationEnabled: false,
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },

                headerTitle: () => null,
                headerLeft: () => null,
              }}>
              {props => <LoginPartner {...props} setLogin={()=>{this.props.setLogin()}}/>}
            </Stack.Screen>
          )}

          
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default AuthRoutes;
