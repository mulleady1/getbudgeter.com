import { combineReducers } from 'redux';
import moment from 'moment';
import _ from 'lodash';
import {
  SET_BILLS,
  ADD_BILL,
  UPDATE_BILL,
  DELETE_BILL,
  SET_DATE,
  SET_INTERVAL,
  SET_ACTIVE_TAB,
  SET_IS_LOADING,
  SET_IS_MOBILE,
  SET_MESSAGE,
  SET_SHOW_CALCULATOR,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  Tab,
  Inteval
} from '../constants';

const interval = {
  value: 1,
  unit: Inteval.MONTH
};

const date = moment().startOf(interval.unit);
const initialState = {
  user: {}, 
  activeTab: Tab.MONTH,
  message: '', 
  date, 
  interval,
  showCalculator: false,
  isMobile: window.innerWidth < MOBILE_WIDTH,
  isTablet: window.innerWidth < TABLET_WIDTH
};

function app(state = initialState, action) {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        date: action.date
      };
    case SET_INTERVAL:
      return {
        ...state,
        interval: action.interval
      };
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.tab
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case SET_IS_MOBILE:
      return {
        ...state,
        isTablet: action.isTablet,
        isMobile: action.isMobile
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    case SET_SHOW_CALCULATOR:
      return {
        ...state,
        showCalculator: action.showCalculator
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
      const bill = _.find(state, { _id: action.bill._id });
      const newBill = {
        ...bill,
        ...action.bill
      };

      return state
        .filter(b => b._id !== newBill._id)
        .concat(newBill);
    case DELETE_BILL:
      return state.filter(b => b._id !== action.bill._id);
    default:
      return state;
  }
}

const reducers = combineReducers({
  app,
  bills
});

export default reducers;
