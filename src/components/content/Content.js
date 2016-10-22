import React from 'react';
import { connect } from 'react-redux';
import BillList from '../bills/BillList';
import Timeframe from '../timeframe/Timeframe';
import {Loading} from '../shared';
import styles from './Content.scss';

export class Content extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { 
      bills,
      date,
      interval,
      isLoading
    } = this.props;

    return (
      <div className={`main ${styles.wrapper}`}>
        <div className={styles.header}>
          <Timeframe date={date} interval={interval} />
        </div>
        { isLoading ? (
          <Loading />
        ) : (
          <BillList bills={bills} date={date} interval={interval} />
        )}
      </div>
    );
  }

}

const setProps = (state) => {
  const { activeTab, isLoading, date, interval } = state.app;
  return {
    bills: state.bills,
    activeTab,
    isLoading,
    date,
    interval
  };
};

export default connect(setProps)(Content);
