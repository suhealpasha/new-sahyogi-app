import React, {Component} from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Alert,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  Switch,
  TextInput,
  ImageBackground,
  Linking, Platform
} from 'react-native';
import * as actionTypes from '../../../Store/action';
import RightArrowIcon from '../../utils/components/Icons/rightArrow';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {connect} from 'react-redux';
import StepIndicator from 'react-native-step-indicator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width;

const itemHeight = 69;

class OrderHelpCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      question: true,
      question_no: '',
      imageQty: false,
      orders: [
        {
          order_no: '1234-5678-9000-3453',
          items: [
            {
              name: 'United Colors of Benetton Sunglass',
              model: 'BE5002MI670',
              size: 'M',
              qty: 1000,
              total: 50000,
              status: 1,
              delivery_date: '06 Nov',
              image: require('../../../assets/Images/products/sunglasses/3.png'),
            },
          ],
        },
      ],
      questions: [
        {
          id: 1,
          que: 'Where is my order',
          ans:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          button: 'Track Details',
        },
        {
          id: 2,
          que: 'Do you have any option to deliver my order faster?',
          ans:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        },
        {
          id: 3,
          que: 'Can you deliver my product at a specific date or time?',
          ans:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        },
        {
          id: 4,
          que: 'I want to cancel an order',
          ans:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        },
        {
          id: 5,
          que: 'I am unable to cancel my order',
          ans:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        },
        {
          id: 6,
          que: 'I want to change my delivery address',
          ans:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        },
      ],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props.searchbar);
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
    this.props.navigation.goBack(null);
    // this.props.onTabClicked('category');
    if (this.props.searchbar) {
      this.props.closeSearch();
    }
    return true;
  }

  dialCall = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    }
    else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };

  sendMail = () =>{
    Linking.openURL('mailto:support@example.com') 
  }

  render() {
    let currentPosition;
    const labels = ['Bag', 'Address', 'Payment'];
    const customStyles = {
      stepIndicatorSize: 10,
      currentStepIndicatorSize: 10,
      separatorStrokeWidth: 2,
      currentStepStrokeWidth: 1,
      stepStrokeCurrentColor: '#000000',
      stepStrokeWidth: 1,
      separatorStrokeFinishedWidth: 4,
      stepStrokeFinishedColor: '#ff7d01',
      stepStrokeUnFinishedColor: '#d8d8d8',
      separatorFinishedColor: '#7ea100',
      separatorUnFinishedColor: '#d8d8d8',
      stepIndicatorFinishedColor: '#ff7d01',
      stepIndicatorUnFinishedColor: '#d8d8d8',
      stepIndicatorCurrentColor: '#ff7d01',
      stepIndicatorLabelFontSize: 13,
      currentStepIndicatorLabelFontSize: 13,
      stepIndicatorLabelCurrentColor: 'white',
      stepIndicatorLabelFinishedColor: 'white',
      stepIndicatorLabelUnFinishedColor: 'white',
    };
    const styles = StyleSheet.create({
      button: {
        width: '100%',
        padding: 20,
      },
      buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#ff7d01',
      },
      order_item: {
        borderWidth: 1,
        marginTop: 10,
        borderColor: '#e7e7e7',
        borderRadius: 5,
        padding: 10,
      },
      verticleLine: {
        height: 20,
        width: 2,
        backgroundColor: '#e7e7e7',
        alignItems: 'center',
      },
      helpContainer: {
        marginTop: 10,
        backgroundColor: '#fff4e9',
        padding: 10,
      },
    });

    let order = [];
    if (this.state.orders.length > 0) {
      this.state.orders.map((i, index) => {
        let order_items = [];
        i.items.map((i, index) => {
          order_items.push(
            <View style={styles.order_item}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',

                  borderBottomWidth: 1,
                  paddingBottom: 10,
                  borderBottomColor: '#e5e5e5',
                }}>
                <Image
                  source={i.image}
                  style={{
                    width: 100,
                    height: 100,

                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: '#dbdbdb',
                    padding: 5,
                  }}
                  resizeMode="cover"
                />
                <View style={{marginLeft: 10, marginRight: 10, width: '60%'}}>
                  <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                    {i.name}
                  </Text>
                  <Text style={{fontSize: 12}}>Model No: {i.model}</Text>
                  <Text style={{fontSize: 10, color: '#666666'}}>
                    Size: {i.size}
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                    Total Qty: {i.qty}
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                    Total Rs.: {i.total}
                  </Text>
                  <Text style={{color: '#ff7d01'}}>Processing</Text>
                  <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                    Reach you by {i.delivery_date}
                  </Text>
                </View>
              </View>

              <TouchableOpacity>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#ff7d01',
                    padding: 10,
                    textAlign: 'center',
                  }}>
                  View Details
                </Text>
              </TouchableOpacity>
            </View>,
          );
        });
        order.push(
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {order_items}
          </View>,
        );
      });
    }

    let questions = [];
    if (this.state.questions.length > 0) {
      questions.push(
        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
          More Queries Related To Your Experience
        </Text>,
      );
      this.state.questions.map((i, index) => {
        questions.push(
          <View>
            <TouchableOpacity
              onPress={() => {
                this.setState({question: false, question_no: i.id});
              }}
              style={{
                padding: 10,
                borderWidth: 1,
                marginTop: 10,
                borderColor: '#dbdbdb',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: '#666666', fontSize: 12}}>{i.que}</Text>
              <RightArrowIcon />
            </TouchableOpacity>
          </View>,
        );
      });
    }

    let answer;
    if (this.state.questions.length > 0) {
      answer = this.state.questions.map((i, index) => {
        if (i.id === this.state.question_no) {
          return (
            <View
              style={{
                padding: 10,
                borderColor: '#dbdbdb',
                borderWidth: 1,
                borderRadius: 5,
              }}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                {i.que}
              </Text>
              <Text style={{marginBottom: 10, color: '#666666'}}>{i.ans}</Text>
              <TouchableOpacity style={{borderTopWidth:1,borderColor: '#dbdbdb',}}>
                  <Text style={{
                    fontWeight: 'bold',
                    color: '#ff7d01',
                    padding: 10,
                    textAlign: 'center',
                  }}>{i.button}</Text>
              </TouchableOpacity>
            </View>
          );
        }
      });
    }

    return (
      <View style={{flex: 1, backgroundColor: '#ffff'}}>
        <KeyboardAwareScrollView
          extraHeight={false}
          scrollEnabled={true}
          style={{paddingLeft: 16, paddingRight: 16}}>
          {order}
          <View>{this.state.question ? questions : answer}</View>
          {!this.state.question ?
          <View style={{marginTop:10}}>
              <Text style={{fontWeight:'bold',fontSize:14}}>Still Need Help?</Text>
              <Text style={{color:'#666666'}}>
              Have queries? Please get in touch and we will be happy to help you.
              </Text>
              <View style={{marginTop:20,marginBottom:10}}>
                  <TouchableOpacity onPress={this.dialCall}
                   style={{ borderColor: '#dbdbdb',display:'flex',flexDirection:'row',borderBottomWidth:1,padding:20}}>
                  <Icon name='call' size={24}/>
                  <Text style={{marginLeft:20,fontSize:16,fontWeight:'bold'}}>Make a Voice Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={this.sendMail}
                  style={{display:'flex',flexDirection:'row',padding:20}}>
                  <Icon name='mail-outline' size={24}/>
                  <Text style={{marginLeft:20,fontSize:16,fontWeight:'bold'}}>Send a Mail</Text>
                  </TouchableOpacity>
                
              </View>
          </View>
          : null}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    active: state.reducer.active,
    bottomTab: state.reducer.bottomTab,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTabClicked: value =>
      dispatch({type: actionTypes.ACTIVE_TAB, payload: value}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderHelpCenter);
