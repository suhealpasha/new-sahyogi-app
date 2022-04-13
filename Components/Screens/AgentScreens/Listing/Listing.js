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
import LikeIcon from '../../../utils/components/Icons/like';
import FilledLikeIcon from '../../../utils/components/Icons/filledLike';
import {connect} from 'react-redux';
import * as actionTypes from '../../../../Store/action';

const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width - 10;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;

const itemHeight = 100;

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
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
    this.props.navigation.navigate("Home");
    this.props.onTabClicked('home')
    return true;  
  }

  

  render() {
    const styles = StyleSheet.create({
      container: {
        paddingLeft: 16,
        paddingRight: 16,
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
        height: 168,
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
        color: '#333333',
        fontSize: 14,
        fontFamily: 'AvenirNext-Medium',
        textAlign: 'left',
  
      },
      background: {
        marginLeft:7,
        marginRight:7,        
        width:this.state.width / 4 - 3,
        height: 99,

      },
      codeText:{
          padding:7,
          color: '#999999',
        fontSize: 10,
        fontFamily: 'AvenirNextFont',
        textAlign: 'left',
      }
    });

    let headerMenu = [],
      data = [],
      footwear = [];

    return (
      <View style={styles.header}>
        <View style={styles.container}>
          <FlatList
            data={this.props.data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={items => {
              items.region_Id;
            }}
            renderItem={({item}) => {
              return (
                <TouchableNativeFeedback
                  style={styles.categoriesMenu}
                  //  onPress={() => this.functionHandler(item.region_Id, item.name)}
                >
                  <ImageBackground
                    style={styles.background}
                    source={item.image}
                    resizeMode="stretch"
                  />

                  <View style={{display: 'flex', flexDirection: 'row',justifyContent:'space-between',alignItems:'center',padding:7}}>
                    <Text style={styles.headerMenuText}>{item.name}</Text>
                    {!item.favourite ? <LikeIcon /> : <FilledLikeIcon />}                    
                  </View>
                  <Text style={styles.codeText}>Code No. {item.code}</Text>
                </TouchableNativeFeedback>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_TAB, payload: value}),
  }
 
};
export default connect(
  null,
  mapDispatchToProps,
)(Listing);
