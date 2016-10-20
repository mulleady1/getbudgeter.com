import React from 'react';
import styles from './BillDetail.scss';

export default class BillDetail extends React.Component {

  render() {
    const {
      name,
      amount,
      paid,
      link
    } = this.props.bill;

    return (
      <li className="flex-row jc-sb">
        <div className={styles.name}>{name}</div>
        <div className={styles.amount}>${amount}</div>
        <div className={styles.paid}>
          <label className="flex-row ai-center">
            <span>Paid</span>
            <input type="checkbox" checked={paid} />
          </label>
        </div>
        <div className={styles.link}>{link}</div>
        <div className={styles.buttons}></div>
      </li>
    );
  }
}
