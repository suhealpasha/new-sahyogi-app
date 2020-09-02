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
        backgroundColor:'#ffff'   
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
      fontSize: 14,
      width:'35%',
      paddingLeft:10,
      paddingRight:10,
      paddingTop:5,
           paddingBottom:5,
     },
     col2:{
      width:'5%',
     paddingLeft:10,
      fontSize: 14,
      fontFamily: 'GothamMedium',
      paddingTop:5,
           paddingBottom:5,
     },
     col3:{
      width:'60%',
           paddingRight:10,
           paddingTop:5,
           paddingBottom:5,
      fontFamily: 'GothamLight',
      fontSize: 14,
     },
     commentText:{      
      padding:10,
      fontFamily: 'GothamLight',
     }
    });

    return (
      <View style={styles.productDescriptionContainer}>
        <View style={{flex: 1.0}}>      
                <View style={styles.productDetailsContainer}>                 
                  {this.props.productData.originsname ? <View style={styles.row2}><Text style={styles.col1}>Origin</Text><Text style={styles.col2}>:</Text><Text style={styles.col3}>{this.props.productData.originsname}</Text></View> : null}
                  {this.props.productData.farm ? <View style={styles.row3}><Text style={styles.col1}>Farm</Text><Text style={styles.col2}>:</Text><Text style={styles.col3}>{this.props.productData.farm}</Text></View> : null}
                  {this.props.productData.altitude ? <View style={styles.row4}><Text style={styles.col1}>Altitude</Text><Text style={styles.col2}>:</Text><Text style={styles.col3}>{this.props.productData.altitude}</Text></View> : null}
                  {this.props.productData.note ? <View style={styles.row5}><Text style={styles.col1}>Notes</Text><Text style={styles.col2}>:</Text><Text style={styles.col3}>{this.props.productData.note}</Text></View>: null}
                  {this.props.productData.process ?<View style={styles.row6}><Text style={styles.col1}>Process</Text><Text style={styles.col2}>:</Text><Text style={styles.col3}>{this.props.productData.process}</Text></View>: null}
                  {this.props.productData.dry_method ?<View style={styles.row6}><Text style={styles.col1}>Dry Method</Text><Text style={styles.col2}>:</Text><Text style={styles.col3}>{this.props.productData.dry_method}</Text></View>: null}
                  {this.props.productData.certification ?<View style={styles.row6}><Text style={styles.col1}>Certification</Text><Text style={styles.col2}>:</Text><Text style={styles.col3}>{this.props.productData.certification}</Text></View>: null}
                  {this.props.productData.grade ?<View style={styles.row6}><Text style={styles.col1}>Grade</Text><Text style={styles.col2}>:</Text><Text style={styles.col3}>{this.props.productData.grade}</Text></View>: null}
                  {this.props.productData.appearance ?<View style={styles.row6}><Text style={styles.col1}>Appearance</Text><Text style={styles.col2}>:</Text><Text style={styles.col3}>{this.props.productData.appearance}</Text></View>: null}
                  {this.props.productData.seller_comment ?<View style={styles.row7}><Text style={styles.col1}>Comments</Text><Text style={styles.commentText}>{this.props.productData.seller_comment}</Text></View>: null}
                
                </View>            
        </View>
      </View>
    );
  }
}
export default ProductDescription;
