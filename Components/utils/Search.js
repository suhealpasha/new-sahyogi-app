import React, {Component} from 'react';
import {BackHandler,Image,View,Text,FlatList,Card,CardImage,StyleSheet,Dimensions,Item,ListItem,List,CardTitle,TouchableOpacity, ScrollView} from 'react-native';
import BottomNavigation from '../BottomNavigation/bottomNavigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as actionTypes from '../../Store/action';
import { connect} from 'react-redux';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      items: [
        {
          name: require('../../assets/Images/coffeeFarms/img1.png'),
          key: '1',
          origin: 'EL SALVADOR',
          farm: 'Las Delicias',
          ratings: '4.0',
        },
        {
          name: require('../../assets/Images/coffeeFarms/img2.png'),
          key: '2',
          origin: 'BOURBON',
          farm: 'Sta Lucia',
          ratings: '2.0',
        },
        {
          name: require('../../assets/Images/coffeeFarms/img3.png'),
          key: '3',
          origin: 'GEISHA',
          farm: 'El Rosario',
          ratings: '4.0',
        },
        {
          name: require('../../assets/Images/coffeeFarms/img4.png'),
          key: '4',
          origin: 'EL SALVADOR',
          farm: 'Las Delicias',
          ratings: '3.5',
        },
        {
          name: require('../../assets/Images/coffeeFarms/img5.png'),
          key: '5',
          origin: 'BOURBON',
          farm: 'Sta Lucia',
          ratings: '1.1',
        },
        {
          name: require('../../assets/Images/coffeeFarms/img6.png'),
          key: '6',
          origin: 'EL SALVADOR',
          farm: 'Las Delicias',
          ratings: '5.0',
        },
        {
          name: require('../../assets/Images/coffeeFarms/img7.png'),
          key: '7',
          origin: 'GEISHA',
          farm: 'El Rosario',
          ratings: '4.0',
        },
        {
          name: require('../../assets/Images/coffeeFarms/img8.png'),
          key: '8',
          origin: 'EL SALVADOR',
          farm: 'Las Delicias',
          ratings: '1.5',
        },
        {
          name: require('../../assets/Images/coffeeFarms/img9.png'),
          key: '9',
          origin: 'BOURBON',
          farm: 'Sta Lucia',
          ratings: '2.2'
        },
        {
          name: require('../../assets/Images/coffeeFarms/img10.png'),
          key: '10',
          origin: 'EL SALVADOR',
          farm: 'Las Delicias',
          ratings: '4.0',
        },
        {
          name: require('../../assets/Images/coffeeFarms/img6.png'),
          key: '11',
          origin: 'EL SALVADOR',
          farm: 'Las Delicias',
          ratings: '4.5',
        },
      ],
      data: [],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
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
    this.props.onBottomTabClicked('home');
    this.props.navigation.navigate('Home');
    return true;
  }
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#efebea'
      },
      searchFilterContainer: {
        height: this.state.height - 130,
        
      },
      itemContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
      itemDetailContainer: {
        paddingLeft: 10,
        paddingRight: 10,
      },
      itemTextOrigin: {
        fontFamily: 'Gotham Black Regular',
        fontSize: 14,
        paddingTop: 5,
      },
      itemTextFarm: {
        fontSize: 12,
        justifyContent: 'space-around',
        fontFamily: 'GothamMedium',
        color: '#95A5A6',
        paddingBottom: 10,
      },
      ratingStyle: {
        backgroundColor: '#00ac00',
        color: 'white',
        lineHeight: 20,
        justifyContent: 'center',
        textAlignVertical: 'center',
        fontSize: 13,
        width: 45,
      },
      searchErrorText:{
        fontFamily:'GothamLight',
        paddingLeft:10,
        paddingTop:10,
        paddingBottom:10,
        paddingRight:10
      }
    });

    const newData = this.state.items.filter(item => {
      const itemDataOrigin = item.origin.toUpperCase();
      if (this.props.route.params.searchText) {
        const textData = this.props.route.params.searchText.toUpperCase();
        return itemDataOrigin.indexOf(textData) > -1;
      }
    });

    return (
    
        <View style={styles.container}>
          <ScrollView>
          {this.props.route.params.searchText === undefined ? (
            <Text style={styles.searchErrorText}>Seach for an item!</Text>
          ) : newData.length === 0 ? (
            <Text style={styles.searchErrorText}>No Item Found!</Text>
          ) : (
            newData.map(i => {
              
              return (
                <TouchableOpacity onPress={() => this.productDetails()}>
                <View style={styles.itemContainer}>
                  <View style={styles.thumbnailImageContainer}>
                    <Image
                      source={i.name}
                      style={{
                        width: 130,
                        height: 80,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                      }}
                    />
                  </View>
                  <View style={styles.itemDetailContainer}>
                    <Text style={styles.itemTextOrigin}>{i.origin}</Text>
                    <Text style={styles.itemTextFarm}>{i.farm}</Text>
                    <View style={{flexDirection: 'row'}}>
                <Text style={styles.ratingStyle}>
                  {'  '}
                  {i.ratings}{' '}
                  <Icon
                    name="star"
                    size={13}
                    style={{
                      justifyContent: 'center',
                      textAlignVertical: 'center',
                    }}
                  />
                  {'  '}
                </Text>
                <Text
                  style={{
                    fontFamily: 'GothamLight',
                    fontSize: 10,
                    textAlignVertical: 'center',
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}>
                  100:Ratings
                </Text>
              </View>
                  </View>
                </View>
              </TouchableOpacity>
              );
            })
          )}
          </ScrollView>
        </View>
    

    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
       onBottomTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_ICON, payload: value}),
  };
};
export default connect(null,mapDispatchToProps)(Search);