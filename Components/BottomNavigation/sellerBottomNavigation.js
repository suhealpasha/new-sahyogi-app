import {
  Toolbar,
  COLOR,
  ThemeContext,
  getTheme,
  BottomNavigation,
  Icon,
} from 'react-native-material-ui';
import React, {Component} from 'react';
import {Text, AsyncStorage} from 'react-native';
import * as actionTypes from '../../Store/action';
import {connect} from 'react-redux';

class OwnBottomNavigation extends Component {
  constructor(props) {
    super(props);
    this._loadData();
    this.state = {
      userLogged: null,
    };
  }

  goTo = arg1 => {
    this.props.navigation.navigate(arg1);
    const lowerArg1 = String(arg1).toLowerCase();
    console.log('curreent page',arg1)
    this.props.onBottomTabClicked(lowerArg1);
  };
  goToSwitch = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (this.state.userLogged || isLoggedIn === '2') {      
      this.goTo('Seller Profile');
    } else {
      this.goTo('Sign In');
    }
  };
  _loadData = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');    
    if (isLoggedIn) {
      this.setState({userLogged: true});
    }
  };

  render() {
    console.log(this.props.active)
    return (
      <BottomNavigation
        active={this.props.active}
        style={{
          container: {height: 50, backgroundColor: '#efebea'},
        }}>
        <BottomNavigation.Action
          key="home"
          icon="home"
          label="Home"
          onPress={() => this.goTo('Home')}
          style={{
            icon: {color: this.props.active === 'home' ? '#3e708f' : '#95A5A6'},
            label: {
              color: this.props.active === 'home' ? '#3e708f' : '#95A5A6',
              fontSize:13,
              fontFamily:
                this.props.active === 'home'
                  ? 'GothamBold'
                  : 'GothamBold',
            },
          }}
        />
        <BottomNavigation.Action
          key="order listing"
          icon={this.props.active === 'order listing'?"shopping-cart":"add-shopping-cart"}
          label="Orders"
          onPress={() => this.goTo('Order Listing')}
          style={{
            icon: {
              color: this.props.active === 'order listing' ? '#3e708f' : '#95A5A6',
            },
            label: {
              color: this.props.active === 'order listing' ? '#3e708f' : '#95A5A6',
              fontSize:13,
              fontFamily:
                this.props.active === 'order listing'
                  ? 'GothamBold'
                  : 'GothamBold',
            },
          }}
          {...this.props}
        />
        <BottomNavigation.Action
          key="inventory"
          icon="assessment"
          label="Inventory"
          onPress={() => this.goTo('Inventory')}
          style={{
            icon: {
              color: this.props.active === 'inventory' ? '#3e708f' : '#95A5A6',
            },
            label: {
              color: this.props.active === 'inventory' ? '#3e708f' : '#95A5A6',
              fontSize:13,
              fontFamily:
                this.props.active === 'inventory'
                  ? 'GothamBold'
                  : 'GothamBold',
            },
          }}
        />

        <BottomNavigation.Action
          key="Seller Profile"
          icon={this.props.active === 'seller profile'?"person":"person-outline"}
          label="Profile"
          onPress={() => this.goToSwitch()}
          style={{
            icon: {
              color: this.props.active === 'seller profile' ? '#3e708f' : '#95A5A6',
            },
            label: {
              color: this.props.active === 'seller profile' ? '#3e708f' : '#95A5A6',
              fontSize:13,
              fontFamily:
                this.props.active === 'seller profile'
                  ? 'GothamBold'
                  : 'GothamBold',
            },
          }}
        />
      </BottomNavigation>
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.reducer.active,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onBottomTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_ICON, payload: value}),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OwnBottomNavigation);
