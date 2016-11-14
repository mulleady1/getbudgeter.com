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

    const showCalc = activeTab !== Tab.GRAPH;
    const showMonth = (isMobile || isTablet) && activeTab !== Tab.MONTH;
    const showWeek = (isMobile || isTablet) && activeTab !== Tab.WEEK;
    const showGraph = (isMobile || isTablet) && activeTab !== Tab.GRAPH;
    
    const popover = (
      <Popover id="Menu">
        <ul className={styles.wrapper}>
          { showCalc ? (
            <li>
              <a onClick={() => this.onClick(this.props.onCalculatorClick)}>
                <span className="glyphicon glyphicon-piggy-bank"></span>
                <span>CALCULATOR</span>
              </a>
            </li>
          ) : null
          }
          { showCalc ? (
            <li>
              <a onClick={() => this.onClick(this.props.onCopyClick)}>
                <span className="glyphicon glyphicon-copy"></span>
                <span>COPY</span>
              </a>
            </li>
          ) : null
          }
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
          { showGraph ? (
            <li>
              <a onClick={() => this.onClick(this.props.onGraphViewClick)}>
                <span className="glyphicon glyphicon-picture"></span>
                <span>GRAPH VIEW</span>
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
          { showCalc ? (
            <li role="separator" className={styles.divider}></li>
          ) : null
          }
          <li>
            <form action="/logout" method="post">
              <button type="submit" className="btn btn-link">
                <span className="glyphicon glyphicon-log-out"></span>
                <span>LOGOUT {username}</span>
              </button>
            </form>
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
