import React, { Component } from 'react';
import {View , Text,  StyleSheet,Dimensions,Picker, Button,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumericInput from 'react-native-numeric-input'
import SwitchButton from 'switch-button-react-native';
class ProductAction extends Component{
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            lbs:null,
            favouriteColor:'grey',
            active10Button:false,
            active20Button:false,
            active50Button:true,
            activeSwitch: 1

        };
      }

      favoutiteClicked = () =>{
        if(this.state.favouriteColor==='grey'){
            this.setState({favouriteColor:'red'})
      }
      else{
          this.setState({favouriteColor:'grey'})
      }
    }

    activateUnitsButton = (param1) =>{
        if(param1==='active10Button'){
            if(this.state.active10Button){
                this.setState({active10Button:false})             
            }
            else{ this.setState({active10Button:true})
         }
        }
       
    }
  
    render(){
        const styles = StyleSheet.create({
            productActionsContainer:{
                alignItems:'center',
                paddingTop:10,
                height:200 ,
                width:this.state.width - 20
            },
            actionsContainer:{                               
                flexDirection:'row',              
                alignItems: 'center',    
                width:'100%',
                justifyContent:'space-between'            
            },
           
              priceText:{
                  fontFamily:'Gotham Black Regular',
                  color:'#004561',
                  fontSize:25
              },
              unitsContainer:{          
                flexDirection:'column',
                 width:'50%',  
                 paddingBottom:10,
                 paddingTop:10              
               },
              
              quantityContainer:{             
                flexDirection:'row',
                width:'50%',
                paddingBottom:10,
                paddingTop:10                      
              },
              unitsButton:{
                paddingTop:5,
                paddingBottom:5,
                borderWidth: 0.5,
                borderColor: '#95A5A6',              
                paddingLeft:5,
                paddingRight:5,
                marginRight:5,
                marginBottom:5
              },
              unitsActiveButton:{
                paddingTop:5,
                paddingBottom:5,
                borderWidth: 0.5,
                borderColor: '#004561',                             
                paddingLeft:5,
                paddingRight:5,
                marginRight:5,
                marginBottom:5
              },
              unitsButtonText:{
                fontFamily:'GothamLight',
                fontSize:12,
                color:'#95A5A6',
                
               
              },
              unitsActiveButtonText:{
                fontFamily:'GothamLight',
                color:'#004561',
                fontSize:12
              },
              lotsPageSwitchContainer:{
                marginLeft:10,             
                flexDirection:'row',
                justifyContent:'center',
                paddingTop:10, 
                paddingBottom:10,               
                width:'50%',
                alignItems:'center'
              },
              lotsPageSwitchButton:{
                borderWidth:1,
                borderColor:'#3e708f',
                alignItems:'center',
                justifyContent:'center',
                width:40,
                height:40,
                backgroundColor:'#004561',                
                borderRadius:100,
              },
              ratingStyle: {
                backgroundColor: '#00ac00',
                color: 'white',
                lineHeight: 20,
                justifyContent: 'center',
                textAlignVertical: 'center',
                fontSize: 13,
                width: 50,
               paddingRight:5,
               paddingLeft:5
              },
        })
        return(
        <View style={styles.productActionsContainer}>
        <View style={styles.actionsContainer}>
            <View style={{width:'60%'}}>
            <Text style={styles.priceText}>$100.00</Text></View>
             <View style={{flexDirection:'row',width:'40%'}}>
              <View style={styles.ratingStyle}>
              <Text style={{color:'white',textAlign:'center',justifyContent:'space-between'}}>5.0 <Icon
                  name="star"
                  size={13}
                  style={{
                    justifyContent: 'center',
                    textAlignVertical: 'center',
                    
                  }}
                />
                </Text>               
              </View> 
              <Text style={{fontFamily:'GothamLight',fontSize:10,textAlignVertical:'center',paddingLeft:10,paddingRight:10}}>100:Ratings</Text>      
              </View>
        </View>
        <View style={styles.actionsContainer}>
            <View style={styles.unitsContainer}>
            <View style={{paddingTop:10,paddingBottom:10}}> 
            <Text style={{fontFamily:'GothamLight',fontSize: 15,textAlignVertical:'center'}}>Units:</Text>
            </View> 
            <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-start',alignItems:'center'}}>
            <TouchableOpacity style={!this.state.active10Button?styles.unitsButton:styles.unitsActiveButton} onPress={() => this.activateUnitsButton('active10Button')}><Text style={!this.state.active10Button?styles.unitsButtonText:styles.unitsActiveButtonText}>6 lbs</Text></TouchableOpacity>
            <TouchableOpacity  style={!this.state.active20Button?styles.unitsButton:styles.unitsActiveButton} onPress={() => this.activateUnitsButton('active20Button')}><Text style={!this.state.active20Button?styles.unitsButtonText:styles.unitsActiveButtonText}>8 lbs</Text></TouchableOpacity>
            <TouchableOpacity style={!this.state.active50Button?styles.unitsButton:styles.unitsActiveButton} onPress={() => this.activateUnitsButton('active50Button')}><Text style={!this.state.active50Button?styles.unitsButtonText:styles.unitsActiveButtonText}>10 lbs</Text></TouchableOpacity>
            
            </View>
            </View>
             <View style={styles.lotsPageSwitchContainer}>
             <View>
            <SwitchButton
                onValueChange={(val) => this.setState({ activeSwitch: val })}      // this is necessary for this component
                text1 = 'N'                        // optional: first text in switch button --- default ON
                text2 = 'M'                       // optional: second text in switch button --- default OFF
                switchWidth = {80}                 // optional: switch width --- default 44
                switchHeight = {30}                 // optional: switch height --- default 100
                switchdirection = 'rtl'             // optional: switch button direction ( ltr and rtl ) --- default ltr
                switchBorderRadius = {0}          // optional: switch border radius --- default oval
                switchSpeedChange = {100}           // optional: button change speed --- default 100
                switchBorderColor = '#95A5A6'       // optional: switch border color --- default #d4d4d4
                switchBackgroundColor = 'white'      // optional: switch background color --- default #fff
                btnBorderColor = '#004561'          // optional: button border color --- default #00a4b9
                btnBackgroundColor = '#004561'      // optional: button background color --- default #00bcd4
                fontColor = '#004561'               // optional: text font color --- default #b1b1b1
                activeFontColor = '#fff'            // optional: active font color --- default #fff
            />
            
            { this.state.activeSwitch === 1 ? console.log('view1') : console.log('view2') }
            
        </View>
            </View>
        </View>
        <View style={styles.actionsContainer}>
            <View style={styles.quantityContainer}>
                <Text style={{fontFamily:'GothamLight',fontSize: 15,textAlignVertical:'center',paddingRight:10}}>Quantity</Text>
                <NumericInput totalWidth={80} totalHeight={30} minValue={1} />
           
            </View>
             <View style={styles.lotsPageSwitchContainer}>
             <Icon name={this.state.favouriteColor === 'grey' ? 'favorite-border' : 'favorite'} size={30} color={this.state.favouriteColor} onPress={()=>{this.favoutiteClicked()}}/>
            </View>
        </View>       
        </View>
        );
    }
}

export default ProductAction;