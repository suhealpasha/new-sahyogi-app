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

import {TouchableNativeFeedback} from 'react-native-gesture-handler';

const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width - 10;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;

const itemHeight = 100;

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };
  }

  componentDidMount() {
 
  }

  _renderItem = ({item, index}) => {
    return (
      <View
        style={{width: itemWidth, height: itemHeight, paddingHorizontal: 10}}>
        <ImageBackground
          style={{
            width: itemWidth,
            height: itemHeight,
            flex: 1,
            resizeMode: 'fit',
            justifyContent: 'center',
          }}
          source={item.image}
        />
      </View>
    );
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        paddingLeft: 16,
        paddingRight: 16,
        display:'flex',
        flexDirection:'row'
      },
      title: {
        color: '#333333',
        fontSize: 18,
        fontFamily: 'AvenirNext-DemiBold',
        fontWeight: '500',
        padding: 16,
      },
      border: {
        borderBottomWidth: 2,
        borderBottomColor: '#ff7d01',
        width: this.state.width / 2 - 16,
        marginLeft: 16,
        paddingTop: 2,
        paddingBottom: 2,
      },
      label1: {
        fontSize: 16,
        fontFamily: 'AvenirNextLTPro-Regular',
        padding: 16,
        width: 150,
      },
      categoriesMenu: {
        width: this.state.width / 3 - 18,
        marginRight: 10,
        marginTop: 16,
        backgroundColor: '#ffff',
        height: 108,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#e7e7e7',
        justifyContent: 'flex-end',
      },
      header: {
        paddingTop: 10,
        paddingBottom: 10,
      },
      headerMenuText: {
        color: '#ffffff',
        fontSize: 14,
        fontFamily: 'AvenirNext-Medium',
        textAlign: 'center',
        padding: 5,
      },
      background:{
        display:'flex',
        width: this.state.width / 3 - 20,
        height:108,
        zIndex:-1,
        marginRight: 10,
        justifyContent:'flex-end',
        display:'flex'
      }
    });

    let headerMenu = [],
      data = [],
      footwear = [];

    this.props.data.map((item, index) => {
      data.push(
        <View style={styles.categoriesMenu}>
          <View
            style={{
              alignItems: 'center',
              height: 50,
              justifyContent: 'center',
            }}
          />
        </View>,
      );
    });

    return (
      <View style={styles.header}>
        <View style={styles.container}>
          <View style={styles.categoriesMenu} >            
            <ImageBackground style={styles.background} source={this.props.data[0].image} >
            <Text style={styles.headerMenuText}>{this.props.data[0].name}</Text>
            </ImageBackground>            
            </View>
          <View style={styles.categoriesMenu}> 
          <ImageBackground style={styles.background} source={this.props.data[1].image} >
            <Text style={styles.headerMenuText}>{this.props.data[1].name}</Text>
            </ImageBackground> 
          </View>
          <View style={styles.categoriesMenu} >
          <ImageBackground style={styles.background} source={this.props.data[2].image} >
            <Text style={styles.headerMenuText}>{this.props.data[2].name}</Text>
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  }
}

export default Category;
