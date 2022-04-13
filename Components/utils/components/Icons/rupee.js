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
class RupeeIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg width="10" height="12" viewBox="0 0 10 12" fill="none" >
            <Path d="M9.32341 2.76748H6.82905C6.68839 2.16561 6.36519 1.60458 5.89084 1.13888H9.32341C9.69708 1.13888 10 0.883933 10 0.56944C10 0.254947 9.69708 0 9.32341 0H0.67659C0.30292 0 0 0.254947 0 0.56944C0 0.883933 0.30292 1.13888 0.67659 1.13888H3.00857C4.15783 1.16704 5.14682 1.83076 5.43527 2.76748H0.67659C0.30292 2.76748 0 3.02243 0 3.33692C0 3.65141 0.30292 3.90636 0.67659 3.90636H5.48489C5.14659 4.9845 3.63103 5.80449 3.01308 5.80449H1.28101C1.01279 5.80597 0.770923 5.94066 0.664437 6.14786C0.557951 6.35505 0.606953 6.59563 0.789355 6.76115L6.41407 11.8178C6.54213 11.934 6.72193 12 6.91024 12C7.07862 11.9982 7.23988 11.9426 7.3613 11.8444C7.49338 11.7417 7.57106 11.5987 7.577 11.4475C7.58293 11.2963 7.51661 11.1493 7.39287 11.0395L2.84619 6.95476H3.00857C4.39332 6.95476 6.53586 5.59949 6.86062 3.91775H9.32341C9.69708 3.91775 10 3.6628 10 3.34831C10 3.03381 9.69708 2.77887 9.32341 2.77887V2.76748Z" fill="#333333"/>
            </Svg>
      )
    }
}

export default RupeeIcon;