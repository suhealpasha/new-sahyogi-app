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
class TrandingIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg width="20" height="16" viewBox="0 0 20 16" fill="none" >
<Path d="M19.0734 0H14.6512C14.1458 0 13.7247 0.42328 13.7247 0.931217C13.7247 1.43915 14.1458 1.86243 14.6512 1.86243H16.8413L9.61832 9.12169L8.22848 7.72487C7.87049 7.36508 7.28086 7.36508 6.92287 7.72487L0.268492 14.4127C-0.0894972 14.7725 -0.0894972 15.3651 0.268492 15.7249C0.458015 15.9153 0.689655 16 0.921295 16C1.15294 16 1.40563 15.9153 1.5741 15.7249L7.57568 9.71429L8.96552 11.1111C9.32351 11.4709 9.91313 11.4709 10.2711 11.1111L18.1469 3.19577V5.39683C18.1469 5.90476 18.568 6.32804 19.0734 6.32804C19.5788 6.32804 20 5.90476 20 5.39683V0.931217C20 0.402116 19.5788 0 19.0734 0Z" fill="#FF7D01"/>
</Svg>
      )
    }
}

export default TrandingIcon;