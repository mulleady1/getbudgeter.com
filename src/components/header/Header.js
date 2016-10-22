import React from 'react';
import { connect } from 'react-redux';
import AppActions from '../../actions/AppActions';
import NavLink from '../shared/NavLink';
import Menu from '../menu/Menu';
import styles from './Header.scss';

export class Header extends React.Component {

  constructor(props) {
    super(props);

    this.onCalculatorClick = this.onCalculatorClick.bind(this);
    this.onMonthViewClick = this.onMonthViewClick.bind(this);
    this.onWeekViewClick = this.onWeekViewClick.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  render() {
    const { 
      user,
      activeTab 
    } = this.props;

    const props = {
      username: user.username,
      activeTab,
      onCalculatorClick: this.onCalculatorClick,
      onMonthViewClick: this.onMonthViewClick,
      onWeekViewClick: this.onWeekViewClick,
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
    
  }

  onMonthViewClick() {
    
  }

  onWeekViewClick() {
    
  }

  onSearchClick() {
    
  }

  onLogoutClick() {
    AppActions.logout();
  }

}

const setProps = (state) => {
  return {
    user: state.app.user,
    activeTab: state.app.activeTab    
  };
};

export default connect(setProps)(Header);
