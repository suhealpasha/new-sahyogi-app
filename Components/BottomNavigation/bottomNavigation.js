import {Toolbar, COLOR,  ThemeContext,  getTheme,  BottomNavigation,Icon,} from 'react-native-material-ui';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// const propTypes = {
//     navigation: PropTypes.shape({
//       home: PropTypes.func.isRequired,
//     }).isRequired,
//   };

 class OwnBottomNavigation extends Component{
    constructor(props) {
        super(props);
        this.state = {
          
        }
      }
    render() {       
          
        return(
            <BottomNavigation
            active={this.state.active}
            style={{
              container: { height: 50},
            }}>
            <BottomNavigation.Action
              key="home"
              icon="home"
              label="Home"              
              onPress={() => this.props.navigation.navigate('Home')}
            />
            <BottomNavigation.Action
              key="search"
              icon="search"
              label="Search"
              
              // onPress={() => this.setState({active: 'search'})}
            />
            <BottomNavigation.Action
              key="favourite"
              icon="favorite"
              label="Wish List"
              // onPress={() => this.setState({active: 'wishList'})}
            />
  
            <BottomNavigation.Action
              key="SignIn"
              icon="person"
              label="Sign In"
              // onPress={() => this.setState({active: 'signIn'})}
            />
          </BottomNavigation>
  )
}
}


// OwnBottomNavigation.propTypes = propTypes;
export default OwnBottomNavigation;