import store from '../store';
import axios from 'axios';
import AppActions from './AppActions';
import {
  SET_UPLOADS,
  ADD_UPLOAD,
  UPDATE_UPLOAD,
  DELETE_UPLOAD,
  SAVING,
  PROCESSING,
  SAVED
} from '../constants';

const debug = require('debug')('budgeter:actions:UploadActions');

export default class UploadActions {

  static get() {
    return axios.get(`/uploads`)
      .then((res) => {
        store.dispatch({
          type: SET_UPLOADS,
          uploads: res.data
        });

        return res.data;
      })
      .catch((res) => {
        const msg = 'Error fetching uploads.';
        debug(msg);
        debug('res:', res);
        return Promise.reject(new Error(msg));
      });
  }

  static save(upload) {
    if (upload._id) {
      return UploadActions.put(upload);
    }

    return UploadActions.post(upload);
  }

  static post(file) {
    AppActions.setMessage(SAVING);
    const formData = new FormData();
    formData.append('file', file);
    return axios.post('/uploads', formData)
      .then((res) => {
        store.dispatch({
          type: ADD_UPLOAD,
          upload: res.data
        });

        AppActions.setMessage(SAVED);
        return res.data;
      })
      .catch((res) => {
        const msg = 'Error saving upload.';
        debug(msg);
        debug('res:', res);
        return Promise.reject(new Error(msg));
      });
  }

  static put(upload) {
    AppActions.setMessage(SAVING);
    return axios.put(`/uploads/${upload._id}`, upload)
      .then((res) => {
        store.dispatch({
          type: UPDATE_UPLOAD,
          upload: res.data
        });

        AppActions.setMessage(SAVED);
        return res.data;
      })
      .catch((res) => {
        const msg = 'Error updating upload.';
        debug(msg);
        debug('res:', res);
        return Promise.reject(new Error(msg));
      });
  }

  static delete(upload) {
    AppActions.setMessage(SAVING);
    return axios.delete(`/uploads/${upload._id}`, upload)
      .then((res) => {
        store.dispatch({
          type: DELETE_UPLOAD,
          upload
        });

        AppActions.setMessage(SAVED);
        return res.data;
      })
      .catch((res) => {
        const msg = 'Error deleting upload.';
        debug(msg);
        debug('res:', res);
        return Promise.reject(new Error(msg));
      });
  }

  static copy(srcStartDate) {
    const { date, interval } = store.getState().app;

    const src = {
      start: srcStartDate.format(),
      end: srcStartDate.clone().add(interval.value, interval.unit).format()
    };

    const dst = {
      start: date.format(),
      end: date.clone().add(interval.value, interval.unit).format()
    };

    AppActions.setMessage(PROCESSING);
    return axios.post('/copy', { src, dst })
      .then((res) => {
        store.dispatch({
          type: SET_UPLOADS,
          uploads: res.data
        });

        AppActions.setMessage(SAVED);
        return res.data;
      })
      .catch((res) => {
        const msg = 'Error saving upload.';
        debug(msg);
        debug('res:', res);
        return Promise.reject(new Error(msg));
      });
  }

}
