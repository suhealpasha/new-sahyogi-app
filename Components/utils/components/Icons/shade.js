import React  , {Component, UseState, UseEffect} from 'react';
import Svg,{Path,LinearGeadient,Stop,Polygon,Polyline,Defs,G,Mask,Circle,Rect,Use,LinearGradient} from 'react-native-svg';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Animated,
    Image,
    Dimensions
  } from 'react-native';
class Shade extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        const styles = StyleSheet.create({
            main:{
                width:13,
                height:13,
                backgroundColor:'#efd8c9',
                borderRadius:1.7                
            },
            child1:{
                width:5,
                height:13,
                backgroundColor:'#3bf5f2',
                borderRadius:1.7,
                marginLeft:1                
            },
            child2:{
                width:5,
                height:13,
                backgroundColor:'#f0a2f8',
                borderRadius:1.7 ,
                marginLeft:1               
            },
            child3:{
                width:5,
                height:13,
                backgroundColor:'#f0a2f8',
                borderRadius:1.7,
                marginLeft:1                
            },

          });
        return(
           <View style={{display:'flex',flexDirection:'row'}}>
               <View style={styles.main}></View>
               <View style={styles.child1}></View>
               <View style={styles.child2}></View>
               <View style={styles.child3}></View>
           </View>
      )
    }
}

export default Shade;