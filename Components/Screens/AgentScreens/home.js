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
import FramesIcon from '../../utils/components/Icons/frames';
import EyelensIcon from '../../utils/components/Icons/eLens';
import SpectacleLensIcon from '../../utils/components/Icons/sLens';
import EyeSolutionsIcon from '../../utils/components/Icons/eyeSolutions';
import SunglassIcon from '../../utils/components/Icons/sunGlass';
import CasualShoesIcon from '../../utils/components/Icons/casualShoes';
import FormalShoesIcon from '../../utils/components/Icons/formalShoes';
import SportsShoesIcon from '../../utils/components/Icons/sportsShoes';
import TrackYourOrderIcon from '../../utils/components/Icons/trackOrders';
import InventoryManagementIcon from '../../utils/components/Icons/inventoryManagement';
import UserManagementIcon from '../../utils/components/Icons/userManagement';
import ServiceRequestIcon from '../../utils/components/Icons/serviceRequest';
import Subcategories from '../../utils/components/Subcategories';
import Listing from '../../Screens/AgentScreens/Listing/Listing';
import Category from '../../utils/components/Category';
import Button from '../../utils/components/button';
const horizontalMargin = 20;
const sliderWidth = Dimensions.get('window').width;
const itemWidth = 69;

const itemHeight = 150;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      select: null,
      disabled: true,
      offers: [
        {image: require('../../../assets/Images/offers/orange.png')},
        {image: require('../../../assets/Images/offers/blue.png')},
        {image: require('../../../assets/Images/offers/pink.png')},
      ],
      headerOptions: [
        {name: 'Users', icon: 'userManagement'},
        {name: 'Inventory', icon: 'inventoryManagement'},
        {name: 'Track your order', icon: 'trackYourOrder'},
        {name: 'Service Request', icon: 'serviceRequest'},
      ],
      chashmewala: [
        {name: 'Sun Glass', icon: 'sunGlass'},
        {name: 'Frames', icon: 'frames'},
        {name: 'Contact Lens', icon: 'cLens'},
        {name: 'Spectacle Lens', icon: 'sLens'},
        {name: 'Eye Solution', icon: 'eSolution'},
      ],
      footwear: [
        {name: 'Casual Shoes', icon: 'caualShoes'},
        {name: 'Sports Wear', icon: 'sportWear'},
        {name: 'Formals Shoes', icon: 'formalShoes'},
      ],
      // category:[{'name':'Footwear','image':require('../../../assets/Images/category/footwear.png')},{'name':'Chasmewala','image':require('../../../assets/Images/category/chasmewala.png')},{'name':'Clothing',image:require('../../../assets/Images/category/cloths.png')}],
      recentData: [
        {
          name: 'Roadster',
          favourite: true,
          code: 12674,
          image: require('../../../assets/Images/products/tshirt1.png'),
        },
        {
          name: 'Marcloir',
          favourite: false,
          code: 12674,
          image: require('../../../assets/Images/products/slipper.png'),
        },
        {
          name: 'Roadster',
          favourite: true,
          code: 12674,
          image: require('../../../assets/Images/products/tshirt2.png'),
        },
      ],
      recentAddedData: [
        {
          name: 'Nike',
          favourite: true,
          code: 12674,
          image: require('../../../assets/Images/products/tshirt3.png'),
        },
        {
          name: 'Marcloir',
          favourite: false,
          code: 12674,
          image: require('../../../assets/Images/products/jacket.png'),
        },
        {
          name: 'Puma',
          favourite: true,
          code: 12674,
          image: require('../../../assets/Images/products/pant.png'),
        },
      ],
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
    if(this.props.searchbar){
      this.props.closeSearch();
    }
    return true;
  }

  _renderItem = ({item, index}) => {
    return (
      <ImageBackground
        style={{
          width: itemWidth - 100,
          height: itemHeight,
          paddingHorizontal: 20,
        }}
        source={item.image}
      />
    );
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        backgroundColor: '#ffff',
        
      },

      text: {
        color: '#333333',
        fontFamily: 'AvenirNextFont',
        fontSize: 14,
        fontWeight: '500',
      },
      label: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
      },
      selectLabel: {
        padding: 16,
        backgroundColor: '#ffecdb',
      },
      header: {
        paddingTop: 10,
        paddingBottom: 10,
      },
      headerMenu: {
        width: 75,
        backgroundColor: '#ffff',
        height: 100,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      },
      categoriesMenu: {
        width: 75,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: '#ffff',
        height: 100,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderWidth: 1,
        borderColor: '#e7e7e7',
        elevation: 1,
        justifyContent: 'center',
      },
      headerMenuText: {
        color: '#333333',
        fontSize: 11,
        fontFamily: 'AvenirNext-Medium',
        textAlign: 'center',
        padding: 5,
      },
      bodyContainer: {
        // padding:16
      },
      title: {
        color: '#333333',
        fontSize: 18,
        fontFamily: 'AvenirNext-DemiBold',
        fontWeight: '500',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop:10
      },
      border: {
        borderBottomWidth: 2,
        borderBottomColor: '#ff7d01',
        width: this.state.width / 3,
        marginLeft: 16,
        paddingTop: 2,
        paddingBottom: 2,
      },
      border1: {
        borderBottomWidth: 2,
        borderBottomColor: '#ff7d01',
        width: this.state.width / 4 - 16,
        marginLeft: 16,
        paddingTop: 2,
        paddingBottom: 2,
      },
      label1: {
        fontSize: 16,
        fontFamily: 'AvenirNextLTPro-Regular',
        padding: 16,
        width: 150,
      },
      roundButton: {
        borderRadius: 15,
        width: 80,
        height: 30,
        borderColor: '#ff7d01',
        borderWidth: 1,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      },
      roundButtonText: {
        textAlign: 'center',
        fontFamily: 'AvenirNext-Medium',
        color: '#ff7d01',
        fontSize: 14,
      },
    });

    let headerMenu = [],
      chashmewala = [],
      footwear = [];
    this.state.headerOptions.map((item, index) => {
      headerMenu.push(
        <View style={styles.headerMenu}>
          <View
            style={{
              alignItems: 'center',
              height: 50,
              justifyContent: 'center',
            }}>
            {item.icon === 'trackYourOrder' ? <TrackYourOrderIcon width={40} height={40} /> : null}
            {item.icon === 'inventoryManagement' ? (
              <InventoryManagementIcon />
            ) : null}
            {item.icon === 'userManagement' ? <UserManagementIcon /> : null}
            {item.icon === 'serviceRequest' ? <ServiceRequestIcon /> : null}
          </View>
          <Text style={styles.headerMenuText}>{item.name}</Text>
        </View>,
      );
    });

    this.state.chashmewala.map((item, index) => {
      chashmewala.push(
        <View style={styles.categoriesMenu}>
          <View
            style={{
              alignItems: 'center',
              height: 50,
              justifyContent: 'center',
            }}>
            <OfferIcon />
          </View>
          <Text style={styles.headerMenuText}>{item.name}</Text>
        </View>,
      );
    });
    this.state.footwear.map((item, index) => {
      footwear.push(
        <View style={styles.categoriesMenu}>
          <View
            style={{
              alignItems: 'center',
              height: 50,
              justifyContent: 'center',
            }}>
            <OfferIcon />
          </View>
          <Text style={styles.headerMenuText}>{item.name}</Text>
        </View>,
      );
    });

    return (
      <View style={{flex: 1.0, backgroundColor: '#ffff'}}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <LinearGradient
                start={{x: 0, y: 0.3}}
                end={{x: 0, y: 0.5}}
                colors={['#ffff', '#ffeede']}
                locations={[0, 0]}
                style={styles.linearGradient}>
                <Carousel
                  ref={c => {
                    this._carousel = c;
                  }}
                  layout={'default'}
                  data={this.state.offers}
                  renderItem={this._renderItem}
                  sliderWidth={this.state.width}
                  itemWidth={this.state.width - 60}
                  autoplay={true}
                  loop={true}
                />
              </LinearGradient>
              <LinearGradient
                start={{x: 0, y: 0.7}}
                end={{x: 0, y: 0.4}}
                colors={['#ffff', '#ffeede']}
                locations={[0, 0]}
                style={styles.linearGradient}>
                <View
                  style={{
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 30,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {headerMenu}
                </View>
              </LinearGradient>
            </View>
            <View style={styles.bodyContainer}>
              <Text style={styles.title}>Explore by Subcategories</Text>
              <View style={styles.border} />
              <View style={{marginBottom: 10, marginTop: 10}}>
                <Subcategories
                  horizontal={true}
                  data={this.state.chashmewala}
                  label="Chasmeywala"
                  FrameIcon={<FramesIcon />}
                  CLensIcon={<EyelensIcon />}
                  SlensIcon={<SpectacleLensIcon />}
                  SunglassIcon={<SunglassIcon />}
                  EyeSolutionsIcon={<EyeSolutionsIcon />}
                />
                <Subcategories
                  horizontal={true}
                  data={this.state.footwear}
                  label="Footwear"
                  CasualShoesIcon={<CasualShoesIcon />}
                  FormalShoesIcon={<FormalShoesIcon />}
                  SportsShoesIcon={<SportsShoesIcon />}
                />
              </View>
              {/* <Text style={styles.title}>Explore by Category</Text>
            <View style={styles.border1} />
            <Category data={this.state.category} /> */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: 16,
                  paddingTop: 16,
                  
                  alignItems:'center'
                }}>
                <View>
                  <Text style={styles.title}>Recently Added</Text>
                  <View style={styles.border1} />
                </View>
                <TouchableWithoutFeedback style={styles.roundButton}>
                  <Text style={styles.roundButtonText}>View All</Text>
                </TouchableWithoutFeedback>
              </View>
              <Listing data={this.state.recentAddedData} listing={false} />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: 16,
                  paddingTop: 16,
                  alignItems:'center',
                                  }}>
                <View>
                  <Text style={styles.title}>Recently Visited</Text>
                  <View style={styles.border1} />
                </View>
                <TouchableWithoutFeedback style={styles.roundButton}>
                  <Text style={styles.roundButtonText}>View All</Text>
                </TouchableWithoutFeedback>
              </View>

              <Listing
                data={this.state.recentData}
                listing={false}
                {...this.props}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Bottomnavigation {...this.props} closeSearch={()=>this.props.closeSearch()}/>
      </View>
    );
  }
}

export default Home;
