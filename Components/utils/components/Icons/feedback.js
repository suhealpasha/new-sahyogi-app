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
class FeedbackIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg width="28px" height="28px" viewBox="0 0 12 20" version="1.1">
            <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <G id="Profile-Screen" transform="translate(-30.000000, -698.000000)" fillRule="nonzero">
                    <G id="Group-33" transform="translate(15.000000, 697.000000)">
                        <G id="Group-32" transform="translate(15.000000, 0.000000)">
                            <G id="Group-35" transform="translate(0.000000, 1.000000)">
                                <G id="noun_mobile-phone_3354582">
                                    <Path d="M9.48085106,0 L2.00851064,0 C0.929103785,0.00117263206 0.0543641214,0.875912295 0.0531914894,1.95531915 L0.0531914894,18.0446809 C0.0543641214,19.1240877 0.929103785,19.9988274 2.00851064,20 L9.48085106,20 C10.5602579,19.9988274 11.4349976,19.1240877 11.4361702,18.0446809 L11.4361702,1.95531915 C11.4349976,0.875912295 10.5602579,0.00117263206 9.48085106,0 Z M0.904255319,3.21914894 L10.5851064,3.21914894 L10.5851064,15.9574468 L0.904255319,15.9574468 L0.904255319,3.21914894 Z M2.00851064,0.85106383 L9.48085106,0.85106383 C10.0907144,0.85106383 10.5851064,1.34545578 10.5851064,1.95531915 L10.5851064,2.36808511 L0.904255319,2.36808511 L0.904255319,1.95531915 C0.904255319,1.34545578 1.39864727,0.85106383 2.00851064,0.85106383 Z M9.48085106,19.1489362 L2.00851064,19.1489362 C1.39864727,19.1489362 0.904255319,18.6545442 0.904255319,18.0446809 L0.904255319,16.8085106 L10.5851064,16.8085106 L10.5851064,18.0446809 C10.5851064,18.6545442 10.0907144,19.1489362 9.48085106,19.1489362 L9.48085106,19.1489362 Z" id="Shape" fill="#333333"></Path>
                                    <Circle id="Oval" fill="#FF7D01" cx="5.74468085" cy="18.0319149" r="1"></Circle>
                                </G>
                                <G id="Group" transform="translate(1.489362, 7.659574)" fill="#FF7D01">
                                    <Path d="M5.52310745,1.81242278 C5.50264954,1.74707585 5.44829218,1.69953966 5.38296603,1.68986736 L4.70994117,1.58713709 L4.41062677,0.952732578 C4.38171846,0.89055547 4.3212343,0.85106383 4.25491408,0.85106383 C4.18859387,0.85106383 4.1281097,0.89055547 4.09920139,0.952732578 L3.79988699,1.58713709 L3.12686214,1.68986736 C3.06194092,1.69969476 3.0079399,1.7469262 2.98741443,1.81183389 C2.96688896,1.87674158 2.98337021,1.94815887 3.02997424,1.9962559 L3.51787401,2.49188443 L3.40195456,3.18936893 C3.38934305,3.2583599 3.41635235,3.32869877 3.4711602,3.36959748 C3.52418505,3.40991713 3.59454826,3.41550169 3.65282501,3.38401577 L4.25491408,3.04879066 L4.85700316,3.37860891 C4.88142012,3.3923293 4.90885559,3.39916353 4.93658964,3.39843405 C4.98770108,3.39912075 5.03648806,3.37622876 5.06986352,3.33589885 C5.10323897,3.29556894 5.11778651,3.24192937 5.10960374,3.18936893 L4.9936843,2.49188443 L5.48158406,1.9962559 C5.5276043,1.94804245 5.54366145,1.87695395 5.52310745,1.81242278 Z" id="Path"></Path>
                                    <Path d="M8.50183085,0.961358949 C8.48137295,0.896012018 8.42701559,0.848475829 8.36168943,0.838803533 L7.68866457,0.736073257 L7.38935018,0.101668748 C7.36044187,0.0394916404 7.2999577,0 7.23363749,0 C7.16731727,0 7.10683311,0.0394916404 7.07792479,0.101668748 L6.7786104,0.736073257 L6.10558554,0.838803533 C6.04066432,0.848630928 5.98666331,0.895862373 5.96613783,0.960770064 C5.94561236,1.02567776 5.96209361,1.09709504 6.00869765,1.14519207 L6.49659741,1.6408206 L6.38067796,2.3383051 C6.36806645,2.40729607 6.39507575,2.47763494 6.44988361,2.51853365 C6.50290845,2.5588533 6.57327166,2.56443786 6.63154841,2.53295194 L7.23363749,2.19772683 L7.83572656,2.52754508 C7.86014353,2.54126547 7.887579,2.5480997 7.91531305,2.54737022 C7.96642448,2.54805692 8.01521147,2.52516493 8.04858692,2.48483502 C8.08196238,2.44450511 8.09650991,2.39086554 8.08832715,2.3383051 L7.9724077,1.6408206 L8.46030747,1.14519207 C8.50632771,1.09697862 8.52238485,1.02589012 8.50183085,0.961358949 Z" id="Path"></Path>
                                    <Path d="M2.4033766,0.839671376 L1.73059417,0.736834814 L1.43138759,0.101773937 C1.40248969,0.0395324992 1.34202731,0 1.27573099,0 C1.20943466,0 1.14897228,0.0395324992 1.12007438,0.101773937 L0.820867802,0.736834814 L0.148085374,0.839671376 C0.0831875401,0.849508938 0.029205973,0.89678925 0.00868789356,0.961764096 C-0.0118301859,1.02673894 0.00464513256,1.09823011 0.0512323769,1.14637691 L0.538956399,1.64251822 L0.423078706,2.34072436 C0.410471739,2.40978671 0.437471308,2.48019836 0.492259418,2.52113938 C0.543259552,2.5579495 0.609249638,2.56345651 0.665211199,2.53557258 L1.27573099,2.20000064 L1.87760318,2.53016013 C1.90201135,2.54389472 1.92943694,2.55073601 1.957161,2.55000578 C2.00825403,2.55069319 2.05702344,2.52777752 2.09038687,2.48740588 C2.12375031,2.44703424 2.1382926,2.39333918 2.13011278,2.34072436 L2.01423509,1.64251822 L2.50195911,1.14637691 C2.54854636,1.09823011 2.56502168,1.02673894 2.5445036,0.961764096 C2.52398552,0.89678925 2.47000395,0.849508938 2.40510612,0.839671376 L2.4033766,0.839671376 Z" id="Path"></Path>
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

export default FeedbackIcon;