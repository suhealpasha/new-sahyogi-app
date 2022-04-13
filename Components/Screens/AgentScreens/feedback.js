import React, {Component} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Alert,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  Switch,
  TextInput,
  ImageBackground,
} from 'react-native';
import FeedbackIllustrationIcon from '../../utils/components/Icons/feedbackIllustration';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import Button from '../../utils/components/button';

const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;


const itemHeight = 69;

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props.searchbar)
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
    this.props.navigation.goBack(null);
    // this.props.onTabClicked('category');
    if (this.props.searchbar) {
      this.props.closeSearch();
    }
    return true;
  }


  render() {
    const styles = StyleSheet.create({
     header:{
       fontFamily:'AvenirNext-Medium',
       fontSize:16,
       marginTop:10,
       marginBottom:10,
       textAlign:'center',
       color:'#666666'
     },
     title:{
       color:'#333333',
       fontSize:18,
       fontFamily:'AvenirNext-Medium',
       textAlign:'center',
       fontWeight:'bold'
     }

    });

   

    return (
      <View style={{flex: 1.0, backgroundColor: '#ffff',alignItems:'center'}}>
        <View style={{marginTop:10}}>
        <FeedbackIllustrationIcon />
        <View>
          <Text style={styles.header}>We want your feedback</Text>
          <Text style={styles.title}>Love the App? Rate Us</Text>
        </View>
        <Button  title='Rate Now' marginTop='10'  walkthrough={false}/> 
        </View>
 
      </View>     
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.reducer.active,
    bottomTab:state.reducer.bottomTab
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_TAB, payload: value}),
  }
 
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feedback);
