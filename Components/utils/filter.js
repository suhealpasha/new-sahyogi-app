import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      microLotsChecked:false,
      nanoLotsChecked:false,
      featuredChecked:false
    };
  }

  _goto = (arg) =>{  
    this.props.navigation.navigate(arg)
    this.props.resetClickedIcon();
  }
  
filterOption =() =>{
  // this.props.onFiltering({...this.state})
}

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1.0,
      },
      FilterHeader: {
        backgroundColor: '#efebea',
        paddingBottom: 10,
        paddingTop: 10,
        width: this.state.width,
      },
      FilterHeaderText: {
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: 'GothamMedium',
      },
      actionContainer: {
        paddingLeft: 10,
        paddingRight: 10,
      },
      actions: {        
        borderBottomWidth: 0.25,
        borderBottomColor: '#95A5A6',
        paddingTop:10,
      },
      actionsCheckBox: {        
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
          fontFamily:'GothamMedium',
          
      },
      checkBoxText:{
        fontFamily:'GothamLight',
        fontWeight:'normal',
        textAlignVertical:'center'
      }
    });

    
    return (
        <View style={{flex:1.0}}>
      <View style={styles.container}>
        <View style={styles.FilterHeader}>
          <Text style={styles.FilterHeaderText}>Filter Option</Text>
        </View>
        <View style={styles.actionContainer}>        
          <TouchableNativeFeedback onPress={()=>{this._goto('Regions and Origins')}}>
            <View  style={styles.actions}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={styles.caption}>
              <Text style={styles.actionItemText}>Regions and Origins</Text>
            </View>
            <View>
                <Icon name="arrow-forward"size={20}/>
            </View>
            </View>
            </View>
          </TouchableNativeFeedback>          
          <TouchableNativeFeedback  onPress={()=>{this._goto('Varities')}}>
            <View style={styles.actions}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={styles.caption}>
              <Text style={styles.actionItemText}>Variety</Text>
            </View>
            <View>
                <Icon name="arrow-forward"size={20}/>
            </View>
            </View>
            </View>
          </TouchableNativeFeedback>
          <View style={styles.actionsCheckBox}>
            <View style={styles.caption}>
              <View style={{flexDirection: 'row',paddingBottom:0}}>
              <Text  style={styles.checkBoxText}>Lots:</Text>  
                <CheckBox checked={this.state.microLotsChecked} checkedColor='#00aa00' onPress={() => this.setState({microLotsChecked: !this.state.microLotsChecked})}/><Text style={styles.checkBoxText}>Microlots</Text>              
                <CheckBox checked={this.state.nanoLotsChecked} checkedColor='#00aa00'  onPress={() => this.setState({nanoLotsChecked: !this.state.nanoLotsChecked})} /><Text style={styles.checkBoxText}>Nanolots</Text> 
              </View>
            </View>
          </View>
          
          
          <View
            style={styles.actionsCheckBox}
            onPress={() => this._logout()}>
 
            <View style={{flexDirection: 'row',justifyContent:'flex-start',paddingBottom:0}}>
              <CheckBox  checked={this.state.featuredChecked} checkedColor='#00aa00' onPress={() => this.setState({featuredChecked: !this.state.featuredChecked})}/><Text style={styles.checkBoxText}>Featured</Text>
             
                
            
            </View>
          </View>
        
        </View>
      </View>
      <View style={{paddingBottom:15,paddingTop:10}}>
          <TouchableOpacity onPress = {this.filterOption}>
              <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
      </View>
      </View>
    );
  }
}

export default Filter;
