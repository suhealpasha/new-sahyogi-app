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
import Bottomnavigation from '../../BottomNavigation/bottomNavigation';
import * as actionTypes from '../../../Store/action';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {connect} from 'react-redux';
import {RadioButton} from 'react-native-paper';

const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;

const itemHeight = 69;

class AddCustomer extends Component {
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
      
      },  
      title: {
        fontFamily: 'AvenirNextFont',
        fontSize: 18,
        color: '#333333',
        fontWeight: '500',
        // paddingLeft:10,
        // paddingRight:10
      },    
    });

    return (
      <View style={{flex: 1.0, backgroundColor: '#ffff'}}>
      <KeyboardAwareScrollView>
      <View style={{paddingTop: 10,paddingLeft:16,paddingRight:16}}>
            <View style={{paddingTop: 10, paddingBottom: 10}}>
              <Text style={styles.title}>Personal Details</Text>
              <View style={styles.customerDetailsContainer}>
                <Text style={styles.label}>Customer Nick Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your nick name"
                 
                />
                <Text style={styles.label}>Customer Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Customer Name *"
                  
                />
                <Text style={styles.label}>Customer Mobile No. *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Customer Mobile No. *"
                  
                />
                <Text style={styles.label}>Customer Email ID *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Customer Email ID *"
                  
                />
              </View>
            </View>
            <View style={{paddingTop: 10, paddingBottom: 10}}>
              <Text style={styles.title}>Company Details</Text>
              <View style={styles.customerDetailsContainer}>
                <Text style={styles.label}>Comapny Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Comapny Name *"
                  
                />
                <Text style={styles.label}>Company GSTIN No. *</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Company GSTIN No. *'
                  
                />
                <Text style={styles.label}>Pincode *</Text>
                <TextInput style={styles.input}
                placeholder="Pincode *"
                />
                <Text style={styles.label}>Company Address *</Text>
                <TextInput style={styles.input} 
                placeholder="Company Address *"
                />
                <Text style={styles.label}>Locality / Town *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Locality / Town *"
                  
                />
                <Text style={styles.label}>City / District *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="City / District *"
                  
                />
                <Text style={styles.label}>State *</Text>
                <TextInput style={styles.input} 
                
                placeholder="Enter state" />
                <Text style={styles.label}>
                  Shipping Address Same As Company Address
                </Text>
                <View style={{display: 'flex', flexDirection: 'row',justifyContent:'flex-start',marginLeft:-8}}>
                  <RadioButton
                    value="first"
                    color="#ff7d01"
                    defaultValue="first"
                    status='checked'
                    // status={
                    //   this.state.checked === 'first' ? 'checked' : 'unchecked'
                    // }
                    onPress={() => this.setState({checked: 'first'})}
                  />
                  <Text style={styles.label}>Yes</Text>
                  <RadioButton
                    color="#ff7d01"
                    value="second"
                    
                    status={
                      this.state.checked === 'second' ? 'checked' : 'unchecked'
                    }
                    onPress={() => this.setState({checked: 'second'})}
                  />
                  <Text style={styles.label}>No</Text>
                </View>
              </View>
            </View>
          </View>
      </KeyboardAwareScrollView>
      <Bottomnavigation {...this.props} closeSearch={()=>this.props.closeSearch()}/>
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
)(AddCustomer);
