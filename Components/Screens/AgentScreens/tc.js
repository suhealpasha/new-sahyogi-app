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
import TcIllustrationIcon from '../../utils/components/Icons/tcIllustration';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';


const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;


const itemHeight = 69;

class TC extends Component {
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
     

    });

   

    return (
      <View style={{flex: 1.0, backgroundColor: '#ffff',alignItems:'center'}}>
        <TcIllustrationIcon />
 
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
)(TC);
