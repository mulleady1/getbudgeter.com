import React from 'react';
import BillActions from '../../actions/BillActions';
import BillDetail from './BillDetail';
import {Bill} from '../../models';
import styles from './BillList.scss';

export default class BillList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bills: props.bills.slice()
    };

    this.onClick = this.onClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  render() {
    const { bills } = this.state;

    const items = bills.map((bill) => {
      const key = bill._id || bill.id;
      return (
        <BillDetail key={key} bill={bill} onDeleteClick={this.onDeleteClick} />
      );
    });

    return (
      <div>
        <ul className={styles.wrapper}>
          {items}
        </ul>
        <div className={styles.footer}>
          <button className="btn btn-sm btn-primary" onClick={this.onClick}>
            <span className="glyphicon glyphicon-plus"></span>
            <span>Add Bill</span>
          </button>
        </div>
      </div>
    );
  }

  onClick() {
    const { year, month } = this.props;

    this.setState({
      bills: this.state.bills.concat(new Bill(year, month))
    });
  }

  onDeleteClick(bill) {
    if (bill._id) {
      return BillActions.delete(bill); 
    }
      
    const bills = this.state.bills.filter(b => b.id !== bill.id);
    this.setState({ bills });
  }

}
