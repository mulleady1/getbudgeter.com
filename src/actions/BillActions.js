import store from '../store';
import axios from 'axios';
import {
  SET_BILLS,
  ADD_BILL,
  UPDATE_BILL,
  DELETE_BILL
} from '../constants';

const debug = require('debug')('budgeter:actions:BillActions');

export default class BillActions {

  static get() {
    const { date, interval } = store.getState().app;
    const { value, unit } = interval;
    const start = date.format();
    const end = date.clone().add(value, unit).format();
    return axios.get(`/bills?start=${start}&end=${end}`)
      .then((res) => {
        store.dispatch({
          type: SET_BILLS,
          bills: res.data
        });

        return res.data;
      })
      .catch((res) => {
        const msg = 'Error fetching bills.';
        debug(msg);
        debug('res:', res);
        return Promise.reject(new Error(msg));
      });
  }

  static save(bill) {
    if (bill._id) {
      return BillActions.put(bill);
    }

    return BillActions.post(bill);
  }

  static post(bill) {
    return axios.post('/bills', bill)
      .then((res) => {
        store.dispatch({
          type: ADD_BILL,
          bill: res.data
        });

        return res.data;
      })
      .catch((res) => {
        const msg = 'Error saving bill.';
        debug(msg);
        debug('res:', res);
        return Promise.reject(new Error(msg));
      });
  }

  static put(bill) {
    return axios.put(`/bills/${bill._id}`, bill)
      .then((res) => {
        store.dispatch({
          type: UPDATE_BILL,
          bill: res.data
        });

        return res.data;
      })
      .catch((res) => {
        const msg = 'Error updating bill.';
        debug(msg);
        debug('res:', res);
        return Promise.reject(new Error(msg));
      });
  }

  static delete(bill) {
    return axios.delete(`/bills/${bill._id}`, bill)
      .then((res) => {
        store.dispatch({
          type: DELETE_BILL,
          bill
        });

        return res.data;
      })
      .catch((res) => {
        const msg = 'Error deleting bill.';
        debug(msg);
        debug('res:', res);
        return Promise.reject(new Error(msg));
      });
  }

}
