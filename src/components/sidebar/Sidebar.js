import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import AppActions from '../../actions/AppActions';
import styles from './Sidebar.scss';
import {
  Tab
} from '../../constants';

const {
  WEEK,
  MONTH,
  SEARCH
} = Tab;

export class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  render() {
    const tab = this.props.activeTab;

    return (
      <ul className={`${styles.wrapper} flex-col`}>
        <li>
          <a 
            className={classNames({ active: tab === MONTH })}
            onClick={() => this.onClick(MONTH)}>Month</a>
        </li>
        <li>
          <a 
            className={classNames({ active: tab === WEEK })}
            onClick={() => this.onClick(WEEK)}>Week</a>
        </li>
      </ul>
    );
  }

  onClick(tab) {
    AppActions.setActiveTab(tab);
  }

}

const setProps = (state) => {
  return {
    activeTab: state.app.activeTab
  };
};

export default connect(setProps)(Sidebar);
