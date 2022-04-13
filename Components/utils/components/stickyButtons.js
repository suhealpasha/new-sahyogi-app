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

class StickyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
 
    };
  }

  pressSkip = () =>{
    this.props.navigation.navigate('Home');    
    if(this.props.searchbar){
    this.props.clickedSearch();
    }
  }

  proceed =()=>{
   if(this.props.cart){
     console.log("YES CART")
   }
   else{
    this.props.navigation.navigate('Home');
    if(this.props.searchbar){
    this.props.clickedSearch();
    }
  }
  }

  proceedProduct = () =>{
    console.log("product proceed")
    this.props.proceedClicked()
  }


  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      //  position:'absolute',
      //  bottom:0,
      //  backgroundColor:'#ffff'
      },

      skipButton: {
        borderTopLeftRadius: 10,
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
       justifyContent:'center',
       display:'flex',
       alignContent:'center',
       alignItems:'center',
        elevation: 10,
      },
      proceedButtonDisabled:{
        padding: 16,
        backgroundColor: 'rgba(255, 125, 1, 0.6)',
        width: '50%',
        borderTopRightRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
          width: 0,
          height: -5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6.27,
        // opacity:0.25,
        elevation: 0.1,
      },
      proceedButton: {
        padding: 16,
        backgroundColor: '#ff7d01',
        width: '50%',
        borderTopRightRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
          width: 0,
          height: -5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6.27,
        display:'flex',
        alignContent:'center',
        alignItems:'center',
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
      skipExtraText:{
        color:'#ff7d01',
        fontSize:12,
        fontFamily: 'AvenirNextLTPro-Regular',
      }
    });

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.skipButton} onPress={this.props.skip === 'Skip' ? ()=>this.pressSkip():null}>
          {this.props.extra !== '' ?
          <View style={{display:'flex',flexDirection:'row',alignItems:'center',textAlign:'center',justifyContent:'space-around'}}>
          <Text style={styles.skipText}>{this.props.skip}</Text>
          <Text style={styles.skipExtraText}>{this.props.extra}</Text>
          </View>
          :
          <Text style={styles.skipText}>{this.props.skip}</Text>
          }
          
        </TouchableOpacity>
        <TouchableOpacity disabled = {this.props.state} style={this.props.disabled ? styles.proceedButtonDisabled : styles.proceedButton} onPress={ this.props.product ?  ()=>{this.proceedProduct()} : !this.props.disabled ? ()=>{this.proceed()} : null} >
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
)(StickyButton);
