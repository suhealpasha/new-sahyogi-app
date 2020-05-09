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
  TouchableOpacity,
  TouchableNativeFeedback  
} from 'react-native';
import PhotoUpload from 'react-native-photo-upload';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/EvilIcons';
import BottomNavigation from '../../BottomNavigation/bottomNavigation';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import Dialog from 'react-native-dialog';
import Toast from 'react-native-simple-toast';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as api from '../../../assets/api/api';

class Profile extends Component {
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
      oldPasswordValidity:false,
      name: '',
      mobile: '',
      email: '',
      profilePic:''
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      name: this.props.name,
      mobile: this.props.mobile,
      email: this.props.email,
      profilePic:this.props.profilePic
    });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.name !== this.props.name) {
      this.setState({name: this.props.name});
    }
    if (prevProps.email !== this.props.email) {
      this.setState({email: this.props.email});
    }
    if (prevProps.profilePic !== this.props.profilePic) {
      this.setState({profilePic: this.props.profilePic});
    }
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
  handleRegister = async() => {
    const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (
      this.state.oldPassword !== null &&
      this.state.password !== null &&
      this.state.confirmPassword !== null
    )
    {    
        if (passwordReg.test(this.state.password) === false) {
          alert('Password should contain min 8 digits,atleast 1 number & 1 uppercase letter.')
        } else {       
          if(this.state.password === this.state.confirmPassword)
          {
            let data = JSON.stringify({  
              currentPassword:this.state.oldPassword,
              confirmPassword:this.state.password       
            })   
             console.log(data)  
            const access_token = await AsyncStorage.getItem('isLoggedIn')        
              await axios.post(api.changePasswordAPI,data,
              {headers:{
                "access_token" : access_token,        
              'content-type': 'application/json/x-www-form-urlencoded'}} )
              .then(res =>{                                
              if(res.data.status) {
                Toast.show('Password Changed Sucessfully')    
                 this.setState({dailogBoxOpen: false});
              }
              else{
                alert('Invalid Old Password!')
              }              
              
              })
              .catch(err =>{console.log(err)})
              } 
          else{
            Alert.alert('Password Mismatch!');
          }
  
        }
    }
    else {     
      Alert.alert('Feilds are Missing!');
    }
  };

  
  render() {
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
              <TouchableNativeFeedback onPress={() => {
                  this.props.navigation.navigate('Edit Profile');
                }}>
              <Icon
                name="edit"
                size={25}
                color={'#95A5A6'}
                
              />
              </TouchableNativeFeedback>
            </View>
            <View style={styles.photoUploadContainer}>
              <PhotoUpload
                onPhotoSelect={async avatar => {
                  if (avatar) {
                    let data = JSON.stringify({profile_pic: avatar});
                    const access_token = await AsyncStorage.getItem(
                      'isLoggedIn',
                    );
                    axios
                      .post(
                        api.buyerProfilePicUploadAPI,
                        data,
                        {
                          headers: {
                            access_token: access_token,
                            accept: 'application/json',
                            'accept-language': 'en_US',
                            'content-type': 'application/x-www-form-urlencoded',
                          },
                        },
                      )
                      .then(res => {
                        this.props.onFetchDetails()
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }
                }}>
                <Image
                  style={{
                    width: 120,
                    height: 120,
                    borderWidth: 0.25,
                    borderColor: '#95A5A6',
                    borderRadius: 100,
                  }}
                  resizeMode="cover"
                  source = {this.state.profilePic ? {uri:this.state.profilePic}:require('../../../assets/Images/users/userPhotoUpload.png')}
               />
              </PhotoUpload>
            </View>
            <View style={styles.userDetailsContainer}>
              <Text style={styles.userName}>{this.state.name}</Text>
              <Text style={styles.otherDetails}>{this.state.mobile}</Text>
              <Text style={styles.otherDetails}>{this.state.email}</Text>
            </View>
          </View>
          <View style={styles.actionContainer}>
            <TouchableWithoutFeedback
              style={styles.actions}
              onPress={() => {
                this.props.navigation.navigate('My Orders');
              }}>
              <View style={styles.actionItem}>
                <Icon2 name="cart-outline" size={25} color={'#95A5A6'} />
                <View style={styles.caption}>
                  <Text style={styles.actionItemText}>My Orders</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
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
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={styles.actions}
              onPress={() => this._logout()}>
              <View style={styles.actionItem}>
                <Icon2 name="logout" size={25} color={'#95A5A6'} />
                <View style={styles.caption}>
                  <Text style={styles.actionItemText}>Logout</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
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
export default connect(
  null,
  mapDispatchToProps,
)(Profile);
