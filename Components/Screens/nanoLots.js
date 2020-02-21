import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
export default class NanoLots extends Component {
  render() {
    const items = [
      {
        name: require('../../assets/Images/coffeeFarms/img8.png'),
        key: '8',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
      },
      {
        name: require('../../assets/Images/coffeeFarms/img9.png'),
        key: '9',
        origin: 'BOURBON',
        farm: 'Sta Lucia',
      },
      {
        name: require('../../assets/Images/coffeeFarms/img10.png'),
        key: '10',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
      },
      {
        name: require('../../assets/Images/coffeeFarms/img1.png'),
        key: '1',
        origin: 'EL SALVADOR',
        farm: 'Las Delicias',
      },
    ];
    return (
      <View style={{flex: 1.0}}>
        <FlatList
          data={items}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={2}
          // keyExtractor = {(items)=>{items.key}}

          renderItem={({item}) => {
            return (
              <Card style={{padding:5}}>
              <CardImage 
               source= {item.name} 
               style={{height:74}}
                />
            
                <CardTitle           
               subtitle={item.origin}  
               color='red'   
               />
                <CardContent text={item.farm} />
                <CardAction  style={{backgroundColor:'#DFDFDF'}}
       separator={true} 
       inColumn={false}>
       <CardButton
         onPress={() => this.productDetails()}
   
         title="Details"
         color="rgb(0,70,99)"
       />
       <CardButton
         onPress={() => {}}
         title="Add to Cart"
         color="rgb(0,70,99)"
       />
     </CardAction>
               </Card>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  microLotsHolderStyle: {
    // flexDirection: 'column',
    // backgroundColor:'pink'
  },
  itemHolderStyle: {
    // width:'100%',
    // marginBottom:10,
    // padding:10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  itemStyle: {},
});
