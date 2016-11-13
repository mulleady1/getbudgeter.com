export const FORMAT = 'MMM Do, YYYY';
export const FIVE_MINUTES = 1000 * 60 * 5;

export const SET_BILLS = 'SET_BILLS';
export const ADD_BILL = 'ADD_BILL';
export const UPDATE_BILL = 'UPDATE_BILL';
export const DELETE_BILL = 'DELETE_BILL';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const SET_DATE = 'SET_DATE';
export const SET_INTERVAL = 'SET_INTERVAL';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_IS_MOBILE = 'SET_IS_MOBILE';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_SHOW_CALCULATOR = 'SET_SHOW_CALCULATOR';
export const SET_SHOW_COPY = 'SET_SHOW_COPY';

export const Tab = {
  MONTH: 1,
  WEEK: 2,
  SEARCH: 3,
  GRAPH: 4
};

export const Interval = {
  YEAR: 'year',
  MONTH: 'month',
  WEEK: 'week'
};

export const CopySource = {
  LAST_MONTH: 0,
  LAST_WEEKS: 1,
  SPECIFIC_DATE: 2
};

export const PROCESSING = 'Processing...';
export const SAVING = 'Saving...';
export const SAVED = 'Saved.';
export const MOBILE_WIDTH = 600;
export const TABLET_WIDTH = 1000;
export const NEW_VERSION_MESSAGE = [
  'Thanks for using Budgeter! Enjoy the new interface. ',
  'It\'s still in Beta, so feel free to let us know of any ',
  'issues via the Send Feedback button at the bottom.'
].join('');