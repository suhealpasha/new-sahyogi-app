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
class FilledLikeIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg width="23px" height="21px" viewBox="0 0 23 21" version="1.1">  
    <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <G id="Insta-Feed-Screen" transform="translate(-24.000000, -740.000000)" fill="#FF7D01" fill-rule="nonzero">
            <G id="Group-14" transform="translate(16.000000, 492.000000)">
                <G id="Group-3" transform="translate(8.000000, 248.236364)">
                    <Path d="M1.51782669,10.4148964 C0.224863214,8.21596081 0,6.35532305 0,5.11489787 C0.0562158034,3.64894084 0.674589641,2.29574974 1.74268991,1.33723937 C2.69835856,0.491494934 4.38483267,-0.354249505 6.80211221,0.153197158 C9.66911819,0.773409747 10.9620817,2.57766455 11.5242397,3.76170677 C12.0863977,2.52128159 13.435577,0.773409747 16.1901514,0.153197158 C18.6074309,-0.354249505 20.293905,0.491494934 21.2495737,1.33723937 C22.317674,2.23936678 22.9360478,3.64894084 22.9922636,5.11489787 C23.0484794,6.29894008 22.8236162,8.15957785 21.4744369,10.4148964 C19.169589,14.3617037 12.5361242,19.2670215 11.7491029,19.8308511 L11.5804555,20 L11.3555923,19.8308511 C11.0182975,19.6053193 3.82267463,14.2489378 1.51782669,10.4148964 Z" id="Path"></Path>
                </G>
            </G>
        </G>
    </G>
</Svg>
      )
    }
}

export default FilledLikeIcon;