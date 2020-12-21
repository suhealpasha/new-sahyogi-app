
import React, { useState, useEffect, Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { HTMLView } from 'react-native-htmlview'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {HelperText,TextInput} from 'react-native-paper';

const STRIPE_PK = 'pk_test_gkEAGFAdUkkaZtIHSXbW1jCm00aS7wS0PA'


class PaymentView extends Component { 

    constructor(props) {
        super(props);
        this.state = {
        number:''
        }
      }
    
    

render(){
    return(
    <KeyboardAwareScrollView
    resetScrollToCoords={{x: 0, y: 0}}
    style={{backgroundColor: '#ffff',paddingTop:30}}
    scrollEnabled={true}>
      <View >
      <TextInput
          type="number"
          label="Card Number"            
          mode="flat"
          style={styles.inputFieldsStyle}              
          underlineColor="transparent"  
          under
          theme={{colors: {text: 'black', primary: 'grey'} ,  fonts: { medium: 'Open Sans' }}}
          spellCheck={false}
          autoCorrect={false}
          onChangeText={number =>
            this.setState({
              number,
              numberError: false,
              emailValidationError: false,
              invalidEmail:false,
            })
          }
                      
          value={this.state.number}
        />
  </View>
  </KeyboardAwareScrollView>)
}
    


    






}
 

export default PaymentView ;