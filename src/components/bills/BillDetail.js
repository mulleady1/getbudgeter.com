import React from 'react';
import styles from './BillDetail.scss';

export default class BillDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      dirty: false,
      bill: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onPaidChange = this.onPaidChange.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);  
  }

  componentWillMount() {
    this.setBill(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.editing) {
      return;
    }

    this.setBill(nextProps);
  }

  setBill(props) {
    this.setState({ 
      bill: { ...props.bill },
      editing: props.bill._editing
    });
  }

  renderForm() {
    const {
      _id,
      name,
      amount,
      autopay,
      link
    } = this.state.bill;

    return (
      <li className={`flex-row jc-sb ${styles.wrapper} ${styles.form}`}>
        <div className={styles.name}>
          <input type="text" className="form-control" value={name || ''} placeholder="Name" onChange={(e) => this.onChange('name', e.target.value)} />
        </div>
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
      amount,
      paid,
      autopay,
      link
    } = this.props.bill;

    return (
      <li className={`flex-row jc-sb ${styles.wrapper} ${styles.display}`}>
        <div className={styles.name}>{name}</div>
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
          <a href={link} target="_blank">{link}</a>
        </div>
        <div className={styles.buttons}>
          <button className="btn btn-sm btn-default" onClick={() => this.setState({ editing: true })}>
            <span className="glyphicon glyphicon-pencil"></span>
            <span>Edit</span>
          </button>
        </div>
      </li>
    );
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
    this.props.onSaveClick(this.state.bill);
    this.setState({ editing: false });
  }

  onCancelClick() {
    if (this.state.bill._id) {
      this.setState({ editing: false });
      this.setBill(this.props);
    } else {
      this.props.onDeleteClick(this.state.bill);
    }
  }

}
