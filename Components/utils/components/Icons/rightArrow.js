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

class RightArrowIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" >
    <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
        <G id="Profile-Screen_5.5" transform="translate(-319.000000, -417.000000)">
            <G id="Group-9" transform="translate(319.000000, 417.000000)">
                <Circle id="Oval" stroke="#FF7D01" strokeWidth="0.75" fill="#FFFFFF" cx="9" cy="9" r="8.625"></Circle>
                <Path d="M6.9002193,5.49572175 C6.42891124,4.96158314 7.17514901,4.11586366 7.64645708,4.69451383 L11.1027162,8.5670188 C11.2990946,8.78957656 11.2990946,9.19018052 11.1027162,9.41273828 L7.64645708,13.3297548 C7.17514901,13.8638934 6.42891124,13.018174 6.9002193,12.4840353 L10.0029974,9.01213432 L6.9002193,5.49572175 Z" id="Path" fill="#FF7D01" fill-rule="nonzero"></Path>
            </G>
        </G>
    </G>
</Svg>
      )
    }
}

export default RightArrowIcon;