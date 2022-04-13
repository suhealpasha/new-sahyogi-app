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
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Listing from './Listing/Listing';
import TrendingIcon from '../../utils/components/Icons/trending';

const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;

const itemHeight = 69;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      select: null,
      disabled: true,
      mostSearched: [],
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

  async componentDidMount() {
    await this.setState({mostSearched: this.props.mostSearched});
    console.log('INSIDE SERCH', this.state.mostSearched);
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.mostSearched != this.props.mostSearched) {
      this.setState({mostSearched: this.props.mostSearched});
    }
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
      // searchText: {
      //   padding: 10,
      //   borderWidth: 1,
      //   borderRadius: 25,
            
      //   flex:1,
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   fontFamily: 'AvenirNext-Medium',
      //   fontSize: 12,
      //   fontWeight: 'bold',
      //   borderColor: '#ff7d01',
      //   display:'flex',
      //   flexDirection:'row',
      //   width:100,
    
      //   marginRight:10,   
      // },
      // selectLabel: {
      //   fontSize:12,
      //   paddingLeft:5,
      //   paddingRight:5,
     
      //   // marginRight:5,
      //   fontFamily: 'AvenirNext-Medium',
      //   fontWeight:'bold',
      //   width:100
      //  },
      searchTextButton:{
        width:100,
        borderWidth:1,
        display:'flex',
        flexDirection:'row',
        padding:10,
        borderRadius:20,
        alignItems: 'center',
        borderColor: '#ff7d01',
      }
    });
    let searchItems;
    if (this.state.mostSearched.length >= 1) {
      searchItems = this.state.mostSearched.map(i => {
        return (
          // <TouchableOpacity style={styles.searchText}>
          //   <View style={{marginLeft:15}}><TrendingIcon /></View>
          //   <Text numberOfLines={1} style={styles.selectLabel}>{i}</Text>
          // </TouchableOpacity>
          <TouchableOpacity style={styles.searchTextButton}>
          <View ><TrendingIcon /></View>
          <Text  numberOfLines={1} style={{width:65,paddingLeft:5,fontFamily: 'AvenirNext-Medium',fontSize:12,fontWeight:'bold'}}>{i}</Text>
        </TouchableOpacity>
        );
      });
    }

    return (
      <View style={{flex: 1.0, backgroundColor: '#fafcff'}}>
        {/* <View style={styles.container}>  */}
        <KeyboardAwareScrollView>
          <View
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 16,
              paddingRight: 16,
            }}>
            <Text
              style={{
                fontFamily: 'AvenirNext-Medium',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Most Search Items
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              {searchItems}
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: 16,
                paddingTop: 16,
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
        </KeyboardAwareScrollView>
        {/* </View> */}

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
)(Search);
