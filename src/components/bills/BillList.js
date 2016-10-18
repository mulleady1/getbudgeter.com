import React from 'react';
import AppActions from '../../actions/AppActions';
import BillDetail from './BillDetail';
import styles from './BillList.scss';

export default class BillList extends React.Component {

  render() {
    const { bills } = this.props;

    const items = bills.map((bill, i) => {
      return (
        <BillDetail key={i} bill={bill} />
      );
    });

    return (
      <ul>
        {items}
      </ul>
    );
  }
}
