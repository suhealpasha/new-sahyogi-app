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
  TouchableOpacity,
  Switch,
  TextInput,
} from 'react-native';
import {Input, ThemeConsumer} from 'react-native-elements';
import CheckBox from 'react-native-check-box';
import RupeeIcon from '../../utils/components/Icons/rupee';
import NumericInput from 'react-native-numeric-input';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/Octicons';
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../../../assets/api/api';

import {Label} from 'native-base';
import Close from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';

class SimilarItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      similarColor: [
        {id: 1, name: 'Light Blue Color', quantity: 0, price: 800,checked:false},
        {id: 2, name: 'Light Grey Color', quantity: 0, price: 800,checked:false},
        {id: 3, name: 'Gold Color', quantity: 0, price: 800,checked:false},
        {id: 4, name: 'Pink Color', quantity: 0, price: 800,checked:false},
        {id: 5, name: 'Black Color', quantity: 0, price: 800,checked:false},
        {id: 6, name: 'Silver Color', quantity: 0, price: 800,checked:false},
        {id: 7, name: 'Light Orange Color', quantity: 0, price: 800,checked:false},
      ],
    };
  }

  componentDidMount() {}

  componentWillUnmount() {
    // this.props.onProceed(false);
  }

  selectItem = (args,i) => {
    let items = this.state.similarColor;
    items[i].checked = items[i].checked ? ! items[i].checked : true
  this.setState({similarColor: items}); 

};

  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        backgroundColor: '#ffff',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        height: this.state.height,
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
      label: {
        fontFamily: 'AvenirNextLTPro-Regular',
        color: '#666666',
        padding: 5,
      },
    });

    return (
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomColor: '#e5e5e5',
          }}>
          <Text style={styles.title}>Same products with different colors</Text>
          <Close
            name="closecircle"
            size={24}
            color={'#ff7d01'}
            onPress={() => this.props.productProceedClose()}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={{paddingTop: 10}}>
            <Text style={styles.headerText}>{this.props.details.name}</Text>
            <Text style={styles.text} numberOfLines={2}>
              {this.props.details.detail}
            </Text>
            <FlatList
              data={this.state.similarColor}
              showsVerticalScrollIndicator={false}
              keyExtractor={items => {
                items.region_Id;
              }}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <CheckBox
                      onClick={() => this.selectItem(item.id, index)}
                      isChecked={item.checked}
                      checkedCheckBoxColor="#ff7d01"
                      checkBoxColor="#666666"
                    />
                    <View
                      style={{
                        backgroundColor: '#d8d8d8',
                        height: 80,
                        width: 100,
                        margin: 10,
                      }}
                    />
                    <View style={{display:'flex',height:80,justifyContent:'center'}}> 
                      <Text style={styles.label}>{item.name}</Text>
                      <View style={{display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:'#d8d8d8',width:80,paddingLeft:5,marginLeft:5}}>
                          <Text style={{fontFamily:'AvenirNextLTPro-Regular'}}>Qty:</Text>
                      <NumericInput
                        containerStyle={{border:'none'}}
                        type="up-down"
                        value={this.state.value}
                        onChange={value => this.setState({value})}
                        onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                        step={1}
                        upDownButtonsBackgroundColor='#d8d8d8'
                      
                        valueType="real"
                        rounded={false}
                        totalHeight={30}
                        totalWidth={50}
                        
                      />
                      </View>
                      <View style={{padding:5,display:'flex',flexDirection:'row',alignItems:'center'}}><RupeeIcon/><Text style={{paddingLeft:5,fontFamily:'AvenirNextLTPro-Regular'}}>{item.price}</Text></View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SimilarItems;
