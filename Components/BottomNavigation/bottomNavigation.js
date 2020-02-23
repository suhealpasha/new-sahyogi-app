import {Toolbar, COLOR,  ThemeContext,  getTheme,  BottomNavigation,Icon,} from 'react-native-material-ui';
import React, { Component } from 'react';
import * as actionTypes from '../../Store/action'
import { connect} from 'react-redux';

 class OwnBottomNavigation extends Component{
    constructor(props) {
        super(props);
        this.state = {
        
        }
      }
      
      goTo = (arg1) =>{
      this.props.navigation.navigate(arg1); 
      const lowerArg1 = String(arg1).toLowerCase()
      this.props.onBottomTabClicked(lowerArg1)
        }
    render() {       
          
        return(
            <BottomNavigation
            active={this.props.active}
            style={{
              container: { height: 50},
            }}>
            <BottomNavigation.Action
              key="home"
              icon="home"
              label="Home"  
              onPress={()=>this.goTo('Home')}            
           
            />
            <BottomNavigation.Action
              key="search"
              icon="search"
              label="Search"            
              onPress={()=>this.goTo('Search')}  
              {...this.props}  
            />
            <BottomNavigation.Action
              key="favourite"
              icon="favorite"
              label="Wish List"
              
            />
  
            <BottomNavigation.Action
              key="SignIn"
              icon="person"
              label="Sign In"
             
            />
          </BottomNavigation>
  )
}
}

const mapStateToProps = state =>{
  return {
    active: state.reducer.active,
       
  };
}

const mapDispatchToProps = dispatch =>{
  return{
    onBottomTabClicked:(value)=>dispatch({type:actionTypes.ACTIVE_ICON,payload:value})
    }

}
export default  connect(mapStateToProps,mapDispatchToProps)(OwnBottomNavigation);