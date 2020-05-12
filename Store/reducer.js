import {combineReducers} from 'redux';
import * as actionTypes from './action';
const initialState = {
  sellerUser: false,
  active: 'home',
  listingTitle:null,
  userType: null,  
  sellerUserType: null,
  forgotPassword: null,
  name: null,
  mobile: null,
  email: null,
  company:null,
  ein:null,
  alternatePhone:null,
  address:null,
  otp: null,
  addressId: null,
  regionName: null,
  varietyName: null,
  filterFeaturedData:null,
  filterOriginsData:[],
  filterLotNamesData:[],
  filterVaritiesData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTIVE_ICON:
      return {
        ...state,
        active: action.payload,
      };
    case actionTypes.USER_TYPE:      
      return {
        ...state,
        userType: action.payload,
      };
    case actionTypes.FORGOT_PASSWORD:
      return {
        ...state,
        forgotPassword: action.payload,
      };
    case actionTypes.SELLER_USER_SELECTED:
      return {
        ...state,
        sellerUser: action.payload,
      };
    case actionTypes.SELLER_USER_TYPE:
      return {
        ...state,
        sellerUserType: action.payload,
      };
    case actionTypes.REGISTER_DETAILS:
      return {
        ...state,
        name: action.payload,
        mobile: action.payload2,
        email: action.payload3,
        otp: action.payload4,
      };
    case actionTypes.REGISTER_SELLER_DETAILS:    
      return {
        ...state,
        name: action.payload,
        mobile: action.payload2,
        email: action.payload3,
      };
    case actionTypes.REGISTER_SELLER_ADDITIONAL_DETAILS:
      return {
        ...state,
        company: action.payload,
        ein: action.payload2,
        alternatePhone: action.payload3,
        address: action.payload4,
        otp: action.payload5,
      };
    case actionTypes.RESEND_OTP:
      return {
        ...state,
        otp: action.payload,
      };
    case actionTypes.ADDRESS_UPDATE:
      return {
        ...state,
        addressId: action.payload,
      };
    case actionTypes.FORGOT_PASSWORD_DETAILS:
      return {
        ...state,
        mobile: action.payload,
        otp: action.payload1,
      };
      case actionTypes.LISTING_TITLE:
      return {
        ...state,
        listingTitle: action.payload,
      };
    case actionTypes.DISPLAY_REGION_NAME:
      return {
        ...state,
        regionName: action.payload,
      };
      case actionTypes.DISPLAY_VARIETY_NAME:
      return {
        ...state,
        varietyName: action.payload,
      };
      case actionTypes.FILTER_FEATURED_DATA:
      return {
        ...state,
        filterFeaturedData: action.payload,
      };
      case actionTypes.FILTER_ORIGINS_DATA:
      return {
        ...state,
        filterOriginsData: action.payload,
      };
      case actionTypes.FILTER_LOTS_DATA:
      return {
        ...state,
        filterLotNameData: action.payload,
      };   
    case actionTypes.FILTER_VARITIES_DATA:
      return {
        ...state,
        filterVaritiesData: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  destroyOnUnmount: false,
  reducer,
});
