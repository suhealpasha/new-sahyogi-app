import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements'
class CheckboxTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          text: 'Nort Americal',         
          nodes: [
            {
              text: 'Cannada',
              isChecked:false,
            },
            {
              text: 'USA',
              isChecked:false,
            },
          ],
        },
        {
          text: 'South America',        
          nodes: [
            {
              text: 'Mexico',
              isChecked:false,
            },
            {
              text: 'Brazil',
              isChecked:false,
            },
            {
              text: 'Argentaina',
              isChecked:false,
            },
          ],
        },
        {
          text: 'Europe',     
          nodes: [
            {
              text: 'France',
              isChecked:false,
            },
            {
              text: 'Germany',
              isChecked:false,
            },
            {
              text: 'Italy',
              isChecked:false,
            },
            {
              text: 'United kingdom',
              isChecked:false,
            },
          ],
        },
        {
          text: 'Central Asia',     
          nodes: [
            {
              text: 'China',
              isChecked:false,
            },
            {
              text: 'Afghanistan',
              isChecked:false,
            },
            {
              text: 'North Korea',
              isChecked:false,
            },
            {
              text: 'Hong Kong',
              isChecked:false,
            },
          ],
        },
      ],
      selectedParent: null,
      selectedChild:null,
      parentChecked:null,
      childChecked:false,
      checkedItems:[],
      check:{},
      childCheck:{}
    };
  }

checkBox_Test = (id) => {

  const checkCopy = {...this.state.check}
  if (checkCopy[id]) 
  {
    checkCopy[id] = false;
    this.setState((state, props) => {
      Object.values(state.data[id].nodes).map(i=>{
        i.isChecked = false
      })
      return {
        data: state.data
      }
    })
  }
    else checkCopy[id] = true;
  this.setState({ check: checkCopy });
}

child_checkBox_Test = (id,parentId) => {
if(this.state.check[parentId]===true){
  const checkCopy = {...this.state.check}
  checkCopy[parentId] = false;
  this.setState({ check: checkCopy });
}

this.setState((state, props) => {
  state.data[parentId].nodes[id].isChecked = !state.data[parentId].nodes[id].isChecked
  return {
    data: state.data
  }
})

}


  render() {
    let checkboxList = this.state.data.map((item, i) => {
      return (
        <View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox 
              onPress={() => this.checkBox_Test(i) }
              checked = { this.state.check[i]}
              checkedColor='#00aa00'
              />
            
              <Text style={styles.checkBoxText}>{item.text}</Text>
            </View>
            <View>
                {this.state.selectedParent === null 
                 ? 
                 <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({selectedParent: i});
                }}>
                <Icon name="keyboard-arrow-down" size={24} />
              </TouchableWithoutFeedback>
                 :
                 i === this.state.selectedParent ?
                 
                 <TouchableWithoutFeedback
                 onPress={() => {
                   this.setState({selectedParent: null});
                 }}>
                 <Icon name="keyboard-arrow-up" size={24} />
               </TouchableWithoutFeedback>
                 
                 :
                 <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({selectedParent: null});
                }}>
                <Icon name="keyboard-arrow-down" size={24} />
              </TouchableWithoutFeedback>
                 }
              
            </View>
          </View>
          {this.state.selectedParent !== null && i === this.state.selectedParent
            ? Object.values(this.state.data[i].nodes).map((nestedItem, j) => {
                return (
                  <View style={styles.nestedCheckboxContainer}>
                    <CheckBox                   
                    onPress={() => this.child_checkBox_Test(j,i) }
                    checked={ this.state.check[i] ? this.state.check[i] : this.state.data[i].nodes[j].isChecked }
                    checkedColor='#00aa00'
                    />
                    <Text style={styles.nestedCheckBoxText}>
                      {nestedItem.text}
                    </Text>
                  </View>
                );
              })
            : null}
        </View>
      );
    });

    return <View style={{}}>{checkboxList}</View>;
  }
}

export default CheckboxTree;
const styles = StyleSheet.create({
  checkBoxText: {
    fontFamily: 'GothamLight',
  },
  nestedCheckboxContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems:'center'
  },
  nestedCheckBoxText: {
    fontFamily: 'GothamLight',
  },
});
