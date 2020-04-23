import React, { Component } from 'react';
import {View,Text,  StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
class NextButton extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){

        return(
            <View style={styles.nextButtonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={this.props.click}>
              <Icon name="arrow-forward" color="white" size={30} />
            </TouchableOpacity>
          </View>
        );
    }
}

export default NextButton;
const styles = StyleSheet.create({
nextButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#3e708f',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#004561',
    borderRadius: 100,
    marginTop: 10,
    marginRight: 10,
  }
})