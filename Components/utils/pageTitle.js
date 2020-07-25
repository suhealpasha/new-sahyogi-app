import React, { Component } from 'react';
import {View,Text, Image, StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from '../utils/backButton';
class PageTitle extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){

        return(
            <View style={styles.PageTitleContainer}>
            <BackButton {...this.props}/>
            <Text style={styles.titleText}>{this.props.title}</Text>
          </View>
        );
    }
}

export default PageTitle;
const styles = StyleSheet.create({
    PageTitleContainer: {
        backgroundColor:'#7ea100',
        paddingTop:20,       
        alignItems:"center", 
        display:'flex',
        flexDirection:'row',  
    },
    titleText:{
        color:'#ffff',
        fontFamily:'GothamMedium',
        fontSize:22

    }
   
})