import React, {Component} from 'react';
import axios from 'axios';
import {BackHandler,StyleSheet,FlatList,Text,View,TextInput,Button,TouchableHighlight,Image,TochableOpacity,Alert,Dimensions,} from 'react-native';
import {Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NextButton from '../../utils/nextButton';
import BackButton from '../../utils/backButton';
import Logo from '../../utils/logo';
import * as actionTypes from '../../../Store/action';
import PhotoUpload from 'react-native-photo-upload';
import { RadioButton } from 'react-native-paper';

import {connect} from 'react-redux';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';


class EditSellerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      userName: 'Smith Adam',
      emailId: 'smith@test.com',
      mobileNumber: '(912) 727-3506',
      companyName:'XYZ Coffee Producers',
      checked:null,
      userNameError: false,
      emailIdError: false,
      companyNameError:false
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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
    this.props.onBottomTabClicked('profile');
    this.props.navigation.goBack();
    return true;
  }

  handleEditProfile = () => {
    if (
      this.state.mobileNumber !== null &&
      this.state.userName !== null &&
      this.state.emailId !== null
    ) {
      if(this.props.userType === null){
      this.props.navigation.navigate('OTP');
      }
      else{
        this.props.navigation.navigate('Seller Details');
      
      }
    } else {
      if (this.state.mobileNumber === null) {
        this.setState({mobileNumberError: true});
      } else {
        this.setState({mobileNumberError: false});
      }
      if (this.state.userName === null) {
        this.setState({userNameError: true});
      } else {
        this.setState({userNameError: false});
      }
      if (this.state.emailId === null) {
        this.setState({emailIdError: true});
      } else {
        this.setState({emailIdError: false});
      }
    }
  };

  render() {
    const { checked } = this.state;
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,        
        backgroundColor: '#efebea',    
        paddingTop:10,
        paddingBottom:10,  
        height:this.state.height + 30 
     
      },
      photoUploadContainer: {
              
        flexDirection:'row',      
        justifyContent:'flex-end',
 
     
      },
      EditProfileFormContainer: {
        width: '100%',
      },
      users: {},
      
      suggestionContainer: {
        paddingTop: 10,
        width: '100%',
      },
      checkBoxText:{
        fontFamily:'GothamLight',
        fontWeight:'normal',
        textAlignVertical:'center',
        fontSize:16
      }
    });

    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>     
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#95A5A6',}}>
        
        <View style={styles.photoUploadContainer}>    

        <PhotoUpload >
       
       <Image
         style={{width: 120,height: 120, borderWidth:0.25,borderColor:'#95A5A6',borderRadius:100   
         }}
         resizeMode="cover"
         source={require('../../../assets/Images/users/userPhotoUpload.png')}
        
       />
     </PhotoUpload>
     </View>
     
    
      </View>
          <View style={styles.EditProfileFormContainer}>
           
            <Input
              placeholder="Name"
              style={styles.inputStyle}
              value={this.state.userName}
              inputStyle={{fontFamily:'GothamMedium',fontSize:16}}
              onChangeText={userName => this.setState({userName})}
              errorMessage={
                this.state.userNameError === true
                  ? 'Enter the User Name'
                  : false
              }
            />
             <View style={{flexDirection: 'row',justifyContent:'flex-start',paddingBottom:10,paddingTop:10,paddingLeft:10,paddingRight:10}}>
                     
         <RadioButton
         color='#00aa00'
          value="male"
          
          status={checked === 'male' ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ checked: 'male' }); }}
        />
        <Text style={styles.checkBoxText}>
            Male
           </Text>
         <RadioButton
         color='#00aa00'
          value="female"
          status={checked === 'female' ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ checked: 'female' }); }}
        />
         <Text style={styles.checkBoxText}>
             Female
           </Text>
        </View>
            <Input
              placeholder="Email"
              style={styles.inputStyle}
              value={this.state.emailId}
              inputStyle={{fontFamily:'GothamMedium',fontSize:16}}
              onChangeText={emailId => this.setState({emailId})}
              errorMessage={
                this.state.emailIdError === true ? 'Enter the emailId' : false
              }
            />
            <Input
            disabled
              readOnly
              value={this.state.mobileNumber}
              style={styles.inputStyle}
              inputStyle={{fontFamily:'GothamMedium',fontSize:16}}
            />
            <Input
              placeholder="Company Name"
              style={styles.inputStyle}
              value={this.state.companyName}
              inputStyle={{fontFamily:'GothamMedium',fontSize:16}}
              onChangeText={companyName => this.setState({companyName})}
              errorMessage={
                this.state.companyNameError === true ? 'Enter the companyName' : false
              }
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
export default connect(mapStateToProps,mapDispatchToProps)(EditSellerProfile);
