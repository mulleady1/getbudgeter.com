import React from 'react';
import _ from 'lodash';
import GraphDetail from './GraphDetail';
import styles from './GraphList.scss';

export class GraphList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { 
      bills 
    } = this.props;

    const groups = _.groupBy(
      _.sortBy(bills, 'due'), 
      b => b.name
    );

    const graphs = Object.keys(groups).map((key, i) => {
      const bills = groups[key];

      if (bills.length < 2) {
        return null;
      }
      
      return (
        <GraphDetail key={i} bills={bills} />
      );
    });

    return (
      <div className={styles.wrapper}>
        {graphs}
      </div>
    );
  }

}

export default GraphList;
