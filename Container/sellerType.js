import React, {Component} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  TouchableWithoutFeedback,
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NextButton from '../Components/utils/nextButton';
import BackButton from '../Components/utils/backButton';
import Logo from '../Components/utils/logo';
import {CheckBox} from 'react-native-elements';
import * as actionTypes from '../Store/action';
import {connect} from 'react-redux';

class SellerType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      checkedUser: false,     
      user1BorderColor: '#95A5A6',
      user2BorderColor: '#95A5A6',
      user3BorderColor: '#95A5A6',
      u1:null,
      u2:null,
      u3:null,
    };
  }

  userClicked = (u) =>{
    if(u ==='p'){
     this.props.onSellerUserTypeClicked('Producer')   
     this.setState({user1BorderColor:'#00aa00'})
     this.setState({user2BorderColor:'#95A5A6'})
     this.setState({user3BorderColor:'#95A5A6'})
     this.setState({u1:true})
     this.setState({u2:false})
     this.setState({u3:false})
    }
    else if(u ==='d'){     
     this.props.onSellerUserTypeClicked('Distributor')    
     this.setState({user1BorderColor:'#95A5A6'})
     this.setState({user2BorderColor:'#00aa00'})
     this.setState({user3BorderColor:'#95A5A6'})
     this.setState({u2:true})
     this.setState({u1:false})
     this.setState({u3:false})
    }
    else{
      this.props.onSellerUserTypeClicked('Producer or Distributor')   
      this.setState({user3BorderColor:'#00aa00'})
      this.setState({user2BorderColor:'#95A5A6'})
      this.setState({user1BorderColor:'#95A5A6'})
      this.setState({u3:true})
      this.setState({u1:false})
      this.setState({u2:false})
    }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,        
      },
      signInFormContainer: {
        width: '100%',
      },
      usersContainer: {
        paddingTop: 10,
        paddingBottom: 10,
      },
      users: {
        flexDirection: 'column',
      
      },
      user1: {
        borderColor: this.state.user1BorderColor,
        borderWidth: 4,
        paddingTop: 10,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 10,
        borderRadius: 10,
       
      },
      user2: {
        borderColor: this.state.user2BorderColor,
        borderWidth: 4,
        paddingTop: 10,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 10,
        borderRadius: 10,
      
      },
      user3: {
        borderColor: this.state.user3BorderColor,
        borderWidth: 4,
        paddingTop: 10,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 10,
        borderRadius: 10,
      
      },
      userTextInactive: {
        fontFamily: 'Gotham Black Regular',
        fontSize: 14,
        textAlign: 'center',       
        color: '#95A5A6',
      },
      userTextActive: {
        fontFamily: 'Gotham Black Regular',
        fontSize: 14,
        textAlign: 'center',       
        color: '#00aa00',
      },
    });

    return (
      <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}} style={{ backgroundColor: '#efebea',}}
      scrollEnabled={false}>
        <View style={styles.container}>
          <BackButton {...this.props} />
          <Logo />
          <View style={styles.signInFormContainer}>
            <Text
              style={{
                fontFamily: 'Gotham Black Regular',
                color: '#004561',
                fontSize: 24,
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              Who are you?
            </Text>
          </View>
          <View style={styles.usersContainer}>
            <View style={styles.users}>
              <View style={{flexDirection:'row', justifyContent:'space-around',marginBottom:10}}>
              <View style={styles.user1}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.userClicked('p');
                  }}>
                  <Text
                    style={
                      this.state.u1
                        ? styles.userTextActive
                        : styles.userTextInactive
                    }>
                    Producer
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.user2}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.userClicked('d');
                  }}>
                  <Text
                    style={
                      this.state.u2
                        ? styles.userTextActive
                        : styles.userTextInactive
                    }>
                    Distributor
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              </View>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
              <View style={styles.user3}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.userClicked('p_d');
                  }}>
                  <Text
                    style={
                      this.state.u3
                        ? styles.userTextActive
                        : styles.userTextInactive
                    }>
                    Producer/Distributor
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              </View>
            </View>
            {this.state.errorMessage ? (
              <Text
                style={{
                  color: 'red',
                  fontSize: 12,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}>
                Please Select who you are!
              </Text>
            ) : null}
            <NextButton
              click={() => {
                if (this.state.u1 === null && this.state.u2 === null  && this.state.u3 === null) {
                  this.setState({errorMessage: true});
                } else {              
                  this.props.onUserTypeClicked('seller')
                  this.props.navigation.navigate('Register')                 
                }
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onUserTypeClicked: value =>
      dispatch({type: actionTypes.USER_TYPE, payload: value}),
    onSellerUserTypeClicked: value =>
      dispatch({type: actionTypes.SELLER_USER_TYPE, payload: value}),
  };
};
export default connect(null,mapDispatchToProps)(SellerType);
