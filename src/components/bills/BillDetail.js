import React from 'react';
import moment from 'moment';
import styles from './BillDetail.scss';
import {
  Interval
} from '../../constants';

export default class BillDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      dirty: false,
      bill: null
    };

    this.onChange = this.onChange.bind(this);
    this.onPaidChange = this.onPaidChange.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);  
  }

  componentWillMount() {
    if (this.props.bill._editing) {
      let bill = { ...this.props.bill };
      bill.due = moment(bill.due).format('M/D');
      delete bill._editing;
      this.setState({ bill, editing: true });
    }
  }

  showDue() {
    return this.props.interval.unit === Interval.WEEK;
  }

  renderForm() {
    const {
      _id,
      name,
      due,
      amount,
      autopay,
      link
    } = this.state.bill;

    return (
      <li className={`flex-row jc-sb ${styles.wrapper} ${styles.form}`}>
        <div className={styles.name}>
          <input type="text" className="form-control" value={name || ''} placeholder="Name" onChange={(e) => this.onChange('name', e.target.value)} />
        </div>
        { this.showDue() ? (
          <div className={styles.due}>
            <input type="text" className="form-control" value={due || ''} placeholder="Due" onChange={(e) => this.onChange('due', e.target.value)} />
          </div>
        ) : null
        }
        <div className={styles.amount}>
          <input type="text" className="form-control" value={amount || ''} placeholder="Amount" onChange={(e) => this.onChange('amount', e.target.value)} />
        </div>
        <div className={styles.paid}>
          <label className="flex-row ai-center">
            <input type="checkbox" checked={!!autopay} onChange={() => this.onChange('autopay', !autopay)} />
            <span className={styles.autopay}>Autopay</span>
          </label>
        </div>
        <div className={styles.link}>
          <input type="text" className="form-control" value={link || ''} placeholder="Link" onChange={(e) => this.onChange('link', e.target.value)} />
        </div>
        <div className={styles.buttons}>
          <button className="btn btn-sm btn-default" onClick={this.onCancelClick}>
            <span className="glyphicon glyphicon-repeat"></span>
            <span>Cancel</span>
          </button>
          { _id ? (
            <button className="btn btn-sm btn-danger" onClick={() => this.props.onDeleteClick(this.state.bill)}>
              <span className="glyphicon glyphicon-trash"></span>
              <span>Delete</span>
            </button>
          ) : null
          }
          <button className="btn btn-sm btn-primary" disabled={!this.state.dirty} onClick={this.onSaveClick}>
            <span className="glyphicon glyphicon-floppy-disk"></span>
            <span>Save</span>
          </button>
        </div>
      </li>
    );
  }

  render() {
    if (this.state.editing) {
      return this.renderForm();
    }

    const {
      name,
      due,
      amount,
      paid,
      autopay,
      link
    } = this.props.bill;

    return (
      <li className={`flex-row jc-sb ${styles.wrapper} ${styles.display}`}>
        <div className={styles.name}>{name}</div>
        { this.showDue() ? (
          <div className={styles.due}>{moment(due).format('M/D')}</div>
        ) : null
        }
        <div className={styles.amount}>${amount}</div>
        <div className={styles.paid}>
          <label className="flex-row ai-center">
            <span>Paid</span>
            <input type="checkbox" checked={!!paid} onChange={this.onPaidChange} />
          </label>
          { autopay ? (
            <span className={styles.autopay}>(autopay)</span>
          ) : null
          }
        </div>
        <div className={styles.link}>
          <a href={`http://${link}`} target="_blank">{link}</a>
        </div>
        <div className={styles.buttons}>
          <button className="btn btn-sm btn-default" onClick={this.onEditClick}>
            <span className="glyphicon glyphicon-pencil"></span>
            <span>Edit</span>
          </button>
        </div>
      </li>
    );
  }

  onEditClick() {
    let bill = { ...this.props.bill };
    bill.due = moment(bill.due).format('M/D');
    this.setState({ bill, editing: true });
  }

  onChange(prop, val) {
    let nextState = {
      bill: { ...this.state.bill }
    };

    nextState.bill[prop] = val;

    if (!this.state.dirty) {
      nextState.dirty = true;
    }

    this.setState(nextState);
  }

  onPaidChange() {
    const bill = {
      ...this.props.bill,
      paid: !this.props.bill.paid
    };

    this.props.onSaveClick(bill);
  }

  onSaveClick() {
    let bill = { ...this.state.bill };
    const due = moment(`${bill.due}/${this.props.date.year()}`, 'M/D/YYYY'); 
    if (!due.isValid()) {
      return;
    }

    bill.due = due;
    this.props.onSaveClick(bill);
    this.setState({ editing: false });
  }

  onCancelClick() {
    if (this.state.bill._id) {
      this.setState({ editing: false, bill: null });
    } else {
      this.props.onDeleteClick(this.state.bill);
    }
  }

}
