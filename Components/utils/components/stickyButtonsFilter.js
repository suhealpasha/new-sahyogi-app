import { TrendingUpSharp } from '@material-ui/icons';
import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Dimensions,
  TouchableOpacity,
  AppRegistry,
  navigation,
  AsyncStorage,
} from 'react-native';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';

class StickyButtonFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
 
    };
  }

proceed = () =>{
  // this.props.onProceed(true);
}

  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      },

      skipButton: {
        
        borderColor: '#95A5A6',
        width: '50%',
        padding: 16,
        backgroundColor: '#ffffff',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
          width: 0,
          height: -5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6.27,

        elevation: 10,
      },
     
      proceedButton: {
        padding: 16,
        backgroundColor: '#ff7d01',
        width: '50%',
       
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
          width: 0,
          height: -5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6.27,

        elevation: 10,
      },
      skipText: {
        color: '#333333',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'AvenirNextFont',
      },
      proceedText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'AvenirNextFont',
      },
    });

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.skipButton} onPress={()=>this.props.clearAll()}>
          <Text style={styles.skipText}>{this.props.skip}</Text>
        
        </TouchableOpacity>
        <TouchableOpacity disabled = {this.props.state} style={this.props.disabled ? styles.proceedButtonDisabled : styles.proceedButton} onPress={!this.props.disabled ? ()=>{this.proceed()} : null} >
          <Text style={styles.proceedText}>{this.props.proceed}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onProceed: value =>
      dispatch({type: actionTypes.PROCEED_CLICKED, payload: value}),
   
};
}

export default connect(
  null,
  mapDispatchToProps,
)(StickyButtonFilter);
