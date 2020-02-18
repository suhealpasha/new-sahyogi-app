import {Toolbar, COLOR,  ThemeContext,  getTheme,  BottomNavigation,Icon,} from 'react-native-material-ui';
import React, { Component } from 'react';

export default class OwnToolbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
          
        }
      }
    render() {
        return(
          <Toolbar
          centerElement="Microfee"
          rightElement={{
            actions: ['notifications', 'local-grocery-store'],
          }}
          style={{
            container: {backgroundColor: 'rgb(0,216,0)'},
            // leftElement: { color: COLOR.black200 },
            titleText: {color: 'white'},
            rightElement: {color: COLOR.black200},
          }}
        />
  )
}
}


