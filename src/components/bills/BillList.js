import React from 'react';
import BillDetail from './BillDetail';
import styles from './BillList.scss';

export default class BillList extends React.Component {

  render() {
    const { bills } = this.props;

    const items = bills.map((bill, i) => {
      return (
        <BillDetail key={bill._id || i} bill={bill} />
      );
    });

    return (
      <ul className={styles.wrapper}>
        {items}
      </ul>
    );
  }
}
