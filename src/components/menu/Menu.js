import React from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import styles from './Menu.scss';

import {
  Tab
} from '../../constants';

const {
  WEEK,
  MONTH,
  SEARCH
} = Tab;

export default class Menu extends React.Component {

  render() {
    const {
      username,
      activeTab
    } = this.props;

    const popover = (
      <Popover id="Menu">
        <ul className={styles.wrapper}>
          <li>
            <a onClick={this.props.onCalculatorClick}>
              <span className="glyphicon glyphicon-piggy-bank"></span>
              <span>CALCULATOR</span>
            </a>
          </li>
          { activeTab !== MONTH ? (
            <li>
              <a onClick={this.props.onMonthViewClick}>
                <span className="glyphicon glyphicon-calendar"></span>
                <span>MONTH VIEW</span>
              </a>
            </li>
          ) : null
          }
          { activeTab !== WEEK ? (
            <li>
              <a onClick={this.props.onWeekViewClick}>
                <span className="glyphicon glyphicon-calendar"></span>
                <span>WEEK VIEW</span>
              </a>
            </li>
          ) : null
          }
          { activeTab !== SEARCH ? (
            <li>
              <a onClick={this.props.onSearchClick}>
                <span className="glyphicon glyphicon-search"></span>
                <span>SEARCH</span>
              </a>
            </li>
          ) : null
          }
          <li>
            <a onClick={this.props.onLogoutClick}>
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

}
