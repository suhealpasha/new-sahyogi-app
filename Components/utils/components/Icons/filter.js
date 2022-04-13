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
class FilterIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg style={{width:20,height:20}} viewBox="0 0 23 20" version="1.1">

    <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <G id="Profile-Screen_5.9.6" transform="translate(-320.000000, -42.000000)" fill={this.props.color} fillRule="nonzero">
            <G id="Group" transform="translate(320.749721, 42.000000)">
                <Path d="M1.13636364,3.90909091 L4.18181818,3.90909091 C4.59090909,4.90909091 5.56818182,5.63636364 6.72727273,5.63636364 C7.88636364,5.63636364 8.86363636,4.93181818 9.27272727,3.90909091 L20.6818182,3.90909091 C21.25,3.90909091 21.7045455,3.45454545 21.7045455,2.88636364 C21.7045455,2.31818182 21.25,1.86363636 20.6818182,1.86363636 L9.27272727,1.86363636 C8.86363636,0.818181818 7.88636364,0.113636364 6.72727273,0.113636364 C5.56818182,0.113636364 4.59090909,0.818181818 4.18181818,1.84090909 L1.13636364,1.84090909 C0.568181818,1.84090909 0.113636364,2.29545455 0.113636364,2.86363636 C0.113636364,3.43181818 0.568181818,3.90909091 1.13636364,3.90909091 Z" id="Path"></Path>
                <Path d="M20.6818182,8.97727273 L17.6363636,8.97727273 C17.2272727,7.97727273 16.25,7.25 15.0909091,7.25 C13.9318182,7.25 12.9545455,7.95454545 12.5454545,8.97727273 L1.13636364,8.97727273 C0.568181818,8.97727273 0.113636364,9.43181818 0.113636364,10 C0.113636364,10.5681818 0.568181818,11.0227273 1.13636364,11.0227273 L12.5454545,11.0227273 C12.9545455,12.0227273 13.9318182,12.75 15.0909091,12.75 C16.25,12.75 17.2272727,12.0454545 17.6363636,11.0227273 L20.6818182,11.0227273 C21.25,11.0227273 21.7045455,10.5681818 21.7045455,10 C21.7045455,9.43181818 21.25,8.97727273 20.6818182,8.97727273 Z" id="Path"></Path>
                <Path d="M20.6818182,16.0909091 L9.27272727,16.0909091 C8.86363636,15.0909091 7.88636364,14.3636364 6.72727273,14.3636364 C5.56818182,14.3636364 4.59090909,15.0681818 4.18181818,16.0909091 L1.13636364,16.0909091 C0.568181818,16.0909091 0.113636364,16.5454545 0.113636364,17.1136364 C0.113636364,17.6818182 0.568181818,18.1363636 1.13636364,18.1363636 L4.18181818,18.1363636 C4.59090909,19.1363636 5.56818182,19.8636364 6.72727273,19.8636364 C7.88636364,19.8636364 8.86363636,19.1590909 9.27272727,18.1363636 L20.6818182,18.1363636 C21.25,18.1363636 21.7045455,17.6818182 21.7045455,17.1136364 C21.7045455,16.5681818 21.25,16.0909091 20.6818182,16.0909091 Z" id="Path"></Path>
            </G>
        </G>
    </G>
</Svg>
      )
    }
}

export default FilterIcon;