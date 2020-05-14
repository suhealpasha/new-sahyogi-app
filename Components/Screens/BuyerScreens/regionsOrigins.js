import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
 BackHandler
} from 'react-native';
// import { CheckBox } from 'react-native-elements'
import {
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import {CheckBox} from 'react-native-elements';
import axios from 'axios';
import * as api from '../../../assets/api/api';
import Spinner from 'react-native-loading-spinner-overlay';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';

class RegionsOrigins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,      
      allRegionsOriginsData: [],     
      selectedParent: null,    
      checkedItems: [],
      check: {},  

    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  async componentDidMount() {
    await this.props.allRegionsData.filter(item => {
      this.fetchOrigins(item.region_Id, item.name);
    });
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

   fetchOrigins = async (args, args2) => {
    this.setState({spinner: true});
    let data = JSON.stringify({
      region_Id: args,
    });
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    axios
      .post(api.originsByIdAPI, data, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        const item = {[args2]: res.data.data !== [] ? res.data.data : null};
        this.setState({
          spinner: false,
          allRegionsOriginsData: [...this.state.allRegionsOriginsData, item],
        });
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  };

  checkBox_Test = id => {
    let checkCopy = {...this.state.check};
    if (checkCopy[id]) {
      checkCopy[id] = false;
      this.setState((state, props) => {
        Object.values(state.allRegionsOriginsData[id]).map(i => {
          i.isChecked = false;
          i.map(j => {
            j.isChecked = false;
          });
        });
        return {
          allRegionsOriginsData: state.allRegionsOriginsData,
        };
      });
    } else checkCopy[id] = true;
    this.setState({check: checkCopy});
  };

  child_checkBox_Test = (id, parentId) => {
    if (this.state.check[parentId] === true) {
      const checkCopy = {...this.state.check};
      checkCopy[parentId] = false;
      this.setState({check: checkCopy});
    }

    this.setState((state, props) => {
      Object.values(this.state.allRegionsOriginsData[parentId]).map(i => {        
        i[id].isChecked = !i[id].isChecked;
      });

      return {
        allRegionsOriginsData: state.allRegionsOriginsData,
      };
    });
  };

  filterOrigins = () => {   
    let checkList=[]    
    this.state.allRegionsOriginsData.map((i,j) =>{
      {j in this.state.check ? this.state.check[j]
        ?      
        Object.values(this.state.allRegionsOriginsData[j]).map(k=>{
         k.map(l=>{
           checkList.push(l.origin_Id)
         })
        })
        :       
        Object.values(this.state.allRegionsOriginsData[j]).map(k=>{
          k.map(l=>{
            if(l.isChecked){
              checkList.push(l.origin_Id)
            }
          })
        })
     
       
        : Object.values(i).map(j =>{          
          j.map(k=>{
            if(k.isChecked){
              checkList.push(k.origin_Id)
            }
          })
        })
      }
      
    })
    this.props.onFilterOriginsData(checkList)
   this.props.navigation.navigate('Listing')
  };

  render() {
    let checkboxList = this.state.allRegionsOriginsData.map((item, i) => {
      return (
        <View>         
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                onPress={() => this.checkBox_Test(i)}
                checked={this.state.checked ? this.state.checked : this.state.check[i]}
                checkedColor="#00aa00"
              />

              <Text style={styles.checkBoxText}>{Object.keys(item)}</Text>
            </View>
            <View>
              {this.state.selectedParent === null ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState({selectedParent: i});
                  }}>
                  <Icon name="keyboard-arrow-down" size={24} />
                </TouchableWithoutFeedback>
              ) : i === this.state.selectedParent ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState({selectedParent: null});
                  }}>
                  <Icon name="keyboard-arrow-up" size={24} />
                </TouchableWithoutFeedback>
              ) : (
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState({selectedParent: null});
                  }}>
                  <Icon name="keyboard-arrow-down" size={24} />
                </TouchableWithoutFeedback>
              )}
            </View>
          </View>
          {this.state.selectedParent !== null && i === this.state.selectedParent
            ? Object.values(this.state.allRegionsOriginsData[i]).map(
                (nestedItem, j) => {
                  return nestedItem.map((k, l) => {
                    return (
                      <View style={styles.nestedCheckboxContainer}>
                        <CheckBox
                          onPress={() => this.child_checkBox_Test(l, i)}
                          checked={
                            this.state.check[i]
                              ? this.state.check[i]
                              : nestedItem[l].isChecked
                          }
                          checkedColor="#00aa00"
                        />
                        <Text style={styles.nestedCheckBoxText}>{k.name}</Text>
                      </View>
                    );
                  });
                },
              )
            : null}
        </View>
      );
    });

    return (
      <View style={{flex:1.0}}>
         <Spinner
              visible={this.state.spinner}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
        <KeyboardAwareScrollView resetScrollToCoords={{x: 0, y: 0}}
        style={styles.container}
        scrollEnabled={true} >           
      <View style={{}}>{checkboxList}</View> 
      </KeyboardAwareScrollView>
      <TouchableOpacity  onPress={this.filterOrigins}>
         <Text style={{paddingBottom:20,paddingTop:20,textAlign:'center',color:'#004561',textAlign:'center', fontSize:14,fontFamily:'GothamMedium',textAlignVertical:'center'}}>Apply</Text>
       </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10, 
    backgroundColor: '#efebea'

  },
  applyText:{
    textAlign:'center',
    fontFamily:'GothamMedium'
},
checkBoxText: {
  fontFamily: 'GothamLight',
},
nestedCheckboxContainer: {
  marginLeft: 10,
  flexDirection: 'row',
  alignItems: 'center',
},
nestedCheckBoxText: {
  fontFamily: 'GothamLight',
},
spinnerTextStyle: {
  color: '#00aa00',
},
  
});


const mapDispatchToProps = dispatch => {
  return {
    onFilterOriginsData: value =>
      dispatch({type: actionTypes.FILTER_ORIGINS_DATA, payload: value}),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(RegionsOrigins);