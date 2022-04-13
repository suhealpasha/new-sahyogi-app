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
import Subcategories from '../../utils/components/Subcategories';
import Listing from './Listing/Listing';
import Category from '../../utils/components/Category';
import Button from '../../utils/components/button';
import FilledLikeIcon from '../../utils/components/Icons/filledLike';
import LikeIcon from '../../utils/components/Icons/like';
import Shade from '../../utils/components/Icons/shade';
import TailButton from '../../utils/components/tailButton';
import RupeeIcon from '../../utils/components/Icons/rupee';
import GenderFilter from '../../utils/components/genderFilter';
import SortFilter from '../../utils/components/sortFilter';
const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;

const itemHeight = 69;

class ListCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      select: null,
      sort: false,
      disabled: true,
      brands: [
        {image: require('../../../assets/Images/products/pepe.png')},
        {image: require('../../../assets/Images/products/hrx.png')},
        {image: require('../../../assets/Images/products/roadster.png')},
        {image: require('../../../assets/Images/products/puma.png')},
      ],
      products: [
        {
          id: 1,
          name: 'MARC LOUIS',
          details: 'Unisex Mirrored Oval Sunglass',
          shades: '10 Shades',
          offer: '',
          price: 800,
          left: '',
          image: require('../../../assets/Images/products/sunglasses/1.png'),
          liked: true,
        },
        {
          id: 2,
          name: 'United Colors of Benetton',
          details: 'Unisex Polarised & UV Protec',
          shades: '10 Shades',
          offer: '',
          price: 7888,
          left: '',
          image: require('../../../assets/Images/products/sunglasses/2.png'),
          liked: true,
        },
        {
          id: 3,
          name: 'DIESEL',
          details: 'Unisex Mirrored Oval Sunglass',
          shades: '10 Shades',
          offer: '(50% off)',
          price: 5666,
          left: 'Only Few Left1',
          image: require('../../../assets/Images/products/sunglasses/3.png'),
          liked: false,
        },
        {
          id: 4,
          name: 'MARC LOUIS',
          details: 'Unisex Mirrored Oval Sunglass',
          shades: '10 Shades',
          offer: '',
          price: 1600,
          left: '',
          image: require('../../../assets/Images/products/sunglasses/4.png'),
          liked: true,
        },
        {
          id: 5,
          name: 'Puma',
          details: 'Unisex Polarised & UV Protec',
          shades: '10 Shades',
          offer: '',
          price: 900,
          left: '',
          image: require('../../../assets/Images/products/sunglasses/5.png'),
          liked: false,
        },
        {
          id: 6,
          name: 'Puma',
          details: 'Unisex Mirrored Oval Sunglass',
          shades: '10 Shades',
          offer: '(50% off)',
          price: 546,
          left: 'Only Few Left1',
          image: require('../../../assets/Images/products/sunglasses/6.png'),
          liked: true,
        },
        {
          id: 7,
          name: 'MARC LOUIS',
          details: 'Unisex Polarised & UV Protec',
          shades: '10 Shades',
          offer: '',
          price: 900,
          left: '',
          image: require('../../../assets/Images/products/sunglasses/7.png'),
          liked: true,
        },
        {
          id: 8,
          name: 'United Colors of Benetton',
          details: 'Unisex Mirrored Oval Sunglass',
          shades: '10 Shades',
          offer: '',
          price: 2000,
          left: '',
          image: require('../../../assets/Images/products/sunglasses/8.png'),
          liked: false,
        },
        {
          id: 9,
          name: 'MARC LOUIS',
          details: 'Unisex Polarised & UV Protec',
          shades: '10 Shades',
          offer: '',
          price: 4566,
          left: 'Only Few Left1',
          image: require('../../../assets/Images/products/sunglasses/9.png'),
          liked: true,
        },
        {
          id: 10,
          name: 'DIESEL',
          details: 'Unisex Mirrored Oval Sunglass',
          shades: '10 Shades',
          offer: '',
          price: 7890,
          left: '',
          image: require('../../../assets/Images/products/sunglasses/10.png'),
          liked: false,
        },
        {
          id: 11,
          name: 'MARC LOUIS',
          details: 'Unisex Polarised & UV Protec',
          shades: '10 Shades',
          offer: '(50% off)',
          price: 900,
          left: '',
          image: require('../../../assets/Images/products/sunglasses/11.png'),
          liked: true,
        },
      ],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props.searchbar);
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
    if (this.props.route.params.search) {
      this.props.onTabClicked('home', 100);
    } else {
      this.props.onTabClicked('category', 125);
    }
    this.props.navigation.goBack(null);
    if (this.props.searchbar) {
      this.props.closeSearch();
    }
    return true;
  }

  selectGender = () => {
    this.RBSheet.open();
  };

  closeSelectGender = async () => {
    await this.setState({sort: false});
    this.RBSheet.close();
  };

  sortingList = async () => {
    await this.setState({sort: true});
    this.RBSheet.open();
  };

  closeSortList = async () => {
    await this.setState({sort: false});
    this.RBSheet.close();
  };

  _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: '#e7e7e7',
          paddingLeft: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ImageBackground
          style={{
            width: 60,
            height: 60,
          }}
          resizeMode="center"
          source={item.image}
        />
      </View>
    );
  };

  render() {
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
    });

    return (
      <View style={{flex: 1.0, backgroundColor: '#ffff'}}>
        {/* <View style={styles.container}>  */}
        <KeyboardAwareScrollView extraHeight={false} scrollEnabled={false}>
          {!this.props.route.params.search ? (
            <View style={{paddingTop: 10, paddingBottom: 10}}>
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                layout={'default'}
                data={this.state.brands}
                renderItem={this._renderItem}
                sliderWidth={this.state.width}
                itemWidth={100}
                loop={true}
                autoplay={true}
              />
            </View>
          ) : null}
          <View style={{flex: 1.0}}>
            <View style={{height: this.state.height / 2 + 100}}>
              <FlatList
               showsVerticalScrollIndicator={false}
                data={this.state.products}
                style={{
                  paddingLeft: 16,
                  paddingRight: 16,
                  marginTop: 10,
                  marginBottom: 10,
                }}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                numColumns={2}
                keyExtractor={items => {
                  items.id;
                }}
                renderItem={({item}) => {
                  return (
                    <TouchableNativeFeedback
                      onPress={() =>
                        this.props.navigation.navigate('PRODUCTDETAILS')
                      }>
                      <View style={styles.itemContainer}>
                        <ImageBackground
                          source={item.image}
                          style={{
                            width: this.state.width / 2 - 34,
                            height: 148,
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                          }}
                          resizeMode="contain">
                          {item.liked ? (
                            <View style={styles.like}>
                              <FilledLikeIcon />
                            </View>
                          ) : (
                            <View style={styles.like}>
                              <LikeIcon />
                            </View>
                          )}
                        </ImageBackground>
                        <View style={styles.details}>
                          <Text style={styles.label}>{item.name}</Text>
                          <Text style={styles.detailsText}>
                            {item.details + '\n'}
                          </Text>
                          <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Shade />
                            <Text style={styles.detailsText1}>
                              {item.shades}
                            </Text>
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              paddingTop: 5,
                              alignItems: 'center',
                            }}>
                            <RupeeIcon />
                            <Text style={styles.priceText}> {item.price}</Text>
                            <Text style={styles.offerText}>{item.offer}</Text>
                          </View>
                          <Text style={styles.leftText}>{item.left}</Text>
                        </View>
                      </View>
                    </TouchableNativeFeedback>
                  );
                }}
              />
            </View>
            <View
              style={{
                height: this.state.height / 6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TailButton
                {...this.props}
                sortingList={this.sortingList}
                selectGender={this.selectGender}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        {this.state.sort ? (
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={this.state.height / 3}
            duration={250}
            closeOnPressMask={false}
            customStyles={{
              container: {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
            }}>
            <SortFilter closeSortList={this.closeSortList} />
          </RBSheet>
        ) : (
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={this.state.height / 3}
            duration={250}
            closeOnPressMask={false}
            customStyles={{
              container: {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
            }}>
            <GenderFilter closeSelectGender={this.closeSelectGender} />
          </RBSheet>
        )}

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
)(ListCategory);
