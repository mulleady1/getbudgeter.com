import { combineReducers } from 'redux';
import moment from 'moment';
import _ from 'lodash';
import {
  LOGIN,
  LOGOUT,
  SET_BILLS,
  ADD_BILL,
  UPDATE_BILL,
  DELETE_BILL,
  SET_ACTIVE_TAB,
  SET_YEAR,
  SET_MONTH,
  SET_YEAR_AND_MONTH,
  Tab
} from '../constants';

const year = moment().year();
const month = moment().month() + 1;

function app(state = { user: {}, activeTab: Tab.MONTH, year, month }, action) {
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
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.tab
      };
    case SET_YEAR:
      return {
        ...state,
        year: action.year
      };
    case SET_MONTH:
      return {
        ...state,
        month: action.month
      };
    case SET_YEAR_AND_MONTH:
      return {
        ...state,
        year: action.year,
        month: action.month
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
