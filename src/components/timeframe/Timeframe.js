import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import AppActions from '../../actions/AppActions';
import styles from './Timeframe.scss';

const PARSE_FORMAT = 'YYYY-MM';
const DISPLAY_FORMAT = 'MMMM YYYY';

export class Timeframe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };

    this.onClick = this.onClick.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', (e) => {
      if (e.target !== this.refs.mainButton && this.state.show) {
        this.setState({ show: false });
      }
    });
  }

  componentDidUpdate() {
    const { list } = this.refs;
    if (!list) {
      return;
    }

    const key = `${this.props.year}-${this.props.month}`;
    const item = list.querySelector(`[data-key="${key}"]`);
    if (item && item.scrollIntoView) {
      item.scrollIntoView();
    }
  }

  renderMonths() {
    const { year } = this.props;
    const years = [
      year - 1,
      year,
      year + 1
    ];

    return years.map(year => {
      return _.range(12).map(month => {
        const date = moment(`${year}-${month + 1}`, PARSE_FORMAT);
        const label = date.format(DISPLAY_FORMAT);
        const key = `${year}-${month}`;
        const cssClass = classNames({ [styles.active]: key === this.key });
        return (
          <li key={key} data-key={key}>
            <a className={cssClass} onClick={() => this.onClick(year, month)}>
              {label}
            </a>
          </li>
        );
      });
    });
  }

  render() {
    const { year, month } = this.props;
    const { show } = this.state;
    const label = moment(`${year}-${month + 1}`, PARSE_FORMAT).format(DISPLAY_FORMAT);
    this.key = `${year}-${month}`;

    return (
      <div className={styles.wrapper}>
        <div className="flex-row">
          <button onClick={this.prev}>‹</button>
          <button ref="mainButton" onClick={() => this.setState({ show: !show })}>
            {label}
          </button>
          <button onClick={this.next}>›</button>
        </div>
        { show ? (
          <ul ref="list">
            {this.renderMonths()}
          </ul>
        ) : null
        }  
      </div>
    );
  }

  onClick(year, month) {
    this.setState({ show: false });
    AppActions.setYearAndMonth(year, month);
  }

  prev() {
    const { year, month } = this.props;
    let nextYear, nextMonth;
    if (month > 0) {
      nextYear = year;
      nextMonth = month - 1;
    } else {
      nextYear = year - 1;
      nextMonth = 11;
    }

    AppActions.setYearAndMonth(nextYear, nextMonth);
  }

  next() {
    const { year, month } = this.props;
    let nextYear, nextMonth;
    if (month < 11) {
      nextYear = year;
      nextMonth = month + 1;
    } else {
      nextYear = year + 1;
      nextMonth = 0;
    }

    AppActions.setYearAndMonth(nextYear, nextMonth);
  }

}

export default Timeframe;
