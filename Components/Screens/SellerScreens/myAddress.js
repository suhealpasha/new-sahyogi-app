import React, {Component} from 'react';
import {BackHandler,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Dimensions,
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class MyAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
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
    this.props.navigation.goBack();
    return true;
  }

  productDetails = () => {
    this.props.navigation.navigate('Product Description');
  };

  render() {
    const items = [
      {
        name: 'Smith Adam',
        key: '1ML',
        addr:
          '704 Oxford Dr, Richmond Hill GA,31324',
        mobile: '(912) 727-3506',
      },
      {
        name: 'Sandra J Johnson',
        key: '2ML',
        addr:
          '105 Vista Dr #10, Tye,Tx,79563',
        mobile:'(325) 698-8048',
      },
      {
        name: 'Philis Smith',
        key: '3ML',
        addr:
          '2086 N Creek Rd,Appomatax,VA 24522',
        mobile: '(325) 698-8123',
      },
      {
        name: 'Smith Adam',
        key: '4ML',
        addr:
          '105 Vista Oxford Dr,Richmond Hill GA,31324 ',
        mobile: '(325) 698-2333',
      },
    ];

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        backgroundColor: '#efebea',
      },
      itemContainer: {
        flexDirection: 'row',
        borderBottomWidth: 0.25,
        borderBottomColor: '#95A5A6',
        width: this.state.width - 20,
        height: 120,
        paddingTop: 10,
      },
      itemContainerData: {
        width: this.state.width - 100,
        
      },
      itemContainerName: {
        fontSize: 20,
        fontFamily: 'GothamBook',
   
      },
      itemContainerAddress: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: 'GothamLight',
  
        paddingTop: 10,
      },
      itemContainerMobile: {
        paddingTop: 10,
   
        lineHeight: 20,
        fontFamily: 'GothamLight',

      },
      itemContainerActions: {   
         flexDirection:'column',
         height:120,        
         width:80
      },
      actions:{
          height:60,         
          justifyContent:'center',
          alignItems:'center'
      }
    });

    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          numColumns={1}
          renderItem={({item}) => {
            return (
              <View style={styles.itemContainer}>
                <View style={styles.itemContainerData}>
                  <Text style={styles.itemContainerName}>{item.name}</Text>
                  <Text style={styles.itemContainerAddress}>{item.addr}</Text>
                  <Text style={styles.itemContainerMobile}>{item.mobile}</Text>
                </View>
                <View style={styles.itemContainerActions}>
                    <View style={styles.actions}>
                  <Icon  name='edit' size={25} color={'#95A5A6'} onPress={()=>{this.props.navigation.navigate('Edit Address')}}/>
                  </View>
                  <View  style={styles.actions}>
                  <Icon name='delete' size={25} color={'#95A5A6'}/>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}
