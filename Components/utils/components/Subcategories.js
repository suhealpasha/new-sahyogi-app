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
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';

import {connect} from 'react-redux';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import OfferIcon from '../../utils/components/Icons/offer';
const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width - 10;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;

const itemHeight = 100;

class Subcategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };
  }

  componentDidMount() {}

  _renderItem = ({item, index}) => {
    return (
      <View
        style={{width: itemWidth, height: itemHeight, paddingHorizontal: 10}}>
        <ImageBackground
          style={{
            width: itemWidth,
            height: itemHeight,
            flex: 1,
            resizeMode: 'fit',
            justifyContent: 'center',
          }}
          source={item.image}
        />
      </View>
    );
  };

  render() {
    const styles = StyleSheet.create({     
      bodyContainer: {
        // padding:16
      },
      title: {
        color: '#333333',
        fontSize: 18,
        fontFamily: 'AvenirNext-DemiBold',
        fontWeight: '500',
        padding: 16,
      },
      border: {
        borderBottomWidth: 2,
        borderBottomColor: '#ff7d01',
        width: this.state.width / 2 - 16,
        marginLeft: 16,
        paddingTop: 2,
        paddingBottom: 2,
      },
      label1: {
        fontSize: 16,
        fontFamily: 'AvenirNextLTPro-Regular',
        paddingLeft:16,
        paddingRight:16,
        paddingTop:16,
        width: 150,
      },
      categoriesMenu: {
        
        width: 75,
        marginRight: 10,
        marginTop: 16,
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
      header: {
        paddingTop: 10,
        paddingBottom: 10,
      },
      headerMenuText: {
        color: '#333333',
        fontSize: 12,
        fontFamily: 'AvenirNext-Medium',
        textAlign: 'center',
        padding: 5,
      },
    });

    let headerMenu = [],
      chashmewala = [],
      footwear = [];

    this.props.data.map((item, index) => {
      chashmewala.push(
        <View style={styles.categoriesMenu}>
          <View
            style={{
              alignItems: 'center',
              height: 50,
              justifyContent: 'center',
            }}>
            {item.icon}
          </View>
          <Text style={styles.headerMenuText}>{item.name}</Text>
        </View>,
      );
    });

    return (
     
        <View style={styles.header}>
          <LinearGradient
            start={{x: 0, y: 0.7}}
            end={{x: 0, y: 0}}
            colors={['#ffff', '#ffeede']}
            locations={[0,0]}
            style={styles.linearGradient}>
            <View style={{display: 'flex', flexDirection: 'column'}}>
              <Text style={styles.label1}>{this.props.label}</Text>
              <FlatList
                data={this.props.data}
                horizontal={true}
                style={{marginLeft:16}}
                showsHorizontalScrollIndicator={false}
                keyExtractor={items => {
                  items.region_Id;
                }}
                renderItem={({item}) => {
                  return (
                    <TouchableNativeFeedback
                      style={styles.categoriesMenu}
                      //  onPress={() => this.functionHandler(item.region_Id, item.name)}
                    >
                      <View
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          paddingTop: 5,
                          paddingBottom: 5,
                        }}>
                      {item.icon === 'sunGlass' ? this.props.SunglassIcon : null}
                      {item.icon ==='frames' ? this.props.FrameIcon : null}
                      {item.icon === 'cLens' ? this.props.CLensIcon  : null}
                      {item.icon === 'sLens' ? this.props.SlensIcon : null}
                      {item.icon === 'eSolution' ? this.props.EyeSolutionsIcon : null}
                      {item.icon === 'caualShoes' ? this.props.CasualShoesIcon : null}
                      {item.icon === 'sportWear' ? this.props.SportsShoesIcon: null}
                      {item.icon === 'formalShoes' ? this.props.FormalShoesIcon : null}
                      </View>
                      <Text style={styles.headerMenuText}>{item.name}</Text>
                    </TouchableNativeFeedback>
                  );
                }}
              />
            </View>
          </LinearGradient>
        </View>
       
    );
  }
}

export default Subcategories;
