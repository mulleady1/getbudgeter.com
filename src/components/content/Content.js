import React from 'react';
import { connect } from 'react-redux';
import AppActions from '../../actions/AppActions';
import BillList from '../bills/BillList';
import Timeframe from '../timeframe/Timeframe';
import {Loading} from '../shared';
import styles from './Content.scss';

export class Content extends React.Component {

  constructor(props) {
    super(props);

    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  render() {
    const { 
      bills,
      year,
      month,
      isLoading
    } = this.props;

    return (
      <div className="main">
        <div className={styles.header}>
          <Timeframe year={year} month={month} />
        </div>
        { isLoading ? (
          <Loading />
        ) : (
          <BillList bills={bills} year={year} month={month} />
        )}
      </div>
    );
  }

  onLogoutClick() {
    AppActions.logout();
  }

}

const setProps = (state) => {
  const { activeTab, isLoading, year, month } = state.app;
  return {
    bills: state.bills,
    activeTab,
    isLoading,
    year,
    month
  };
};

export default connect(setProps)(Content);
