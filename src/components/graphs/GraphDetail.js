import React from 'react';
import { connect } from 'react-redux';
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar
} from 'recharts';
import moment from 'moment';
import styles from './GraphDetail.scss';

export class GraphDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      bills,
      isMobile
    } = this.props;

    const data = bills.map(b => {
      return {
        label: moment(b.due).format('MMM Y'),
        value: parseFloat(b.amount)
      };
    });

    const width = isMobile ? window.innerWidth - 40 : 500;
    
    return (
      <div className={styles.wrapper}>
        <h5>{bills[0].name}</h5>
        <BarChart width={width} height={300} data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    );
  }

}

const setProps = (state) => {
  return {
    isMobile: state.app.isMobile
  };
};

export default connect(setProps)(GraphDetail);
