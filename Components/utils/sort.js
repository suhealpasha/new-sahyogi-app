import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,

  
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RadioButton } from 'react-native-paper';
class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      checked:null
    };
  }

  _goto = async (arg) =>{   
    await this.props.navigation.navigate(arg)
  }
  _goBack = () =>{
    this.props.test()
    this.props.navigation.goBack(null)
  }

  sortOption = (args) =>{
    this.setState({checked:args})
    this.props.onSorting(args)
  }

  render() {
    const { checked } = this.state;

    const styles = StyleSheet.create({
      container: {
        flex: 1.0,
      },
      sortHeader: {
        backgroundColor: '#efebea',
        paddingBottom: 10,
        paddingTop: 10,
        width: this.state.width,
      },
      sortHeaderText: {
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: 'GothamMedium',
      },
      actionContainer: {
        paddingLeft: 10,
        paddingRight: 10,
      },
      actions: {
        paddingTop: 10,
        borderBottomWidth: 0.25,
        borderBottomColor: '#95A5A6',
      },

      actionItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      caption: {
      
       
      },
      actionItemText: {
        paddingBottom: 15,
        paddingTop:4,
        fontFamily: 'GothamLight',
        fontSize: 14,
       
      },
      applyText:{
          textAlign:'center',
          fontFamily:'GothamMedium'
      },
      checkBoxText:{
        fontFamily:'GothamLight',
        fontWeight:'normal',
        textAlignVertical:'center'
      }
    });
    return (
       
      <View style={styles.container}>
        <View style={styles.sortHeader}>
          <Text style={styles.sortHeaderText}>Sort By</Text>
        </View>
        <View style={styles.actionContainer}>
         
         <View style={{flexDirection: 'row',justifyContent:'space-between',paddingBottom:10}}>
           <Text style={styles.checkBoxText} onPress={()=>this.sortOption('first')}>
             Popularity
           </Text>
         <RadioButton
         color='#00aa00'
          value="first"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={()=>this.sortOption('first')}
        />
        </View>
        <View style={{flexDirection: 'row',justifyContent:'space-between',paddingBottom:10}}>
           <Text style={styles.checkBoxText}  onPress={()=>this.sortOption('second')}>
            Newest First
           </Text>
         <RadioButton
         color='#00aa00'
          value="second"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={()=>this.sortOption('second')}
        />
        </View>
        <View style={{flexDirection: 'row',justifyContent:'space-between',paddingBottom:10}}>
           <Text style={styles.checkBoxText} onPress={()=>this.sortOption('third')}>
            Ratings -- high to low
           </Text>
         <RadioButton
         color='#00aa00'
          value="third"
          status={checked === 'third' ? 'checked' : 'unchecked'}
          onPress={()=>this.sortOption('third')}
        />
        </View>
        <View style={{flexDirection: 'row',justifyContent:'space-between',paddingBottom:10}}>
           <Text style={styles.checkBoxText} onPress={()=>this.sortOption('forth')}>
            Ratings -- low to high
           </Text>
         <RadioButton
         color='#00aa00'
          value="forth"
          status={checked === 'forth' ? 'checked' : 'unchecked'}
          onPress={()=>this.sortOption('forth')}
        />
        </View>
        <View style={{flexDirection: 'row',justifyContent:'space-between',paddingBottom:10}}>
           <Text style={styles.checkBoxText} onPress={()=>this.sortOption('fifth')}>
            Alphabetical
           </Text>
         <RadioButton
         color='#00aa00'
          value="fifth"
          status={checked === 'fifth' ? 'checked' : 'unchecked'}
          onPress={()=>this.sortOption('fifth')}
        />
        </View>
        
        </View>
      </View>
      
   
    );
  }
}

export default Sort;
