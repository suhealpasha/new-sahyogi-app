import React, {Component} from 'react';
import axios from 'axios';
import {StyleSheet,FlatList,Text,View,TextInput,Button,TouchableHighlight,Image,TochableOpacity,Alert,Dimensions,} from 'react-native';
import {Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NextButton from '../Components/utils/nextButton';
import BackButton from '../Components/utils/backButton';
import Logo from '../Components/utils/logo';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';


class SellerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
     company:null,
     tin:null,
     alternatePhone:null,
     address:null,
     companyError:false,
     tinError:false,
     alternatePhoneError:false,
     addressError:false
     
    };
  }
  handleRegister = () => {
    if (
      this.state.company !== null &&
      this.state.tin !== null &&
      this.state.alternatePhone !== null &&
      this.state.address !== null
    ) {
      this.props.navigation.navigate('OTP');
    } else {
      if (this.state.company === null) {
        this.setState({companyError: true});
      } else {
        this.setState({companyError: false});
      }
      if (this.state.tin === null) {
        this.setState({tinError: true});
      } else {
        this.setState({tinError: false});
      }
      if (this.state.alternatePhone === null) {
        this.setState({alternatePhoneError: true});
      } else {
        this.setState({alternatePhoneError: false});
      }
      if (this.state.address === null) {
        this.setState({addressError: true});
      } else {
        this.setState({addressError: false});
      }
    }
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,        
        backgroundColor: '#efebea',    
        paddingTop:10,
        paddingBottom:10,  
       
      },
      registerFormContainer: {
        width: '100%',
       
      },
      
    });

    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>    
        <BackButton {...this.props} />  
        <Logo />   
          <View style={styles.registerFormContainer}>
          <Text
              style={{
                fontFamily: 'Gotham Black Regular',
                color: '#004561',
                fontSize: 24,
                paddingLeft:10,
                paddingRight:10
              }}>
              Contact Details
            </Text>
            <Input
              placeholder="Company"
              style={styles.inputStyle}
              onChangeText={company => this.setState({company})}
              errorMessage={
                this.state.companyError === true
                  ? 'Enter the Company'
                  : false
              }
            />
            <Input
              placeholder="TIN"
              style={styles.inputStyle}
              onChangeText={tin => this.setState({tin})}
              errorMessage={
                this.state.tinError === true
                  ? 'Enter the TIN'
                  : false
              }
            />
            <Input
              placeholder="Alternate Phone"
              style={styles.inputStyle}
              onChangeText={alternatePhone => this.setState({alternatePhone})}
              errorMessage={
                this.state.alternatePhoneError === true
                  ? 'Enter the Alternate Phone number'
                  : false
              }
            />
            <Input
              placeholder="Address"
              style={styles.inputStyle}
              onChangeText={address => this.setState({address})}
              errorMessage={
                this.state.addressError === true
                  ? 'Enter the Address'
                  : false
              }
            />
            
            
          </View>
          <NextButton click={() => this.handleRegister()} />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default SellerDetails;
