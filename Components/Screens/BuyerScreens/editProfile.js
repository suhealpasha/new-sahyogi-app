import React, {Component} from 'react';
import axios from 'axios';
import {
  AsyncStorage,
  BackHandler,
  StyleSheet,
  FlatList,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  TochableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NextButton from '../../utils/nextButton';
import BackButton from '../../utils/backButton';
import Logo from '../../utils/logo';
import * as actionTypes from '../../../Store/action';
import PhotoUpload from 'react-native-photo-upload';
import {RadioButton} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      spinner: false,
      name: '',
      email: '',
      mobile: '',
      profilePic:'',
      checked: null,
      nameError: false,
      emailError: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  async componentDidMount() {
    const name = this.props.name
    const mobile = this.props.mobile
    const email = this.props.email
    const profilePic = this.props.profilePic
    const checked = this.props.gender
    this.setState({name: name, mobile: mobile, email: email, profilePic :profilePic,checked:checked});
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentDidUpdate (prevState,prevProps){
    if(prevState.profilePic !== this.props.profilePic){
      this.setState({profilePic:this.props.profilePic})
    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    this.props.onBottomTabClicked('profile');
    this.props.navigation.goBack();
    return true;
  }

  async UNSAFE_componentWillReceiveProps(){ 
    console.log(this.props.saveIcon)
    if (this.state.name !== '' && this.state.email !== '' && this.state.checked !== null) {
      let data = JSON.stringify({
        name:this.state.name,
        email:this.state.email,
        gender:this.state.checked
      }) 
      this.setState({spinner:true})   
      const access_token = await AsyncStorage.getItem('isLoggedIn')     
        await axios.post('http://mathtech.co.in/microffee_api/Buyer/updateProfile',data,
        {headers:{
          "access_token" : access_token,
          'accept': 'application/json',
        'accept-language': 'en_US',
        'content-type': 'application/x-www-form-urlencoded'}} )
        .then(res =>{
          
        if(res.status) { 
          this.setState({spinner:false,name:this.state.name,email:this.state.email,checked:this.state.checked})               
          Toast.show('Profile updated Sucessfully.')    
          this.props.onFetchDetails()
          this.props.navigation.navigate('Profile')

        }              
        
        })
        .catch(err =>{
          this.setState({spinner:false})   
          console.log(err)})
       
    } else {
      if (this.state.mobileNumber === null) {
        this.setState({mobileNumberError: true});
      } else {
        this.setState({mobileNumberError: false});
      }
      if (this.state.password === null) {
        this.setState({passwordError: true});
      } else {
        this.setState({passwordError: false});
      }
    }
  }
  
  render() {
    const {checked} = this.state;
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#efebea',
        paddingTop: 10,
        paddingBottom: 10,
        height: this.state.height + 30,
      },
      photoUploadContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      EditProfileFormContainer: {
        width: '100%',
      },
      users: {},
      spinnerTextStyle: {
        color: '#00aa00'
      }, 
      suggestionContainer: {
        paddingTop: 10,
        width: '100%',
      },
      checkBoxText: {
        fontFamily: 'GothamLight',
        fontWeight: 'normal',
        textAlignVertical: 'center',
        fontSize: 16,
      },
    });
    let profilePicture
    if(this.state.profilePic){
      profilePicture = this.state.profilePic
    }
    else{
      profilePicture ='https://ibb.co/TYqxtXM'
    }
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}         
        />
          <View style={{borderBottomWidth: 1, borderBottomColor: '#95A5A6'}}>
            <View style={styles.photoUploadContainer}>
            <PhotoUpload
           
                // onPhotoSelect={async avatar => {
                //   if (avatar) {
                //     let data = JSON.stringify({profile_pic: avatar});
                //     const access_token = await AsyncStorage.getItem(
                //       'isLoggedIn',
                //     );
                //     axios
                //       .post(
                //         'http://mathtech.co.in/microffee_api/Buyer/profilePicUpload',
                //         data,
                //         {
                //           headers: {
                //             access_token: access_token,
                //             accept: 'application/json',
                //             'accept-language': 'en_US',
                //             'content-type': 'application/x-www-form-urlencoded',
                //           },
                //         },
                //       )
                //       .then(res => {
                //         this.props.onFetchDetails()
                //       })
                //       .catch(err => {
                //         console.log(err);
                //       });
                //   }
                // }}
                >
                <Image
                  style={{
                    width: 120,
                    height: 120,
                    borderWidth: 0.25,
                    borderColor: '#95A5A6',
                    borderRadius: 100,
                  }}
                  resizeMode="cover"
                
                  source={{                    
                    uri:
                      profilePicture
                  }}
                />
              </PhotoUpload>              
            </View>
          </View>
          <View style={styles.EditProfileFormContainer}>
            <Input
              placeholder="Name"
              style={styles.inputStyle}
              value={this.state.name}
              inputStyle={{fontFamily: 'GothamMedium', fontSize: 16}}
              onChangeText={name => this.setState({name})}
              // onChangeText={name=>{console.log(name)}}
              errorMessage={
                this.state.nameError === true ? 'Enter the User Name' : false
              }
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingBottom: 10,
                paddingTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <RadioButton
                color="#00aa00"
                value= {this.state.checked}
                status={checked === 'male' ? 'checked' : 'unchecked'}
                onPress={() => {
                  this.setState({checked: 'male'});
                }}
              />
              <Text style={styles.checkBoxText}>Male</Text>
              <RadioButton
                color="#00aa00"
                value={this.state.checked}
                status={checked === 'female' ? 'checked' : 'unchecked'}
                onPress={() => {
                  this.setState({checked: 'female'});
                }}
              />
              <Text style={styles.checkBoxText}>Female</Text>
            </View>
            <Input
              placeholder="Email"
              style={styles.inputStyle}
              value={this.state.email}
              inputStyle={{fontFamily: 'GothamMedium', fontSize: 16}}
              onChangeText={email => this.setState({email})}
              errorMessage={
                this.state.emailError === true ? 'Enter the email' : false
              }
            />
            <Input
              disabled
              readOnly
              value={this.state.mobile}
              style={styles.inputStyle}
              inputStyle={{fontFamily: 'GothamMedium', fontSize: 16}}
            />
            
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    userType: state.reducer.userType,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onBottomTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_ICON, payload: value}),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile);
