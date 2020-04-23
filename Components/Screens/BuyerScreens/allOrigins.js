import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import BottomNavigation from '../../BottomNavigation/bottomNavigation';
import {CheckBox} from 'react-native-elements';
import {Checkbox} from 'react-native-paper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

let filteredData =[]
export default class AllOrigins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      spinner: false,
      originsData:[],
      searchedData:[]
    };
  }

 componentDidMount(){
  this.fetchOrigins();
}

fetchOrigins = async () =>{
  this.setState({spinner:true})
  let data = JSON.stringify({
    region_Id: this.props.route.params.regionId   
  });


  const access_token = await AsyncStorage.getItem('isLoggedIn');   
  axios
    .post('http://mathtech.co.in/microffee_api/Seller/getoriginsbyid',data,{
      headers: {
        accept: 'application/json',
        access_token: access_token,
        'accept-language': 'en_US',
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
    .then(res => {
      this.setState({spinner:false,originsData: res.data.data});
    })
    .catch(err => {
      this.setState({spinner:false})
      console.log(err);
    });

}


// async componentWillReceiveProps(){
//   console.log(this.props.searchBarText)
  // this.state.originsData.filter(item => {
  //   const itemDataOrigin = item.name.toUpperCase();
    
  //   if (this.props.searchBarText) {
  //     const textData = this.props.searchBarText.toUpperCase();
  //     console.log(itemDataOrigin.indexOf(textData) > -1)
  //     return itemDataOrigin.indexOf(textData) > -1; 
  //   }
    
  // });

// }

componentDidUpdate(prevProps,prevState){ 

   filteredData = this.state.originsData.filter(item => {
    const itemDataOrigin = item.name.toUpperCase();    
    if (this.props.searchBarText) {
      const textData = this.props.searchBarText.toUpperCase();
      if(itemDataOrigin.indexOf(textData) > -1){
        return itemDataOrigin.indexOf(textData) > -1;
    }  
    }  
  });
  
  if(prevProps.searchBarText !== this.props.searchBarText ){
    console.log(filteredData)
    this.setState({searchedData:filteredData})
  }
}
  render() {    
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}         
        />
        <CheckBox
          title="Check All"
          checked={this.state.checked}
          containerStyle={{width: '100%', marginLeft: 0,marginTop:0,marginBottom:0}}
          checkedColor={'#00aa00'}
          onPress={() => this.setState({checked: !this.state.checked})}

        />

        <View style={{flex: 1.0}}>
          <FlatList
            data={!this.props.searchBarShow ? this.state.originsData : this.state.searchedData}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={2}
            keyExtractor = {(items)=>{items.origin_Id}}

            renderItem={({item}) => {
              return (
                <View style={{paddingLeft:10,paddingRight:10}}>
                  <View style={styles.itemContainer}>
                    <ImageBackground
                       source={{
                        uri: item.url_thumbnail_image,
                      }}
                      style={{width: 160,height: 120}}>
                      <CheckBox
                        checked={this.state.checked}
                        right
                        checkedColor={'#00aa00'}
                        onPress={() =>
                          this.setState({checked: !this.state.checked})
                        }
                        containerStyle={{
                          border: 0,
                          paddingLeft: 0,
                          paddingRight: 0,
                          paddingTop: 0,
                          paddingBottom: 0,
                          justifyContent: 'space-between',
                        }}
                      />
                    </ImageBackground>
                    <View style={styles.itemData}>
                    <Text style={styles.textData}>{item.name}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Listing')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  paddingTop: 15,
                  paddingBottom: 15,
                  textAlignVertical: 'center',
                  color: '#004561',
                  textAlign: 'center',
                  fontSize: 14,
                  fontFamily: 'GothamMedium',
                  textAlignVertical: 'center',
                }}>
                Continue
              </Text>
              <Icon
                name="chevron-right"
                color={'#3e708f'}
                size={25}
                style={{textAlignVertical: 'center'}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: '#efebea'
   
  },
  itemContainer: {
    marginBottom: 10,
    backgroundColor: 'white',
    width:160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,

    paddingBottom:10,
  },
  itemData:{
    borderTopWidth:0.25,
    borderColor:'#95A5A6',
    

  },
  textData:{
    paddingTop:5,
    paddingLeft:5,
    paddingRight:5,
    fontFamily:'Gotham Black Regular'
  },
  spinnerTextStyle: {
    color: '#00aa00'
  }, 
  
});
