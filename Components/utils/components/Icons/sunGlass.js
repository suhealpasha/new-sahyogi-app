import React  , {Component, UseState, UseEffect} from 'react';
import Svg,{Path,LinearGeadient,Stop,Polygon,PolyLine,Defs,G,Mask,Circle,Rect,Use,LinearGradient,Line} from 'react-native-svg';
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
class SunGlassIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg style={{width:"70px",height:"25px"}} viewBox="0 0 115 42" version="1.1">           
            <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <G id="Group-34" transform="translate(-23.000000, -30.000000)" fill="#FFAF62" fillRule="nonzero" stroke="#FFFFFF" strokeWidth="1.3">
                    <G id="noun_sunglass_2527282-(1)" transform="translate(24.000000, 31.000000)">
                        <Path d="M49.8375,11.25 C49.2725,7.5 47.2725,5.52625 44.38625,3.74875 C43.62125,3.2775 42.795,2.5 41.91625,2.5 L70.59375,2.5 C69.7125,2.5 68.885,3.27875 68.11875,3.75 C65.22875,5.5275 63.2275,7.4975 62.66375,11.2475 C62.6625,11.2475 58.75,10 56.25,10 C53.75,10 49.8375,11.25 49.8375,11.25 Z M2.49,18.75 C3.06875,28.75 7.0225,39.98375 19.0425,39.98375 C34.78875,39.98375 49.60375,29.27875 49.9925,13.74875 C49.9925,13.74875 53.80875,12.49875 56.25,12.49875 C58.69125,12.49875 62.5075,13.74875 62.5075,13.74875 C62.89625,29.2775 77.71,40 93.4575,40 C105.4775,40 109.4325,28.74875 110.01,18.74875 L112.5,18.74875 L112.5,12.49875 L110,12.49875 C109.925,11.24875 109.78875,10.36625 109.65625,9.3775 C108.855,3.4075 96.38,0 83.75,0 L28.75,0 C16.12,0 3.64375,3.40375 2.8425,9.37625 C2.71125,10.36 2.575,11.25 2.5,12.5 L0,12.5 L0,18.75 L2.49,18.75 Z" id="Shape"></Path>
                    </G>
                </G>
            </G>
        </Svg>
      )
    }
}

export default SunGlassIcon;