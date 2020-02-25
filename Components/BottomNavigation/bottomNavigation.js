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
              container: { height: 50,backgroundColor:'#59df44'},
              
            }}>
            <BottomNavigation.Action
              key="home"
              icon="home"
              label="Home"  
              onPress={()=>this.goTo('Home')}            
              style={{
                icon: {color: this.props.active === "home" ? "#001e37" : "#3e708f"},
                label:{color: this.props.active === "home" ? "#001e37" : "#3e708f",fontFamily:this.props.active === "home" ? 'Gotham Black Regular':'Gotham Black Regular'},
              }}
            />
            <BottomNavigation.Action
              key="search"
              icon="search"
              label="Search"            
              onPress={()=>this.goTo('Search')}  
              style={{
                icon: {color: this.props.active === "search" ? "#001e37" : "#3e708f"},
                label:{color: this.props.active === "search" ? "#001e37" : "#3e708f",fontFamily:this.props.active === "search" ? 'Gotham Black Regular':'Gotham Black Regular'},
              }}
              {...this.props}  
            />
            <BottomNavigation.Action
              key="favourite"
              icon="favorite"
              label="Wish List"
              style={{
                icon: {color: this.props.active === "favorite" ? "#001e37" : "#3e708f"},
                label:{color: this.props.active === "favorite" ? "#001e37" : "#3e708f",fontFamily:this.props.active === "search" ? 'Gotham Black Regular':'Gotham Black Regular'},
              }}
            />
  
            <BottomNavigation.Action
              key="SignIn"
              icon="person"
              label="Sign In"
              style={{
                icon: {color: this.props.active === "signin" ? "#001e37" : "#3e708f"},
                label:{color: this.props.active === "signin" ? "#001e37" : "#3e708f",fontFamily:this.props.active === "search" ? 'Gotham Black Regular':'Gotham Black Regular'},
              }}
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