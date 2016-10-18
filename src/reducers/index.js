import { combineReducers } from 'redux';
import _ from 'lodash';
import {
  LOGIN,
  LOGOUT,
  SET_BILLS,
  ADD_BILL,
  UPDATE_BILL,
  DELETE_BILL
} from '../constants';

function app(state = { user: null }, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.user
      };
    case LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

function bills(state = [], action) {
  switch (action.type) {
    case SET_BILLS:
      return action.bills;
    case ADD_BILL:
      return state.concat(action.bill);
    case UPDATE_BILL:
      const bill = _.find(state, { id: action.bill.id });
      const newBill = {
        ...bill,
        ...action.bill
      };

      return state
        .filter(b => b.id !== newBill.id)
        .concat(newBill);
    case DELETE_BILL:
      return state.filter(b => b.id !== action.bill.id);
    default:
      return state;
  }
}

const reducers = combineReducers({
  app,
  bills
});

export default reducers;
