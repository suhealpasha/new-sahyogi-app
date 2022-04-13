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
class WalletIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg width="30px" height="25px" viewBox="0 0 18 17" version="1.1" >

    <G  id="Page-1" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
        <G  id="Wallet-Screen" transform="translate(-25.000000, -466.000000)">
            <G  id="Group-25" transform="translate(16.000000, 394.000000)">
                <G  id="Group-23" transform="translate(0.000000, 42.000000)">
                    <G  id="Group-22" transform="translate(0.000000, 21.000000)">
                        <G  id="Wallet" transform="translate(9.272727, 9.272727)">
                            <G  id="Group" transform="translate(9.272727, 5.563636)"></G>
                            <Path d="M13.9507543,0.280991736 L1.81191131,0.280991736 C0.880786606,0.280991736 0.125960895,1.03581745 0.125960895,1.96694215 L0.125960895,13.6561421 C0.125960895,14.5872669 0.880786606,15.3420926 1.81191131,15.3420926 L13.9507543,15.3420926 C14.881879,15.3420926 15.6367047,14.5872669 15.6367047,13.6561421 L15.6367047,1.96694215 C15.6367047,1.03581745 14.881879,0.280991736 13.9507543,0.280991736 Z M1.81191131,0.955371901 L13.9507543,0.955371901 C14.5094291,0.955371901 14.9623245,1.40826733 14.9623245,1.96694215 L14.9623245,13.6561421 C14.9623245,14.214817 14.5094291,14.6677124 13.9507543,14.6677124 L1.81191131,14.6677124 C1.25323649,14.6677124 0.800341061,14.214817 0.800341061,13.6561421 L0.800341061,1.96694215 C0.800341061,1.40826733 1.25323649,0.955371901 1.81191131,0.955371901 Z" id="Path-11" fill="#333333" fillRule="nonzero"></Path>
                            <Path d="M15.986081,9.38512397 L15.986081,6.68760331 C15.986081,6.31515342 15.6841507,6.01322314 15.3117009,6.01322314 C14.0281258,6.01322314 12.7445508,6.01322314 11.4609758,6.01322314 C9.29262241,6.01322314 9.29262241,10.0595041 11.4609758,10.0595041 C12.7445508,10.0595041 14.0281258,10.0595041 15.3117009,10.0595041 C15.6841507,10.0595041 15.986081,9.75757385 15.986081,9.38512397 Z" id="Path-12" stroke="#333333" stroke-width="0.674380165" fill="#FF7D01"></Path>
                            <Circle id="Oval" fill="#FFFFFF" cx="12.1950413" cy="8.03636364" r="1.01157025"></Circle>
                        </G>
                    </G>
                </G>
            </G>
        </G>
    </G>
</Svg>
      )
    }
}

export default WalletIcon;