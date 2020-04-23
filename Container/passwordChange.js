import React, {Component} from 'react';
import axios from 'axios';
import {
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BackButton from '../Components/utils/backButton';
import Logo from '../Components/utils/logo';
import ConfirmButton from '../Components/utils/confirmButton';

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      password: null,
      confirmPassword: null,
      passwordError: false,
      confirmPasswordError: false,
    };
  }
  handleRegister = () => {
    if (this.state.password !== null && this.state.confirmPassword !== null) {
      this.props.navigation.navigate('Home');
    } else {
      if (this.state.password === null) {
        this.setState({passwordError: true});
      } else {
        this.setState({passwordError: false});
      }
      if (this.state.confirmPassword === null) {
        this.setState({confirmPasswordError: true});
      } else {
        this.setState({confirmPasswordError: false});
      }
    }
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        paddingLeft: 10,
        paddingRight: 10,
        height: this.state.height,
        flexDirection: 'column',
        justifyContent: 'flex-start',
      },
      registerFormContainer: {
        width: '100%',
        paddingLeft:10,
        paddingRight:10
      },
      users: {},
      inputStyle: {},
      suggestionContainer: {
        paddingTop: 10,
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
                fontSize: 25,
              }}>
              Change Password
            </Text>
            <Input
              placeholder="Old Password"
              style={styles.inputStyle}
              secureTextEntry={true}
              onChangeText={oldPassword => this.setState({oldPassword})}
              errorMessage={
                this.state.passwordError === true ? 'Enter the Password' : false
              }
            />
            <Input
              placeholder="Enter Your Password"
              style={styles.inputStyle}
              secureTextEntry={true}
              onChangeText={password => this.setState({password})}
              errorMessage={
                this.state.passwordError === true ? 'Enter the Password' : false
              }
            />
            <Input
              placeholder="Confirm Your password"
              style={styles.inputStyle}
              secureTextEntry={true}
              onChangeText={confirmPassword => this.setState({confirmPassword})}
              errorMessage={
                this.state.confirmPasswordError === true
                  ? 'Confirm the password'
                  : false
              }
            />
          </View>
          <ConfirmButton click={() => this.handleRegister()} />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default PasswordChange;
