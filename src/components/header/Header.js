import React from 'react';
import AppActions from '../../actions/AppActions';
import Menu from '../menu/Menu';
import styles from './Header.scss';

import {
  Tab
} from '../../constants';

const {
  WEEK,
  MONTH,
  SEARCH,
  GRAPH
} = Tab;

export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.onCalculatorClick = this.onCalculatorClick.bind(this);
    this.onMonthViewClick = this.onMonthViewClick.bind(this);
    this.onWeekViewClick = this.onWeekViewClick.bind(this);
    this.onGraphViewClick = this.onGraphViewClick.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  render() {
    const { 
      user,
      activeTab,
      isMobile,
      isTablet
    } = this.props;

    const props = {
      username: user.username,
      activeTab,
      isMobile,
      isTablet,
      onCalculatorClick: this.onCalculatorClick,
      onCopyClick: this.onCopyClick,
      onMonthViewClick: this.onMonthViewClick,
      onWeekViewClick: this.onWeekViewClick,
      onGraphViewClick: this.onGraphViewClick,
      onSearchClick: this.onSearchClick,
      onLogoutClick: this.onLogoutClick
    };

    return (
      <div className={`${styles.nav} flex-row jc-sb`}>
        <div className="flex-row ai-center">
          <a href="/" className={styles.logo}>
            <span className={styles.circle}>
              <span className={styles.dollar}>$</span>
              <span className={styles.b}>B</span>
            </span>
          </a>
          <h1 className="hidden-xs hidden-sm">Budgeter Dashboard</h1>
        </div>
        <Menu {...props} />
      </div>
    );
  }

  onCalculatorClick() {
    AppActions.setShowCalculator(true);
  }

  onCopyClick() {
    AppActions.setShowCopy(true);
  }

  onMonthViewClick() {
    AppActions.setActiveTab(MONTH);
  }

  onWeekViewClick() {
    AppActions.setActiveTab(WEEK);
  }

  onGraphViewClick() {
    AppActions.setActiveTab(GRAPH);
  }

  onSearchClick() {
    AppActions.setActiveTab(SEARCH);
  }

  onLogoutClick() {
    AppActions.logout();
  }

}
