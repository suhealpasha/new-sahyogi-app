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
import StickyButtonFilter from './components/stickyButtonsFilter';
import CheckBox from 'react-native-check-box'


const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;


const itemHeight = 69;

class SubFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      activeFilter:null,
     filter:[{'name':'Sizes'},{'name':'Color'},{'name':'Brand'},{'name':'Categories'},{'name':'Price Range'},{'name':'Discount'},{'name':'Rating'},{'name':'Sole Material'},{'name':'Pattern'},{'name':'Type'},{'name':'Toe Shape'},{'name':'Warrenty'},{'name':'Material'},{'name':'Shoe Width'},{'name':'Ankle Height'},{'name':'Insole'}],
   subFilter:[]
    };
  }

  componentDidMount() {
    this.setState({subFilter:this.props.subFilter})
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.subFilter != this.props.subFilter){
      this.setState({subFilter:this.props.subFilter})
    }
  }


  functionHandler = (args) =>{
    this.setState({activeFilter:args})
  }

  render() {
    const styles = StyleSheet.create({
     label:{
       fontSize:12,
       fontFamily:'AvenirNextFont',
       color:'#666666',
       paddingLeft:10
     }
    });

   

    return (
     
      <View style={{flex: 1.0, backgroundColor: '#ffff'}}>
       
        <FlatList
            data={this.state.subFilter}           
          showsVerticalScrollIndicator={false}
            keyExtractor={items => {
              items.region_Id;
            }}
            renderItem={({item,index}) => {
              return (
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',padding:10}}>
                  <CheckBox
                   onClick={()=>this.props.selectItem(item.id,index)} 
                   isChecked={item.checked }                  
                   checkedCheckBoxColor='#ff7d01'
                   checkBoxColor='#666666'
                   />
                <Text style={styles.label}>{item.name}</Text>
             
                </View>
              );
            }}
          />
       
      </View>
    );
  }
}


export default SubFilter;
