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
class SearchIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg style={{width:20,height:20,marginLeft:15}} viewBox="0 0 20 20" version="1.1" >           
            <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <G id="Profile-Screen_5.9.6" transform="translate(-281.000000, -42.000000)" fill="#FF7D01" fillRule="nonzero">
                    <G id="Top-Nav-Bar">
                        <Path d="M289.571429,42 C294.305298,42 298.142857,45.8375593 298.142857,50.5714286 C298.142857,52.7170395 297.354497,54.678519 296.051642,56.1820027 L296.13686,56.2524419 L300.536086,60.5755793 C300.817455,60.8520813 300.8214,61.3043248 300.544898,61.5856934 C300.296046,61.8389251 299.904844,61.8674438 299.623974,61.6690453 L299.534784,61.594505 L295.135557,57.2713677 C295.102145,57.238533 295.072644,57.2032202 295.047061,57.1660095 C293.563361,58.4000406 291.654142,59.1428571 289.571429,59.1428571 C284.837559,59.1428571 281,55.3052979 281,50.5714286 C281,45.8375593 284.837559,42 289.571429,42 Z M289.571429,43.4285714 C285.626538,43.4285714 282.428571,46.6265375 282.428571,50.5714286 C282.428571,54.5163196 285.626538,57.7142857 289.571429,57.7142857 C293.51632,57.7142857 296.714286,54.5163196 296.714286,50.5714286 C296.714286,46.6265375 293.51632,43.4285714 289.571429,43.4285714 Z" id="Search"></Path>
                    </G>
                </G>
            </G>
        </Svg>
      )
    }
}

export default SearchIcon;