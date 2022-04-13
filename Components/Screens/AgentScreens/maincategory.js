import React, {Component} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Alert,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  Switch,
  TextInput,
  ImageBackground,
} from 'react-native';
import Bottomnavigation from '../../BottomNavigation/bottomNavigation';
import {
  ScrollView,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import OfferIcon from '../../utils/components/Icons/offer';
import Subcategories from '../../utils/components/Subcategories';
import Listing from './Listing/Listing';
import Category from '../../utils/components/Category';
import Button from '../../utils/components/button';
import FilledLikeIcon from '../../utils/components/Icons/filledLike';
import LikeIcon from '../../utils/components/Icons/like';
import Shade from '../../utils/components/Icons/shade';
import TailButton from '../../utils/components/tailButton';
import Swiper from 'react-native-screens-swiper';
import Clothing from '../AgentScreens/ProductCategory/clothing';
import Footwear from '../AgentScreens/ProductCategory/footwear';
import Chasmeywala from '../AgentScreens/ProductCategory/cashmeywala';
import { ScrollViewBase } from 'react-native';

const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;

const itemHeight = 69;

class MainCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      select: null,
      disabled: true,
      banners: [{ 'image': require('../../../assets/Images/banner/banner1.png') }, { 'image': require('../../../assets/Images/banner/banner2.png') }, { 'image': require('../../../assets/Images/banner/banner1.png') }],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    this.props.onTabClicked('home');
    if (this.props.searchbar) {
      this.props.closeSearch();
    }
    return true;
  }

  render() {
    const data = [
      {
        tabLabel: 'Footwear',
        component: <Footwear {...this.props} closeSearch={this.props.closeSearch}/>,
      },
      {
        tabLabel: 'Cashmeywala',
        component: <Chasmeywala {...this.props} closeSearch={this.props.closeSearch}/>,
      },
      {
        tabLabel: 'Clothing',
        component: <Clothing {...this.props} closeSearch={this.props.closeSearch}/>,
      },
    ];

    const styles = StyleSheet.create({
      container: {
        height: this.state.height - 137,
      },
      itemContainer: {
        height: 270,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#e7e7e7',
        marginBottom: 16,
        width: this.state.width / 2 - 24,
      },
      like: {
        height: 30,
        width: 30,
        borderRadius: 50,
        shadowColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0,
        shadowRadius: 1.84,
        backgroundColor: '#ffff',
        elevation: 1,
        marginBottom: -15,
      },
      details: {
        paddingTop: 15,
        paddingLeft: 7,
        paddingRight: 7,
      },
      label: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 12,
        color: '#333333',
      },
      detailsText: {
        fontFamily: 'AvenirNextFont',
        fontSize: 10,
        color: '#999999',
      },
      detailsText1: {
        fontFamily: 'AvenirNextFont',
        fontSize: 12,
        color: '#999999',
        paddingLeft: 5,
      },
      priceText: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 14,
        color: '#333333',
        fontWeight: '500',
      },
      offerText: {
        fontFamily: 'AvenirNextFont',
        fontSize: 10,
        color: '#ff7d01',
        paddingLeft: 5,
      },
      leftText: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 10,
        color: '#ff7d01',
      },
      pillLabel: {
        fontSize: 16,
        fontFamily: 'AvenirNext-Medium',
        color: '#666666',
      },
      pillContainer: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        height:60
      },
      activeLabel: {
        color: '#ff7d01',
        fontSize: 16,
        fontFamily: 'AvenirNext-Medium',
    },
      borderActive: {
        borderColor: '#ff7d01',
        borderWidth:3,
        
      
    },
    });

    return (
      <View style={{flex: 1, backgroundColor: '#fafcff'}}>
        
        <KeyboardAwareScrollView extraHeight={false} scrollEnabled={false}>
          <Swiper
            data={data}
            isStaticPills={true}
            style={styles}
            // FlatList props
          />
           
          <View style={{paddingTop: 10, paddingBottom: 10}} />
          <View style={{height: this.state.height - 150}} />
        </KeyboardAwareScrollView >

        <Bottomnavigation
          {...this.props}
          closeSearch={() => this.props.closeSearch()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.reducer.active,
    bottomTab: state.reducer.bottomTab,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_TAB, payload: value}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainCategory);
