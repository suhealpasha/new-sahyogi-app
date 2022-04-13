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
import PhotoUpload from 'react-native-photo-upload';
import * as actionTypes from '../../../Store/action';

import {connect} from 'react-redux';

const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;

const itemHeight = 69;

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
     
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
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
      label: {
        fontWeight: '600',
        paddingTop: 10,

        color: '#333333',
        fontFamily: 'AvenirNextFont',
        fontWeight: 'bold',
        fontSize: 14,
      },
      input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        fontSize: 14,
        fontFamily: 'AvenirNextFont',
        marginBottom: 10,
        padding: 0,
      },
      customerDetailsContainer: {
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#ffff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft:16,
        paddingRight:16
      },      
    });

    return (
      <View style={{flex: 1.0, backgroundColor: '#ffff'}}>
     <View style={styles.customerDetailsContainer}>
     
                <PhotoUpload
                  onPhotoSelect={avatar => {
                    if (avatar) {
                      console.log('Image base64 string: ', avatar);
                    }
                  }}>
                  <Image
                    style={{
                      paddingVertical: 30,
                      width: 100,
                      height: 100,
                      borderRadius: 75,
                    }}
                    resizeMode="cover"
                    source={{
                      uri:
                        'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ec595d45f39760007b05c07%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D989%26cropX2%3D2480%26cropY1%3D74%26cropY2%3D1564',
                    }}
                  />
                </PhotoUpload>
                <View style={{marginTop:110}}>
                <Text style={styles.label}>Customer Name </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Customer Name *"
                  defaultValue="Arjun Kapoor"
                  editable={false}
                />
                <Text style={styles.label}>Mobile No. </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Customer Mobile No. *"
                  defaultValue="+91-9999999999"
                  editable={false}
                />
                <Text style={styles.label}>Email ID </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Customer Email ID *"
                  defaultValue="arjun.kapoor@gmail.com"
                  editable={false}
                />
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
)(ProfileDetails);
