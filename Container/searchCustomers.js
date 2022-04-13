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
} from 'react-native';

import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import StickyButton from '../Components/utils/components/stickyButtons';
import * as actionTypes from '../Store/action';
import {connect} from 'react-redux';
import CustomerInformation from './customerInformation';
import EditCustomerInformation from './editCustomerinformation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import ActionButton from '../Components/utils/components/actionButton';
import DoubleClick from 'react-native-double-tap';
import Toast from 'react-native-simple-toast';
class SearchCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      select: null,
      disabled: true,
      doubletap:false,
      exitCounter:0
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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
  }
  async handleBackButtonClick() {   
    await this.setState({exitCounter:this.state.exitCounter+1})
  
    if(this.state.exitCounter === 2){
    BackHandler.exitApp();
    return true;
    }
  }
  
  componentDidUpdate(prevProps,prevState){
   
    if(this.props.proceedButton){
    this.RBSheet.open();
    }
    else{
      this.RBSheet.close(); 
    }    
  }
  

  select = async arg => {
    await this.setState({select: arg, disabled: false});
  };

 

  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        backgroundColor: '#ffff',
  
        // height:this.state.height - 136
      },

      text: {
        color: '#333333',
        fontFamily: 'AvenirNextFont',
        fontSize: 14,
        fontWeight: '500',
      },
      label: {
        paddingTop: 16,
        paddingBottom:16,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
      },
      selectLabel: {
         paddingTop: 16,
        paddingBottom:16,
        backgroundColor: '#ffecdb',
      },
    });

   

    return (
      <View style={{flex:1}}>
         
        <KeyboardAwareScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={this.state.height - 68}
            duration={250}
            closeOnPressMask={false}
            customStyles={{
              container: {
                borderTopLeftRadius:10,
                borderTopRightRadius:10,
                             
              },
            }}> 
            {!this.props.editCustomerInfo ? <CustomerInformation /> : <EditCustomerInformation /> }         
            
            <ActionButton buttonText={!this.props.editCustomerInfo ? 'Edit' : 'Save' } product={false}/>
          </RBSheet>
          <FlatList
            data={this.props.searchText === '' ? this.props.customers : this.props.newData}
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              marginTop: 10,  
                        
            }}
            numColumns={1}
            keyExtractor={items => {
              items.key;
            }}
            renderItem={({item}) => {
              return (
                <DoubleClick
          singleTap={() => {
            Toast.show('Tap twice to view details')
          }}
          doubleTap={ () => this.props.onProceed(true)} 
          delay={300}
        >
                <TouchableNativeFeedback
                  style={
                    item.key === this.state.select
                      ? styles.selectLabel
                      : styles.label
                  }
                  onPress={() => {
                    this.select(item.key);
                  }}>
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableNativeFeedback>
                </DoubleClick>
              );
            }}
          />
        </KeyboardAwareScrollView>
       
        <StickyButton
          skip="Skip"
          proceed="Proceed"    
          product={false}      
          disabled={this.state.disabled}   
          clickedSearch = {()=>{this.props.clickedSearch()}}      
          {...this.props}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    proceedButton: state.reducer.proceedButton,    
    editCustomerInfo: state.reducer.editCustomerInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onProceed: value =>
      dispatch({type: actionTypes.PROCEED_CLICKED, payload: value}),   
};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchCustomer);
