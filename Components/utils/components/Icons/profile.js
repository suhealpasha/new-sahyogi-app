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
class ProfileIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg style={{width:'30px',height:'25px'}} viewBox="0 0 16 20" version="1.1">            
            <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <G id="Dashboard-Screen" transform="translate(-322.000000, -1372.000000)">
            <G id="Bottom-Nav-Bar" transform="translate(0.000000, 1354.000000)">
                <G id="Profile" transform="translate(322.000000, 18.000000)">
                    <Path d="M8.24721378,10.7480581 C4.05300791,10.7480581 1.52168387,12.9805744 0.745587398,17.3469611 C0.589717189,18.2238478 1.17422683,19.0610625 2.05112021,19.2169245 C2.14427881,19.2334828 2.23871397,19.2418102 2.33333269,19.2418102 L14.1610912,19.2418102 C15.0517232,19.2418102 15.7737269,18.5198149 15.7737269,17.6291793 C15.7737269,17.534561 15.7653996,17.4401262 15.7488414,17.346968 C14.9727463,12.9805767 12.4414219,10.7480581 8.24721378,10.7480581 Z M8.24721378,11.5417089 C12.0479471,11.5417089 14.2572399,13.4902096 14.9674379,17.4858569 C14.975847,17.5331678 14.9800761,17.5811269 14.9800761,17.6291793 C14.9800761,18.0814922 14.6134047,18.4481594 14.1610941,18.4481594 L2.33333269,18.4481594 C2.28528005,18.4481594 2.23732064,18.4439303 2.19000952,18.4355211 C1.74467539,18.3563659 1.44783088,17.9311845 1.52699012,17.4858545 C2.23719005,13.4902075 4.44648245,11.5417089 8.24721378,11.5417089 Z" id="Path-10" fill="#333333" fillRule="nonzero"></Path>
                    <Circle id="Oval" stroke="#333333" strokeWidth="0.793650794" fill="#FF7D01" cx="8.24721378" cy="4.86322188" r="4.46639649"></Circle>
                    <Path d="M6.74460246,7.81239392 C6.86890806,5.71635484 7.88183564,4.70048183 9.78338522,4.76477487" id="Path-9" stroke="#FFFFFF" strokeWidth="0.634920635" stroke-linecap="round" transform="translate(8.263994, 6.287149) rotate(-135.000000) translate(-8.263994, -6.287149) "></Path>
                </G>
            </G>
        </G>
    </G>
        </Svg>
      )
    }
}

export default ProfileIcon;