import {combineReducers} from 'redux';
import * as actionTypes from './action';
const initialState = {
  sellerUser: false,
  active: 'home',
  listingTitle: null,
  userType: null,
  sellerUserType: null,
  forgotPassword: null,
  name: null,
  lastName:null,
  mobile: null,
  email: null,
  company: null,
  ein: null,
  alternatePhone: null,
  sellerStreet: null,
  sellerCity: null,
  sellerState: null,
  sellerZipcode: null,
  otp: null,
  addressId: null,
  regionName: null,
  varietyName: null,
  orderNumber:null,
  filterFeaturedData: null,
  filterOriginsData: [],
  filterMicroLotData: false,
  filterNanoLotData: false,
  filterVaritiesData: [],
  buyProduct: true,
  cartProductData: [],
  spinner: false,
  ///////////////////
  proceedButton:null,
  editCustomerInfo:false,
  bottomTab:'home',
  bottomActiveTabWidth:100
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
        lastName:action.payload2,
        mobile: action.payload3,
        email: action.payload4,
        otp: action.payload5,
      };
    case actionTypes.REGISTER_SELLER_ADDITIONAL_DETAILS:
      return {
        ...state,
        company: action.payload,
        ein: action.payload2,
        alternatePhone: action.payload3,
        sellerStreet: action.payload4,
        sellerCity: action.payload5,
        sellerState: action.payload6,
        sellerZipcode: action.payload7,
        otp: action.payload8,
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
        email: action.payload,
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
    case actionTypes.DISPLAY_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: action.payload,
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
    case actionTypes.FILTER_MICRO_LOT_DATA:
      return {
        ...state,
        filterMicroLotData: action.payload,
      };
    case actionTypes.FILTER_NANO_LOT_DATA:
      return {
        ...state,
        filterNanoLotData: action.payload,
      };
    case actionTypes.FILTER_VARITIES_DATA:
      return {
        ...state,
        filterVaritiesData: action.payload,
      };
    case actionTypes.BUY_PRODUCT:
      return {
        ...state,
        buyProduct: action.payload,
      };
    case actionTypes.PRODUCT_CART_DETAILS:
      return {
        ...state,
        cartProductData: action.payload,
      };
    case actionTypes.SPINNER_SWITCH:
      return {
        ...state,
        spinner: action.payload,
      };
      case actionTypes.RESEND_OTP:
      return {
        ...state,
        otp: action.payload,
      };
      ////////////////////////////////////
      case actionTypes.PROCEED_CLICKED:  
      console.log('herer',action.payload)    
      return {
        ...state,
        proceedButton: action.payload,
      };
      case actionTypes.EDIT_CUSTOMER_INFO:      
      return {
        ...state,
        editCustomerInfo: action.payload,
      };
      case actionTypes.ACTIVE_TAB:      
      return {
        ...state,
        bottomTab: action.payload,
        bottomActiveTabWidth:action.payload2
      };
    default:
      return state;
  }
};

export default combineReducers({
  destroyOnUnmount: false,
  reducer,
});
