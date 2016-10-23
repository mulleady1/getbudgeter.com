import React from 'react';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';
import AppActions from '../../actions/AppActions';
import {Button} from '../shared';
import styles from './Timeframe.scss';
import {
  Interval
} from '../../constants';

const DisplayFormat = {
  MONTH: 'MMMM YYYY',
  WEEK: 'M/D/YY'
};

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
      if (e.target !== findDOMNode(this.refs.mainButton) && this.state.show) {
        this.setState({ show: false });
      }
    });
  }

  componentDidUpdate() {
    const { list } = this.refs;
    if (!list) {
      return;
    }

    const key = this.getLabel(this.props.date);
    const item = list.querySelector(`[data-key="${key}"]`);
    if (item) {
      const listTop = list.getBoundingClientRect().top;
      const itemTop = item.getBoundingClientRect().top;
      list.scrollTop = itemTop - listTop;
    }
  }

  getDisplayFormat() {
    const { unit } = this.props.interval;
    return DisplayFormat[unit.toUpperCase()]; 
  }

  getLabel(date) {
    const { value, unit } = this.props.interval;
    const fmt = this.getDisplayFormat();
    if (unit === Interval.MONTH) {
      return date.format(fmt);
    } else if (unit === Interval.WEEK) {
      let label = date.format(fmt);
      const endDate = date.clone().add(value, unit).add(-1, 'day');
      label += ` - ${endDate.format(fmt)}`;
      return label;
    }
  }

  renderList() {
    const { date, interval } = this.props;
    let start = date.clone().add(-1, 'year').startOf('year');
    
    if (interval.unit === Interval.WEEK) {
      // Make sure there's no offset in two-week intervals.
      let start2 = date.clone();
      while (start2 > start) {
        start2.add(-interval.value, interval.unit);
      }

      start = start2;
    }

    const end = date.clone().add(1, 'year').endOf('year');
    
    let currentDate = start.clone();
    let items = [];
    while (currentDate <= end) {
      const date = currentDate.clone();
      const label = this.getLabel(date);
      const key = label;
      const cssClass = classNames({ [styles.active]: key === this.props.date.format(this.getDisplayFormat()) });

      const item = (
        <li key={key} data-key={key}>
          <a className={cssClass} onClick={() => this.onClick(date)}>
            {label}
          </a>
        </li>
      );

      items.push(item);
      currentDate.add(interval.value, interval.unit);
    }
    
    return items;
  }

  render() {
    const { date, interval } = this.props;
    const { show } = this.state;
    const label = this.getLabel(date);
    const cssClass = interval.unit === Interval.WEEK ? styles.week : '';
    
    return (
      <div className={styles.wrapper}>
        <div className="flex-row">
          <Button className="flex-row ai-center jc-center" onClick={this.prev}>
            <span className="glyphicon glyphicon-menu-left"></span>
          </Button>
          <Button ref="mainButton" className={cssClass} onClick={() => this.setState({ show: !show })}>
            {label}
          </Button>
          <Button className="flex-row ai-center jc-center" onClick={this.next}>
            <span className="glyphicon glyphicon-menu-right"></span>
          </Button>
        </div>
        { show ? (
          <ul ref="list">
            {this.renderList()}
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
