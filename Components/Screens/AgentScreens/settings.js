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
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import CheckBox from 'react-native-check-box';

const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;

const itemHeight = 69;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      notification: false,
      imageQty: false,
      controlFlow: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props.searchbar);
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
      settings: {
        backgroundColor: '#fff4e9',
        width: this.state.width - 32,
        marginLeft: 16,
        marginRight: 16,

        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
      },
      heading: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
      },
      subheading: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333',
      },
      text: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 12,
        color: '#666666',
      },
    });

    return (
      <View style={{flex: 1.0, backgroundColor: '#ffff', alignItems: 'center'}}>
        <View style={{marginTop: 16}}>
          <View style={styles.settings}>
            <Text style={styles.heading}>Notification</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>
                This will not affect any order updates
              </Text>
              <CheckBox
                onClick={() =>
                  this.setState({notification: !this.state.notification})
                }
                isChecked={this.state.notification}
                checkedCheckBoxColor="#ff7d01"
                checkBoxColor="#666666"
              />
            </View>
          </View>
          <View style={styles.settings}>
            <Text style={styles.heading}>Optimized Experience</Text>

            <View>
              <Text style={styles.text}>For internet connection quality</Text>
            </View>
            <View style={{marginLeft: 20,marginTop:10}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text  style={styles.subheading}>Optimized Image Quality</Text>
                <CheckBox
                  onClick={() =>
                    this.setState({imageQty: !this.state.imageQty})
                  }
                  isChecked={this.state.imageQty}
                  checkedCheckBoxColor="#ff7d01"
                  checkBoxColor="#666666"
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text  style={styles.subheading}>Optimized Checkout Flow</Text>
                <CheckBox
                  onClick={() =>
                    this.setState({controlFlow: !this.state.controlFlow})
                  }
                  isChecked={this.state.controlFlow}
                  checkedCheckBoxColor="#ff7d01"
                  checkBoxColor="#666666"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.reducer.active,
    bottomTab: state.reducer.bottomTab,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_TAB, payload: value}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
