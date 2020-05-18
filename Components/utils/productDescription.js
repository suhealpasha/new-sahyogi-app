import React, {Component} from 'react';
import {
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

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';



class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
     
    };
  }

  render() {
  
    const styles = StyleSheet.create({
      productDescriptionContainer: {
        paddingTop: 10,       
        width:'100%',       
      },
      productDetailsContainer: {
        flexDirection: 'column',
        width: '100%',        
      },
      productDetailHeader: {
        flexDirection: 'column',
        width: 100,
      },
      productDetailHeaderText: {
        fontFamily: 'GothamBold',
        padding: 2,
        fontSize: 15,
      },
      productDetail: {
        flexDirection: 'column',
        
      },
      productDetailText: {
        fontSize: 15,
        fontFamily: 'GothamMedium',
        padding: 2,
        
      },
     row1:{
       flexDirection:'row',
       justifyContent:'flex-start'
     },
     row2:{
      flexDirection:'row',
      justifyContent:'flex-start'
     },
     row3:{
      flexDirection:'row',
      justifyContent:'flex-start'
     },
     row4:{
      flexDirection:'row',
      justifyContent:'flex-start'
     },
     row5:{
      flexDirection:'row',
      justifyContent:'flex-start'
     },
     row6:{
      flexDirection:'row',
      justifyContent:'flex-start'
     },
     col1:{
      fontFamily: 'GothamBold',     
      fontSize: 15,
      width:'35%',
      padding:5
     },
     col2:{
      width:'5%',
      padding:5,
      fontSize: 15,
      fontFamily: 'GothamMedium',
     },
     col3:{
      width:'60%',
      padding:5,
      fontFamily: 'GothamMedium',
     }
    });

    return (
      <View style={styles.productDescriptionContainer}>
        <View style={{flex: 1.0}}>      
                <View style={styles.productDetailsContainer}>                 
                  <View style={styles.row1}><Text style={styles.col1}>Variety</Text><Text style={styles.col2}>:</Text><Text style={styles.col3}>{this.props.productData.verityname}</Text></View>
                  <View style={styles.row2}><Text style={styles.col1}>Origin</Text><Text style={styles.col2}>:</Text><Text style={styles.col3}>{this.props.productData.originsname}</Text></View>
                  <View style={styles.row3}><Text style={styles.col1}>Farm</Text><Text style={styles.col2}>:</Text><Text style={styles.col3}>{this.props.productData.farm}</Text></View>
                  <View style={styles.row4}><Text style={styles.col1}>Altitude</Text><Text style={styles.col2}>:</Text><Text style={styles.col3}>{this.props.productData.altitude}</Text></View>
                  <View style={styles.row5}><Text style={styles.col1}>Notes</Text><Text style={styles.col2}>:</Text><Text style={styles.col3}>{this.props.productData.note}</Text></View>
                  <View style={styles.row6}><Text style={styles.col1}>Process</Text><Text style={styles.col2}>:</Text><Text style={styles.col3}>{this.props.productData.process}</Text></View>
                </View>            
        </View>
      </View>
    );
  }
}
export default ProductDescription;
