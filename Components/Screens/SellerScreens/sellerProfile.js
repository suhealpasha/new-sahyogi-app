import React, {Component} from 'react';
import axios from 'axios';
import {
  AsyncStorage,
  BackHandler,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  TouchableHighlightBase,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';
import SignIn from '../../../Container/signIn';
import KeyboardShift from '../../utils/keyboardShift';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PhotoUpload from 'react-native-photo-upload';
import BackButton from '../../utils/backButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/EvilIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BottomNavigation from '../../BottomNavigation/sellerBottomNavigation';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import Dialog from 'react-native-dialog';

class SellerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      dailogBoxOpen: false,
      oldPassword: null,
      password: null,
      confirmPassword: null,
      oldPasswordError: false,
      passwordError: false,
      confirmPasswordError: false,
      userData:[]
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      userData:this.props.userData
    });
   
  }

  componentWillMount() {
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
    this.props.onBottomTabClicked('home');
    this.props.navigation.goBack(null);
    return true;
  }

  _logout = async () => {
    await AsyncStorage.clear();
    this.props.onLogout();
  };
  handleRegister = () => {
    if (
      this.state.oldPassword !== null &&
      this.state.password !== null &&
      this.state.confirmPassword !== null
    ) {
      this.setState({dailogBoxOpen: false});
    } else {
      // if (this.state.oldPassword === null) {
      //   this.setState({oldPasswordError: true});
      // } else {
      //   this.setState({oldPasswordError: false});
      // }
      // if (this.state.password === null) {
      //   this.setState({passwordError: true});
      // } else {
      //   this.setState({passwordError: false});
      // }
      // if (this.state.confirmPassword === null) {
      //   this.setState({confirmPasswordError: true});
      // } else {
      //   this.setState({confirmPasswordError: false});
      // }
      Alert.alert('Feilds are Missing');
    }
  };
  render() {
    console.log(this.state.userData)
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        backgroundColor: '#efebea',
        flex: 1,
      },
      userContainer: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      photoUploadContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      editIconContainer: {
        paddingTop: 10,
        flexDirection: 'row-reverse',
        paddingLeft: 10,
        paddingRight: 10,
      },
      userDetailsContainer: {
        paddingBottom: 10,
      },
      userName: {
        fontSize: 20,
        fontFamily: 'Gotham Black Regular',
        textAlign: 'center',
      },
      otherDetails: {
        fontSize: 14,
        fontFamily: 'GothamLight',
        textAlign: 'center',
      },
      companyDetails: {
        fontSize: 20,
        fontFamily: 'Gotham Black Regular',
        textAlign: 'center',
        paddingTop:10
      },
      actionContainer: {
        paddingLeft: 10,
        paddingRight: 10,
      },
      actions: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
      },

      actionItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      caption: {
        paddingLeft: 20,
        width: '100%',
      },
      actionItemText: {
        paddingBottom: 10,
        fontFamily: 'GothamLight',
        fontSize: 20,
        borderBottomWidth: 0.25,
        borderBottomColor: '#95A5A6',
      },
    });
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#95A5A6'}}>
            <View style={styles.editIconContainer}>
              <Icon
                name="edit"
                size={25}
                color={'#95A5A6'}
                onPress={() => {
                  this.props.navigation.navigate('Edit Seller Profile');
                }}
              />
            </View>
            <View style={styles.photoUploadContainer}>
              <PhotoUpload>
                <Image
                  style={{
                    width: 120,
                    height: 120,
                    borderWidth: 0.25,
                    borderColor: '#95A5A6',
                    borderRadius: 100,
                  }}
                  resizeMode="cover"
                  source={require('../../../assets/Images/users/userPhotoUpload.png')}
                />
              </PhotoUpload>
            </View>
            <View style={styles.userDetailsContainer}>
                <Text style={styles.userName}>hjhk</Text>
              <Text style={styles.otherDetails}>(341)-1001889110</Text>
              <Text style={styles.otherDetails}>paul@test.com</Text>
              <Text style={styles.companyDetails}>XYZ Coffee Producers</Text>
            </View>
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.actions}
              onPress={() => {
                
              }}>
              <View style={styles.actionItem}>
                <Icon2 name="account-multiple-outline" size={25} color={'#95A5A6'} />
                <View style={styles.caption}>
                  <Text style={styles.actionItemText}>My Accounts</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actions}
              onPress={() => {
                this.props.navigation.navigate('My Address');
              }}>
              <View style={styles.actionItem}>
                <Icon3 name="location" size={25} color={'#95A5A6'} />
                <View style={styles.caption}>
                  <Text style={styles.actionItemText}>My Address</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actions}
              onPress={() => {
               
              }}>
              <View style={styles.actionItem}>
                <Icon2 name="file-document-box-multiple-outline" size={22} color={'#95A5A6'} />
                <View style={styles.caption}>
                  <Text style={styles.actionItemText}>Document</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actions}
              onPress={() => {
                this.setState({dailogBoxOpen: true});
              }}>
              <View style={styles.actionItem}>
                <Icon name="lock-outline" size={25} color={'#95A5A6'} />
                <View style={styles.caption}>
                  <Text style={styles.actionItemText}>Change Password</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actions}
              onPress={() => this._logout()}>
              <View style={styles.actionItem}>
                <Icon2 name="logout" size={25} color={'#95A5A6'} />
                <View style={styles.caption}>
                  <Text style={styles.actionItemText}>Logout</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Dialog.Container
          contentStyle={{paddingBottom: 0, paddingRight: 0, paddingLeft: 0}}
          visible={this.state.dailogBoxOpen}>
          <Dialog.Title style={{fontFamily: 'GothamMedium'}}>
            Change Password
          </Dialog.Title>
          <Dialog.Input
            wrapperStyle={{marginBottom: 0, fontSize: 14}}
            secureTextEntry={true}
            placeholder="Comment"
            underlineColorAndroid={'#95A5A6'}
            placeholder="Old Password"
            onChangeText={oldPassword => this.setState({oldPassword})}
          />

          <Dialog.Input
            wrapperStyle={{marginBottom: 0, fontSize: 14}}
            secureTextEntry={true}
            placeholder="Comment"
            underlineColorAndroid={'#95A5A6'}
            placeholder="Enter Your Password"
            onChangeText={password => this.setState({password})}
          />
          <Dialog.Input
            wrapperStyle={{marginBottom: 10, fontSize: 14}}
            secureTextEntry={true}
            placeholder="Comment"
            underlineColorAndroid={'#95A5A6'}
            placeholder="Confirm Your password"
            onChangeText={confirmPassword => this.setState({confirmPassword})}
          />
          {/* <Dialog.Button style={{paddingTop:10,paddingBottom:10,color:'#004561',fontFamily:'GothamBold',paddingLeft:0,paddingRight:0,borderColor:'grey',width:300,borderWidth:1,textAlign:'center',justifyContent:'center'}} label="Update" onPress={() => {
              this.setState({dailogBoxOpen: false});
            }} />   */}
          <Dialog.Button
            label="Cancel"
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              color: '#004561',
              fontFamily: 'GothamBold',
              paddingLeft: 0,
              paddingRight: 10,
            }}
            onPress={() => this.setState({dailogBoxOpen: false})}
          />
          <Dialog.Button
            label="Update"
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              color: '#004561',
              fontFamily: 'GothamBold',
              paddingLeft: 0,
              paddingRight: 10,
            }}
            onPress={() => this.handleRegister()}
          />
        </Dialog.Container>
        <BottomNavigation {...this.props} />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onBottomTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_ICON, payload: value}),
  };
};
export default connect(null, mapDispatchToProps)(SellerProfile);
