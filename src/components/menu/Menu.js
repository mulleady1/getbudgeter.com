import React from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import styles from './Menu.scss';

export default class Menu extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  render() {
    const {
      username,
      isMobile,
      isTablet
    } = this.props;

    const showSidbarButtons = isMobile || isTablet;
    
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
          { showSidbarButtons ? (
            <li>
              <a onClick={() => this.onClick(this.props.onMonthViewClick)}>
                <span className="glyphicon glyphicon-calendar"></span>
                <span>MONTH VIEW</span>
              </a>
            </li>
          ) : null
          }
          { showSidbarButtons ? (
            <li>
              <a onClick={() => this.onClick(this.props.onWeekViewClick)}>
                <span className="glyphicon glyphicon-calendar"></span>
                <span>WEEK VIEW</span>
              </a>
            </li>
          ) : null
          }
          { showSidbarButtons ? (
            <li>
              <a onClick={() => this.onClick(this.props.onSearchClick)}>
                <span className="glyphicon glyphicon-search"></span>
                <span>SEARCH</span>
              </a>
            </li>
          ) : null
          }
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
