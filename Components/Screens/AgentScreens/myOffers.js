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
import * as actionTypes from '../../../Store/action';
import {connect} from 'react-redux';
import CheckBox from 'react-native-check-box';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;

const itemHeight = 69;

class MyOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      notification: false,
      imageQty: false,
      controlFlow: false,
      coupons:[
        {
          'off':'30% OFF',
          'code':'NAUTIC30',
          'date':'May 31 2020, 11:30:00 PM',
          'min':0,
          'id':1,
          'description':'Rs. 350 off on minimum purchase of Rs. 2499.0',
          'expired':false
        },
        {
          'off':'30% OFF',
          'code':'NAUTIC30',
          'date':'May 31 2020, 11:30:00 PM',
          'min':0,
          'id':2,
          'description':'Rs. 350 off on minimum purchase of Rs. 2499.0',
          'expired':false
        },
        {
          'off':'30% OFF',
          'code':'NAUTIC30',
          'date':'May 31 2020, 11:30:00 PM',
          'min':0,
          'id':3,
          'description':'Rs. 350 off on minimum purchase of Rs. 2499.0',
          'expired':false
        },
        {
          'off':'30% OFF',
          'code':'NAUTIC30',
          'date':'May 31 2020, 11:30:00 PM',
          'min':0,
          'id':4,
          'description':'Rs. 350 off on minimum purchase of Rs. 2499.0',
          'expired':false
        },
        {
          'off':'30% OFF',
          'code':'NAUTIC30',
          'date':'May 31 2020, 11:30:00 PM',
          'min':0,
          'id':5,
          'description':'Rs. 350 off on minimum purchase of Rs. 2499.0',
          'expired':false
        },
        {
          'off':'30% OFF',
          'code':'MAXULYU',
          'date':'May 31 2020',
          'min':0,
          'id':6,
          'description':'Rs. 350 off on minimum purchase of Rs. 2499.0',
          'expired':true
        },
        {
          'off':'30% OFF',
          'code':'MAXULYU',
          'date':'May 31 2020',
          'min':0,
          'id':6,
          'description':'Rs. 350 off on minimum purchase of Rs. 2499.0',
          'expired':true
        },
        {
          'off':'30% OFF',
          'code':'MAXULYU',
          'date':'May 31 2020',
          'min':0,
          'id':7,
          'description':'Rs. 350 off on minimum purchase of Rs. 2499.0',
          'expired':true
        }

      ]
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props.searchbar);
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
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    // this.props.onTabClicked('category');
    if (this.props.searchbar) {
      this.props.closeSearch();
    }
    return true;
  }




  render() {
    const styles = StyleSheet.create({
      coupons:{
        height:this.state.height / 2,
      marginBottom:10,
      marginTop:10,
        width:'100%',
      
      },
      settings: {
        backgroundColor: '#fff4e9',
        width: this.state.width - 32,
        marginLeft: 16,
        marginRight: 16,

        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
      },
      heading: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
      },
      subheading: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333',
      },
      text: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 12,
        color: '#666666',
      },
      expiryCoupons:{
        borderTopWidth:1,
        width:this.state.width - 32,
        borderTopColor:'#e5e5e5'
      },
      container:{
        paddingTop:10,
      },
      title:{
        fontFamily:'AvenirNext-Medium',
        fontSize:12,
        fontWeight:'bold'
      },
      expText:{
        width:120,
        textAlign:'center',
        fontSize:10,
        color:'#666666'
      }
      
    });

    let myOffers = [],expiredOffers = [];

    this.state.coupons.map((i,index)=>{
      if(!i.expired){
      myOffers.push(
        <View style={{marginRight:16,marginLeft:16,marginTop:16,backgroundColor:'#fff4e9',padding:20}}>
          <Text style={{color:'#ff7d01',fontFamily:'AvenirNext-Medium',fontSize:16,fontWeight:'bold'}}>{i.off}</Text>
          <View style={{display:'flex',flexDirection:'row'}}>
          <View><Text style={{fontFamily:'AvenirNext-Medium',fontSize:12,color:'#999999',marginTop:5}}>On Minum purchase of </Text></View>
          <Text style={{fontFamily:'AvenirNext-Medium',fontSize:12,marginTop:5}}>Rs.{i.min}</Text>
          </View>
         <View style={{display:'flex',flexDirection:'row'}}>
           <Text style={{fontFamily:'AvenirNext-Medium',fontSize:12,color:'#999999',marginTop:5}}>Code: </Text>
           <Text style={{fontFamily:'AvenirNext-Medium',fontSize:12,marginTop:5}}>{i.code}</Text></View> 
          <View style={{display:'flex',flexDirection:'row'}}>
          <Text style={{fontFamily:'AvenirNext-Medium',fontSize:12,color:'#999999',marginTop:5}}>Expiry Date: </Text>
          <Text  style={{fontFamily:'AvenirNext-Medium',fontSize:12,marginTop:5}}>{i.date}</Text>
            </View>
        </View>
      )
      }
    })
    this.state.coupons.map((i,index)=>{
      if(i.expired){
        expiredOffers.push(
          <View style={{backgroundColor:'#fff4e9',flexDirection:'row',padding:10,justifyContent:'space-around',borderTopWidth:1,borderTopColor:'#e5e5e5'}}>
            <Text style={styles.expText}>{i.code}</Text>
            <Text style={styles.expText}>{i.description}</Text>
            <Text style={styles.expText}>{i.date}</Text>
          </View>
        )
      }
    })

    return (
      <View style={{flex: 1.0, backgroundColor: '#ffff', alignItems: 'center'}}>
       <KeyboardAwareScrollView extraHeight={false} scrollEnabled={true} style={styles.coupons} showsVerticalScrollIndicator={false}>
         <View >
          {myOffers}
         </View>
 
       </KeyboardAwareScrollView>
       <KeyboardAwareScrollView extraHeight={false} scrollEnabled={true} showsVerticalScrollIndicator={false}>
         <View style={styles.expiryCoupons}>
           <View style={styles.container}>
           <Text style={{fontSize:18,fontWeight:'bold',fontFamily:'AvenirNext-Medium'}}>Expired Coupons</Text>
           <View style={{backgroundColor:'#fff4e9',marginTop:10}}>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',padding:10}}>
              <Text style={styles.title}>Coupon</Text>
              <Text style={styles.title}>Description</Text>
              <Text style={styles.title}>Exp. On</Text>
              </View>
              {expiredOffers}
           </View>
           </View>
        
         </View>
         
       </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.reducer.active,
    bottomTab: state.reducer.bottomTab,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_TAB, payload: value}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyOffers);
