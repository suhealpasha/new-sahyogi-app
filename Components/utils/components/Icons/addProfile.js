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
class AddProfileIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg style={{width:'30px',height:'28px'}} viewBox="0 0 20 22" version="1.1">            
             <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <G id="Log_As_Partner_Dashboard-Screen" transform="translate(-256.000000, -1371.000000)" fillRule="nonzero">
            <G id="Bottom-Nav-Bar" transform="translate(0.000000, 1354.000000)">
                <G id="noun_user-add_831914" transform="translate(257.000000, 18.000000)">
                    <G id="Group" stroke="#333333" strokeWidth="0.78">
                        <Path d="M14.6571429,10.9714286 C13.9714286,9.88571429 12.9428571,9.05714286 11.7142857,8.62857143 C10.7428571,9.48571429 9.45714286,10.0285714 8.05714286,10.0285714 C6.65714286,10.0285714 5.37142857,9.51428571 4.4,8.62857143 C2.34285714,9.34285714 0.828571429,11.2 0.6,13.4857143 L0.285714286,16.8285714 C0.2,17.6571429 0.771428571,18.4 1.57142857,18.5714286 L6.11428571,19.4857143 C7.4,19.7428571 8.74285714,19.7428571 10.0285714,19.4857143 L11.0857143,19.2571429 C10.2857143,18.3714286 9.8,17.2 9.8,15.9142857 C9.77142857,13.2285714 11.9714286,11.0285714 14.6571429,10.9714286 Z" id="Path"></Path>
                        <Path d="M6.05714286,8.31428571 C6.65714286,8.62857143 7.34285714,8.8 8.05714286,8.8 C8.77142857,8.8 9.45714286,8.62857143 10.0571429,8.31428571 C11.4285714,7.6 12.3428571,6.17142857 12.3428571,4.51428571 C12.3428571,2.14285714 10.4285714,0.2 8.02857143,0.2 C5.65714286,0.2 3.71428571,2.11428571 3.71428571,4.51428571 C3.77142857,6.17142857 4.68571429,7.6 6.05714286,8.31428571 Z" id="Path"></Path>
                    </G>
                    <Path d="M15.2285714,12.1428571 C15.0571429,12.1142857 14.9142857,12.1142857 14.7428571,12.1142857 C12.6285714,12.1142857 10.9142857,13.8285714 10.9142857,15.9428571 C10.9142857,17.2 11.5142857,18.3142857 12.4285714,19 C13.0571429,19.4857143 13.8857143,19.7714286 14.7428571,19.7714286 C16.8571429,19.7714286 18.5714286,18.0571429 18.5714286,15.9428571 C18.6,14 17.1142857,12.3714286 15.2285714,12.1428571 Z" id="Path" stroke="#333333" strokeWidth="0.7" fill="#FF7D01"></Path>
                    <Path d="M16.4857143,16.5714286 L15.3428571,16.5714286 L15.3428571,17.7142857 C15.3428571,17.9714286 15.1428571,18.1714286 14.8857143,18.1714286 L14.6285714,18.1714286 C14.3714286,18.1714286 14.1428571,17.9714286 14.1714286,17.7142857 L14.1714286,16.5714286 L13.0285714,16.5714286 C12.7714286,16.5714286 12.5428571,16.3714286 12.5714286,16.1142857 L12.5714286,15.8857143 C12.5714286,15.6285714 12.7714286,15.4 13.0285714,15.4285714 L14.1714286,15.4285714 L14.1714286,14.2857143 C14.1714286,14.0285714 14.3714286,13.8 14.6285714,13.8285714 L14.8571429,13.8285714 C15.1142857,13.8285714 15.3428571,14.0285714 15.3142857,14.2857143 L15.3142857,15.4285714 L16.4571429,15.4285714 C16.7142857,15.4285714 16.9428571,15.6285714 16.9142857,15.8857143 L16.9142857,16.1428571 C16.9714286,16.3428571 16.7428571,16.5714286 16.4857143,16.5714286 Z" id="Path" fill="#FFFFFF"></Path>
                </G>
            </G>
        </G>
    </G>
        </Svg>
      )
    }
}

export default AddProfileIcon;