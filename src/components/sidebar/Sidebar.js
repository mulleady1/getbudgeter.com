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
  // SEARCH
} = Tab;

export class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  render() {
    const { isMobile, isTablet } = this.props;
    if (isMobile || isTablet) {
      return null;
    }
    
    const tab = this.props.activeTab;

    return (
      <ul className={`${styles.wrapper} flex-col`}>
        <li>
          <a 
            className={classNames({ [styles.active]: tab === MONTH })}
            onClick={() => this.onClick(MONTH)}>
              <span className="glyphicon glyphicon-calendar"></span>
              <span>MONTH VIEW</span>
          </a>
        </li>
        <li>
          <a 
            className={classNames({ [styles.active]: tab === WEEK })}
            onClick={() => this.onClick(WEEK)}>
              <span className="glyphicon glyphicon-calendar"></span>
              <span>WEEK VIEW</span>  
          </a>
        </li>
        {/*<li>
          <a 
            className={classNames({ [styles.active]: tab === SEARCH })}
            onClick={() => this.onClick(SEARCH)}>Search</a>
        </li>*/}
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
