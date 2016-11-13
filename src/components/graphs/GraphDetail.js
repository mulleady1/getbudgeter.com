import React from 'react';
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

export default class GraphDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      bills
    } = this.props;

    const data = bills.map(b => {
      return {
        label: moment(b.due).format('MMM Y'),
        value: parseFloat(b.amount)
      };
    });
    
    return (
      <div className={styles.wrapper}>
        <h5>{bills[0].name}</h5>
        <BarChart width={500} height={300} data={data}>
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
