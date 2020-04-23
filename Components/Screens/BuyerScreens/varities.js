import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
 CheckBox
} from 'react-native';
// import { CheckBox } from 'react-native-elements'
import {
  TouchableHighlight,
  TouchableOpacity,
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
import BottomNavigation from '../../BottomNavigation/bottomNavigation';
import ProductAction from '../../utils/productAction';
import RBSheet from 'react-native-raw-bottom-sheet';
import Filter from '../../utils/filter';
export default class Varities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked:null
    };
  }

  render() {
   
    const items = [
      {
      variety:'variety1'
      },
      {
        variety:'variety2'
      },
      {
        variety:'variety3'
      },
      {
        variety:'variety4'
      },
      {
        variety:'variety5'
      },
      {
        variety:'variety6'
      },
      {
        variety:'variety7'
      },
      {
        variety:'variety8'
      },
      {
        variety:'variety9'
      },
    
    ];

    return (
      <View style={{flex:1.0}}>
      <View style={styles.container}>
        <FlatList
          data={items}
          numColumns={1}
          // keyExtractor = {(items)=>{items.key}}

          renderItem={({item}) => {           
            return (
              <View style={{paddingTop:10,paddingBottom:10,borderBottomWidth:0.25,borderColor:'#95A5A6',flexDirection:'row'}}>
              <CheckBox />
            <Text title={item.variety}  style={{fontFamily:'GothamLight',fontWeight:'normal',textAlignVertical:'center'}} >{item.variety}</Text>
            </View>
            );
          }}
        />
    
      </View>
      <TouchableOpacity >
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
    backgroundColor:'white'
  },
  applyText:{
    textAlign:'center',
    fontFamily:'GothamMedium'
},
  
});
