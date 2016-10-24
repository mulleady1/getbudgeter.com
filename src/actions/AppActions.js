import store from '../store';
import axios from 'axios';
import BillActions from './BillActions';
import { 
  SET_ACTIVE_TAB,
  SET_DATE,
  SET_IS_LOADING,
  SET_IS_MOBILE,
  SET_MESSAGE,
  SET_SHOW_CALCULATOR,
  SET_SHOW_COPY,
  Tab,
  Interval
} from '../constants';

const debug = require('debug')('budgeter:actions:AppActions');

let _fetchTimer,
  _messageTimer;

export default class AppActions {

  static logout() {
    return axios.post('/logout')
      .then(() => {
        window.location = '/';
      })
      .catch((res) => {
        window.location = '/';
        const msg = 'Error logging out.';
        debug(msg);
        debug('res:', res);
        // return Promise.reject(new Error(msg));
      });
  }

  static setActiveTab(tab) {
    let date = store.getState().app.date.clone();
    let interval;
    if (tab === Tab.MONTH) {
      date.startOf('month');
      interval = {
        value: 1,
        unit: Interval.MONTH
      };
    } else if (tab === Tab.WEEK) {
      interval = {
        value: 2,
        unit: Interval.WEEK
      };
    }

    store.dispatch({
      type: SET_ACTIVE_TAB,
      tab,
      interval,
      date
    });

    AppActions.setFetchTimer();
  }
  
  static setIsLoading(isLoading) {
    store.dispatch({
      type: SET_IS_LOADING,
      isLoading
    });
  }
  
  static setIsMobile(isMobile, isTablet) {
    store.dispatch({
      type: SET_IS_MOBILE,
      isMobile,
      isTablet
    });
  }
  
  static setDate(date) {
    store.dispatch({
      type: SET_DATE,
      date
    });

    AppActions.setFetchTimer();
  }

  static setFetchTimer() {
    AppActions.setIsLoading(true);

    if (_fetchTimer) {
      clearTimeout(_fetchTimer);
    }

    _fetchTimer = setTimeout(() => {
      _fetchTimer = null;
      BillActions.get()
        .then(() => AppActions.setIsLoading(false));
    }, 400);
  }
  
  static setMessage(message) {
    if (_messageTimer) {
      clearTimeout(_messageTimer);
    }

    if (message) {
      _messageTimer = setTimeout(() => {
        _messageTimer = null;
        AppActions.setMessage('');
      }, 2000);
    }

    store.dispatch({
      type: SET_MESSAGE,
      message
    });
  }

  static setShowCalculator(showCalculator) {
    store.dispatch({
      type: SET_SHOW_CALCULATOR,
      showCalculator
    });
  }

  static setShowCopy(showCopy) {
    store.dispatch({
      type: SET_SHOW_COPY,
      showCopy
    });
  }

}
