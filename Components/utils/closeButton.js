import React, { Component } from 'react';
import {View,Text,  StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
class CloseButton extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){

        return(
            <View style={styles.actionBarContainer}>
          <TouchableOpacity  onPress={() =>this.props.onClose()} style={{paddingRight:10,paddingBottom:10,paddingTop:10}}>
            <Icon name="close" color="#004561" size={30} />
          </TouchableOpacity>
          </View>
        );
    }
}

export default CloseButton;
const styles = StyleSheet.create({
    actionBarContainer:{       
        paddingLeft:10,
        width:'100%',     
      },
})