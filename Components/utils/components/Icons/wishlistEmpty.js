import React  , {Component, UseState, UseEffect} from 'react';
import Svg,{Path,LinearGeadient,Stop,Polygon,Polyline,Defs,G,Mask,Circle,Rect,Use,LinearGradient,Ellipse} from 'react-native-svg';
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
class WishlistEmptyIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg width="243px" height="234px" viewBox="0 0 243 234" version="1.1" >
 
            <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <G id="Category-Chasmeywala-Product-List_1_No-Wishlist-Shopping-Bag" transform="translate(-59.000000, -192.000000)">
                    <G id="Group-4" transform="translate(59.000000, 194.000000)">
                        <Ellipse id="Oval" fill="#C9C9C9" fillRule="nonzero" cx="117.497436" cy="218.051282" rx="117.497436" ry="13.1282051"></Ellipse>
                        <G id="Group-3" transform="translate(54.153846, 0.000000)">
                            <G id="Group" transform="translate(0.000000, 54.153846)">
                                <Path d="M126.251012,2.97975709 C127.270615,2.97975709 128.193692,3.3930327 128.861868,4.06120897 C129.530044,4.72938524 129.94332,5.65246216 129.94332,6.67206478 L129.94332,6.67206478 L129.94332,159.481781 C129.94332,160.501384 129.530044,161.424461 128.861868,162.092637 C128.193692,162.760813 127.270615,163.174089 126.251012,163.174089 L126.251012,163.174089 L6.67206478,163.174089 C5.65246216,163.174089 4.72938524,162.760813 4.06120897,162.092637 C3.3930327,161.424461 2.97975709,160.501384 2.97975709,159.481781 L2.97975709,159.481781 L2.97975709,6.67206478 C2.97975709,5.65246216 3.3930327,4.72938524 4.06120897,4.06120897 C4.72938524,3.3930327 5.65246216,2.97975709 6.67206478,2.97975709 L6.67206478,2.97975709 Z" id="Rectangle" stroke="#000000" strokeWidth="2.46153846" fill="#FFB51F" transform="translate(66.461538, 83.076923) rotate(1.000000) translate(-66.461538, -83.076923) "></Path>
                                <Path d="M37.5254164,41.0071832 C42.5626243,43.3282463 46.3380193,41.8617314 48.8516015,36.6076384" id="Path-31" stroke="#000000" strokeWidth="1.23076923" stroke-linecap="round" transform="translate(43.188509, 39.340799) rotate(-10.000000) translate(-43.188509, -39.340799) "></Path>
                                <Path d="M85.5492127,41.4191363 C90.5864206,43.7401994 94.3618156,42.2736844 96.8753978,37.0195914" id="Path-31" stroke="#000000" strokeWidth="1.23076923" stroke-linecap="round" transform="translate(91.212305, 39.752752) scale(-1, 1) rotate(-10.000000) translate(-91.212305, -39.752752) "></Path>
                                <Ellipse id="Oval" fill="#000000" transform="translate(47.433514, 50.947010) rotate(-10.000000) translate(-47.433514, -50.947010) " cx="47.4335144" cy="50.9470104" rx="5.24696356" ry="6.12145749"></Ellipse>
                                <Ellipse id="Oval" fill="#000000" transform="translate(90.290060, 52.270089) rotate(-10.000000) translate(-90.290060, -52.270089) " cx="90.2900603" cy="52.2700891" rx="5.24696356" ry="6.12145749"></Ellipse>
                                <Path d="M57.7384553,81.1700862 C63.4794387,76.5912252 68.1051296,77.3278728 71.6155281,83.380029" id="Path-32" stroke="#000000" strokeWidth="3.69230769" stroke-linecap="round" transform="translate(64.676992, 80.795945) rotate(-10.000000) translate(-64.676992, -80.795945) "></Path>
                            </G>
                            <Path d="M97.2452067,41.6845849 C97.0200831,32.6603822 99.4712031,26.5157274 101.560884,22.6764811 C104.201357,18.2356364 108.360363,15.1082775 113.221273,13.9740678 C117.550511,12.9959878 124.100804,13.2717104 130.592499,18.9895042 C138.261026,25.8278911 139.151048,33.6305154 138.864856,38.259714 C142.66304,35.3849312 149.707999,32.2897965 159.124506,35.0960445 C167.32594,37.6726368 171.026668,43.1836952 172.506341,47.4409511 C174.23273,52.0656108 173.737446,57.4893005 171.438674,62.123038 C169.614829,65.8842194 165.796906,71.2573035 157.897078,75.9230389 C144.243229,84.1845222 115.819151,87.986327 112.477391,88.3811901 L111.679884,88.6153846 L111.281439,87.7060656 C110.636279,86.4293428 97.791057,57.5056465 97.2452067,41.6845849 Z" id="Path" stroke="#000000" strokeWidth="2.230769" fill="#33BDB0" fillRule="nonzero" transform="translate(135.384615, 51.076923) rotate(-27.000000) translate(-135.384615, -51.076923) "></Path>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
      )
    }
}

export default WishlistEmptyIcon;