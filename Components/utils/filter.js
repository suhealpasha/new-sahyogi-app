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
import * as actionTypes from '../../Store/action';
import {connect} from 'react-redux';

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
 this.props.onFiltering();
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
      },
      spinnerTextStyle: {
        color: '#7ea100',
      },
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
                <CheckBox  checked={this.props.filterNanoLotData} checkedColor='#7ea100' onPress={() =>this.props.onNanoLotProductsFiltered(!this.props.filterNanoLotData) }/><Text style={styles.checkBoxText}>Nanolots</Text>              
                <CheckBox checked={this.props.filterMicroLotData} checkedColor='#7ea100'  onPress={() =>this.props.onMicroLotProductsFiltered(!this.props.filterMicroLotData)} /><Text style={styles.checkBoxText}>Microlots</Text> 
              </View>
            </View>
          </View>
          
          
          <View
            style={styles.actionsCheckBox}
           > 
            <View style={{flexDirection: 'row',justifyContent:'flex-start',paddingBottom:0}}>
              <CheckBox  checked={this.props.filterFeaturedData} checkedColor='#7ea100' onPress={() =>this.props.onFeaturedProductsFiltered(!this.props.filterFeaturedData) }/><Text style={styles.checkBoxText}>Featured</Text>
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

const mapStateToProps = state => {
  return {
  filterFeaturedData:state.reducer.filterFeaturedData,
  filterOriginsData:state.reducer.filterOriginsData,
  filterNanoLotData:state.reducer.filterNanoLotData,
  filterMicroLotData:state.reducer.filterMicroLotData,
  filterVaritiesData: state.reducer.filterVaritiesData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onFeaturedProductsFiltered:  value =>
      dispatch({type: actionTypes.FILTER_FEATURED_DATA, payload: value}),  
      onNanoLotProductsFiltered:  value =>
      dispatch({type: actionTypes.FILTER_NANO_LOT_DATA, payload: value}),   
      onMicroLotProductsFiltered:  value =>
      dispatch({type: actionTypes.FILTER_MICRO_LOT_DATA, payload: value}),       
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
