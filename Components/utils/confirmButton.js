import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
class ConfirmButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={
            this.props.name === 'register'
              ? this.props.click
              : this.props.cancelOrder
          }>
          <Text style={styles.buttonTextStyle}>{this.props.buttonName}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ConfirmButton;
const styles = StyleSheet.create({
  nextButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom:10
    // justifyContent: 'flex-end',
  },
  loginButton: {
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#024262',
    borderRadius: 50,
    marginTop: 10,
    marginRight: 10,
  },
  buttonTextStyle: {
    color:'#fff',
    fontFamily:'GothamMedium',
    fontSize:18
  },
});
