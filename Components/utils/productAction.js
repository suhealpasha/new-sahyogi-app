import React, { Component } from 'react';
import {View , Text,  StyleSheet,Dimensions,Picker, Button,TouchableOpacity} from 'react-native';
import NumericInput from 'react-native-numeric-input'
class ProductAction extends Component{
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            lbs:null,
           

        };
      }

    render(){
        const styles = StyleSheet.create({
            productActionsContainer:{                
                width:this.state.width,
                alignItems:'center',
                height:100
            },
            actionsContainer:{
                backgroundColor:'rgb(0,70,99)',
                paddingLeft:10,
                paddingRight:10,
                width:this.state.width-20,
                height:90,
                flexDirection:'row',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center'
                
            },
            addToCartButton:{
               
                backgroundColor:'orange',
                paddingBottom:10,
                paddingTop:10,
                borderWidth: 1,
                borderColor: '#fff'
              },
              addToCartText:{
                  color:'#fff',
                  textAlign:'center',
                  paddingLeft : 10,
                  paddingRight : 10
              }
        })
        return(
        <View style={styles.productActionsContainer}>
        <View style={styles.actionsContainer}>
        <Picker selectedValue={10} style={{height: 40, width: 110,color:'white',}}>
        <Picker.Item label="10 lbs" value="10" />
        <Picker.Item label="50 lbs" value="50" />
        <Picker.Item label="100 lbs" value="100" />
        </Picker>
        <NumericInput />
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => navigate('HomeScreen')}
          underlayColor='#fff'>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
           
        </View>
        </View>
        );
    }
}

export default ProductAction;