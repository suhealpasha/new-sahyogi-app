import React, {Component} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  FlatList,
  Alert,
  Dimensions,
  AsyncStorage,
  ImageBackground,
  TouchableOpacity,
  Switch,
  TextInput,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import AddAddress from '../../utils/components/addAddress';
import ActionButton from '../../utils/components/actionButton';
import Close from 'react-native-vector-icons/AntDesign';

class AgentAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      address:[{
        name:'Anuj',
        address:'Finacre Small Finance Bank, Sarjapur Bangalore, 568890,Karnataka.',
        type:'Office',
        status:true,
        mobile:888888888
      },
      {
        name:'Anuj',
        address:'Finacre Small Finance Bank, Sarjapur Bangalore, 568890,Karnataka.',
        type:'Home',
        status:false,
        mobile:888888888
      },{
        name:'Anuj',
        address:'Finacre Small Finance Bank, Sarjapur Bangalore, 568890,Karnataka.',
        type:'Other',
        status:false,
        mobile:888888888
      },{
        name:'Anuj',
        address:'Finacre Small Finance Bank, Sarjapur Bangalore, 568890,Karnataka.',
        type:'Office',
        status:false,
        mobile:888888888
      },{
        name:'Anuj',
        address:'Finacre Small Finance Bank, Sarjapur Bangalore, 568890,Karnataka.',
        type:'Other',
        status:false,
        mobile:888888888
      }
    ],
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
    if (this.props.searchbar) {
      this.props.closeSearch();
    }
    return true;
  }

 


  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1.0,
        backgroundColor: '#ffff',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
    
      },
      title: {
        fontFamily: 'AvenirNextFont',
        fontSize: 18,
        color: '#333333',
        fontWeight: '500',
      },
      productDetailsContainer: {
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#ffff',
        paddingTop: 10,
        paddingBottom: 10,
      },
      headerText: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 18,
        color: '#333333',
      },
      text: {
        fontFamily: 'AvenirNextLTPro-Regular',
        color: '#666666',
        fontSize: 12,
        width: '65%',
        letterSpacing: 1,
        paddingBottom: 10,
        paddingTop: 10,
      },
      lable: {
        fontFamily: 'AvenirNext-Medium',
        // padding:50,
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 30,
      },
      applay: {
        fontFamily: 'AvenirNextFont',
        color: '#ff7d01',
        fontSize: 14,
        fontWeight: '500',
      },
      inputContainer: {
        display: 'flex',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      address: {
        paddingBottom: 20,
        marginBottom: 20,
        borderBottomColor: '#c8c8c8',
        borderBottomWidth: 1,
      },
      address2: {
        paddingBottom: 20,
        marginBottom: 20,
        borderBottomColor: '#c8c8c8',
        borderBottomWidth: 1,
      },
      name: {
        fontFamily: 'AvenirNextFont',
        fontSize: 18,
        color: '#333333',
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
      },
      addressdetails: {
        fontFamily: 'AvenirNextFont',
        fontSize: 18,
        color: '#666666',
      },
      mobile:{
        fontFamily: 'AvenirNextFont',
        fontSize: 18,
        color: '#666666',
        fontWeight:'bold',
        marginLeft:5
      }
    });

    const default_address = this.state.address.map((i, index) => {
      if (i.status) {
        return (
          <View style={styles.address}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
              
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.name}>{i.name}</Text>
                <Text style={{marginLeft: 10, fontSize: 12, color: '#999999'}}>
                  (Default)
                </Text>
              </View>
              </View>
              
            </View>
            <Text style={styles.addressdetails}>{i.address}</Text>
            <View style={{display:'flex',flexDirection:'row'}}>
            <Text style={styles.addressdetails}>Mobile:</Text>
            <Text style={styles.mobile}>{i.mobile}</Text>
            </View>
            <View
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              display:'flex',
              flexDirection:'row'
             
            }}>
            <TouchableOpacity
              onPress={() => {
                this.RBSheet.open();
              }}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#ff7d01',
                padding: 10,
                marginRight:10,
                width:70,
              
              }}>
              <Text
                style={{
                  color: '#ff7d01',
                  fontSize: 12,
                  fontFamily: 'AvenirNextFont',
                  textAlign:'center'
                }}>
                Remove
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.RBSheet.open();
              }}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#ff7d01',
                padding: 10,
                width:70,
              }}>
              <Text
                style={{
                  color: '#ff7d01',
                  fontSize: 12,
                  fontFamily: 'AvenirNextFont',
                  textAlign:'center'
                }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          </View>
        );
      }
    });

    const other_address = this.state.address.map((i, index) => {
      if (!i.status) {
        return (
          <View style={styles.address2}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start'}}>
             
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.name}>{i.name}</Text>
              
              </View>
              </View>
              
            </View>
            <Text style={styles.addressdetails}>{i.address}</Text>
            <View style={{display:'flex',flexDirection:'row'}}>
            <Text style={styles.addressdetails}>Mobile:</Text>
            <Text style={styles.mobile}>{i.mobile}</Text>
          
            </View>
            <TouchableOpacity>
            <Text style={{fontFamily:'AvenirNextFont',fontSize:14,color:'#ff7d01',paddingTop:5}}>Make this Default</Text>
              </TouchableOpacity>
          </View>
        );
      }
    });

    return (
      <View style={styles.container}>
       
        <KeyboardAwareScrollView  showsVerticalScrollIndicator={false} >
          <View
            style={{
              paddingTop: 10,
              paddingBottom: 20,
              alignItems: 'center',
              marginBottom: 10,
              marginTop: 10,
              marginBottom: 20,
              borderBottomColor: '#c8c8c8',
              borderBottomWidth: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.RBSheet.open();
              }}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#ff7d01',
                padding: 10,
              }}>
              <Text
                style={{
                  color: '#ff7d01',
                  fontSize: 12,
                  fontFamily: 'AvenirNextFont',
                }}>
                Add New Address
              </Text>
            </TouchableOpacity>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',paddingTop:10,width:'100%'}}>
            <Text style={{fontFamily:'AvenirNextFont',fontSize:18,textAlign:'left'}}>Default Address</Text>
            </View>
          </View>
          {default_address}
          <Text style={{fontFamily:'AvenirNextFont',fontSize:18}}>Other Address</Text>
          {other_address}
        </KeyboardAwareScrollView>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={
            this.state.removeItems
              ? this.state.height / 3 + 20
              : this.state.height - 50
          }
          duration={250}
          closeOnPressMask={false}
          customStyles={{
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
          }}>

            <AddAddress 
            address={this.state.address}
            close={() => {this.RBSheet.close()}}
            />
         
      
         <ActionButton buttonText={'Add Address'} product={false} address={true}/>
        </RBSheet>
      </View>
    );
  }
}

export default AgentAddress;
