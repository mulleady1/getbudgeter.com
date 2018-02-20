import { combineReducers } from 'redux';
import moment from 'moment';
import _ from 'lodash';
import {
  SET_BILLS,
  ADD_BILL,
  UPDATE_BILL,
  DELETE_BILL,

  SET_UPLOADS,
  ADD_UPLOAD,
  UPDATE_UPLOAD,
  DELETE_UPLOAD,

  SET_DATE,
  SET_INTERVAL,
  SET_ACTIVE_TAB,
  SET_IS_LOADING,
  SET_IS_MOBILE,
  SET_MESSAGE,
  SET_SHOW_CALCULATOR,
  SET_SHOW_COPY,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  Tab,
  Interval
} from '../constants';

const interval = {
  value: 1,
  unit: Interval.MONTH
};

const date = moment().startOf(interval.unit);
const storedTab = localStorage.getItem('activeTab');
const activeTab = storedTab ? parseInt(storedTab, 10) : Tab.MONTH;
const initialState = {
  user: {},
  activeTab,
  message: '',
  date,
  interval,
  showCalculator: false,
  showCopy: false,
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
        activeTab: action.tab,
        date: action.date,
        interval: action.interval,
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
    case SET_SHOW_COPY:
      return {
        ...state,
        showCopy: action.showCopy
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

function uploads(state = [], action) {
  switch (action.type) {
    case SET_UPLOADS:
      return action.uploads;
    case ADD_UPLOAD:
      return state.concat(action.upload);
    case UPDATE_UPLOAD:
      const upload = _.find(state, { _id: action.upload._id });
      const newUpload = {
        ...upload,
        ...action.upload
      };

      return state
        .filter(b => b._id !== newUpload._id)
        .concat(newUpload);
    case DELETE_UPLOAD:
      return state.filter(b => b._id !== action.upload._id);
    default:
      return state;
  }
}

const reducers = combineReducers({
  app,
  bills,
  uploads
});

export default reducers;
