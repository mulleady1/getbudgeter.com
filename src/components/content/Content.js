import React from 'react';
import { connect } from 'react-redux';
import Bills from '../bills/Bills';
import GraphList from '../graphs/GraphList';
import Uploads from '../uploads/Uploads';
import {Loading} from '../shared';
import styles from './Content.scss';
import {
  Tab
} from '../../constants';

export class Content extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      bills,
      uploads,
      date,
      interval,
      isLoading,
      activeTab
    } = this.props;

    let children = null;
    if (activeTab === Tab.GRAPH) {
      children = isLoading ? (
        <Loading />
      ) : (
        <GraphList bills={bills} />
      );
    } else if (activeTab === Tab.VIZ) {
      children = isLoading ? (
        <Loading />
      ) : (
        <Uploads uploads={uploads} />
      );
    } else {
      children = (
        <Bills
          bills={bills}
          date={date}
          interval={interval}
          isLoading={isLoading} />
      );
    }

    return (
      <div className={`main ${styles.wrapper}`}>
        <div>
          { children }
          <div className={styles.footer}>
            <a className="btn btn-default btn-xs" href="mailto:info@getbudgeter.com?subject=Budgeter%20Feedback">
              <span className="glyphicon glyphicon-envelope"></span>
              <span>Send Feedback</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

}

const setProps = (state) => {
  const { activeTab, isLoading, date, interval } = state.app;
  return {
    bills: state.bills,
    uploads: state.uploads,
    activeTab,
    isLoading,
    date,
    interval
  };
};

export default connect(setProps)(Content);
