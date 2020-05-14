import React, {Component} from 'react';
import {
  AsyncStorage,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CheckBox} from 'react-native-elements';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import * as api from '../../assets/api/api';

const allRegionsOriginsData = [];
class CheckboxTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,      
      allRegionsOriginsData: [],     
      selectedParent: null,    
      checkedItems: [],
      check: {},      
    };
  }

  async componentDidMount() {
    await this.props.allRegionsData.filter(item => {
      this.fetchOrigins(item.region_Id, item.name);
    });
  }

  fetchOrigins = async (args, args2) => {
    this.setState({spinner: true});
    let data = JSON.stringify({
      region_Id: args,
    });
    const access_token = await AsyncStorage.getItem('isLoggedIn');
    axios
      .post(api.originsByIdAPI, data, {
        headers: {
          accept: 'application/json',
          access_token: access_token,
          'accept-language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        const item = {[args2]: res.data.data !== [] ? res.data.data : null};
        this.setState({
          spinner: false,
          allRegionsOriginsData: [...this.state.allRegionsOriginsData, item],
        });
      })
      .catch(err => {
        this.setState({spinner: false});
        console.log(err);
      });
  };

  checkBox_Test = id => {
    let checkCopy = {...this.state.check};
    if (checkCopy[id]) {
      checkCopy[id] = false;
      this.setState((state, props) => {
        Object.values(state.allRegionsOriginsData[id]).map(i => {
          i.isChecked = false;
          i.map(j => {
            j.isChecked = false;
          });
        });
        return {
          allRegionsOriginsData: state.allRegionsOriginsData,
        };
      });
    } else checkCopy[id] = true;
    this.setState({check: checkCopy});
  };

  child_checkBox_Test = (id, parentId) => {
    if (this.state.check[parentId] === true) {
      const checkCopy = {...this.state.check};
      checkCopy[parentId] = false;
      this.setState({check: checkCopy});
    }

    this.setState((state, props) => {
      Object.values(this.state.allRegionsOriginsData[parentId]).map(i => {        
        i[id].isChecked = !i[id].isChecked;
      });

      return {
        allRegionsOriginsData: state.allRegionsOriginsData,
      };
    });
  };

  render() {
    let checkboxList = this.state.allRegionsOriginsData.map((item, i) => {
      return (
        <View>         
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                onPress={() => this.checkBox_Test(i)}
                checked={this.state.check[i]}
                checkedColor="#00aa00"
              />

              <Text style={styles.checkBoxText}>{Object.keys(item)}</Text>
            </View>
            <View>
              {this.state.selectedParent === null ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState({selectedParent: i});
                  }}>
                  <Icon name="keyboard-arrow-down" size={24} />
                </TouchableWithoutFeedback>
              ) : i === this.state.selectedParent ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState({selectedParent: null});
                  }}>
                  <Icon name="keyboard-arrow-up" size={24} />
                </TouchableWithoutFeedback>
              ) : (
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState({selectedParent: null});
                  }}>
                  <Icon name="keyboard-arrow-down" size={24} />
                </TouchableWithoutFeedback>
              )}
            </View>
          </View>
          {this.state.selectedParent !== null && i === this.state.selectedParent
            ? Object.values(this.state.allRegionsOriginsData[i]).map(
                (nestedItem, j) => {
                  return nestedItem.map((k, l) => {
                    return (
                      <View style={styles.nestedCheckboxContainer}>
                        <CheckBox
                          onPress={() => this.child_checkBox_Test(l, i)}
                          checked={
                            this.state.check[i]
                              ? this.state.check[i]
                              : nestedItem[l].isChecked
                          }
                          checkedColor="#00aa00"
                        />
                        <Text style={styles.nestedCheckBoxText}>{k.name}</Text>
                      </View>
                    );
                  });
                },
              )
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
    alignItems: 'center',
  },
  nestedCheckBoxText: {
    fontFamily: 'GothamLight',
  },
});
