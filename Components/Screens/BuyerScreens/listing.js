import React, {Component} from 'react';
import {StyleSheet,FlatList,View,Text,Image,ScrollView,Button} from 'react-native';
import {TouchableHighlight,TouchableOpacity} from 'react-native-gesture-handler';
import {Card,CardTitle,CardContent,CardAction,CardButton,CardImage} from 'react-native-material-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from '../../BottomNavigation/bottomNavigation';
import ProductAction from '../../utils/productAction';
import RBSheet from 'react-native-raw-bottom-sheet';
import Filter from '../../utils/filter';
import Sort from '../../utils/sort';
export default class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedIcon: null,
    };
  }

//  componentDidMount(){
//    console.log(this.props.productsData)
//  }

 UNSAFE_componentWillReceiveProps(){
this.RBSheet.open()
  }

  render() {
    const items = [
      {
        name: require('../../../assets/Images/coffeeFarms/img1.png'),
        key: '1',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '4.0',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img1.png'),
        key: '11',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '4.0',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img2.png'),
        key: '2',
        origin: 'BOURBON',
        farm: 'Sta Lucia',
        ratings: '1.1',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img3.png'),
        key: '3',
        origin: 'GEISHA',
        farm: 'El Rosario',
        ratings: '3.6',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img4.png'),
        key: '4',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '4.0',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img5.png'),
        key: '5',
        origin: 'BOURBON',
        farm: 'Sta Lucia',
        ratings: '4.5',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img6.png'),
        key: '6',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '2.0',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img7.png'),
        key: '7',
        origin: 'GEISHA',
        farm: 'El Rosario',
        ratings: '1.5',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img8.png'),
        key: '8',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '5.5',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img9.png'),
        key: '9',
        origin: 'BOURBON',
        farm: 'Sta Lucia',
        ratings: '4.0',
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img10.png'),
        key: '10',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        ratings: '5.0',
      },
    ];
    let optionsComponet;

    if (this.props.clickedIcon === 'Sort') {
   
      optionsComponet = <Sort {...this.props}/>;
     
    } else {
      optionsComponet = <Filter {...this.props} resetClickedIcon = {() => {this.RBSheet.close()}}/>;
    
    }

    return (
      
      <View style={styles.container}>        
        <FlatList
          style={{paddingLeft:10,paddingRight:10}}
          data={items}
          numColumns={1}
          // keyExtractor = {(items)=>{items.key}}

          renderItem={({item}) => {
            let ratingIcon = (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.ratingStyle}>
                  {'  '}
                  {item.ratings}{' '}
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
            );
            return (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Product Description')}>
                <View style={styles.itemContainer}>
                  <View style={styles.thumbnailImageContainer}>
                    <Image
                      source={item.name}
                      style={{
                        width: 130,
                        height: 80,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                      }}
                    />
                  </View>
                  <View style={styles.itemDetailContainer}>
                    <Text style={styles.itemTextOrigin}>{item.origin}</Text>
                    <Text style={styles.itemTextFarm}>{item.farm}</Text>
                    {ratingIcon}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={270}
          duration={250}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}>
          {optionsComponet}
        </RBSheet>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,    
    paddingBottom: 10,
    paddingTop: 10,   
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
});
