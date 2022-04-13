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
import ProfileIcon from '../../utils/components/Icons/profile';
import TrackYourOrderIcon from '../../utils/components/Icons/trackOrders';
import TCIcon from '../../utils/components/Icons/tc';
import OrdersIcon from '../../utils/components/Icons/orders';
import OfferIcon from '../../utils/components/Icons/offer';
import SettingsIcon from '../../utils/components/Icons/settings';
import FeedbackIcon from '../../utils/components/Icons/feedback';
import WalletIcon from '../../utils/components/Icons/wallet';
import ContactIcon from '../../utils/components/Icons/contact';
import CompanyIcon from '../../utils/components/Icons/company';
import BankIcon from '../../utils/components/Icons/bank';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import PhotoUpload from 'react-native-photo-upload';
import LinearGradient from 'react-native-linear-gradient';
import Exclamationcircle from 'react-native-vector-icons/AntDesign';
import Slider from 'react-native-slider';

const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;

const itemHeight = 69;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
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
    this.props.onTabClicked('home', 100);
    // if (this.props.route.params.search) {
    //   this.props.onTabClicked('home', 100);
    // } else {
    //   this.props.onTabClicked('category', 125);
    // }
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
      banner: {
        height: 150,
        backgroundColor: 'red',
      },
      linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
      },
      container: {
        paddingLeft: 16,
        paddingRight: 16,
      },
      userContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffff',
        padding: 10,
        marginBottom: 10,
        marginTop: -70,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
      },
      trackContainer: {
        width: 70,
        paddingLeft:30
      },
      items:{
        padding:10,
        borderBottomColor:'#c8c8c8',
        borderBottomWidth:1,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
      },
      itemsText:{
        fontFamily: 'AvenirNext-Medium',
        fontSize: 18,
        color: '#333333',
        marginLeft:5,
        marginRight:5
      }
    });

    

    return (
      <View style={{flex: 1.0, backgroundColor: '#ffff'}}>
        <KeyboardAwareScrollView extraHeight={false} scrollEnabled={true}>
          <LinearGradient
            start={{x: 0.2, y: 0.5}}
            end={{x: 1.0, y: 0.5}}
            colors={['#ffb600', '#ff5f02']}
            style={styles.linearGradient}>
            <View style={styles.banner} />
          </LinearGradient>
          <View style={styles.container}>
            <View style={styles.userContainer}>
              <View>
                <PhotoUpload
                  onPhotoSelect={avatar => {
                    if (avatar) {
                      console.log('Image base64 string: ', avatar);
                    }
                  }}>
                  <Image
                    style={{
                      paddingVertical: 30,
                      width: 100,
                      height: 100,
                      borderRadius: 75,
                    }}
                    resizeMode="cover"
                    source={{
                      uri:
                        'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ec595d45f39760007b05c07%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D989%26cropX2%3D2480%26cropY1%3D74%26cropY2%3D1564',
                    }}
                  />
                </PhotoUpload>
              </View>
              <View
                style={{
                  margin: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    fontFamily: 'AvenirNext-Medium',
                  }}>
                  Anuj Gupta
                </Text>
                <View style={{display: 'flex', flexDirection: 'row',marginTop:10}}>
                  <Exclamationcircle
                    name="exclamationcircle"
                    size={18}
                    color={'#ff0a0a'}
                  />
                  <Text
                    style={{
                      color: '#666666',
                      fontSize: 12,
                      fontFamily: 'AvenirNext-Medium',
                      fontWeight: 'bold',
                      marginLeft: 10,
                    }}>
                    KYC Pending
                  </Text>
                </View>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <View style={styles.trackContainer}>
                  <Slider
                  style={{marginTop:0,padding:0,height:20}}
                    value={0.8}
                    onValueChange={value => this.setState({value})}
                    thumbStyle={{height: 0}}
                    minimumTrackTintColor="#ff7d01"
                    maximumTrackTintColor="#d8d8d8"
                  />
                </View>
                <Text style={{marginLeft:10,color:'#999999',fontSize:8,fontWeight:'bold'}}>88%</Text>
                </View>
              </View>
            </View>
          <TouchableOpacity style={styles.items}  onPress={()=>{this.props.navigation.navigate('ProfileDetails')}}>
            <View style={{display:'flex',flexDirection:'row'}}>
            <ProfileIcon />
            <Text style={styles.itemsText}>Personal Details</Text>
            </View>         
            <Icon
                    name="keyboard-arrow-right"
                    size={32}
                    style={{paddingTop: 10}}
                    color="#333333"
                  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.items}  onPress={()=>{this.props.navigation.navigate('CompanyDetails')}}>
            <View style={{display:'flex',flexDirection:'row'}}>
            <CompanyIcon />
            <Text style={styles.itemsText}>Company Details</Text>
            </View>         
            <Icon
                    name="keyboard-arrow-right"
                    size={32}
                    style={{paddingTop: 10}}
                    color="#333333"
                  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.items} onPress={()=>{this.props.navigation.navigate('BankDetails')}}>
            <View style={{display:'flex',flexDirection:'row'}}>
            <BankIcon />
            <Text style={styles.itemsText}>Bank Account Details</Text>
            </View>         
            <Icon
                    name="keyboard-arrow-right"
                    size={32}
                    style={{paddingTop: 10}}
                    color="#333333"
                  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.items} onPress={()=>{this.props.navigation.navigate('AgentAddress')}}>
            <View style={{display:'flex',flexDirection:'row'}}>
            <TrackYourOrderIcon width={30} height={30} />
            <Text style={styles.itemsText}>Manage Shipping Address</Text>
            </View>         
            <Icon
                    name="keyboard-arrow-right"
                    size={32}
                    style={{paddingTop: 10}}
                    color="#333333"
                  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.items}>
            <View style={{display:'flex',flexDirection:'row'}}>
            <WalletIcon />
            <Text style={styles.itemsText}>Sahyogi Wallet</Text>
            </View>         
            <Icon
                    name="keyboard-arrow-right"
                    size={32}
                    style={{paddingTop: 10}}
                    color="#333333"
                  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.items} onPress={()=>{this.props.navigation.navigate('MyOffers')}}>
            <View style={{display:'flex',flexDirection:'row'}}>
            <OfferIcon width={34} height={25} />
            <Text style={styles.itemsText}>My Offers</Text>
            </View>         
            <Icon
                    name="keyboard-arrow-right"
                    size={32}
                    style={{paddingTop: 10}}
                    color="#333333"
                  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.items} onPress={()=>{this.props.navigation.navigate('MyOrders')}}>
            <View style={{display:'flex',flexDirection:'row'}}>
            <OrdersIcon />
            <Text style={styles.itemsText}>My Orders</Text>
            </View>         
            <Icon
                    name="keyboard-arrow-right"
                    size={32}
                    style={{paddingTop: 10}}
                    color="#333333"
                  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.items}>
            <View style={{display:'flex',flexDirection:'row'}}>
            <TrackYourOrderIcon width={30} height={30} />
            <Text style={styles.itemsText}>Track Your Orders</Text>
            </View>         
            <Icon
                    name="keyboard-arrow-right"
                    size={32}
                    style={{paddingTop: 10}}
                    color="#333333"
                  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.items} onPress={()=>{this.props.navigation.navigate('TC')}}>
            <View style={{display:'flex',flexDirection:'row'}}>
            <TCIcon />
            <Text style={styles.itemsText}>Terms & Conditions</Text>
            </View>         
            <Icon
                    name="keyboard-arrow-right"
                    size={32}
                    style={{paddingTop: 10}}
                    color="#333333"
                  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.items} onPress={()=>{this.props.navigation.navigate('Feedback')}}>
            <View style={{display:'flex',flexDirection:'row'}}>
            <FeedbackIcon />
            <Text style={styles.itemsText}>App Feedback</Text>
            </View>         
            <Icon
                    name="keyboard-arrow-right"
                    size={32}
                    style={{paddingTop: 10}}
                    color="#333333"
                  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.items} onPress={()=>{this.props.navigation.navigate('Settings')}}>
            <View style={{display:'flex',flexDirection:'row'}}>
            <SettingsIcon />
            <Text style={styles.itemsText}>Settings</Text>
            </View>         
            <Icon
                    name="keyboard-arrow-right"
                    size={32}
                    style={{paddingTop: 10}}
                    color="#333333"
                  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.items} onPress={()=>{this.props.navigation.navigate('ContactUs')}}>
            <View style={{display:'flex',flexDirection:'row'}}>
            <ContactIcon />
            <Text style={styles.itemsText}>Contact Us</Text>
            </View>         
            <Icon
                    name="keyboard-arrow-right"
                    size={32}
                    style={{paddingTop: 10}}
                    color="#333333"
                  />
          </TouchableOpacity>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity
          onPress={()=>{this.props.setLogout()}}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#ff7d01',
              padding: 10,
              marginTop:50,
              marginBottom:50,
              width:200
            }}>
            <Text
              style={{
                color: '#ff7d01',
                fontSize: 16,
                fontFamily: 'AvenirNextFont',
                fontWeight:'bold',
                textAlign:'center'
              }}>
           Logout
            </Text>
          </TouchableOpacity>
          </View>
          </View>
          
        </KeyboardAwareScrollView>
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
)(Profile);
