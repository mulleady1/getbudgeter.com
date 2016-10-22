import store from '../store';
import axios from 'axios';

export default class CalcActions {

  static get() {
    const { date } = store.getState().app;
    const year = date.year();
    const month = date.month() + 1;

    return axios.get(`/calc-cache/${year}/${month}`)
      .then(res => res.data)
      .catch(() => ({}));
  }

  static post(data) {
    const { date } = store.getState().app;
    const year = date.year();
    const month = date.month() + 1;

    return axios.post(`/calc-cache/${year}/${month}`, data);
  }

}
