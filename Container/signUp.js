import React, {Component} from 'react';
import {StyleSheet,TouchableWithoutFeedback,FlatList,Text,View,TextInput,Button,TouchableHighlight,Image,TochableOpacity,Alert,Dimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NextButton from '../Components/utils/nextButton';
import BackButton from '../Components/utils/backButton';
import Logo from '../Components/utils/logo';
import * as actionTypes from '../Store/action';
import {connect} from 'react-redux';
import PageTitle from '../Components/utils/pageTitle';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      checkedUser: false,
      userImageType1: require('../assets/Images/users/myUser.png'),
      userImageType2: require('../assets/Images/users/myUser.png'),
      user1BorderColor: '#95A5A6',
      user2BorderColor: '#95A5A6',
      u1: null,
      u2: null,
      errorMessage: false,
    };
  }

  resetState = () =>{
    this.setState({
      checkedUser: false,
      userImageType1: require('../assets/Images/users/myUser.png'),
      userImageType2: require('../assets/Images/users/myUser.png'),
      user1BorderColor: '#95A5A6',
      user2BorderColor: '#95A5A6',
      u1: null,
      u2: null,
      errorMessage: false,
    })
  }
  userClicked = u => {
    if (u === 'b') {
      this.setState({
        userImageType1: require('../assets/Images/users/myUserSelected.png'),
      });
      this.setState({
        userImageType2: require('../assets/Images/users/myUser.png'),
      });
      this.setState({user1BorderColor: '#7ea100'});
      this.setState({user2BorderColor: '#95A5A6'});
      this.setState({u1: true});
      this.setState({u2: false});
    } else {
      this.setState({
        userImageType2: require('../assets/Images/users/myUserSelected.png'),
      });
      this.setState({
        userImageType1: require('../assets/Images/users/myUser.png'),
      });
      this.setState({user1BorderColor: '#95A5A6'});
      this.setState({user2BorderColor: '#7ea100'});
      this.setState({u2: true});
      this.setState({u1: false});
    }
  };

 

  render() {
    

    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,  
        justifyContent:'center',
        display:'flex'  ,       
        height:this.state.height - 172
       },
      signInFormContainer: {
        width: '100%',
      },
      usersContainer: {
     
        paddingTop:10
      
      },
      users: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      user1: {
        resizeMode: 'cover',
        borderColor: this.state.user1BorderColor,
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
      },
      user2: {
        resizeMode: 'cover',
        borderColor: this.state.user2BorderColor,
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
      },
      userTextInactive: {
        fontFamily: 'GothamMedium',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
        color: '#95A5A6',
      },
      userTextActive: {
        fontFamily: 'GothamMedium',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
        color: '#7ea100',
      },
    });



    return (
      <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}}
      style={{backgroundColor:'#ffff'}} 
      scrollEnabled={true}>
        <PageTitle title="Register As" {...this.props} />      
        <View style={styles.container}>    
          <Logo />         
          <View style={styles.usersContainer}>
            <View style={styles.users}>
              <View style={styles.user1}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.userClicked('b');
                  }}>
                  <Image
                    style={{width: 120}}
                    source={this.state.userImageType1}
                  />
                </TouchableWithoutFeedback>
                <Text
                  style={
                    this.state.u1
                      ? styles.userTextActive
                      : styles.userTextInactive
                  }>
                  Buyer
                </Text>
              </View>
              <View style={styles.user2}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.userClicked('s');
                  }}>
                  <Image
                    style={{width: 120}}
                    source={this.state.userImageType2}
                  />
               
                </TouchableWithoutFeedback>
                <Text
                  style={
                    this.state.u2
                      ? styles.userTextActive
                      : styles.userTextInactive
                  }>
                  Seller
                </Text>
              </View>
            </View>
            {this.state.errorMessage ? (
              <Text
                style={{
                  color: '#a10723',
                  fontSize: 12,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}>
                Please Select the user type!
              </Text>
            ) : null}
          
            <NextButton  click={() => {
                if (this.state.u1 === null && this.state.u2 === null) {
                  this.setState({errorMessage: true});
                } else {
                  if (this.state.u1) {
                    this.resetState()
                    this.props.navigation.navigate('Register');
                  } else {
                    this.resetState()
                    this.props.onUserTypeClicked(null)
                    this.props.navigation.navigate('Seller Type');
                  }
                }
              }} color="#7ea100" label="Next"/>
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
  };
};
export default connect(null,mapDispatchToProps)( SignUp);
