import store from '../store';
import axios from 'axios';
import BillActions from './BillActions';
import { 
  SET_ACTIVE_TAB,
  SET_DATE,
  SET_IS_LOADING,
  SET_IS_MOBILE,
  SET_MESSAGE,
  SET_SHOW_CALCULATOR
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
        const msg = 'Error logging out.';
        debug(msg);
        debug('res:', res);
        return Promise.reject(new Error(msg));
      });
  }

  static setActiveTab(tab) {
    store.dispatch({
      type: SET_ACTIVE_TAB,
      tab
    });
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
}
