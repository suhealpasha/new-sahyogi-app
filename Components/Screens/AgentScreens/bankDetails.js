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
import RBSheet from 'react-native-raw-bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ScrollView} from 'react-native-gesture-handler';
import ActionButton from '../../utils/components/actionButton';
import {connect} from 'react-redux';
import StickyButton from '../../utils/components/stickyButtons';
import Exclamationcircle from 'react-native-vector-icons/AntDesign';
import AddBank from '../../utils/components/addBank';
import EditBank from '../../utils/components/editBank';
const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;

const itemHeight = 69;

class BankDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      edit:false,
      accounts:[{
        name:'HDFC BANK LTD',
        branch:'Sarjapura',
        ifsc:'HDFC879',
        primary:true,
        accno:8888888888888,
        image:'https://1000logos.net/wp-content/uploads/2021/06/HDFC-Bank-emblem.png'
      },
      {
        name:'CITI BANK LTD',
        branch:'Sarjapura',
        ifsc:'CITI879',
        primary:false,
        accno:7777777777777,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeZkZtV2IaAXZs_esYavpVS9dLeSOSU53yqQ&usqp=CAU'
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
    // this.props.onTabClicked('category');
    if (this.props.searchbar) {
      this.props.closeSearch();
    }
    return true;
  }

  closeAdd = async () =>{
    await this.setState({edit:false})
    this.RBSheet.close()
  }
  openAdd = async () =>{
    await this.setState({edit:false})
    this.RBSheet.open()
  }

  openEdit = async (args) =>{
    await this.setState({edit:true,name:args})
    this.RBSheet.open()
  }

  closeEdit = async () =>{
    await this.setState({edit:false})
    this.RBSheet.close()
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
        fontSize: 14,
        color: '#666666',
      },
      address:{
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomColor: '#c8c8c8',
        borderBottomWidth: 1,
      },
      status:{
        backgroundColor:'#fff4e9',
        padding:10,
        width:'100%',
        textAlign:'center',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:10
      },
      statusText:{
        color:'#999999',
        fontFamily:'AvenirNextFont',
        fontSize:12,
        marginLeft:5
      }
    });

    const account = this.state.accounts.map((i, index) => {
     
        return (
          <View style={styles.address}>
            <View
              style={{
                // display: 'flex',
                // flexDirection: 'row',
                // alignItems: 'center',
                // justifyContent: 'space-between',
              }}>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                  <View>
                <PhotoUpload
                 >
                  <Image
                    style={{
                      paddingVertical: 30,
                      width: 50,
                      height: 50,
                      borderRadius: 75,
                    }}
                    resizeMode="cover"
                    source={{
                      uri:i.image,
                    }}
                  />
                </PhotoUpload>
                </View>
                <View >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft:5
                }}>
                <Text style={styles.name}>{i.name}</Text>
                {i.primary ? 
                <Text style={{marginLeft: 10, fontSize: 12, color: '#00b030'}}>
                  (Primary Account)
                </Text>
                :
                null }
              </View>
              </View>
              
            </View>
            <Text style={styles.addressdetails}>Savings A/c No: {i.ifsc}</Text>
            <Text style={styles.addressdetails}>IFSC {i.ifsc}</Text>
            <Text style={styles.addressdetails}>{i.branch}</Text>
           
            <View
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              display:'flex',
              flexDirection:'row'
             
            }}>
            {/* <TouchableOpacity
              onPress={() => {
                this.RBSheet.open();
              }}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#ff7d01',
                padding: 10,
                marginRight:10,
               
              
              }}>
              <Text
                style={{
                  color: '#ff7d01',
                  fontSize: 12,
                  fontFamily: 'AvenirNextFont',
                  textAlign:'center'
                }}>
                Check Balance
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={()=>{this.openEdit(i.name)}}>
            <Text style={{fontFamily:'AvenirNextFont',fontSize:14,color:'#ff7d01',paddingTop:5}}>Make this Primary</Text>
              </TouchableOpacity>
           
          </View>
          </View>
          </View>
        );
    
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
                this.openAdd();
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
                Add New Bank Account
              </Text>
            </TouchableOpacity>
            <View style={styles.status}>
           
              <Text style={styles.statusText}>Note: Account will be refund in the given account only.</Text>
              </View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',paddingTop:10,width:'100%'}}>
            
            <Text style={{fontFamily:'AvenirNextFont',fontSize:18,textAlign:'left'}}>Linked Bank Accounts</Text>
            </View>
          </View>
          {account}
        
        </KeyboardAwareScrollView>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={
            this.state.edit
              ? this.state.height / 3 + 80
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
            {this.state.edit ?
            <EditBank 
            address={this.state.accounts}
            name={this.state.name}            
            close={() => {this.closeAdd()}}
            /> : <AddBank 
            address={this.state.accounts}
            close={() => {this.closeAdd()}}
            /> }   
           {this.state.edit ?
           <StickyButton
           cart={false}
           bank={true}          
           skip='Remove Bank'
           proceed="Make Primary"
           proceedClicked={this.addWishlist}
          
         />
           :<ActionButton buttonText={'Add New Bank Account'} product={false} address={false} account={true}/>}
        </RBSheet>
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
)(BankDetails);
