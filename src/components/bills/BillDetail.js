import React from 'react';
import styles from './BillDetail.scss';

export default class BillDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      bill: {}
    };

    this.onChange = this.onChange.bind(this);  
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
      name,
      amount,
      paid,
      link
    } = this.state.bill;

    return (
      <li className={`flex-row jc-sb ${styles.wrapper}`}>
        <div className={styles.name}>
          <input type="text" className="form-control" value={name} placeholder="Name" onChange={(e) => this.onChange('name', e.target.value)} />
        </div>
        <div className={styles.amount}>
          <input type="text" className="form-control" value={amount} placeholder="Amount" onChange={(e) => this.onChange('amount', e.target.value)} />
        </div>
        <div className={styles.paid}>
          <label className="flex-row ai-center">
            <span>Autopay?</span>
            <input type="checkbox" checked={paid} onChange={() => this.onChange('paid', !paid)} />
          </label>
        </div>
        <div className={styles.link}>
          <input type="text" className="form-control" value={link} placeholder="Link" onChange={(e) => this.onChange('link', e.target.value)} />
        </div>
        <div className={styles.buttons}>
          <button className="btn btn-sm btn-danger" onClick={() => this.props.onDeleteClick(this.state.bill)}>
            <span className="glyphicon glyphicon-trash"></span>
            <span>Delete</span>
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
      link
    } = this.props.bill;

    return (
      <li className={`flex-row jc-sb ${styles.wrapper}`}>
        <div className={styles.name}>{name}</div>
        <div className={styles.amount}>${amount}</div>
        <div className={styles.paid}>
          <label className="flex-row ai-center">
            <span>Paid</span>
            <input type="checkbox" checked={paid} />
          </label>
        </div>
        <div className={styles.link}>{link}</div>
        <div className={styles.buttons}>
          <button className="btn btn-sm" onClick={() => this.setState({ editing: true })}>
            <span className="glyphicon glyphicon-pencil"></span>
            <span>Edit</span>
          </button>
        </div>
      </li>
    );
  }

  onChange(prop, val) {
    let bill = { ...this.state.bill };
    bill[prop] = val;
    this.setState({ bill });
  }

}
