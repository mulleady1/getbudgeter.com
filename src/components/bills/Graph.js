import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  PieChart,
  Pie,
  Tooltip
} from 'recharts';
import styles from './Graph.scss';

export class Graph extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      bills,
      isMobile
    } = this.props;

    const width = isMobile ? window.innerWidth - 40 : 510;
    const height = isMobile ? 425 : 500;
    
    const data = bills.map(b => ({
      name: b.name,
      value: parseFloat(b.amount, 10)
    }));

    return (
      <div className={styles.wrapper}>
        <PieChart width={width} height={height}>
          <Pie 
            data={data} 
            isAnimationActive={false} 
            fill="#337ab7" 
            label />
          <Tooltip />
        </PieChart>
      </div>
    );
  }

}

const setProps = (state) => {
  return {
    isMobile: state.app.isMobile
  };
};

export default connect(setProps)(Graph);
