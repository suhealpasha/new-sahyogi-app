import React, { Component } from 'react';
import {View,Text,  StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
class BackButton extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){

        return(
            <View style={styles.actionBarContainer}>
          <TouchableOpacity  onPress={() =>   this.props.navigation.goBack(null)}>
            <Icon name="arrow-back" color="#004561" size={30} />
          </TouchableOpacity>
          </View>
        );
    }
}

export default BackButton;
const styles = StyleSheet.create({
    actionBarContainer:{
        paddingTop:10,
        marginTop:20,      
        width:'100%'
      },
})