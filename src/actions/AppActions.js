import store from '../store';
import axios from 'axios';
import BillActions from './BillActions';
import { 
  LOGOUT,
  SET_ACTIVE_TAB,
  SET_DATE,
  SET_IS_LOADING
} from '../constants';

const debug = require('debug')('budgeter:actions:AppActions');

let _timer = null;

export default class AppActions {

  static logout() {
    return axios.post('/logout')
      .then((res) => {
        store.dispatch({
          type: LOGOUT,
          user: res.data
        });

        return res.data;
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
  
  static setDate(date) {
    store.dispatch({
      type: SET_DATE,
      date
    });

    AppActions.setIsLoading(true);

    if (_timer) {
      clearTimeout(_timer);
    }

    _timer = setTimeout(() => {
      BillActions.get();
      AppActions.setIsLoading(false);
      _timer = null;
    }, 400);
  }
  
}
