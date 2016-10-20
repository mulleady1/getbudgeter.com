import React from 'react';
import _ from 'lodash';
import BillActions from '../../actions/BillActions';
import BillDetail from './BillDetail';
import {Bill} from '../../models';
import styles from './BillList.scss';

export default class BillList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bills: []
    };

    this.onAddClick = this.onAddClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentWillMount() {
    this.setBills(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setBills(nextProps);
  }

  setBills(props) {
    this.setState({ 
      bills: props.bills.slice()
    });
  }

  render() {
    const { bills } = this.state;

    const items = bills.map((bill) => {
      const key = bill._id || bill.id;
      const props = {
        key,
        bill,
        onDeleteClick: this.onDeleteClick,
        onSaveClick: this.onSaveClick
      };

      return (
        <BillDetail {...props} />
      );
    });

    return (
      <div>
        <ul className={styles.wrapper}>
          {items}
        </ul>
        <div className={styles.footer}>
          <button className="btn btn-sm btn-primary" onClick={this.onAddClick}>
            <span className="glyphicon glyphicon-plus"></span>
            <span>Add Bill</span>
          </button>
        </div>
      </div>
    );
  }

  onAddClick() {
    const { year, month } = this.props;

    this.setState({
      bills: this.state.bills.concat(new Bill(year, month + 1))
    });
  }

  onSaveClick(bill) {
    const tempId = bill.id;
    delete bill.id;
    delete bill._editing;

    return BillActions.save(bill)
      .then(newBill => {
        if (tempId) {
          let bills = this.state.bills
            .filter(b => b.id !== tempId)
            .concat(newBill);
            
          this.setState({ bills });
        }
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
