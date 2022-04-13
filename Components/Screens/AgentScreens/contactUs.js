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
  Linking, Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContactUsIllustrationIcon from '../../utils/components/Icons/contactUsIllustration';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import RightArrowIcon from '../../utils/components/Icons/rightArrow';

const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;


const itemHeight = 69;

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props.searchbar)
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
    // this.props.onTabClicked('category');
    if (this.props.searchbar) {
      this.props.closeSearch();
    }
    return true;
  }

  dialCall = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    }
    else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };

  sendMail = () =>{
    Linking.openURL('mailto:support@example.com') 
  }


  render() {
    const styles = StyleSheet.create({
      message: {
        fontSize: 14,
        fontFamily: 'AvenirNext-Medium',
        // paddingBottom:30,
        textAlign: 'center',
        color: '#999999',
        padding: 30,
      },
      options:{
        backgroundColor:'#fff4e9',
        width:'100%',
        padding:20,
        marginTop:10,
        marginBottom:10
      },
      text:{
        fontFamily:'AvenirNext-Medium',
        fontSize:14,
        color:'#333333',
        marginLeft:10,
        marginRight:10
      }


    });

   

    return (
      <View style={{flex: 1.0, backgroundColor: '#ffff',alignItems:'center'}}>
        <View style={{marginTop:10,marginBottom:10}}>
        <ContactUsIllustrationIcon />
        </View>
        <Text style={styles.message}>How do to want to contact our customer care?</Text>
        <View>
          <View style={{width:this.state.width - 32}}>
          <TouchableOpacity style={styles.options} onPress={this.dialCall}>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <View>
              <Text style={styles.text}>Make a Voice Call</Text>
              </View>
              <View>
             <RightArrowIcon />
              </View>
            </View>
            
          </TouchableOpacity>
          <TouchableOpacity style={styles.options} onPress={this.sendMail}>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <View>
              <Text style={styles.text}>Send a Mail</Text>
              </View>
              <View>
             <RightArrowIcon />
              </View>
            </View>
            
          </TouchableOpacity>
          </View>
        </View>
      </View>     
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.reducer.active,
    bottomTab:state.reducer.bottomTab
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_TAB, payload: value}),
  }
 
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactUs);
