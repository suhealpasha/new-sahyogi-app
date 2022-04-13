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
class ServiceRequestIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg width="38px" height="40px" viewBox="0 0 42 42" version="1.1">        
            <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <G id="Dashboard_2" transform="translate(-63.000000, -781.000000)" fillRule="nonzero">
                    <G id="Group-18" transform="translate(25.000000, 782.000000)">
                        <G id="noun_Request-Service_1219339" transform="translate(39.000000, 0.000000)">
                            <Path d="M33.8461538,0.123076923 L6.15384615,0.123076923 C2.75517077,0.123076923 0,2.87824769 0,6.27692308 L0,24.7384615 C0,28.1371369 2.75517077,30.8923077 6.15384615,30.8923077 L15.9897436,30.8923077 L24.574359,39.3538462 C24.8995313,39.6793716 25.3398972,39.8636251 25.8,39.8666736 C26.0378322,39.8674051 26.2721497,39.8092662 26.4820513,39.6974359 C26.9769856,39.4386003 27.256072,38.8968443 27.1794872,38.3435897 L26.9846154,30.8923077 L33.8461538,30.8923077 C37.2448292,30.8923077 40,28.1371369 40,24.7384615 L40,6.27692308 C40,2.87824769 37.2448292,0.123076923 33.8461538,0.123076923 Z" id="Shape" stroke="#333333" strokeWidth="1.5"></Path>
                            <Path d="M11.4358974,5.76410256 L14.1333333,8.07692308 C14.1333333,8.07692308 13.974359,8.61538462 14.1333333,8.76923077 L18.1076923,12.7435897 L17.3641026,13.4871795 L13.3897436,9.51282051 C13.2615385,9.38461538 12.6974359,9.51282051 12.6974359,9.51282051 L10.374359,6.82564103 L11.4358974,5.76410256 Z" id="Path" fill="#FF7D01"></Path>
                            <Path d="M28.7641026,23.2 L27.8358974,24.1282051 C27.6145501,24.3505506 27.313739,24.4755472 27,24.4755472 C26.686261,24.4755472 26.3854499,24.3505506 26.1641026,24.1282051 L20.4564103,18.4615385 L23.0769231,15.8410256 L28.7692308,21.5384615 C28.9947429,21.7602026 29.1217561,22.0632202 29.1217561,22.3794872 C29.1217561,22.6957541 28.9947429,22.9987718 28.7692308,23.2205128 L28.7641026,23.2 Z" id="Path" fill="#FF7D01"></Path>
                            <Path d="M25.2307692,14.0717949 C24.6192425,14.0614783 24.0166196,13.9234864 23.4615385,13.6666667 L13.0769231,24.0461538 C12.4538326,24.6692443 11.4436033,24.6692443 10.8205128,24.0461538 C10.1974223,23.4230634 10.1974223,22.4128341 10.8205128,21.7897436 L21.2051282,11.4153846 C20.9483084,10.8603035 20.8103165,10.2576806 20.8,9.64615385 C20.8195234,7.2072402 22.7918556,5.23490802 25.2307692,5.21538462 C25.842296,5.22570115 26.4449189,5.36369306 27,5.62051282 L24.5025641,8.11794872 C24.0994952,8.52101758 23.9420789,9.10850328 24.0896123,9.65910562 C24.2371457,10.209708 24.6672151,10.6397773 25.2178175,10.7873108 C25.7684198,10.9348442 26.3559055,10.7774279 26.7589744,10.374359 L29.2307692,7.87179487 C29.487589,8.42687598 29.6255809,9.02949886 29.6358974,9.64102564 C29.6166047,12.0700731 27.6596639,14.0384048 25.2307692,14.0717949 L25.2307692,14.0717949 Z" id="Path" fill="#FF7D01"></Path>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
      )
    }
}

export default ServiceRequestIcon;