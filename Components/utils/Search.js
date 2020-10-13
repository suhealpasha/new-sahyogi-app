import React, {Component} from 'react';
import {  AsyncStorage,BackHandler,Image,View,Text,FlatList,Card,CardImage,StyleSheet,Dimensions,Item,ListItem,List,CardTitle,TouchableOpacity, ScrollView} from 'react-native';
import BottomNavigation from '../BottomNavigation/bottomNavigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as actionTypes from '../../Store/action';
import axios from 'axios';
import * as api from '../../assets/api/api';
import {connect} from 'react-redux';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height, 
      width: Dimensions.get('window').width, 
      allProductsData:[],    
      data: [],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    if(this.props.open){
      this.props.onToggleOpen();
    }
    this.fetchProducts();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  fetchProducts = async () => {
   
    this.setState({spinner:true})
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    const data = {
      featured: null,
      origin_Id: null,
      lot: null,
      verity_Id: null,
    };
    await axios
      .post(api.buyerAllProductAPI,data ,{
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {     
        console.log(res)
        if (res.status) {
          this.setState({
            spinner:false,
            allProductsData: res.data.data,
          });
        }
      })
      .catch(err => {
        this.setState({spinner:false})
        console.log(err);
      });
  };


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

  fetchProductDetails = (args, args1) => {
    this.props.onDisplayVarietyName(args1);
    this.props.navigation.navigate('Product Description', {productId: args});
  };

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
        paddingTop:10,
        paddingBottom:10,
        width:this.state.width /2 + 30 ,
       
      },
      itemTextVariety: {
        fontFamily: 'GothamBold',
        fontSize: 14,
        paddingTop: 5,
      },
      itemTextOrigin: {
        paddingTop: 5,
        fontSize: 12,
        justifyContent: 'space-around',
        fontFamily: 'GothamMedium',
        color: '#5C5C5C',
      },
      itemTextFarm: {
        fontSize: 12,
        justifyContent: 'space-around',
        fontFamily: 'GothamMedium',
        color: '#95A5A6',
      },
      ratingStyle: {
        justifyContent: 'center',
        textAlignVertical: 'center',
        fontSize: 14,
        fontFamily: 'GothamLight',
      },
      searchErrorText:{
        fontFamily:'GothamLight',
        paddingLeft:10,
        paddingTop:10,
        paddingBottom:10,
        paddingRight:10
      }
    });

    const newData = this.state.allProductsData.filter(item => {
      const itemDataOrigin = item.originsname.toUpperCase();
      const itemDataVariety = item.verityname.toUpperCase();
      const itemDataFarm =  item.farm.toUpperCase();
      if (this.props.route.params.searchText) {
        const textData = this.props.route.params.searchText.toUpperCase();
        return itemDataOrigin.indexOf(textData) > -1 || itemDataVariety.indexOf(textData) > -1 ||  itemDataFarm.indexOf(textData) > -1;
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
                <TouchableOpacity onPress={() => this.fetchProductDetails(i.product_Id, i.verityname)}>
                <View style={styles.itemContainer}>
                  <View style={styles.thumbnailImageContainer}>
                    <Image
                       source={{
                        uri: i.thumbnail_image,
                      }}
                      style={{
                        width: 130,
                        height: 100,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                      }}
                    />
                  </View>
                  <View style={styles.itemDetailContainer}>
                    <Text style={styles.itemTextVariety}>{i.verityname}</Text>
                    <Text style={styles.itemTextOrigin}>{i.originsname}</Text>
                    <Text style={styles.itemTextFarm}>{i.farm}</Text>
                  
                    <View style={{flexDirection: 'row-reverse'}}>
                        <Icon
                          name="star"
                          size={20}
                          color="#ffbd4a"
                          style={{
                            justifyContent: 'center',
                            textAlignVertical: 'center',
                          }}
                        />
                        <Text style={styles.ratingStyle}>
                          {i.avg_rating}
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
      onDisplayVarietyName: value =>
      dispatch({type: actionTypes.DISPLAY_VARIETY_NAME, payload: value}),
  };
};
export default connect(null,mapDispatchToProps)(Search);