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
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Exclamationcircle from 'react-native-vector-icons/AntDesign';

const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;

const itemHeight = 69;

class CompanyDetails extends Component {
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
        paddingLeft: 16,
        paddingRight: 16,
      },
      status:{
        backgroundColor:'#fff4e9',
        padding:10,
        textAlign:'center',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
      },
      statusText:{
        color:'#999999',
        fontFamily:'AvenirNextFont',
        fontSize:12,
        marginLeft:5
      }
    });

    return (
      <View style={{flex: 1.0, backgroundColor: '#ffff'}}>
         <ScrollView showsVerticalScrollIndicator={false}>
    
          <View style={styles.customerDetailsContainer}>
            <View style={styles.status}>
            <Exclamationcircle
                    name="exclamationcircle"
                    size={18}
                    color={'#ff0a0a'}
                  />
              <Text style={styles.statusText}>Satus: Verfiication Pending</Text>
              </View>
            <Text style={styles.label}>Comapny Name</Text>
            <TextInput
              style={styles.input}
              editable={false}
              defaultValue="Arjun Opticals"
            />
            <Text style={styles.label}>Company GSTIN No.</Text>
            <TextInput
              style={styles.input}
              editable={false}
              defaultValue="AVHJCOP19101"
            />
            <Text style={styles.label}>PAN Number</Text>
            <TextInput
              style={styles.input}
              editable={false}
              defaultValue="GPX90778"
            />
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={styles.input}
              editable={false}
              defaultValue="562001"
            />
            <Text style={styles.label}>Company Address</Text>
            <TextInput
              style={styles.input}
              editable={false}
              defaultValue="Finacre Small Finance Bank, Sarjapur Bangalore"
            />
            <Text style={styles.label}>Locality / Town</Text>
            <TextInput
              style={styles.input}
              editable={false}
              defaultValue="Bangalore"
            />
            <Text style={styles.label}>City / District</Text>
            <TextInput
              style={styles.input}
              editable={false}
              defaultValue="Bangalore"
            />
            <Text style={styles.label}>State</Text>
            <TextInput
              style={styles.input}
              defaultValue="Karnataka"
              editable={false}
            />
            <Text style={styles.label}>Udhyog Aadhar Number</Text>
            <TextInput
              style={styles.input}
              defaultValue="1234454567"
              editable={false}
            />
          </View>       
        </ScrollView>
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
)(CompanyDetails);
