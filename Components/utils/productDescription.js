import React, {Component} from 'react';
import {StyleSheet,FlatList,View,Text,Image,ScrollView,Button,Dimensions} from 'react-native';
import {Card,CardTitle,CardContent,CardAction,CardButton,CardImage} from 'react-native-material-cards';
import {TouchableHighlight} from 'react-native-gesture-handler';

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      
    };
  }

 

  render() {


    const items = [
      {
        name: require('../../assets/Images/coffeeFarms/img1.png'),
        key: '1',
        origin: 'EL SALVADOR',
        variety: 'Pacamara',
        farm: 'Las Delicias',
        altitude: '1500 Ft',
        notes: 'Peach,Chocolate,Honey',
        ratings: 5,
        process:'Natural'
      },
    ];

    const styles = StyleSheet.create({     
      productDescriptionContainer: {      
        paddingTop: 10,     
        height: 140,      
      },
      productDetailsContainer: {
        flexDirection: 'row',
        width: '100%',
        height:130,

      },
      productDetailHeader: {
        flexDirection: 'column',        
        width: 100,
      },
      productDetailHeaderText: {   
       
        fontFamily:'GothamBold',
        padding: 2,
        fontSize: 15,
      },
      productDetail: {
        flexDirection: 'column',
      },
      productDetailText: {
        fontSize: 15,   
        fontFamily:'GothamMedium',
        padding: 2,
      },
    });

    return (   
      
        <View style={styles.productDescriptionContainer}>
          <View style={{flex: 1.0}}>
            <FlatList
              data={items}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              numColumns={2}
              // keyExtractor = {(items)=>{items.key}}

              renderItem={({item}) => {
                return (
                  <View style={styles.productDetailsContainer}>
                    <View style={styles.productDetailHeader}>
                    <Text style={styles.productDetailHeaderText}>
                        Variety 
                      </Text>
                      <Text style={styles.productDetailHeaderText}>Origin</Text>
                      
                      <Text style={styles.productDetailHeaderText}>Farm</Text>
                      <Text style={styles.productDetailHeaderText}>
                        Altitude 
                      </Text>
                      <Text style={styles.productDetailHeaderText}>Notes</Text>
                       <Text style={styles.productDetailHeaderText}>
                        Process
                      </Text>
                    </View>
                    <View style={styles.productDetail}>
                    <Text style={styles.productDetailText}>
                        : {this.props.productData.verityname}
                      </Text>
                      <Text style={styles.productDetailText}>
                        : {this.props.productData.originsname}
                      </Text>
                      
                      <Text style={styles.productDetailText}>: {this.props.productData.farm}</Text>
                      <Text style={styles.productDetailText}>
                        : {this.props.productData.altitude}
                      </Text>
                      <Text style={styles.productDetailText}>: {this.props.productData.note}</Text>
                      {/* */}
                      <Text style={styles.productDetailText}>
                        : {this.props.productData.process}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
     
    );
  }
}
export default ProductDescription;
