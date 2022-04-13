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
class UpIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" >
     
            <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <G id="Wallet-Screen" transform="translate(-316.000000, -712.000000)">
                    <G id="Group-28" transform="translate(16.000000, 702.000000)">
                        <G id="Group-27" transform="translate(11.000000, 10.000000)">
                            <G id="Group-9" transform="translate(289.000000, 0.000000)">
                                <Circle id="Oval" stroke="#FF7D01" strokeWidth="0.833333333" fill="#FFFFFF" transform="translate(10.000000, 10.000000) scale(1, -1) translate(-10.000000, -10.000000) " cx="10" cy="10" r="9.58333333"></Circle>
                                <Path d="M8.16691034,6.1063575 C7.64323471,5.51287015 8.47238779,4.57318184 8.99606342,5.21612648 L12.8363514,9.51890978 C13.0545495,9.76619618 13.0545495,10.2113117 12.8363514,10.4585981 L8.99606342,14.8108387 C8.47238779,15.404326 7.64323471,14.4646377 8.16691034,13.8711504 L11.6144416,10.0134826 L8.16691034,6.1063575 Z" id="Path" fill="#FF7D01" fillRule="nonzero" transform="translate(10.500000, 10.000000) scale(1, -1) rotate(90.000000) translate(-10.500000, -10.000000) "></Path>
                            </G>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
      )
    }
}

export default UpIcon;