import React  , {Component, UseState, UseEffect} from 'react';
import Svg,{Path,LinearGeadient,Stop,Polygon,Polyline,Defs,G,Mask,Circle,Rect,Use,LinearGradient,Ellipse} from 'react-native-svg';
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
class CartEmptyIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {        
         
        };
      }
    render(){
        return(
            <Svg width="223px" height="256px" viewBox="0 0 223 256" >
            <Defs>
                <Polygon id="Path-1" points="0 0.184862119 107.362821 0.184862119 107.362821 98 0 98"></Polygon>
            </Defs>
            <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <G id="Category-Chasmeywala-Product-List_1_No-ItemsShopping-Bag" transform="translate(-69.000000, -182.000000)">
                    <G id="Group-4" transform="translate(69.000000, 182.000000)">
                        <Ellipse id="Oval" fill="#C9C9C9" fillRule="nonzero" cx="127.069552" cy="244.478844" rx="95.4666667" ry="10.6666667"></Ellipse>
                        <G id="Group" transform="translate(70.602886, 70.812178)">
                            <Polygon id="Fill-100" stroke="#000000" strokeWidth="2" fill="#BF8000" points="3.56300448 152.6287 108.877803 152.6287 108.877803 24 3.56300448 24"></Polygon>
                            <Polygon id="Fill-101" fill="#BF8000" points="56.2204036 155.6287 108.877803 155.6287 108.877803 27 56.2204036 27"></Polygon>
                            <Polygon id="Fill-102" stroke="#000000" strokeWidth="2" fill="#FFB51F" strokeLinejoin="round" points="0 174.430269 112.442152 174.430269 112.442152 37.094843 0 37.094843"></Polygon>
                            <Polygon id="Fill-103" fill="#E99C00" points="56.2204036 170.430269 109.220404 170.430269 109.220404 40.4302691 56.2204036 40.4302691"></Polygon>
                            <Polyline id="Fill-104" fill="#FFB51F" points="112.442152 36.094843 91.5349776 29.3226457 91.5349776 36.094843 112.442152 36.094843"></Polyline>
                            <Polyline id="Fill-105" fill="#E99C00" points="91.5349776 29.3226457 108.877803 24 108.877803 34.9399103 91.5349776 29.3226457"></Polyline>
                            <Polyline id="Fill-106" fill="#FFB51F" points="3.28626015e-13 36.094843 20.9058296 29.3226457 20.9058296 36.094843 3.28626015e-13 36.094843"></Polyline>
                            <Polyline id="Fill-107" fill="#E99C00" points="20.9058296 29.3226457 3.56300448 24 3.56300448 34.9399103 20.9058296 29.3226457"></Polyline>
                            <Path d="M79.2793722,0.580269058 L79.2793722,30.5567265 C79.2793722,43.290583 68.9556054,53.6163677 56.2204036,53.6163677 C43.4845291,53.6163677 33.1634529,43.290583 33.1634529,30.5567265 L33.1634529,0.580269058" id="Stroke-108" stroke="#000000" strokeWidth="3.26098655" strokeLinecap="round" strokeLinejoin="round" transform="translate(56.221413, 27.098318) scale(1, -1) translate(-56.221413, -27.098318) "></Path>
                        </G>
                        <G id="446965-PF0GDD-610" transform="translate(32.602886, 62.312178) scale(-1, 1) translate(-32.602886, -62.312178) translate(20.602886, 47.812178)">
                            <Path d="M11.9947059,13.6970588 C11.0023529,13.3464706 9.89470588,13.1470588 8.78823529,13.0970588 C6.82,10.4123529 1.91411765,2.80058824 7.76470588,0.635294118 C8.31058824,0.432941176 8.79882353,0.339411765 9.23294118,0.339411765 C14.0558824,0.339411765 12.3047059,11.8576471 11.9947059,13.6970588" id="Fill-325" fill="#33BDB0"></Path>
                            <Path d="M17.0835294,24.2141176 C15.3447059,27.9094118 7.56882353,25.0941176 7.23411765,22.12 C7,20.0329412 6.11,20.1558824 5.12470588,20.2782353 C3.97588235,20.4211765 2.69764706,20.5647059 2.17882353,17.2041176 C1.55470588,13.1676471 8.66176471,12.0817647 12.7776471,14.0170588 C16.8941176,15.9529412 18.8211765,20.5176471 17.0835294,24.2141176" id="Fill-326" fill="#161517"></Path>
                            <Path d="M3.77529412,18.8323529 C3.77529412,18.8323529 3.46,18.9370588 3.00117647,19.2129412 C2.54529412,19.4782353 1.97588235,19.9158824 1.52,20.4688235 C1.39941176,20.6017647 1.29941176,20.75 1.19823529,20.8947059 C1.08882353,21.0347059 1.01470588,21.1929412 0.927058824,21.3376471 C0.834705882,21.4811765 0.782941176,21.6370588 0.713529412,21.7770588 C0.643529412,21.9164706 0.600588235,22.0576471 0.557647059,22.1870588 C0.461764706,22.4435294 0.417058824,22.6676471 0.383529412,22.8241176 C0.348823529,22.9811765 0.328823529,23.0705882 0.328823529,23.0705882 C0.328823529,23.0705882 0.34,22.9794118 0.358823529,22.82 C0.376470588,22.66 0.398235294,22.4305882 0.468823529,22.1617647 C0.499411765,22.0264706 0.529411765,21.8782353 0.586470588,21.7288235 C0.641176471,21.58 0.680588235,21.4129412 0.759411765,21.2570588 C0.834117647,21.0994118 0.895882353,20.9264706 0.993529412,20.77 C1.08352941,20.6094118 1.17352941,20.4435294 1.28529412,20.2917647 C1.70470588,19.6641176 2.26294118,19.1352941 2.72529412,18.7994118 C3.17882353,18.4588235 3.54941176,18.2894118 3.54941176,18.2894118 L3.77529412,18.8323529" id="Fill-327" fill="#161517"></Path>
                            <Path d="M12.7741176,14.0511765 C12.7741176,14.0511765 15.8188235,0.423529412 22.2894118,4.44352941 C28.76,8.46294118 14.3482353,15.9141176 14.3482353,15.9141176 C14.3482353,15.9141176 11.9741176,16.7894118 12.7741176,14.0511765" id="Fill-328" fill="#4DDFD2"></Path>
                            <Path d="M7.29529412,21.3641176 C7.16823529,21.8317647 6.71,22.2429412 6.44882353,22.7729412 C6.23529412,23.2147059 6.17823529,23.6135294 6.16117647,24.0976471 C6.15823529,24.1852941 6.15470588,24.2788235 6.15470588,24.3752941 C6.15588235,24.6952941 6.18882353,25.0611765 6.44941176,25.3305882 C6.50588235,25.3888235 6.59882353,25.3894118 6.65705882,25.3329412 C6.71529412,25.2758824 6.71588235,25.1829412 6.65941176,25.1247059 C6.49117647,24.9570588 6.44764706,24.6776471 6.44882353,24.3752941 C6.44882353,24.2858824 6.45235294,24.1958824 6.45529412,24.1082353 C6.47294118,23.6376471 6.52294118,23.2988235 6.71352941,22.9005882 C6.92882353,22.4405882 7.40705882,22.0247059 7.57823529,21.4441176 C7.6,21.3664706 7.55470588,21.2847059 7.47647059,21.2629412 C7.39882353,21.2405882 7.31705882,21.2858824 7.29529412,21.3641176" id="Fill-329" fill="#151316"></Path>
                            <Path d="M8.08705882,23.0105882 C7.77882353,23.6935294 7.44647059,24.5858824 7.44529412,25.4505882 C7.44529412,25.9152941 7.54352941,26.3747059 7.80352941,26.7782353 C7.84764706,26.8464706 7.93823529,26.8658824 8.00647059,26.8217647 C8.07529412,26.7782353 8.09470588,26.6870588 8.05058824,26.6188235 C7.82823529,26.2735294 7.73941176,25.8747059 7.73941176,25.4505882 C7.73823529,24.6623529 8.05294118,23.7976471 8.35529412,23.1317647 C8.38882353,23.0576471 8.35588235,22.9705882 8.28176471,22.9370588 C8.20764706,22.9035294 8.12058824,22.9364706 8.08705882,23.0105882" id="Fill-330" fill="#151316"></Path>
                            <Path d="M9.35705882,23.9041176 C9.37294118,23.9494118 9.38294118,24.0176471 9.38294118,24.1 C9.38588235,24.4611765 9.20294118,25.0376471 9.2,25.4711765 L9.20117647,25.5329412 L9.20117647,25.5323529 C9.23235294,26.1511765 9.49823529,26.5523529 9.64941176,27.0370588 C9.67411765,27.1141176 9.75647059,27.1570588 9.83411765,27.1329412 C9.91117647,27.1082353 9.95411765,27.0252941 9.92941176,26.9482353 C9.75764706,26.4147059 9.51823529,26.05 9.49529412,25.5188235 L9.49529412,25.5182353 L9.49411765,25.4711765 C9.49117647,25.1123529 9.67352941,24.5352941 9.67705882,24.1 C9.67647059,23.9964706 9.66647059,23.8982353 9.63411765,23.8058824 C9.60647059,23.7294118 9.52294118,23.6894118 9.44588235,23.7164706 C9.36941176,23.7435294 9.32941176,23.8276471 9.35705882,23.9041176" id="Fill-331" fill="#151316"></Path>
                            <Path d="M8.07647059,26.4041176 C8.03823529,26.4041176 8,26.3894118 7.97117647,26.36 C7.92647059,26.3135294 7.88823529,26.2635294 7.85529412,26.2117647 C7.77470588,25.9729412 7.73941176,25.7164706 7.73941176,25.4505882 C7.73823529,24.88 7.90294118,24.27 8.10823529,23.7241176 C8.15823529,23.7747059 8.21,23.8252941 8.26294118,23.8747059 C8.25352941,23.8929412 8.24470588,23.9117647 8.23588235,23.93 C8.04529412,24.3282353 7.99529412,24.6670588 7.97764706,25.1376471 C7.97411765,25.2252941 7.97117647,25.3152941 7.97117647,25.4047059 C7.97,25.7070588 8.01294118,25.9864706 8.18176471,26.1541176 C8.23823529,26.2123529 8.23705882,26.3052941 8.17941176,26.3623529 C8.15058824,26.39 8.11352941,26.4041176 8.07647059,26.4041176" id="Fill-332" fill="#506B7A"></Path>
                            <Path d="M8.26294118,23.8747059 C8.21,23.8252941 8.15823529,23.7747059 8.10823529,23.7241176 C8.16294118,23.58 8.22,23.44 8.27764706,23.3064706 C8.50058824,22.9929412 8.73294118,22.7058824 8.81764706,22.3935294 C8.83588235,22.3288235 8.89470588,22.2864706 8.95882353,22.2864706 C8.97176471,22.2864706 8.98529412,22.2882353 8.99882353,22.2923529 C9.07705882,22.3141176 9.12235294,22.3958824 9.1,22.4741176 C8.93588235,23.0305882 8.48882353,23.4364706 8.26294118,23.8747059" id="Fill-333" fill="#151416"></Path>
                            <Path d="M7.85529412,26.2117647 C7.70058824,25.9652941 7.67764706,25.6694118 7.67705882,25.4047059 C7.67705882,25.3082353 7.68058824,25.2147059 7.68352941,25.1270588 C7.70058824,24.6429412 7.75764706,24.2441176 7.97117647,23.8023529 C8.05764706,23.6258824 8.16647059,23.4629412 8.27764706,23.3064706 C8.22,23.44 8.16294118,23.58 8.10823529,23.7241176 C7.90294118,24.27 7.73823529,24.88 7.73941176,25.4505882 C7.73941176,25.7164706 7.77470588,25.9729412 7.85529412,26.2117647" id="Fill-334" fill="#151316"></Path>
                            <Path d="M9.44941176,27.8747059 C9.40117647,27.8747059 9.35411765,27.8511765 9.32588235,27.8076471 C9.06588235,27.4041176 8.96705882,26.9447059 8.96764445,26.48 C8.96823529,25.9417647 9.09764706,25.3929412 9.26882353,24.8905882 C9.23235294,25.0917647 9.20117647,25.2935294 9.2,25.4711765 L9.20117647,25.5329412 L9.20117647,25.5323529 C9.21117647,25.7258824 9.24352941,25.8982353 9.28882353,26.0582353 C9.27117647,26.2 9.26117647,26.3411765 9.26176471,26.48 C9.26176471,26.9041176 9.35058824,27.3029412 9.57294118,27.6482353 C9.61705882,27.7164706 9.59705882,27.8076471 9.52882353,27.8511765 C9.50470588,27.8670588 9.47705882,27.8747059 9.44941176,27.8747059 M9.55588235,24.9617647 C9.56411765,24.9164706 9.57294118,24.87 9.58117647,24.8235294 C9.58764706,24.8270588 9.59411765,24.8305882 9.60058824,24.8341176 C9.58529412,24.8764706 9.57058824,24.9188235 9.55588235,24.9617647" id="Fill-335" fill="#506B7A"></Path>
                            <Path d="M9.60058824,24.8341176 C9.59411765,24.8305882 9.58764706,24.8270588 9.58117647,24.8235294 C9.62764706,24.5770588 9.67529412,24.3205882 9.67705882,24.1 C9.67647059,24.0564706 9.67470588,24.0141176 9.67058824,23.9729412 C9.69235294,23.96 9.71764706,23.9535294 9.74352941,23.9535294 C9.76411765,23.9535294 9.78470588,23.9576471 9.80411765,23.9664706 C9.87823529,24 9.91117647,24.0870588 9.87764706,24.1611765 C9.78294118,24.3688235 9.68764706,24.5958824 9.60058824,24.8341176" id="Fill-336" fill="#151416"></Path>
                            <Path d="M9.28882353,26.0582353 C9.24352941,25.8982353 9.21117647,25.7258824 9.20117647,25.5323529 L9.20117647,25.5329412 L9.2,25.4711765 C9.20117647,25.2935294 9.23235294,25.0917647 9.26882353,24.8905882 C9.37352941,24.5852941 9.49294118,24.2976471 9.60941176,24.04 C9.62294118,24.0105882 9.64470588,23.9876471 9.67058824,23.9729412 C9.67470588,24.0141176 9.67647059,24.0564706 9.67705882,24.1 C9.67529412,24.3205882 9.62764706,24.5770588 9.58117647,24.8235294 C9.57294118,24.87 9.56411765,24.9164706 9.55588235,24.9617647 C9.43352941,25.3158824 9.33411765,25.69 9.28882353,26.0582353" id="Fill-337" fill="#151316"></Path>
                            <Path d="M11.3117647,28.1688235 C11.2494118,28.1688235 11.1911765,28.1288235 11.1717647,28.0664706 C11.0205882,27.5817647 10.7547059,27.1805882 10.7235294,26.5617647 L10.7235294,26.5623529 L10.7223529,26.5005882 C10.7247059,26.1717647 10.83,25.7605882 10.88,25.4235294 C10.9735294,25.4582353 11.0670588,25.4917647 11.1617647,25.5235294 C11.1076471,25.8729412 11.0141176,26.2429412 11.0164706,26.5005882 L11.0176471,26.5476471 L11.0176471,26.5482353 C11.0405882,27.0794118 11.28,27.4441176 11.4517647,27.9776471 C11.4764706,28.0547059 11.4335294,28.1376471 11.3558824,28.1623529 C11.3411765,28.1670588 11.3264706,28.1688235 11.3117647,28.1688235" id="Fill-338" fill="#506B7A"></Path>
                            <Path d="M11.1617647,25.5235294 C11.0670588,25.4917647 10.9735294,25.4582353 10.88,25.4235294 C10.8952941,25.3164706 10.9058824,25.2164706 10.9047059,25.1294118 C10.9052941,25.0470588 10.8952941,24.9788235 10.8788235,24.9335294 C10.8517647,24.8570588 10.8917647,24.7729412 10.9682353,24.7458824 C10.9847059,24.74 11.0011765,24.7376471 11.0176471,24.7376471 C11.0782353,24.7376471 11.1347059,24.7752941 11.1564706,24.8352941 C11.1888235,24.9276471 11.1988235,25.0258824 11.1988235,25.1294118 C11.1982353,25.2523529 11.1829412,25.3858824 11.1617647,25.5235294" id="Fill-339" fill="#151416"></Path>
                        </G>
                        <G id="Group-7" transform="translate(71.500000, 73.000000) scale(-1, 1) rotate(120.000000) translate(-71.500000, -73.000000) translate(17.000000, 23.000000)">
                            <G id="Group-3" transform="translate(0.303848, 0.794229)">
                                <Mask id="Mask-2" fill="white">
                              
                                </Mask>
                                <G id="Clip-2"></G>
                                <Path d="M33.8742857,35.0216383 C33.8311071,33.9546535 33.7726071,32.8876687 33.6987857,31.8220732 L35.1013929,31.7234327 C35.178,32.8029212 35.2378929,33.8851884 35.2796786,34.9674555 L33.8742857,35.0216383 Z M35.3409643,41.463837 L33.9341786,41.4332723 C33.9495,40.6927737 33.9578571,39.9522752 33.9578571,39.2117766 L33.9536786,38.22815 L35.3590714,38.2156462 L35.3646429,39.2117766 C35.3646429,39.9620003 35.3562857,40.712224 35.3409643,41.463837 L35.3409643,41.463837 Z M35.0066786,47.9504933 L33.6040714,47.8351812 C33.6918214,46.770975 33.7628571,45.7039902 33.8171786,44.6370054 L35.2225714,44.7092491 C35.1668571,45.790127 35.0944286,46.8710048 35.0066786,47.9504933 L35.0066786,47.9504933 Z M34.2782143,54.4051957 L32.8853571,54.2065254 C33.0371786,53.1492657 33.1736786,52.0878381 33.2934643,51.0250212 L34.6918929,51.1834017 C34.5693214,52.2587224 34.4314286,53.334043 34.2782143,54.4051957 L34.2782143,54.4051957 Z M33.1569643,60.8057153 L31.7794286,60.5195188 C31.9967143,59.4747629 32.1972857,58.425839 32.3811429,57.3727472 L33.7670357,57.614486 C33.5803929,58.6800815 33.3770357,59.745677 33.1569643,60.8057153 L33.1569643,60.8057153 Z M31.6429286,67.1228767 L30.2848929,66.7561006 C30.56625,65.7252377 30.8322857,64.6888176 31.0802143,63.6496188 L32.448,63.9761051 C32.1958929,65.0291968 31.9270714,66.0767314 31.6429286,67.1228767 L31.6429286,67.1228767 Z M29.7347143,73.3372296 L28.4031429,72.8829275 C28.7485714,71.8715148 29.0786786,70.8559342 29.3920714,69.8347964 L30.7375714,70.2446408 C30.42,71.281061 30.0857143,72.3119239 29.7347143,73.3372296 L29.7347143,73.3372296 Z M13.30875,74.1249645 L13.0190357,72.752333 C13.8812143,72.5717236 14.7531429,72.4508542 15.6125357,72.3925035 C15.8590714,72.3772211 16.1042143,72.3633281 16.35075,72.3549923 L16.3953214,73.7581885 C16.1668929,73.765135 15.9384643,73.7762494 15.7086429,73.792921 C14.9133214,73.8457146 14.1054643,73.9582481 13.30875,74.1249645 L13.30875,74.1249645 Z M22.62975,74.406993 C21.5809286,74.163865 20.5376786,73.9846449 19.5278571,73.8748899 L19.6782857,72.4800296 C20.7452143,72.5953417 21.8455714,72.784287 22.9487143,73.0399187 L22.62975,74.406993 Z M7.56739286,76.4312077 L6.81525,75.2433535 C7.75125,74.654289 8.75828571,74.1430254 9.8085,73.7220666 L10.3322143,75.0266222 C9.36,75.4142378 8.43096429,75.8866009 7.56739286,76.4312077 L7.56739286,76.4312077 Z M34.2740357,79.4015378 C33.9021429,79.1806386 33.5260714,78.9611287 33.1486071,78.747176 C32.6012143,78.4345828 32.04825,78.1303254 31.4869286,77.8357932 L32.1429643,76.5951455 C32.7182143,76.8980136 33.2851071,77.2078282 33.8464286,77.5287572 C34.2308571,77.7482671 34.6138929,77.9705556 34.9941429,78.1956227 L34.2740357,79.4015378 Z M27.4365,79.4168201 L26.1355714,78.8791598 C26.5464643,77.8927546 26.93925,76.8994029 27.3181071,75.9018832 C26.7609643,75.680984 26.208,75.4739778 25.6661786,75.2864219 L26.1244286,73.9610267 C27.1245,74.3055739 28.1566071,74.7112504 29.1887143,75.1655525 L28.6204286,76.4492686 C28.6190357,76.4478793 28.61625,76.4478793 28.6148571,76.44649 C28.2373929,77.4426204 27.8446071,78.4331935 27.4365,79.4168201 L27.4365,79.4168201 Z M3.17710714,80.6755288 L1.99457143,79.91558 C2.59489286,78.9875255 3.32335714,78.1122645 4.15767857,77.3106366 L5.13128571,78.3234386 C4.37496429,79.0472655 3.71753571,79.8391683 3.17710714,80.6755288 L3.17710714,80.6755288 Z M39.7061786,82.8470096 C38.8105714,82.2551665 37.9107857,81.6674912 37.0054286,81.0895411 L37.7631429,79.9072441 C38.6740714,80.4879729 39.5794286,81.0812053 40.482,81.6772163 L39.7061786,82.8470096 Z M24.7468929,85.3366408 L23.4863571,84.7156223 C23.9585357,83.7583925 24.4167857,82.7928268 24.8583214,81.8189253 L26.13975,82.3982647 C25.69125,83.3846699 25.2274286,84.3655179 24.7468929,85.3366408 L24.7468929,85.3366408 Z M-1.8189894e-12,86.3758396 C0.00139285714,85.2185501 0.171321429,84.0987717 0.507,83.0484585 L1.872,83.4013415 C1.55582143,84.3877468 1.40817857,85.3630376 1.40817857,86.3744503 L-1.8189894e-12,86.3758396 Z M45.1438929,86.3786182 C44.226,85.8076146 43.3164643,85.2213287 42.4097143,84.6267069 L43.1799643,83.4527458 C44.0783571,84.040421 44.9809286,84.622539 45.8904643,85.1893747 L45.1438929,86.3786182 Z M104.507464,89.0113476 L103.854214,87.7693106 C104.790214,87.2802759 105.726214,86.7565086 106.638536,86.2091232 L107.362821,87.4122597 C106.426821,87.9721489 105.46575,88.5111985 104.507464,89.0113476 L104.507464,89.0113476 Z M50.8281429,89.5962442 C50.2501071,89.3086585 49.6776429,89.0099583 49.1093571,88.7029223 C48.7165714,88.4889696 48.3279643,88.2736277 47.9421429,88.0541178 L48.6399643,86.8356989 C49.0174286,87.0510409 49.3976786,87.2608257 49.7807143,87.4706104 C50.3336786,87.7706999 50.8922143,88.0610643 51.4563214,88.3403142 L50.8281429,89.5962442 Z M21.4123929,90.9994404 L20.2744286,90.1783623 C20.8608214,89.3683985 21.44025,88.4764659 21.9946071,87.5261826 L23.2091786,88.2319486 C22.6325357,89.2225217 22.0280357,90.1547441 21.4123929,90.9994404 L21.4123929,90.9994404 Z M98.5376786,91.6968706 L98.0348571,90.3867577 C99.0279643,90.0060887 100.011321,89.5976335 100.983536,89.1613924 L101.561571,90.4409406 C100.565679,90.8882962 99.55725,91.3078657 98.5376786,91.6968706 L98.5376786,91.6968706 Z M56.8536429,92.1595085 C55.8368571,91.7955111 54.8103214,91.3940025 53.8032857,90.9660971 L54.35625,89.6754345 C55.3368214,90.0936148 56.3368929,90.4840089 57.3286071,90.8396706 L56.8536429,92.1595085 Z M1.83160714,92.876389 C1.24660714,91.9066554 0.791142857,90.8549529 0.47775,89.7518462 L1.83160714,89.3697878 C2.11017857,90.3534145 2.5155,91.2898048 3.03642857,92.1539513 L1.83160714,92.876389 Z M92.30325,93.6863527 L91.9480714,92.3290035 C92.9801786,92.0622573 94.0039286,91.7663357 95.0193214,91.4426281 L95.4483214,92.7777484 C94.40925,93.1097919 93.3604286,93.41266 92.30325,93.6863527 L92.30325,93.6863527 Z M63.1284643,94.0170068 C62.0671071,93.7669323 61.0113214,93.486293 59.9652857,93.1764784 L60.3650357,91.8330223 C61.3873929,92.1331118 62.4167143,92.4081938 63.453,92.6527111 L63.1284643,94.0170068 Z M85.88775,94.9811832 L85.6843929,93.5932694 C86.7401786,93.4390567 87.7903929,93.257058 88.8350357,93.0472732 L89.1136071,94.4226833 C88.0438929,94.636636 86.9672143,94.824192 85.88775,94.9811832 L85.88775,94.9811832 Z M69.5718214,95.1687391 C68.4881786,95.035366 67.4087143,94.8728176 66.3348214,94.6810937 L66.58275,93.3001264 C67.6315714,93.4876823 68.6859643,93.6460629 69.7445357,93.7766574 L69.5718214,95.1687391 Z M79.3719643,95.5799729 L79.3190357,94.178166 C80.3845714,94.1364869 81.4473214,94.068411 82.5086786,93.9711598 L82.6382143,95.3674095 C81.5517857,95.4674393 80.4625714,95.5382938 79.3719643,95.5799729 L79.3719643,95.5799729 Z M76.09875,95.6160947 C75.0081429,95.5994231 73.9175357,95.5535761 72.8297143,95.479943 L72.9258214,94.0795255 C73.9885714,94.1517692 75.0541071,94.1976162 76.1210357,94.2128986 L76.09875,95.6160947 Z M16.7727857,95.7786432 L15.9537857,94.6380253 C16.7393571,94.0767469 17.5221429,93.3904311 18.2770714,92.5957497 L19.2980357,93.5627047 C18.4804286,94.4199047 17.6307857,95.1659605 16.7727857,95.7786432 L16.7727857,95.7786432 Z M6.93364286,97.368006 C5.88064286,96.9498258 4.8945,96.3301966 4.00167857,95.5271793 L4.94464286,94.485202 C5.71210714,95.177075 6.55757143,95.7091781 7.45457143,96.0648397 L6.93364286,97.368006 Z M10.3600714,98.0001389 L10.3517143,96.5969428 C11.3364643,96.5913855 12.3212143,96.4121654 13.2795,96.066229 L13.7600357,97.3860669 C12.6499286,97.7875756 11.5063929,97.9931924 10.3600714,98.0001389 L10.3600714,98.0001389 Z" id="Fill-1" fill="#727272" Mask="url(#Mask-2)"></Path>
                            </G>
                        </G>
                        <G id="Group-5" transform="translate(101.489401, 136.743706)">
                            <Path d="M1,4.57463017 C5.0927314,6.46049395 8.16023986,5.26895056 10.2025254,1" id="Path-31" stroke="#000000" strokeLinecap="round" transform="translate(5.601263, 3.220693) rotate(-10.000000) translate(-5.601263, -3.220693) "></Path>
                            <Path d="M40.0193345,4.90934202 C44.1120659,6.7952058 47.1795744,5.60366241 49.2218599,1.33471185" id="Path-31" stroke="#000000" strokeLinecap="round" transform="translate(44.620597, 3.555405) scale(-1, 1) rotate(-10.000000) translate(-44.620597, -3.555405) "></Path>
                            <Ellipse id="Oval" fill="#000000" transform="translate(9.050330, 12.650740) rotate(-10.000000) translate(-9.050330, -12.650740) " cx="9.05032962" cy="12.6507398" rx="4.26315789" ry="4.97368421"></Ellipse>
                            <Ellipse id="Oval" fill="#000000" transform="translate(43.871273, 13.725741) rotate(-10.000000) translate(-43.871273, -13.725741) " cx="43.8712732" cy="13.7257412" rx="4.26315789" ry="4.97368421"></Ellipse>
                            <Path d="M17.4230941,37.2069889 C22.0876431,33.4866643 25.846017,34.0851905 28.6982158,39.0025674" id="Path-32" stroke="#000000" strokeWidth="3" strokeLinecap="round" transform="translate(23.060655, 36.902999) rotate(-10.000000) translate(-23.060655, -36.902999) "></Path>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
      )
    }
}

export default CartEmptyIcon;