import {combineReducers} from 'redux';
import * as actionTypes from './action';
const initialState = {
  sellerUser: false,
  active: 'home',
  userType: null,
  forgotPassword: null,
  name: null,
  mobile: null,
  email: null,
  otp: null,
  addressId: null,
  regionName: null,
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
    case actionTypes.REGISTER_DETAILS:
      return {
        ...state,
        name: action.payload,
        mobile: action.payload2,
        email: action.payload3,
        otp: action.payload4,
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
    case actionTypes.DISPLAY_REGION_NAME:
      return {
        ...state,
        regionName: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  destroyOnUnmount: false,
  reducer,
});
