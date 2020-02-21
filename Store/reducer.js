
import {combineReducers} from 'redux';
import * as actionTypes from './action';
const initialState = {
active:'home'
}

const reducer = (state=initialState,action)=>{
switch(action.type){

case actionTypes.ACTIVE_ICON:
return {
      ...state,     
      active:action.payload
};

default:
return state;
}
}

 export default combineReducers(
     {
         destroyOnUnmount:false,
         reducer
     }
 );
