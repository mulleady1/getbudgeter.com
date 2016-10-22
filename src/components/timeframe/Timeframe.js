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

    const key = this.props.date.format(DISPLAY_FORMAT);
    const item = list.querySelector(`[data-key="${key}"]`);
    if (item) {
      const listTop = list.getBoundingClientRect().top;
      const itemTop = item.getBoundingClientRect().top;
      list.scrollTop = itemTop - listTop;
    }
  }

  renderMonths() {
    const { date } = this.props;
    const years = [
      date.year() - 1,
      date.year(),
      date.year() + 1
    ];

    return years.map(year => {
      return _.range(12).map(month => {
        const date = moment(`${year}-${month + 1}`, PARSE_FORMAT);
        const label = date.format(DISPLAY_FORMAT);
        const key = label;
        const cssClass = classNames({ [styles.active]: key === this.props.date.format(DISPLAY_FORMAT) });
        return (
          <li key={key} data-key={key}>
            <a className={cssClass} onClick={() => this.onClick(date)}>
              {label}
            </a>
          </li>
        );
      });
    });
  }

  render() {
    const { date } = this.props;
    const { show } = this.state;
    const label = date.format(DISPLAY_FORMAT);
    
    return (
      <div className={styles.wrapper}>
        <div className={`flex-row ${styles.buttons}`}>
          <button className="flex-row ai-center jc-center" onClick={this.prev}>
            <span className="glyphicon glyphicon-menu-left"></span>
          </button>
          <button ref="mainButton" onClick={() => this.setState({ show: !show })}>
            {label}
          </button>
          <button className="flex-row ai-center jc-center" onClick={this.next}>
            <span className="glyphicon glyphicon-menu-right"></span>
          </button>
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

  onClick(date) {
    this.setState({ show: false });
    AppActions.setDate(date);
  }

  prev() {
    const { date, interval } = this.props;
    AppActions.setDate(date.clone().add(-interval.value, interval.unit));
  }

  next() {
    const { date, interval } = this.props;
    AppActions.setDate(date.clone().add(interval.value, interval.unit));
  }

}

export default Timeframe;
