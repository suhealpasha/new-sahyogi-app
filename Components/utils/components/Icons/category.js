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
class CategoryIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg style={{width:'30px',height:'25px'}} viewBox="0 0 20 20" version="1.1">            
             <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <G id="Dashboard-Screen" transform="translate(-127.000000, -1372.000000)">
            <G id="Bottom-Nav-Bar" transform="translate(0.000000, 1354.000000)">
                <G id="Categories" transform="translate(127.000000, 18.000000)">
                    <Path d="M4.4,0 C6.8300529,0 8.8,1.9699471 8.8,4.4 C8.8,6.8300529 6.8300529,8.8 4.4,8.8 C1.9699471,8.8 0,6.8300529 0,4.4 C0,1.9699471 1.9699471,0 4.4,0 Z M4.4,0.833333333 C2.43018439,0.833333333 0.833333333,2.43018439 0.833333333,4.4 C0.833333333,6.36981561 2.43018439,7.96666667 4.4,7.96666667 C6.36981561,7.96666667 7.96666667,6.36981561 7.96666667,4.4 C7.96666667,2.43018439 6.36981561,0.833333333 4.4,0.833333333 Z" id="Oval" fill="#333333" fillRule="nonzero"></Path>
                    <Circle id="Oval" stroke="#333333" strokeWidth="0.833333333" fill="#FF7D01" cx="15.6" cy="4.4" r="3.98333333"></Circle>
                    <Path d="M4.4,11.2 C6.8300529,11.2 8.8,13.1699471 8.8,15.6 C8.8,18.0300529 6.8300529,20 4.4,20 C1.9699471,20 0,18.0300529 0,15.6 C0,13.1699471 1.9699471,11.2 4.4,11.2 Z M4.4,12.0333333 C2.43018439,12.0333333 0.833333333,13.6301844 0.833333333,15.6 C0.833333333,17.5698156 2.43018439,19.1666667 4.4,19.1666667 C6.36981561,19.1666667 7.96666667,17.5698156 7.96666667,15.6 C7.96666667,13.6301844 6.36981561,12.0333333 4.4,12.0333333 Z" id="Oval" fill="#333333" fillRule="nonzero"></Path>
                    <Path d="M15.6,11.2 C18.0300529,11.2 20,13.1699471 20,15.6 C20,18.0300529 18.0300529,20 15.6,20 C13.1699471,20 11.2,18.0300529 11.2,15.6 C11.2,13.1699471 13.1699471,11.2 15.6,11.2 Z M15.6,12.0333333 C13.6301844,12.0333333 12.0333333,13.6301844 12.0333333,15.6 C12.0333333,17.5698156 13.6301844,19.1666667 15.6,19.1666667 C17.5698156,19.1666667 19.1666667,17.5698156 19.1666667,15.6 C19.1666667,13.6301844 17.5698156,12.0333333 15.6,12.0333333 Z" id="Oval" fill="#333333" fillRule="nonzero"></Path>
                </G>
            </G>
        </G>
    </G>
        </Svg>
      )
    }
}

export default CategoryIcon;