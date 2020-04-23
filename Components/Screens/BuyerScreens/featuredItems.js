import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class FeaturedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      items: [
      require('../../../assets/Images/coffeeFarms/img4.png'),
       require('../../../assets/Images/coffeeFarms/img5.png'),
        require('../../../assets/Images/coffeeFarms/img6.png'),
       require('../../../assets/Images/coffeeFarms/img7.png'),
       require('../../../assets/Images/coffeeFarms/img1.png'),      
      ],
      itemsData:[
        {origin:'EL SALVADOR',farm:'Las Delicias',ratings:'4.0'} ,
        {origin:'BOURBON',farm:'Sta Lucia',ratings:'2.5'} ,  
        {origin:'BOURBON',farm:'Sta Lucia',ratings:'1.5'} ,  
        {origin:'GEISHA',farm:'El Rosario',ratings:'5.0'} ,  
        {origin:'EL SALVADOR',farm:'Las Delicias',ratings:'4.2'} ,
    ],
    currentSelecteditem:0
    };
   
  }

  updateImageDetails = ( image ) => {
    this.setState({currentSelecteditem:image})
  };

  render() {
    return (
      <View style={styles.container}>
        <SliderBox
          images={this.state.items}
          sliderBoxHeight={200}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
          currentImageEmitter={index => this.updateImageDetails(index)}
          dotColor="#3e708f"
          inactiveDotColor="#95A5A6"
          autoplay
          circleLoop
          parentWidth={this.state.width - 20}
          ImageComponentStyle={{borderTopLeftRadius: 15,borderTopRightRadius: 15}}
        />
        <View style={{paddingLeft:10,paddingRight:5,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>

        <View>
        <Text  style={styles.itemTextOrigin}>{this.state.itemsData[this.state.currentSelecteditem].origin}</Text>        
        <Text style={styles.itemTextFarm}>{this.state.itemsData[this.state.currentSelecteditem].farm}</Text>
        </View>
        <View>
        <View style={{flexDirection: 'row'}}>
                <Text style={styles.ratingStyle}>
                  {'  '}
                  {this.state.itemsData[this.state.currentSelecteditem].ratings}{' '}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    borderRadius:15,
    paddingBottom:10
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
