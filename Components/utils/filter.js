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

import {TouchableNativeFeedback, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as actionTypes from '../../Store/action';
import {connect} from 'react-redux';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import StickyButtonFilter from '../utils/components/stickyButtonsFilter';
import SubFilter from './subFilter';
const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;


const itemHeight = 69;

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      activeFilter:'Sizes',
     filter:[{'name':'Sizes'},{'name':'Color'},{'name':'Brand'},{'name':'Categories'},{'name':'Price Range'},{'name':'Discount'},{'name':'Rating'},{'name':'Sole Material'},{'name':'Pattern'},{'name':'Type'},{'name':'Toe Shape'},{'name':'Warrenty'},{'name':'Material'},{'name':'Shoe Width'},{'name':'Ankle Height'},{'name':'Insole'}],
     subFilter:[
      {id:1,checked:false,'name':'uk11'},
      {id:2,checked:false,'name':'uk10'},
      {id:3,checked:false,'name':'uk9'},
      {id:4,checked:false,'name':'uk8'},
      {id:5,checked:false,'name':'uk7'},
      {id:6,checked:false,'name':'uk6'},
      {id:7,checked:false,'name':'uk5'},
      {id:8,checked:false,'name':'uk5.5'}
     ]
    
    };
  }
  

  componentDidMount() {

  }
  

  functionHandler = async(args) =>{
     await this.setState({activeFilter:args})
     if(args === 'Sizes'){
       this.setState({subFilter:[
         {id:1,checked:false,'name':'uk11'},
         {id:2,checked:false,'name':'uk10'},
         {id:3,checked:false,'name':'uk9'},
         {id:4,checked:false,'name':'uk8'},
         {id:5,checked:false,'name':'uk7'},
         {id:6,checked:false,'name':'uk6'},
         {id:7,checked:false,'name':'uk5'},
         {id:8,checked:false,'name':'uk5.5'}
        ]})
     }
     else if (args === 'Brand'){
       this.setState({subFilter:[{'name':'Puma'},{'name':'Roadster'},{'name':'HRX'},{'name':'Nike'},{'name':'Pepe Jeans'},{'name':'Roadster'},{'name':'Adidas'},{'name':'Manyavaar'}]})
     }
     else{
       this.setState({subFilter:null})
     }   
  }

  selectItem = (args,i) => {
      let items = this.state.subFilter;
      items[i].checked = items[i].checked ? ! items[i].checked : true
    this.setState({subFilter: items}); 
 
  };

  clearAll = ()=>{    
    let items = this.state.subFilter;
    items.forEach(item => {  
          return (item.checked = false);        
    });
    this.setState({subFilter: items});   
  }

  render() {
    const styles = StyleSheet.create({
      container:{
        height:this.state.height - 115,
        display:'flex',
        flexDirection:'row',
        backgroundColor:'#f0f0f0'
      },
      left:{
        width:this.state.width / 2 - 30
      },
      right:{
        width:this.state.width / 2 + 30,
        backgroundColor:'#ffff'
      },
      categoriesMenu:{
        padding:16,
        borderBottomWidth:1,
        borderBottomColor:'#c8c8c8'
      },
      categoriesMenuActive:{
        padding:16,
        borderBottomWidth:1,
        borderBottomColor:'#ff7d01',
        backgroundColor:'#ff7d01'
      },
      codeText:{
        color:'#666666',
        fontFamily:'AvenirNextFont',
        fontSize:14
      },
      codeTextActive:{
        color:'#ffff',
        fontFamily:'AvenirNextFont',
        fontSize:14
      }
    });

   

    return (
     
      <View style={{flex: 1.0, backgroundColor: '#ffff'}}>
        <View style={styles.container}>
        <View style={styles.left}>
        <FlatList
            data={this.state.filter}           
          showsVerticalScrollIndicator={false}
            keyExtractor={items => {
              items.region_Id;
            }}
            renderItem={({item}) => {
              return (
                <TouchableNativeFeedback
                  style={this.state.activeFilter === item.name ? styles.categoriesMenuActive :styles.categoriesMenu}
                   onPress={() => this.functionHandler(item.name)}
                >                
                  <Text style={this.state.activeFilter === item.name ? styles.codeTextActive : styles.codeText}>{item.name}</Text>
                </TouchableNativeFeedback>
              );
            }}
          />
        </View>
        <View style={styles.right}>
          <SubFilter subFilter={this.state.subFilter} selectItem = {(id,index)=>{this.selectItem(id,index)}} {...this.props}/>
        </View>
        </View>
        <StickyButtonFilter
          skip="Clear All"
          proceed="Apply"          
          disabled={this.state.disabled}
          clearAll={this.clearAll}
        />
      </View>
    );
  }
}


export default Filter;
