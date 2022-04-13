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
class HomeIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg style={{width:'30px',height:'25px'}} viewBox="0 0 18 20" version="1.1">            
            <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <G id="Dashboard-Screen" transform="translate(-23.000000, -1372.000000)">
                    <G id="Bottom-Nav-Bar" transform="translate(0.000000, 1354.000000)">
                        <G id="Home" transform="translate(6.000000, 7.000000)">
                            <G id="Group-5" transform="translate(17.000000, 11.000000)">
                                <Path d="M8.84358047,0.490259711 C8.97254927,0.36785522 9.16536499,0.351717735 9.31117885,0.442372297 L9.37046967,0.487764072 L17.5558115,8.11040621 C17.7112613,8.25516961 17.7199243,8.49854047 17.5751609,8.65399024 C17.4464823,8.7921678 17.2398917,8.81436571 17.0863939,8.71592072 L17.0315769,8.67333961 L9.11076923,1.29692308 L1.34169495,8.67084397 C1.20474254,8.80082572 0.997176367,8.81024517 0.850039695,8.70252435 L0.797952019,8.65664478 C0.667970272,8.51969237 0.658550823,8.3121262 0.766271636,8.16498953 L0.812151207,8.11290185 L8.84358047,0.490259711 Z" id="Path-2" fill="#333333" fillRule="nonzero"></Path>
                                <Path d="M17.5805009,8.17029296 L17.5805009,19.1928363 C17.5805009,19.3816516 17.4444431,19.5386889 17.2650206,19.571255 L17.1958855,19.5774517 L1.12215179,19.5774517 C0.933336491,19.5774517 0.776299198,19.4413939 0.743733074,19.2619714 L0.737536406,19.1928363 L0.737536406,8.39187291 L1.50676717,8.39187291 L1.50615385,18.8076923 L16.8107692,18.8076923 L16.8112702,8.17029296 L17.5805009,8.17029296 Z" id="Path-4" fill="#333333" fillRule="nonzero"></Path>
                                <Path d="M9.20164468,9.86583148 C9.88611106,9.86583148 10.57456,10.0558634 11.0644013,10.4527201 C11.4594066,10.772743 11.7157787,11.2320531 11.7157787,11.829707 L11.7157787,11.829707 L11.7157787,17.5715265 L6.68751071,17.5715265 L6.68751071,11.829707 C6.68751071,11.2320531 6.94388275,10.772743 7.33888803,10.4527201 C7.82872936,10.0558634 8.5171783,9.86583148 9.20164468,9.86583148 Z" id="Rectangle" stroke="#333333" strokeWidth="0.769230769" fill="#FF7D01"></Path>
                            </G>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
      )
    }
}

export default HomeIcon;