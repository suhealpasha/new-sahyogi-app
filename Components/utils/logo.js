import React, { Component } from 'react';
import {View,Text, Image, StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
class Logo extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){

        return(
            <View style={styles.logoContainer}>
            <Image
              style={styles.logoImageStyle}
              source={require('../../assets/Images/logos/Logo_Microffee.png')}></Image>
          </View>
        );
    }
}

export default Logo;
const styles = StyleSheet.create({
    logoContainer: {
        paddingTop:20,
        paddingBottom:10
    },
    logoImageStyle: {
      width: 300,
      height: 200,
      resizeMode: 'stretch',
    },
})