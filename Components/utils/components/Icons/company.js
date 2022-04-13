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
class CompanyIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg width="25px" height="25px" viewBox="0 0 20 21" version="1.1" >
    <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <G id="Profile-Screen" transform="translate(-23.000000, -268.000000)">
            <G id="Group-22" transform="translate(15.000000, 268.000000)">
                <G id="Group-18" transform="translate(8.000000, 0.000000)">
                    <G id="noun_company_1716823" transform="translate(0.000000, 1.000000)">
                        <G id="Group" transform="translate(0.785913, 0.000000)">
                            <Polyline id="Path" stroke="#333333" strokeWidth="0.526315789" strokeLinecap="round" strokeLinejoin="round" points="1.89033469 18.230077 1.89033469 7.53544378 4.3244643 5.85226905 6.34427397 6.81038389 6.34427397 18.230077"></Polyline>
                            <Polyline id="Path" stroke="#333333" strokeWidth="0.526315789" strokeLinecap="round" strokeLinejoin="round" points="6.34427397 6.81038389 6.34427397 3.44403444 10.5910533 0 12.610863 2.04570467 12.610863 8.54534861 14.7083576 7.19880883 16.4692173 8.10513368 16.4692173 18.230077"></Polyline>
                            <Line x1="9.93157247" y1="0.569689907" x2="9.93157247" y2="18.230077" id="Path" stroke="#333333" strokeWidth="0.526315789" strokeLinecap="round" strokeLinejoin="round"></Line>
                            <Line x1="4.36414838" y1="5.85226905" x2="4.36414838" y2="18.230077" id="Path" stroke="#333333" strokeWidth="0.526315789" strokeLinecap="round" strokeLinejoin="round"></Line>
                            <Line x1="12.650547" y1="8.54534861" x2="12.650547" y2="18.230077" id="Path" stroke="#333333" strokeWidth="0.526315789" strokeLinecap="round" strokeLinejoin="round"></Line>
                            <Line x1="14.7480417" y1="7.19880883" x2="14.7480417" y2="18.230077" id="Path" stroke="#333333" strokeWidth="0.526315789" strokeLinecap="round" strokeLinejoin="round"></Line>
                            <Polygon id="Path" stroke="#333333" strokeWidth="0.526315789" strokeLinecap="round" strokeLinejoin="round" points="0.0258949958 18.230077 18.359552 18.230077 18.359552 19.0587169 0 19.0587169"></Polygon>
                            <Polygon id="Path" fill="#FF7D01" points="4.3244643 18.230077 4.3244643 5.85226905 1.89033469 7.53544378 1.89033469 18.230077"></Polygon>
                            <Polygon id="Path" fill="#FF7D01" points="6.34427397 6.81038389 6.34427397 18.230077 9.89188839 18.230077 9.89188839 0.569689907 6.34427397 3.44403444"></Polygon>
                            <Polygon id="Path" fill="#FF7D01" points="12.610863 8.54534861 12.610863 18.230077 14.7083576 18.230077 14.7083576 7.19880883"></Polygon>
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

export default CompanyIcon;