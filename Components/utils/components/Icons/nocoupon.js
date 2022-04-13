import React  , {Component, UseState, UseEffect} from 'react';
import Svg,{Path,LinearGeadient,Stop,Polygon,PolyLine,Defs,G,Mask,Circle,Line,Rect,Use,LinearGradient,Ellipse} from 'react-native-svg';
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
class Nocoupon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg width="271px" height="257px" viewBox="0 0 271 257" version="1.1">
            <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <G id="Category-Chasmeywala-Product-List_1_No-Cuppon-Available" transform="translate(-45.000000, -254.000000)">
                    <G id="Group-7" transform="translate(45.000000, 254.000000)">
                        <G id="Group-8" transform="translate(183.925000, 64.000000)">
                            <Path d="M75.8103441,63.2274302 L17.5194252,76.0676655 C15.1376415,76.5924302 12.7792788,75.0970773 12.2510055,72.7275479 L0.105274975,18.1843714 C-0.421697104,15.8154891 1.0811492,13.4699008 3.46293288,12.9451361 L61.7538518,0.104900832 C64.1356355,-0.419863874 66.4946488,1.07548907 67.0222715,3.44437142 L79.168002,57.9875479 C79.6956247,60.3564302 78.1927784,62.7026655 75.8103441,63.2274302" id="Fill-1" fill="#F1F1F1"></Path>
                            <G id="Group-5" transform="translate(15.092101, 19.933587)" fill="#9E9E9E" fillRule="nonzero">
                                <G id="noun_Coupon_3320265" transform="translate(0.000000, 0.504918)">
                                    <Path d="M47.4849746,11.2153112 C47.6360389,11.2153112 47.7787819,11.2246133 47.9437151,11.2344438 C48.237585,11.2535914 48.5261479,11.1501099 48.7395765,10.9490401 C48.9532521,10.7490161 49.0745637,10.4706622 49.0745637,10.1794012 L49.0745637,4.22820404 C49.0720354,1.89406989 47.1629565,0.00250515682 44.8072104,0 L4.26735337,0 C1.91168027,0.0026795515 0.00270436171,1.89414224 0,4.22820404 L0,10.1794012 C0.00442317103,10.472117 0.130059007,10.7501691 0.347469248,10.9484058 C0.566484386,11.1482106 0.858233441,11.25093 1.15538592,11.2328583 C1.29706206,11.2246133 1.43873819,11.2153112 1.5898025,11.2153112 C3.74538494,11.2280708 5.49926781,12.9382197 5.54670591,15.0735474 C5.49232998,16.9009329 4.23546718,18.4769705 2.45372819,18.9519733 C2.02524802,19.0759465 1.57592591,19.1129776 1.13266227,19.0608495 C0.838554595,19.041377 0.549666691,19.1448918 0.336160762,19.3462533 C0.121777674,19.5457979 0,19.8242382 0,20.1156807 L0,26.0668779 C0.00270436171,28.4009397 1.91168027,30.2924024 4.26735337,30.295082 L44.8072104,30.295082 C47.1629565,30.2925768 49.0720354,28.4010121 49.0745637,26.0668779 L49.0745637,20.1156807 C49.0732283,19.8238074 48.9507752,19.5453301 48.7359492,19.3456191 C48.5222419,19.1423104 48.2312305,19.0388534 47.9358205,19.0611666 C47.4945336,19.112308 47.0473758,19.075177 46.6208355,18.9519733 C44.8390965,18.4769705 43.5822337,16.9009329 43.5278578,15.0735474 L43.5278578,15.0735474 C43.5746859,12.9378761 45.3290545,11.2273457 47.4849746,11.2153112 Z M41.3943945,15.0342251 C41.4143424,17.8208035 43.306418,20.2525457 46.0211657,20.9806656 C46.3215597,21.0692842 46.6293646,21.1310516 46.940887,21.1652267 L46.940887,26.0668779 C46.9395349,27.2339088 45.9850469,28.1796402 44.8072104,28.1809799 L13.9809165,28.1809799 L13.9809165,27.0068077 C13.9809165,26.4230145 13.5032767,25.9497567 12.9140781,25.9497567 C12.3248796,25.9497567 11.8472398,26.4230145 11.8472398,27.0068077 L11.8472398,28.1809799 L4.26735337,28.1809799 C3.08944379,28.1798146 2.13485283,27.2339812 2.13367668,26.0668779 L2.13367668,21.1652267 C2.44527769,21.1309949 2.75315458,21.0691567 3.05361139,20.9804542 C5.76835909,20.2523343 7.66043469,17.8205921 7.68038259,15.0340137 C7.60914104,11.9565789 5.22631762,9.4181985 2.13367668,9.12520426 L2.13367668,4.22820404 C2.13485283,3.06110078 3.08944379,2.11526738 4.26735337,2.11410202 L11.8472398,2.11410202 L11.8472398,3.28837999 C11.8472398,3.87217314 12.3248796,4.345431 12.9140781,4.345431 C13.5032767,4.345431 13.9809165,3.87217314 13.9809165,3.28837999 L13.9809165,2.11410202 L44.8072104,2.11410202 C45.9850469,2.1154418 46.9395349,3.06117314 46.940887,4.22820404 L46.940887,9.12530997 C43.8481038,9.41793408 41.4650952,11.9564663 41.3941811,15.0340137 L41.3943945,15.0342251 Z M13.9809165,20.7556194 L13.9809165,22.0418391 C13.9809165,22.6256322 13.5032767,23.0988901 12.9140781,23.0988901 C12.3248796,23.0988901 11.8472398,22.6256322 11.8472398,22.0418391 L11.8472398,20.7556194 C11.8472398,20.1718263 12.3248796,19.6985684 12.9140781,19.6985684 C13.5032767,19.6985684 13.9809165,20.1718263 13.9809165,20.7556194 Z M13.9809165,14.5044311 L13.9809165,15.7906508 C13.9809165,16.374444 13.5032767,16.8477018 12.9140781,16.8477018 C12.3248796,16.8477018 11.8472398,16.374444 11.8472398,15.7906508 L11.8472398,14.5044311 C11.8472398,13.920638 12.3248796,13.4473801 12.9140781,13.4473801 C13.5032767,13.4473801 13.9809165,13.920638 13.9809165,14.5044311 L13.9809165,14.5044311 Z M13.9809165,8.25324288 L13.9809165,9.53946255 C13.9809165,10.1232557 13.5032767,10.5965136 12.9140781,10.5965136 C12.3248796,10.5965136 11.8472398,10.1232557 11.8472398,9.53946255 L11.8472398,8.25324288 C11.8472398,7.66944973 12.3248796,7.19619187 12.9140781,7.19619187 C13.5032767,7.19619187 13.9809165,7.66944973 13.9809165,8.25324288 L13.9809165,8.25324288 Z M33.9075364,10.8030613 L23.6292957,20.9875364 C23.2106909,21.3881294 22.5452976,21.3824003 22.1337819,20.97466 C21.7222663,20.5669197 21.7164842,19.9076308 22.1207863,19.4928663 L32.3989203,9.3083912 C32.8172792,8.90626289 33.4839306,8.91126269 33.8960979,9.31961984 C34.3082652,9.72797698 34.3133584,10.388512 33.9075364,10.8030613 Z M25.953083,13.1056355 C27.1542649,11.9178131 27.3411058,10.0545905 26.3993054,8.65579815 C25.457505,7.2570058 23.6494765,6.71238835 22.0812852,7.35511667 C20.5130939,7.997845 19.621684,9.6488361 19.9523774,11.2980927 C20.2830708,12.9473492 21.7437265,14.1353089 23.4407854,14.1353089 C24.3828751,14.1353089 25.2864408,13.7647792 25.953083,13.1052127 L25.953083,13.1056355 Z M22.4369972,9.62222965 C22.9911718,9.07337028 23.8894578,9.0734952 24.4434769,9.62250869 C24.997496,10.1715222 24.997496,11.0615672 24.4434769,11.6105807 C23.8894578,12.1595942 22.9911718,12.1597191 22.4369972,11.6108597 C22.1696967,11.3476713 22.0193872,10.9897135 22.0193872,10.6163333 C22.0193872,10.2429531 22.1696967,9.88499527 22.4369972,9.62180683 L22.4369972,9.62222965 Z M30.0755597,17.1907149 C29.0594278,18.1973831 28.7553932,19.7114281 29.3052346,21.0268152 C29.8550759,22.3422023 31.150504,23.1998714 32.5874306,23.1998714 C34.0243572,23.1998714 35.3197854,22.3422023 35.8696267,21.0268152 C36.419468,19.7114281 36.1154335,18.1973831 35.0993015,17.1907149 C33.6937707,15.861006 31.4816532,15.8606336 30.0756664,17.1898692 L30.0755597,17.1907149 Z M33.5906854,20.6741208 C33.0292715,21.2052929 32.1455897,21.2052929 31.5841758,20.6741208 C31.1783422,20.2720548 31.0569188,19.6673494 31.2765276,19.1419898 C31.4961363,18.6166302 32.0135269,18.2740822 32.5874306,18.2740822 C33.1613344,18.2740822 33.6787249,18.6166302 33.8983337,19.1419898 C34.1179425,19.6673494 33.9965191,20.2720548 33.5906854,20.6741208 L33.5906854,20.6741208 Z" id="Shape"></Path>
                                </G>
                            </G>
                        </G>
                        <G id="undraw_friends_r511" transform="translate(0.925000, 0.000000)">
                            <Ellipse id="Oval" fill="#C9C9C9" fillRule="nonzero" cx="146.84389" cy="231.176722" rx="122.742857" ry="13.7066667"></Ellipse>
                            <Path d="M207.717185,214.725093 L209.834023,221.243693 C209.834023,221.243693 220.029223,231.770684 216.34189,234.623987 C212.654558,237.47729 204.381662,222.435892 204.381662,222.435892 L202.856976,215.076738 L207.717185,214.725093 Z" id="Path" fill="#EFB0B0" fillRule="nonzero"></Path>
                            <Path d="M188.158176,164.271056 L191.24389,163.243056 C191.24389,163.243056 196.04389,164.613722 196.729605,169.411056 C197.415319,174.208389 202.558176,198.537722 202.558176,198.537722 C202.558176,198.537722 204.615319,199.565722 203.24389,201.279056 C201.872462,202.992389 210.101033,218.412389 210.101033,218.412389 L203.586747,221.496389 C203.586747,221.496389 190.558176,207.789722 190.558176,206.419056 C190.558176,205.048389 190.901033,203.677722 190.901033,202.307056 C190.901033,200.936389 190.558176,200.936389 190.901033,199.908389 C191.129898,199.012598 191.245089,198.091588 191.24389,197.167056 L188.84389,191.684389 L188.158176,164.271056 Z" id="Path" fill="#FFB600" fillRule="nonzero"></Path>
                            <Ellipse id="Oval" fill="#FFB51F" fillRule="nonzero" cx="31.0003783" cy="124.558538" rx="31.0003783" ry="63.2181519"></Ellipse>
                            <Line x1="30.3067947" y1="175" x2="55.3067947" y2="132" id="Path-2" stroke="#000000" strokeWidth="0.5"></Line>
                            <Line x1="30.3067947" y1="131.468826" x2="48.8433247" y2="92.7188258" id="Path-2" stroke="#000000" strokeWidth="0.5"></Line>
                            <Line x1="6.06427206" y1="157" x2="29.5535441" y2="120.5" id="Path-2" stroke="#000000" strokeWidth="0.5" transform="translate(18.064272, 138.637409) scale(-1, 1) translate(-18.064272, -138.637409) "></Line>
                            <Path d="M30.7157657,125.214248 C32.2621371,97.6958395 35.3778171,79.108013 35.4091371,78.923463 L34.7331326,78.8090123 C34.7018263,78.9937336 31.5806229,97.6113413 30.0317383,125.165223 C28.6023874,150.595839 28.2575211,189.061176 34.732968,227.891937 L35.4093051,227.779497 C28.9448949,189.014666 29.2889246,150.607555 30.7157657,125.214248 Z" id="Path" fill="#000000" fillRule="nonzero"></Path>
                            <Ellipse id="Oval" fill="#4DDFD2" fillRule="nonzero" cx="104.422323" cy="86.509051" rx="42.4215669" ry="86.509051"></Ellipse>
                            <Path d="M103.907061,87.3952658 C106.023466,49.7323853 110.28792,24.2925652 110.330777,24.0399136 L109.654773,23.925463 C109.611915,24.178279 105.341938,49.6478837 103.223019,87.3462371 C101.26716,122.139785 100.795395,174.766559 109.654605,227.89194 L110.330945,227.779501 C101.482786,174.719709 101.953879,122.151497 103.907061,87.3952658 Z" id="Path" fill="#000000" fillRule="nonzero"></Path>
                            <Ellipse id="Oval" fill="#E6E6E6" fillRule="nonzero" cx="69.0827863" cy="174.406426" rx="15.849816" ry="32.3220642"></Ellipse>
                            <Path d="M69.0688286,175.798952 L69.1626411,175.97426 L83.4933326,168.308097 L83.1698949,167.703743 L69.0986949,175.231102 C69.8773646,160.907159 71.4699429,151.291493 71.5020446,151.102153 L70.82604,150.987702 C70.7909897,151.194464 68.8987646,162.613186 68.2271349,179.136021 L54.035088,171.544022 L53.7116366,172.148383 L68.042328,179.814522 L68.2134137,179.494882 C67.6760469,193.132111 67.97724,210.183982 70.8258789,227.266159 L71.5022194,227.15372 C68.3963794,208.52896 68.3279726,189.939181 69.0688286,175.798952 Z" id="Path" fill="#3F3D56" fillRule="nonzero"></Path>
                            <Path d="M192.353534,131.743066 C186.84239,122.355565 175.939025,121.918066 175.939025,121.918066 C175.939025,121.918066 165.314321,120.548393 158.49864,134.845669 C152.145881,148.171911 143.378263,161.038664 157.087125,164.158239 L159.563342,156.388763 L161.096853,164.736671 C163.048673,164.878191 165.006822,164.911927 166.962363,164.837727 C181.643448,164.359899 195.62496,164.977535 195.174775,159.666698 C194.576345,152.606703 197.656365,140.775718 192.353534,131.743066 Z" id="Path" fill="#000000" fillRule="nonzero"></Path>
                            <Path d="M153.939247,206.936078 C153.785436,207.917387 153.562108,208.886543 153.270946,209.836237 C152.943117,210.765549 152.436981,211.624978 152.137231,212.563864 C151.181763,215.556643 152.506323,218.893517 154.621855,221.203556 C156.45105,223.195593 158.819897,224.613604 161.440402,225.285193 C163.348886,225.769069 165.333261,225.838709 167.30005,225.905944 C172.746195,226.092118 178.332466,226.258678 183.493011,224.494263 C185.124338,223.922672 186.699235,223.201417 188.197557,222.339726 C188.671681,222.111776 189.088775,221.780704 189.418282,221.370764 C189.811882,220.805874 189.862231,220.073263 189.858952,219.382955 C189.847214,217.055504 189.379159,214.739924 189.490289,212.415143 C189.551842,211.12745 189.790903,209.84075 189.673227,208.557032 C189.34886,205.580344 187.190043,203.127403 184.277424,202.426088 C182.813493,202.109176 181.295095,202.281863 179.804664,202.426331 C175.936097,202.80107 172.05077,202.976203 168.164157,202.951032 C164.193144,202.92548 160.246653,202.314406 156.295406,202.250584 C155.126907,202.231713 155.150513,202.594865 154.778506,203.73491 C154.435769,204.784472 154.155525,205.853399 153.939247,206.936078 Z" id="Path" fill="#000000" fillRule="nonzero"></Path>
                            <Path d="M138.411134,205.044459 C137.34368,204.773943 136.243249,204.656014 135.142677,204.694192 C132.802695,204.841594 130.636021,205.977206 129.184162,207.817208 C127.746947,209.684081 127.160889,212.068676 127.569123,214.388598 C127.835463,215.631469 128.271244,216.831918 128.864263,217.95633 C129.731067,219.729651 130.770679,221.498901 132.37536,222.635286 C133.341289,223.25968 134.382453,223.759292 135.474,224.122196 L143.925531,227.331803 C145.168848,227.803974 146.41235,228.276213 147.667971,228.714035 C153.97264,230.911404 160.550299,232.229638 167.215203,232.631514 C169.244575,232.753338 171.304656,232.787235 173.284419,232.321489 C173.768317,232.257441 174.211224,232.016221 174.527386,231.644534 C174.6886,231.361195 174.783544,231.045056 174.805101,230.719821 L175.325163,227.049587 C175.441565,226.53841 175.426356,226.00608 175.280959,225.502375 C175.042721,224.885544 174.44555,224.497515 173.87616,224.167842 C168.319875,220.950757 161.832247,219.175915 157.155442,214.760522 C156.054446,213.721066 155.133089,212.073426 153.795391,211.367344 C152.278461,210.566659 150.491986,210.109678 148.924029,209.371855 C145.49629,207.758889 142.126152,205.905343 138.411134,205.044459 Z" id="Path" fill="#000000" fillRule="nonzero"></Path>
                            <Path d="M146.848762,209.992462 C149.836022,210.936094 162.448248,217.473582 164.610021,219.756122 C164.320255,219.861369 154.488795,214.307078 154.193794,214.217823 C151.512206,213.406509 148.81571,212.589869 146.269145,211.402543 C145.756845,211.163704 142.940945,210.040994 143.068471,209.389376 C143.212371,208.654082 146.318441,209.824943 146.848762,209.992462 Z" id="Path" fill="#000000" fillRule="nonzero" opacity="0.1"></Path>
                            <Path d="M184.116727,234.535003 C184.286441,234.547478 184.454864,234.49751 184.590281,234.39451 C184.710696,234.238323 184.763956,234.040657 184.738303,233.845157 L184.724386,228.844996 C183.298077,228.159929 181.702646,227.940356 180.136646,227.729328 L172.829945,226.744778 C172.997818,226.767394 171.687501,229.917306 171.888411,230.33783 C172.242521,231.079018 174.948696,231.735886 175.712441,232.085837 C178.367482,233.30239 181.126426,234.639818 184.116727,234.535003 Z" id="Path" fill="#EFB0B0" fillRule="nonzero"></Path>
                            <Path d="M161.192037,228.827691 C159.812465,229.049204 158.272683,229.245011 157.379253,230.327611 C156.246261,231.700495 156.728585,233.74712 157.269058,235.44785 C157.349128,235.791428 157.510268,236.11088 157.739026,236.37954 C158.107872,236.746365 158.673099,236.800105 159.19019,236.833114 C160.448338,236.913428 161.787264,236.976349 162.886557,236.354224 C163.384695,236.022347 163.864058,235.663147 164.322442,235.278274 C165.1321,234.734957 166.023299,234.324216 166.962442,234.061537 C168.686654,233.514718 170.462364,233.145812 172.261783,232.960594 C172.970817,232.928 173.67259,232.803293 174.349409,232.589616 C175.036931,232.364948 175.580469,231.832963 175.819601,231.150676 C176.074234,230.242003 175.550355,229.31558 175.047919,228.518681 C174.422033,227.525976 173.758961,226.480736 172.825735,225.749955 C171.46427,224.68383 170.790795,225.502248 169.419377,226.184484 C166.825995,227.475188 164.052163,228.366341 161.192037,228.827691 L161.192037,228.827691 Z" id="Path" fill="#EFB0B0" fillRule="nonzero"></Path>
                            <Path d="M157.586801,230.080398 L148.827031,227.470357 C147.776957,227.101642 146.678913,226.88714 145.56721,226.833552 C144.456295,226.834385 143.294002,227.201576 142.573522,228.054021 C141.894261,228.857695 141.699843,229.956089 141.530506,230.998025 L141.168267,233.226887 C140.926695,234.350814 140.858301,235.505024 140.96545,236.649592 C141.131139,237.785155 141.706176,238.919656 142.705663,239.469372 C143.917845,240.136071 145.403527,239.810435 146.756393,239.53157 C149.48849,238.968547 152.268215,238.668049 155.057578,238.634184 C156.106077,238.621543 157.205825,238.634783 158.132321,238.139774 C159.233637,237.551357 159.892512,236.307193 160.005802,235.05587 C160.178174,233.151921 159.548661,230.66495 157.586801,230.080398 Z" id="Path" fill="#FFFFFF" fillRule="nonzero"></Path>
                            <Path d="M187.560058,227.80591 C188.695632,227.605275 189.697838,226.954661 190.78596,226.570624 C192.317554,226.030078 193.977312,226.030085 195.600045,226.036064 C196.195749,226.038257 196.830113,226.051721 197.325987,226.384519 C198.040776,226.864252 198.223971,227.82426 198.345511,228.681197 L199.07881,233.851479 C199.216738,234.823967 199.353847,235.82245 199.138714,236.780594 C198.923582,237.738738 198.275743,238.662402 197.332611,238.909582 C196.187153,239.209778 195.064227,238.472137 193.982695,237.987575 C191.279496,236.776454 188.137183,237.086019 185.318609,236.180804 C184.795539,236.012815 184.235328,235.755948 184.021923,235.24605 C183.925494,234.958702 183.891112,234.654187 183.921045,234.352588 C183.969312,232.690709 183.621614,230.421379 184.117937,228.833091 C184.56431,227.404672 186.292467,227.80591 187.560058,227.80591 Z" id="Path" fill="#FFFFFF" fillRule="nonzero"></Path>
                            <Path d="M206.097638,202.96343 C207.847361,202.521009 209.662325,202.396003 211.456231,202.594354 C212.888791,202.753454 214.364763,203.155299 215.41069,204.154875 C216.683736,205.371493 217.092768,207.253024 217.126893,209.021061 C217.184391,212.538014 216.026692,215.967205 213.84901,218.730397 C213.318638,219.426685 212.68696,220.039697 211.974977,220.549053 C211.208425,221.032543 210.390708,221.429792 209.536745,221.733552 L190.609875,229.259266 C185.630637,231.239118 180.633823,233.224707 175.440209,234.529928 C175.152897,234.6692 174.821327,234.68595 174.521428,234.576341 C174.221529,234.466733 173.97899,234.240156 173.849352,233.948495 C172.18992,231.558495 170.798797,228.993171 169.701123,226.298879 C169.600871,226.124742 169.581364,225.915634 169.647679,225.725975 C169.716979,225.621863 169.813667,225.53887 169.927107,225.486125 L183.314222,217.732045 C184.296716,217.215276 185.211848,216.579632 186.038986,215.839445 C186.618249,215.273226 187.091953,214.608396 187.437895,213.876116 C187.715386,213.291828 187.741272,211.912979 188.095721,211.481119 C188.442761,211.058269 189.629914,211.02453 190.178205,210.858217 C190.951735,210.619339 191.709014,210.330759 192.44531,209.994282 C195.439906,208.643754 198.106567,206.681504 200.977275,205.100176 C202.58597,204.172733 204.306708,203.454662 206.097638,202.96343 L206.097638,202.96343 Z" id="Path" fill="#000000" fillRule="nonzero"></Path>
                            <Path d="M198.508337,208.754151 C196.208386,210.495555 193.230353,212.096306 190.950857,213.883597 C190.17289,214.493581 177.203979,221.843846 177.020606,222.820052 C179.147249,223.181277 192.694155,213.627484 194.632382,212.674168 C196.570608,211.720852 198.288775,210.376475 199.991335,209.042018 C200.425217,208.701942 202.264008,207.67962 201.01847,207.299671 C200.316802,207.085648 199.026346,208.406015 198.508337,208.754151 Z" id="Path" fill="#000000" fillRule="nonzero" opacity="0.1"></Path>
                            <Path d="M180.958176,153.305722 C180.958176,153.305722 178.901033,158.445722 182.672462,160.501722 C186.44389,162.557722 171.015319,179.005722 171.015319,179.005722 L164.158176,159.131056 C164.158176,159.131056 169.986747,157.075056 168.958176,151.592389 L180.958176,153.305722 Z" id="Path" fill="#E5A1A1" fillRule="nonzero"></Path>
                            <Ellipse id="Oval" fill="#EFB0B0" fillRule="nonzero" cx="175.028571" cy="142.021333" rx="13.0285714" ry="13.0213333"></Ellipse>
                            <Path d="M169.184414,144.072849 C169.166606,144.547506 169.552907,144.953671 170.048798,144.981068 C170.543318,145.00915 170.959072,144.647506 170.97688,144.173534 C170.994688,143.698876 170.607017,143.292027 170.113181,143.263945 C169.617976,143.236547 169.202222,143.598191 169.184414,144.072849" id="Fill-120" fill="#000000"></Path>
                            <Path d="M169.089209,142.341342 C169.200167,142.45915 169.882359,141.95641 170.848798,141.96189 C171.814551,141.952301 172.523455,142.450931 172.628935,142.333123 C172.680304,142.281068 172.567291,142.068739 172.259072,141.843397 C171.954962,141.618739 171.436469,141.399561 170.835099,141.400925 C170.232359,141.402986 169.724825,141.623534 169.433729,141.850246 C169.135784,142.077643 169.034414,142.289287 169.089209,142.341342" id="Fill-121" fill="#000000"></Path>
                            <Path d="M178.811126,144.359835 C178.793318,144.834493 179.180304,145.240657 179.67551,145.268739 C180.169345,145.296136 180.585784,144.935178 180.602907,144.46052 C180.6214,143.985863 180.233729,143.579013 179.739209,143.551616 C179.244688,143.523534 178.82825,143.885863 178.811126,144.359835" id="Fill-122" fill="#000000"></Path>
                            <Path d="M178.593318,142.996821 C178.704277,143.11463 179.387154,142.61189 180.352907,142.616684 C181.318661,142.60778 182.027565,143.10641 182.133044,142.988602 C182.184414,142.935863 182.072085,142.724219 181.762496,142.498876 C181.458387,142.274219 180.940578,142.055041 180.338524,142.056404 C179.736469,142.058465 179.228935,142.279013 178.937839,142.505041 C178.639893,142.732438 178.538524,142.944767 178.593318,142.996821" id="Fill-123" fill="#000000"></Path>
                            <Path d="M174.014209,149.940417 C174.125167,150.058226 174.808044,149.555486 175.773798,149.56028 C176.739551,149.551376 177.448455,150.050006 177.553935,149.932198 C177.605304,149.879458 177.492976,149.667815 177.183387,149.442472 C176.879277,149.217815 176.361469,148.998637 175.759414,149 C175.157359,149.002061 174.649825,149.222609 174.358729,149.448637 C174.060784,149.676034 173.959414,149.888363 174.014209,149.940417" id="Fill-123" fill="#000000"></Path>
                            <Path d="M175.390675,147.993338 C175.395469,147.952718 174.794784,147.874526 173.820812,147.780593 C173.574236,147.761299 173.340675,147.724741 173.298894,147.599328 C173.24136,147.467315 173.345469,147.27031 173.466017,147.057565 C173.698894,146.614812 173.943414,146.150734 174.200264,145.664823 C175.219442,143.682589 175.958483,142.051715 175.850949,142.022266 C175.742729,141.992309 174.828346,143.575455 173.808483,145.557689 C173.562592,146.046647 173.327661,146.512756 173.104373,146.958555 C173.011223,147.166223 172.848894,147.402324 172.974921,147.677013 C173.040675,147.813596 173.221496,147.913114 173.379716,147.945102 C173.537935,147.981152 173.676291,147.983183 173.798894,147.989276 C174.779031,148.029895 175.386565,148.033957 175.390675,147.993338" id="Fill-124" fill="#000000" transform="translate(174.395079, 145.021848) rotate(-17.000000) translate(-174.395079, -145.021848) "></Path>
                            <Path d="M178.161811,141.302986 C178.256332,141.566 179.222085,141.444082 180.356332,141.583123 C181.493318,141.699561 182.407017,142.033808 182.558387,141.798191 C182.62551,141.685178 182.466606,141.437917 182.097428,141.182438 C181.731674,140.927643 181.146743,140.684493 180.465921,140.607095 C179.785099,140.531068 179.161811,140.637917 178.747428,140.805041 C178.330989,140.972164 178.120715,141.178328 178.161811,141.302986" id="Fill-127" fill="#000000"></Path>
                            <Path d="M169.450852,139.997506 C169.62003,140.218054 170.287154,139.991342 171.088524,139.982438 C171.888524,139.945452 172.566606,140.133123 172.723455,139.904356 C172.791948,139.792712 172.685784,139.572164 172.389893,139.363945 C172.098113,139.155726 171.609756,138.985863 171.059756,139.000931 C170.509756,139.017369 170.032359,139.215315 169.752907,139.439287 C169.469345,139.66463 169.376195,139.890657 169.450852,139.997506" id="Fill-128" fill="#000000"></Path>
                            <Path d="M172.386747,167.355056 L180.690062,158.193609 L191.929605,163.928389 L190.215319,204.363056 L187.472462,207.447056 C187.472462,207.447056 175.815319,217.727056 157.986747,209.160389 C157.986747,209.160389 151.815319,204.020389 152.158176,196.139056 C152.501033,188.257722 151.472462,187.229722 151.472462,187.229722 L151.129605,159.473722 L168.056842,156.153968 L172.386747,167.355056 Z" id="Path" fill="#FFB600" fillRule="nonzero"></Path>
                            <Path d="M134.313453,210.95576 L132.196615,217.474359 C132.196615,217.474359 122.001394,228.001336 125.688747,230.854653 C129.376101,233.70797 137.648976,218.666558 137.648976,218.666558 L139.173662,211.307405 L134.313453,210.95576 Z" id="Path" fill="#EFB0B0" fillRule="nonzero"></Path>
                            <Path d="M153.872462,160.501722 L150.786747,159.473722 C150.786747,159.473722 145.986747,160.844389 145.301033,165.641722 C144.615319,170.439056 139.472462,194.768389 139.472462,194.768389 C139.472462,194.768389 137.415319,195.796389 138.786747,197.509722 C140.158176,199.223056 131.929605,214.643056 131.929605,214.643056 L138.44389,217.727056 C138.44389,217.727056 151.472462,204.020389 151.472462,202.649722 C151.472462,201.279056 151.129605,199.908389 151.129605,198.537722 C151.129605,197.167056 151.472462,197.167056 151.129605,196.139056 C150.900739,195.243265 150.785549,194.322255 150.786747,193.397722 L153.186747,187.915056 L153.872462,160.501722 Z" id="Path" fill="#FFB600" fillRule="nonzero"></Path>
                            <Polygon id="Path" fill="#000000" fillRule="nonzero" points="189.917143 130.838015 179.144914 125.150091 164.269371 127.476797 161.191543 141.18038 168.853029 140.883288 170.993143 135.848829 170.993143 140.80002 174.528343 140.662953 176.580343 132.64798 177.862629 141.18038 190.430057 140.921667"></Polygon>
                            <Path d="M113.55588,218.991496 L113.55588,238.756509 L53.1513086,238.756509 C53.1513086,227.840836 62.0055677,218.99208 72.9273086,218.991496 C78.5913086,217.226762 85.1399006,216.664789 92.24388,216.849829 C98.946744,217.021162 106.143312,217.860699 113.55588,218.991496 Z" id="Path" fill="#4DDFD2" fillRule="nonzero"></Path>
                            <Path d="M104.926971,234.444847 L133.331818,234.444847 C134.3247,234.444847 135.12959,235.24929 135.12959,236.24162 L135.12959,236.24162 C135.12959,237.23395 134.3247,238.038393 133.331818,238.038393 L104.926971,238.038393 L104.926971,234.444847 Z" id="Path" fill="#2C9F95" fillRule="nonzero"></Path>
                            <Path d="M109.846546,202.076756 L117.460145,192.852759 C117.819383,192.103724 118.604941,191.655063 119.433006,191.725984 C120.261072,191.796905 120.958799,192.372605 121.185288,193.171806 L124.187736,203.766528 L109.846546,202.076756 Z" id="Path" fill="#2C9F95" fillRule="nonzero"></Path>
                            <Path d="M100.612317,206.774507 L103.488758,195.16762 C103.488765,194.336987 104.003108,193.59305 104.780489,193.29928 C105.557869,193.00551 106.436023,193.223228 106.985901,193.84606 L114.275386,202.102891 L100.612317,206.774507 Z" id="Path" fill="#4DDFD2" fillRule="nonzero"></Path>
                            <Path d="M53.1510583,238.757112 L58.9039371,238.757112 L58.9039371,250.975197 C58.9039371,252.500107 58.2978324,253.96256 57.2189589,255.040834 C56.1400855,256.119108 54.6768191,256.724876 53.1510583,256.724876 L53.1510583,256.724876 L53.1510583,238.757112 L53.1510583,238.757112 Z" id="Path" fill="#4DDFD2" fillRule="nonzero"></Path>
                            <Path d="M103.848312,235.163567 L132.253159,235.163567 C133.246041,235.163567 134.05093,235.968009 134.05093,236.960339 L134.05093,236.960339 C134.05093,237.952671 133.246039,238.757115 132.253155,238.757115 L103.848312,238.757115 L103.848312,235.163567 Z" id="Path" fill="#4DDFD2" fillRule="nonzero"></Path>
                            <Path d="M113.55588,218.991496 L113.55588,238.646856 C107.643516,239.274669 101.769154,237.161183 97.6136974,232.911156 C93.4582411,228.661128 91.4795753,222.742864 92.24388,216.849829 C98.946744,217.021162 106.143312,217.860699 113.55588,218.991496 Z" id="Path" fill="#000000" fillRule="nonzero" opacity="0.2"></Path>
                            <Ellipse id="Oval" fill="#4DDFD2" fillRule="nonzero" cx="113.556295" cy="219.351926" rx="19.4159691" ry="19.4051825"></Ellipse>
                            <Ellipse id="Oval" fill="#000000" fillRule="nonzero" cx="132.253155" cy="220.789348" rx="2.15732914" ry="5.03097375"></Ellipse>
                            <Ellipse id="Oval" fill="#000000" fillRule="nonzero" cx="127.039608" cy="215.578697" rx="1" ry="1.25774429"></Ellipse>
                            <Ellipse id="Oval" fill="#000000" fillRule="nonzero" cx="130.994712" cy="213.063211" rx="1" ry="1.25774429"></Ellipse>
                            <Path d="M111.927339,199.730761 C111.927339,199.730761 110.8482,197.854596 110.8482,196.710072" id="Path" fill="#3F3D56" fillRule="nonzero"></Path>
                            <Path d="M112.402059,198.517303 C112.402059,198.517303 112.990059,196.434544 113.80896,195.634482" id="Path" fill="#3F3D56" fillRule="nonzero"></Path>
                            <Polygon id="Rectangle" fill="#3F3D56" fillRule="nonzero" transform="translate(44.854774, 119.536978) rotate(-28.156900) translate(-44.854774, -119.536978) " points="28.9609974 119.533304 60.7485513 119.540652 60.7485513 119.540652 28.9609974 119.533304"></Polygon>
                            <Polygon id="Rectangle" fill="#3F3D56" fillRule="nonzero" transform="translate(15.267104, 127.048046) rotate(-61.858400) translate(-15.267104, -127.048046) " points="15.2634309 111.154267 15.2634311 111.154267 15.2707766 142.941825 15.2707765 142.941825"></Polygon>
                            <Polygon id="Rectangle" fill="#3F3D56" fillRule="nonzero" transform="translate(123.380944, 79.637409) rotate(-28.157100) translate(-123.380944, -79.637409) " points="101.631523 79.6323812 145.130365 79.6424366 145.130365 79.6424368 101.631523 79.6323814"></Polygon>
                            <Polygon id="Rectangle" fill="#3F3D56" fillRule="nonzero" transform="translate(82.892661, 89.915728) rotate(-61.858400) translate(-82.892661, -89.915728) " points="82.8876346 68.1663039 82.8876348 68.1663039 82.8976866 111.665151 82.8976864 111.665151"></Polygon>
                            <Line x1="102.306795" y1="137" x2="143.064272" y2="85.637409" id="Path-2" stroke="#000000" strokeWidth="0.8"></Line>
                            <Line x1="104.306795" y1="85" x2="133.575" y2="38.5" id="Path-2" stroke="#000000" strokeWidth="0.8"></Line>
                            <Line x1="65.0642721" y1="117" x2="101.553544" y2="69.5" id="Path-2" stroke="#000000" strokeWidth="0.8" transform="translate(83.564272, 93.137409) scale(-1, 1) translate(-83.564272, -93.137409) "></Line>
                        </G>
                        <G id="Group-4" transform="translate(157.925000, 76.000000)" fill="#000000" fillRule="nonzero">
                            <G id="Group-3">
                                <Path d="M16.9172932,0.679117148 L16.9172932,5.43293718 C16.9172932,5.80800323 17.2202584,6.11205433 17.593985,6.11205433 C17.9677115,6.11205433 18.2706767,5.80800323 18.2706767,5.43293718 L18.2706767,0.679117148 C18.2706767,0.304051104 17.9677115,0 17.593985,0 C17.2202584,0 16.9172932,0.304051104 16.9172932,0.679117148 Z" id="Path"></Path>
                                <Path d="M26.6887218,9.50764007 L30.0315789,6.11205433 C30.2011535,5.84359273 30.1624977,5.4930036 29.938541,5.26824412 C29.7145842,5.04348464 29.3652472,5.00469035 29.0977444,5.17487267 L25.7481203,8.5704584 C25.4892318,8.82364 25.4743331,9.23631973 25.7142857,9.50764007 C25.8419902,9.63476164 26.0148702,9.70562768 26.1947368,9.70458404 C26.3792724,9.70930279 26.557719,9.63815896 26.6887218,9.50764007 Z" id="Path"></Path>
                                <Path d="M35.1879699,17.6570458 C35.1879699,17.2819798 34.8850047,16.9779287 34.5112782,16.9779287 L29.7744361,16.9779287 C29.4007096,16.9779287 29.0977444,17.2819798 29.0977444,17.6570458 C29.0977444,18.0321119 29.4007096,18.336163 29.7744361,18.336163 L34.5112782,18.336163 C34.8850047,18.336163 35.1879699,18.0321119 35.1879699,17.6570458 Z" id="Path"></Path>
                                <Path d="M29.0977444,30.139219 C29.2243341,30.2688324 29.3973524,30.3422007 29.5781955,30.3429542 C29.8518794,30.3418025 30.0979255,30.175316 30.2016099,29.9211221 C30.3052942,29.6669283 30.2461994,29.3750826 30.0518797,29.1816638 L26.6887218,25.8064516 C26.5611768,25.673649 26.3852931,25.5986242 26.2015038,25.5986242 C26.0177144,25.5986242 25.8418308,25.673649 25.7142857,25.8064516 C25.4519164,26.0713327 25.4519164,26.4991257 25.7142857,26.7640068 L29.0977444,30.139219 Z" id="Path"></Path>
                                <Path d="M5.63007519,30.3429542 C5.81091828,30.3422007 5.98393662,30.2688324 6.11052632,30.139219 L9.49398496,26.7436333 C9.73757887,26.4758857 9.72864213,26.0633223 9.47368421,25.8064516 C9.34662411,25.6778861 9.1736645,25.6055699 8.99323308,25.6055699 C8.81280167,25.6055699 8.63984206,25.6778861 8.51278195,25.8064516 L5.15639098,29.2020374 C4.96207125,29.3954561 4.90297649,29.6873018 5.00666081,29.9414957 C5.11034513,30.1956895 5.35639123,30.362176 5.63007519,30.3633277 L5.63007519,30.3429542 Z" id="Path"></Path>
                                <Path d="M0.676691729,18.336163 L5.41353383,18.336163 C5.78726036,18.336163 6.09022556,18.0321119 6.09022556,17.6570458 C6.09022556,17.2819798 5.78726036,16.9779287 5.41353383,16.9779287 L0.676691729,16.9779287 C0.302965207,16.9779287 0,17.2819798 0,17.6570458 C0,18.0321119 0.302965207,18.336163 0.676691729,18.336163 Z" id="Path"></Path>
                                <Path d="M5.15639098,5.17487267 C4.89402163,5.43975379 4.89402163,5.86754672 5.15639098,6.13242784 L8.49924812,9.52801358 C8.62695259,9.65513515 8.79983257,9.72600119 8.97969925,9.72496892 C9.16725455,9.72435204 9.34614691,9.6456524 9.47368421,9.50764007 C9.73605356,9.24275894 9.73605356,8.81496601 9.47368421,8.55008489 L6.09022556,5.15449915 C5.82343423,4.91003215 5.41234423,4.91900092 5.15639098,5.17487267 Z" id="Path"></Path>
                            </G>
                            <G id="Group" transform="translate(7.443609, 11.544992)">
                                <Path d="M8.36601504,19.7052632 C7.44992481,19.7052632 6.77353383,19.0258442 6.65413534,18.107376 L6.35609023,14.6628938 C6.19729323,13.5844558 6.83428571,12.7852103 7.90917293,12.6650821 C11.6511278,12.3056027 13.7218045,10.8673835 13.7218045,8.35042445 L13.7218045,8.26983588 C13.7218045,6.03297491 12.0093233,4.4743256 9.14406015,4.4743256 C7.03338346,4.4743256 5.32150376,5.23312583 3.72932331,6.67194869 C3.33082707,6.99158649 2.81263158,7.23123939 2.25533835,7.23123939 C1.02285714,7.23123939 0.0270676692,6.23218261 0.0270676692,5.0336163 C0.0270676692,4.43448406 0.26556391,3.79490662 0.822857143,3.31560083 C2.93353383,1.31899642 5.60150376,0 9.26315789,0 C14.8360902,0 18.6192481,3.11669496 18.6192481,8.11077155 L18.6192481,8.19105829 C18.6192481,13.2246746 14.9960902,15.5022826 10.5771429,16.2616865 L10.3169925,18.1076778 C10.157594,18.9863045 9.52120301,19.705565 8.60451128,19.705565 L8.36601504,19.705565 L8.36601504,19.7052632 Z" id="Path"></Path>
                                <Path d="M10.6210526,24.892209 C10.6210526,26.1469157 9.6075188,27.1646859 8.35819549,27.1646859 C7.10676692,27.1646859 6.09383459,26.1472175 6.09383459,24.892209 C6.09383459,23.6372005 7.10676692,22.6206376 8.35819549,22.6206376 C9.6075188,22.6209394 10.6210526,23.6375024 10.6210526,24.892209 Z" id="Path"></Path>
                            </G>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
      )
    }
}

export default Nocoupon;