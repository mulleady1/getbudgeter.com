import React from 'react';
import _ from 'lodash';
import BillActions from '../../actions/BillActions';
import BillDetail from './BillDetail';
import {Bill} from '../../models';
import {confirm} from '../shared';
import styles from './BillList.scss';

export default class BillList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bill: null
    };

    this.onAddClick = this.onAddClick.bind(this);
    this.onSaveExistingClick = this.onSaveExistingClick.bind(this);
    this.onSaveNewClick = this.onSaveNewClick.bind(this);
    this.onDeleteExistingClick = this.onDeleteExistingClick.bind(this);
    this.onDeleteNewClick = this.onDeleteNewClick.bind(this);
  }

  render() {
    const { bills } = this.props;
    const { bill } = this.state;

    const items = _.sortBy(bills, 'name').map((bill) => {
      const key = bill._id || bill.id;
      const props = {
        key,
        bill,
        onDeleteClick: this.onDeleteExistingClick,
        onSaveClick: this.onSaveExistingClick
      };

      return (
        <BillDetail {...props} />
      );
    });

    return (
      <div>
        <ul className={styles.wrapper}>
          {items}
          { bill ? (
            <BillDetail 
              key={bill.id} 
              bill={bill}
              onDeleteClick={this.onDeleteNewClick}
              onSaveClick={this.onSaveNewClick} />
          ) : null
          }
        </ul>
        <div className={styles.footer}>
          <button className="btn btn-sm btn-primary" disabled={bill} onClick={this.onAddClick}>
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
      bill: new Bill(year, month + 1)
    });
  }

  onSaveExistingClick(bill) {
    return BillActions.put(bill);
  }

  onDeleteExistingClick(bill) {
    confirm()
      .then(data => {
        if (data.confirmed) {
          return BillActions.delete(bill);
        }
      });
  }

  onSaveNewClick(bill) {
    delete bill.id;
    delete bill._editing;
    return BillActions.post(bill)
      .then(() => this.setState({ bill: null }));
  }

  onDeleteNewClick() {
    this.setState({ bill: null });
  }

}
