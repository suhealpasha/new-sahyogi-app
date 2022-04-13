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
class ShareIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg style={{width:"18px",height:"21px"}} viewBox="0 0 18 21" version="1.1">
            <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <G id="Insta-Feed-Screen" transform="translate(-101.000000, -442.000000)" fill="#FF7D01" fillRule="nonzero">
                    <G id="Group-14" transform="translate(16.000000, 194.000000)">
                        <G id="Group-3" transform="translate(9.000000, 248.236364)">
                            <Path d="M90.3848116,0 C88.6838611,0 87.2939025,1.42005207 87.2939025,3.15789349 C87.2939025,3.57076175 87.3687849,3.97165633 87.511232,4.33386671 L81.635285,7.66447066 C81.086252,7.15626033 80.3619078,6.84210256 79.5666297,6.84210256 C77.8656793,6.84210256 76.4757206,8.26215463 76.4757206,10 C76.4757206,11.7378191 77.8656793,13.1578974 79.5666297,13.1578974 C80.3650502,13.1578974 81.0935491,12.8472923 81.6433343,12.3355293 L87.5192812,15.666107 C87.3744464,16.0309489 87.2939025,16.4255804 87.2939025,16.8421065 C87.2939025,18.5799216 88.6838611,20 90.3848116,20 C92.085762,20 93.4757206,18.5799216 93.4757206,16.8421065 C93.4757206,15.1042651 92.085762,13.684213 90.3848116,13.684213 C89.4587262,13.684213 88.6261564,14.1057392 88.0585805,14.7697389 L82.2872737,11.4967139 C82.5236484,11.0508983 82.6575388,10.5403985 82.6575388,10 C82.6575388,9.45692521 82.5258223,8.95065436 82.2872737,8.50328612 L88.0585805,5.23026109 C88.6261796,5.89497136 89.4581312,6.31578698 90.3848116,6.31578698 C92.085762,6.31578698 93.4757206,4.89570859 93.4757206,3.15789349 C93.4757206,1.42005207 92.085762,0 90.3848116,0 Z" id="Share"></Path>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
      )
    }
}

export default ShareIcon;