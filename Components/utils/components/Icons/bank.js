import React  , {Component, UseState, UseEffect} from 'react';
import Svg,{Path,LinearGeadient,Stop,Polygon,Polyline,Defs,G,Mask,Circle,Rect,Use,LinearGradient,Line} from 'react-native-svg';
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
class BankIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg width="30px" height="25px" viewBox="0 0 20 20" version="1.1">
            <G id="Page-1" stroke="none" stroke-width="1" fill="none" fillRule="evenodd">
                <G id="Profile-Screen" transform="translate(-23.000000, -322.000000)">
                    <G id="Group-25" transform="translate(15.000000, 321.000000)">
                        <G id="Group-24" transform="translate(8.000000, 0.000000)">
                            <G id="Group-29" transform="translate(0.000000, 1.000000)">
                                <Rect id="Rectangle" fill="#FF7D01" x="3" y="6" width="1.7" height="9"></Rect>
                                <Rect id="Rectangle" fill="#FF7D01" x="7" y="6" width="1.7" height="9"></Rect>
                                <Rect id="Rectangle" fill="#FF7D01" x="11" y="6" width="1.7" height="9"></Rect>
                                <Rect id="Rectangle" fill="#FF7D01" x="15" y="6" width="1.7" height="9"></Rect>
                                <G id="noun_bank-account_1783866" transform="translate(0.400000, 0.000000)" fill="#333333" fillRule="nonzero">
                                    <Path d="M16.9767442,17.9069767 L1.62790698,17.9069767 C1.37209302,17.9069767 1.1627907,17.6976744 1.1627907,17.4418605 L1.1627907,15.3488372 C1.1627907,15.0930233 1.37209302,14.8837209 1.62790698,14.8837209 L16.9767442,14.8837209 C17.2325581,14.8837209 17.4418605,15.0930233 17.4418605,15.3488372 L17.4418605,17.4418605 C17.4418605,17.6976744 17.2325581,17.9069767 16.9767442,17.9069767 Z M2.09302326,16.9767442 L16.5116279,16.9767442 L16.5116279,15.8139535 L2.09302326,15.8139535 L2.09302326,16.9767442 Z" id="Shape"></Path>
                                    <Path d="M18.1395349,20 L0.465116279,20 C0.209302326,20 0,19.7906977 0,19.5348837 L0,17.4418605 C0,17.1860465 0.209302326,16.9767442 0.465116279,16.9767442 L18.1395349,16.9767442 C18.3953488,16.9767442 18.6046512,17.1860465 18.6046512,17.4418605 L18.6046512,19.5348837 C18.6046512,19.7906977 18.3953488,20 18.1395349,20 Z M0.930232558,19.0697674 L17.6744186,19.0697674 L17.6744186,17.9069767 L0.930232558,17.9069767 L0.930232558,19.0697674 Z" id="Shape"></Path>
                                    <Path d="M18.1302326,6.27906977 L0.455813953,6.27906977 C0.246511628,6.27906977 0.0604651163,6.13953488 0.0139534884,5.93023256 C-0.0325581395,5.72093023 0.0372093023,5.51162791 0.223255814,5.41860465 L9.06046512,0.0697674419 C9.2,-0.023255814 9.38604651,-0.023255814 9.54883721,0.0697674419 L18.3860465,5.41860465 C18.572093,5.53488372 18.6418605,5.74418605 18.5953488,5.93023256 C18.5255814,6.13953488 18.3395349,6.27906977 18.1302326,6.27906977 Z M2.13023256,5.34883721 L16.4790698,5.34883721 L9.29302326,1 L2.13023256,5.34883721 Z" id="Shape"></Path>
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

export default BankIcon;