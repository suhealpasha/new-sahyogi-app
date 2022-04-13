import { BorderLeft } from '@material-ui/icons';
import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  AppRegistry,
  navigation,
  AsyncStorage,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FilterIcon from '../components/Icons/filter';
import SortIcon from '../components/Icons/sort';
class TailButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const styles = StyleSheet.create({
      parentContaier: {},
      container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      },

      AddToCartButton: {
        borderTopWidth: 2,
        borderColor: '#95A5A6',
        width: '50%',
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#ffffff',
      },
      button: {
       marginLeft:10,
      marginRight:10,
        paddingTop: 5,
        height:40,
        paddingBottom: 5,        
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:70,
  
      },
      button2: {
        marginLeft:10,
        marginRight:10,
        paddingTop: 5,
        height:32,
        paddingBottom: 5,        
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',        
        width:100,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor:'#ffff',
        marginTop:4,
        marginBottom:4
      },
      
      buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'AvenirNext-DemiBold',
        fontFamily: 'bold',
        paddingLeft:10
      
      },
      
      linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginLeft:16,
        marginRight:16,
        display:'flex',
        flexDirection:'row',
        marginBottom:80
        
        
      },
    });

    return (
      <LinearGradient
        start={{x: 0.5, y: 0.8}}
        end={{x: 1.0, y: 0.8}}
        colors={['#ffb600', '#ff5f02']}
        style={styles.linearGradient}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.props.selectGender}
          
          >
          <Text style={styles.buttonText}>Gender</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={this.props.sortingList}
          
          >
          
          <SortIcon color='#ffff' />
          <Text style={styles.buttonText}>Sort</Text>
       
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={()=>{this.props.navigation.navigate('Filter')}}
          
          >
            <FilterIcon color='#ffff' />
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

export default TailButton;
