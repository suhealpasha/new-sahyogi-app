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
class BackIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg style={{width:20,height:20,marginRight:10}} viewBox="0 0 22 16" version="1.1" onPress={this.props.back}>
    
    <G id="Page-1" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
        <G id="Profile-Screen_5.9.3" transform="translate(-15.000000, -44.000000)" fill="#666666" fillRule="nonzero" stroke="#666666">
            <G id="back" transform="translate(16.000000, 45.000000)">
                <Path d="M6.42109375,0.208125 C6.69859375,-0.069375 7.13546875,-0.069375 7.41296875,0.208125 C7.68109375,0.47625 7.68109375,0.9225 7.41296875,1.19 L2.38359375,6.219375 L18.9798438,6.219375 C19.3667188,6.219375 19.6842187,6.526875 19.6842187,6.91375 C19.6842187,7.300625 19.3667188,7.618125 18.9798438,7.618125 L2.38359375,7.618125 L7.41296875,12.638125 C7.68109375,12.915625 7.68109375,13.3625 7.41296875,13.63 C7.13546875,13.9075 6.69859375,13.9075 6.42109375,13.63 L0.20109375,7.41 C-0.06703125,7.141875 -0.06703125,6.695625 0.20109375,6.428125 L6.42109375,0.208125 Z" id="Path"></Path>
            </G>
        </G>
    </G>
</Svg>
      )
    }
}

export default BackIcon;