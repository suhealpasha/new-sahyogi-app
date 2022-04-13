import {
  Toolbar,
  COLOR,
  ThemeContext,
  getTheme,
  BottomNavigation,
  Icon,
} from 'react-native-material-ui';
import React, {Component} from 'react';
import {
  Text,
  View,
  AsyncStorage,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as actionTypes from '../../Store/action';
import HomeIcon from '../utils/components/Icons/home';
import CategoryIcon from '../utils/components/Icons/category';
import InstFeedIcon from '../utils/components/Icons/instaFeed';
import ProfileIcon from '../utils/components/Icons/profile';
import AddProfileIcon from '../utils/components/Icons/addProfile';
import {connect} from 'react-redux';

class OwnBottomNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLogged: null,      
    };
  }

  componentDidMount(){
  
  }



  switchTab= async(arg1,arg2,arg3)=>{   
    await this.props.onTabClicked(arg1,arg3)
    await this.props.navigation.navigate(arg2);  
    if(this.props.searchbar){
      this.props.closeSearch();
    }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffff',
        
        padding:8,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'flex-end',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.18,
        shadowRadius: 10.0,
        elevation: 22,
      },
      tabs:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
      },
      tab:{
        justifyContent:'center',
        display:'flex',        
        height:41,
        
      },
      activeTab:{
        paddingLeft:10,
        justifyContent:'center',
        display:'flex',
        flexDirection:'row',
        backgroundColor:'#ffecdb',
       borderRadius:21,
       width:this.state.bottomActiveTabWidth,
       height:41,
       alignItems:'center'
      },
      activeContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
      },
      title:{
        fontWeight:'500',
        paddingLeft:10,
        paddingRight:10,
        fontFamily:'AvenirNext-Medium',
        fontSize:14,
        color:'#333333'
      }
    });

    return(<View style={styles.container}>
      <View style={styles.tabs}>
      <View style={this.props.bottomTab === 'home' ? styles.activeTab :styles.tab}><TouchableOpacity onPress={()=>this.switchTab('home','Home',100)}>{this.props.bottomTab === 'home'? <View style={styles.activeContainer}><HomeIcon/><Text style={styles.title}>Home</Text></View>:<HomeIcon  />}</TouchableOpacity></View>
      <View style={this.props.bottomTab === 'category' ? styles.activeTab :styles.tab}><TouchableOpacity onPress={()=>this.switchTab('category','MainCategory',125)}>{this.props.bottomTab === 'category'? <View style={styles.activeContainer}><CategoryIcon /><Text style={styles.title}>Category</Text></View>:<CategoryIcon  />}</TouchableOpacity></View>
      <View style={this.props.bottomTab === 'instaFeed' ? styles.activeTab :styles.tab}><TouchableOpacity onPress={()=>this.switchTab('instaFeed',null,160)}>{this.props.bottomTab === 'instaFeed'? <View style={styles.activeContainer}><InstFeedIcon /><Text style={styles.title}>Instagram Feed</Text></View>:<InstFeedIcon  />}</TouchableOpacity></View>
      <View style={this.props.bottomTab === 'addProfile' ? styles.activeTab :styles.tab}><TouchableOpacity onPress={()=>this.switchTab('addProfile','AddCustomer',150)}>{this.props.bottomTab === 'addProfile'? <View style={styles.activeContainer}><AddProfileIcon/><Text style={styles.title}>Add Customer</Text></View>:<AddProfileIcon  />}</TouchableOpacity></View>
      <View style={this.props.bottomTab === 'profile' ? styles.activeTab :styles.tab}><TouchableOpacity onPress={()=>this.switchTab('profile','Profile',100)}>{this.props.bottomTab === 'profile'? <View style={styles.activeContainer}><ProfileIcon /><Text style={styles.title}>Profile</Text></View>:<ProfileIcon  />}</TouchableOpacity></View>
      </View>      
      </View>)
      ;
  }
}

const mapStateToProps = state => {
  return {
    active: state.reducer.active,
    bottomTab:state.reducer.bottomTab,
    bottomActiveTabWidth:state.reducer.bottomActiveTabWidth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTabClicked: (value,value2) =>
      dispatch({type: actionTypes.ACTIVE_TAB, payload: value,payload2:value2}),
  }
 
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OwnBottomNavigation);
