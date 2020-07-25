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
          <TouchableOpacity  onPress={() =>   this.props.navigation.goBack(null)} style={{paddingRight:10,paddingBottom:10,paddingTop:10}}>
            <Icon name="arrow-back" color="#fff" size={30} />
          </TouchableOpacity>
          </View>
        );
    }
}

export default BackButton;
const styles = StyleSheet.create({
    actionBarContainer:{  
      width:'30%'
     
      },
})