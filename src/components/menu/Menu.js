import React from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import styles from './Menu.scss';

import {
  Tab
} from '../../constants';

export default class Menu extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  render() {
    const {
      username,
      isMobile,
      isTablet,
      activeTab
    } = this.props;

    const showMonth = (isMobile || isTablet) && activeTab !== Tab.MONTH;
    const showWeek = (isMobile || isTablet) && activeTab !== Tab.WEEK;
    
    const popover = (
      <Popover id="Menu">
        <ul className={styles.wrapper}>
          <li>
            <a onClick={() => this.onClick(this.props.onCalculatorClick)}>
              <span className="glyphicon glyphicon-piggy-bank"></span>
              <span>CALCULATOR</span>
            </a>
          </li>
          <li>
            <a onClick={() => this.onClick(this.props.onCopyClick)}>
              <span className="glyphicon glyphicon-copy"></span>
              <span>COPY</span>
            </a>
          </li>
          { showMonth ? (
            <li>
              <a onClick={() => this.onClick(this.props.onMonthViewClick)}>
                <span className="glyphicon glyphicon-calendar"></span>
                <span>MONTH VIEW</span>
              </a>
            </li>
          ) : null
          }
          { showWeek ? (
            <li>
              <a onClick={() => this.onClick(this.props.onWeekViewClick)}>
                <span className="glyphicon glyphicon-calendar"></span>
                <span>WEEK VIEW</span>
              </a>
            </li>
          ) : null
          }
          {/* showSidbarButtons ? (
            <li>
              <a onClick={() => this.onClick(this.props.onSearchClick)}>
                <span className="glyphicon glyphicon-search"></span>
                <span>SEARCH</span>
              </a>
            </li>
          ) : null
          */}
          <li role="separator" className={styles.divider}></li>
          <li>
            <a onClick={() => this.onClick(this.props.onLogoutClick)}>
              <span className="glyphicon glyphicon-log-out"></span>
              <span>LOGOUT {username}</span>
            </a>
          </li>
        </ul>
      </Popover>
    );

    return (
      <OverlayTrigger ref="trigger" trigger="click" rootClose={true} placement="bottom" overlay={popover}>
        <Button bsStyle="link"><span className="glyphicon glyphicon-option-vertical"></span></Button>
      </OverlayTrigger>
    );
  }

  onClick(cb) {
    this.refs.trigger.hide();
    cb();
  }

}
