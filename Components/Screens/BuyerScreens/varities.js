import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  BackHandler,
  AsyncStorage,
  TouchableNativeFeedback
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import * as api from '../../../assets/api/api';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


let filteredData =[]
class Varities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      checked: false,
      varitiesData:[],
      searchedData:[]
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount(){
    this.fetchVarities();
  }

  componentDidUpdate(prevProps,prevState){
    filteredData = this.state.varitiesData.filter(item => {
     const itemDataVariety = item.name.toUpperCase();    
     if (this.props.searchBarText) {
       const textData = this.props.searchBarText.toUpperCase();
       if(itemDataVariety.indexOf(textData) > -1){
         return itemDataVariety.indexOf(textData) > -1;
     }  
     }  
   });
   
   if(prevProps.searchBarText !== this.props.searchBarText ){
     this.setState({searchedData:filteredData})
   }
 }

  fetchVarities = async () =>{
    this.setState({spinner:true})    
    const access_token = await AsyncStorage.getItem('isLoggedIn');   
    axios
      .get(api.varitiesAPI,{
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        this.setState({spinner:false,varitiesData: res.data.data});
      })
      .catch(err => {
        this.setState({spinner:false})
        console.log(err);
      });
  
  }

  componentWillMount() {
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
   this.props.onClickedIcon()
  }
  handleBackButtonClick() {    
    this.props.navigation.goBack(null);
    return true;
  } 

  handleAllChecked = async () => {
    await this.setState({checked: !this.state.checked});
    let items = this.state.varitiesData;
    items.forEach(item => (item.checked = this.state.checked));
    this.setState({varitiesData: items});
  };

  selectVarities = args => {
    this.setState({checked: false});
    let items = this.state.varitiesData;
    items.forEach(item => {
      if (item.verity_Id === args)
        if (item.checked === true) {
          return (item.checked = false);
        } else {
          return (item.checked = true);
        }
    });
    this.setState({varitiesData: items});
  };

  filterVarities = () => {   
    let checkList=[]
    if(this.state.checked){
      this.state.varitiesData.filter(item =>{
        checkList.push(item.verity_Id)
      })
    }
   else{
      this.state.varitiesData.filter(item =>{
       if(item.checked || item.checked === true){
        checkList.push(item.verity_Id)
       }
     })
   }
   this.props.onFilterVaritiesData(checkList)
   this.props.navigation.navigate('Listing')
  };

  render() {
      return (
      <View style={{flex: 1.0 ,backgroundColor: '#7ea100',}}>
     <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}}
        style={{backgroundColor: '#f8f8f8',paddingLeft:10,paddingRight:10,borderTopRightRadius: 30,
        borderTopLeftRadius: 30,}}
        scrollEnabled={true} >   
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}         
        />
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingTop:10}}>
      
      <Text style={{fontFamily:'GothamMedium',paddingLeft:5,paddingBottom:10,}}>Select Varities</Text>
      
          <CheckBox
            title={<Text style={{fontSize:14,fontFamily:'GothamMedium',marginRight:4}}>Select All</Text>}
            iconRight
            size={25}
            checked={this.state.checked}
            containerStyle={{         
              marginLeft: 0,
              marginTop: 0,
              marginBottom: 0,
              width:105,
              backgroundColor:'#f8f8f8',
          shadowOpacity: 0,
              borderWidth: 0
           
            }}
            checkedColor={'#7ea100'}
            onPress={this.handleAllChecked}
          />
          </View>
          <FlatList
           data={!this.props.searchBarShow ? this.state.varitiesData : this.state.searchedData}
            numColumns={1}
            style={{padingLeft:10,paddingRight:10}}
            // keyExtractor = {(items)=>{items.key}}

            renderItem={({item}) => {
              return (
                  <TouchableNativeFeedback  onPress={() => this.selectVarities(item.verity_Id)}>
                <View
                  style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderBottomWidth: 0.25,
                    borderColor: '#95A5A6',
                    flexDirection: 'row',
                  }}>
                  <CheckBox
                    checkedColor={'#7ea100'}
                    checked={this.state.checked || item.checked}
                    onPress={() => this.selectVarities(item.verity_Id)}
                  />
                  <Text
                    title={item.name}
                    style={{
                      fontFamily: 'GothamLight',
                      fontWeight: 'normal',
                      textAlignVertical: 'center',
                    }}>
                    {item.name}
                  </Text>
                </View>
                </TouchableNativeFeedback>
              );
            }}
          />
        </KeyboardAwareScrollView>   
        <TouchableWithoutFeedback onPress={this.filterVarities}>
          <Text
            style={{
              paddingBottom: 20,
              paddingTop: 20,
              textAlign: 'center',
              color: '#004561',
              textAlign: 'center',
              fontSize: 14,
              fontFamily: 'GothamMedium',
              textAlignVertical: 'center',
              backgroundColor: '#f8f8f8'
            }}>
            Apply
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,   
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  applyText: {
    textAlign: 'center',
    fontFamily: 'GothamMedium',
  },
  spinnerTextStyle: {
    color: '#7ea100'
  }, 
});


const mapDispatchToProps = dispatch => {
  return {
    onFilterVaritiesData: value =>
      dispatch({type: actionTypes.FILTER_VARITIES_DATA, payload: value}),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Varities)