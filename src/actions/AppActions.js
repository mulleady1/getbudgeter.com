import store from '../store';
import axios from 'axios';
import BillActions from './BillActions';
import { 
  LOGOUT,
  SET_ACTIVE_TAB,
  SET_YEAR_AND_MONTH
} from '../constants';

const debug = require('debug')('budgeter:actions:AppActions');

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
  
  static setYearAndMonth(year, month) {
    store.dispatch({
      type: SET_YEAR_AND_MONTH,
      year,
      month
    });

    BillActions.get(year, month);
  }
  
}
