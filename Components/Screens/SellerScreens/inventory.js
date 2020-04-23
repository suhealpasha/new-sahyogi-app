import React, {Component} from 'react';
import {BackHandler,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Dimensions
} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Card,CardTitle,CardContent,CardAction,CardButton,CardImage,} from 'react-native-material-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from '../../BottomNavigation/sellerBottomNavigation';
import ProductAction from '../../utils/productAction';
import RBSheet from 'react-native-raw-bottom-sheet';
import Filter from '../../utils/filter';
import Sort from '../../utils/sort';
export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOn:null,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  UNSAFE_componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {  
    BackHandler.exitApp();   
    return true;
  }
  

  componentDidUpdate(prevProps, prevState) {  
    console.log(this.props.route.params.filterOn) 
    if(this.props.route.params.filterOn ){
      this.RBSheet.open()
    }
  
  }
  

 

  render() {
    const items = [
      {
        name: require('../../../assets/Images/coffeeFarms/img1.png'),
        key: '1',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        orders:15,
        avilable:5
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img1.png'),
        key: '11',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        orders:15,
        avilable:50
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img2.png'),
        key: '2',
        origin: 'BOURBON',
        farm: 'Sta Lucia',
        orders:10,
        avilable:4
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img3.png'),
        key: '3',
        origin: 'GEISHA',
        farm: 'El Rosario',
        orders:50,
        avilable:3
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img4.png'),
        key: '4',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        orders:18,
        avilable:7
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img5.png'),
        key: '5',
        origin: 'BOURBON',
        farm: 'Sta Lucia',
        orders:5,
        avilable:5
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img6.png'),
        key: '6',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        orders:45,
        avilable:34
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img7.png'),
        key: '7',
        origin: 'GEISHA',
        farm: 'El Rosario',
        orders:34,
        avilable:35
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img8.png'),
        key: '8',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        orders:60,
        avilable:10
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img9.png'),
        key: '9',
        origin: 'BOURBON',
        farm: 'Sta Lucia',
        orders:150,
        avilable:1
      },
      {
        name: require('../../../assets/Images/coffeeFarms/img10.png'),
        key: '10',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
        orders:50,
        avilable:0
      },
    ];

    const styles = StyleSheet.create({
      container: {
        flex: 1.0,
        
     
       
      },
      itemContainer: {
        width: this.state.width,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 0.25,
        borderColor: '#95A5A6',
        flexDirection: 'row',
    
        backgroundColor: 'white',
      },
      itemDetailContainer: {},
      itemTextOrderText: {
        fontSize: 12,
        fontFamily: 'GothamLight',
        paddingLeft: 10,
        paddingRight: 10,
      },
      itemTextOrigin: {
        fontFamily: 'Gotham Black Regular',
        fontSize: 14,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
      },
      itemTextFarm: {
        fontSize: 12,
        justifyContent: 'space-around',
        fontFamily: 'GothamMedium',
        color: '#95A5A6',
        paddingBottom: 10,
        paddingTop:5,
        paddingLeft:10,
        paddingRight:10,
      },
     
    });

    return (
      <View style={styles.container}>
         <FlatList
              data={items}
              numColumns={1}
              // keyExtractor = {(items)=>{items.key}}

              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Order Detail')
                    }>
                    <View style={styles.itemContainer}>
                      <View style={styles.itemDetailContainer}>
                      
                        <View
                          style={{
                            flexDirection: 'row',
                            paddingLeft: 5,
                            paddingRight: 5,
                          }}>
                         
                          <Text style={styles.itemTextOrigin}>
                            
                            {item.origin}
                          </Text>
                        </View>
                        <Text style={styles.itemTextFarm}>{item.farm}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: this.state.width - 40,
                            
                          }}>
                            <Text style={styles.itemTextOrderText}>
                          Orders: {item.orders}
                        </Text>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{fontFamily:'GothamMedium'}}>
                             Available:  
                        <Text style={item.avilable < 5 ? {color:'red'} :{color:'green'}}>{' '}{item.avilable}</Text>
                          </Text>
                        </View>
                          
                        </View>
                      </View>
                    
                    </View>
                  </TouchableOpacity>
                );
              }}
            />       
       <BottomNavigation {...this.props}/>
      </View>
    );
  }
}


