import React from 'react';
import {Modal} from 'react-bootstrap';
import CalcActions from '../../actions/CalcActions';
import styles from './Calculator.scss';

export default class Calculator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      income: '',
      expenses: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.show && nextProps.show) {
      CalcActions
        .get()
        .then(data => this.setState({ 
          income: data.income, 
          expenses: data.expenses 
        }));
    } else if (this.props.show && !nextProps.show) {
      CalcActions.post({ ...this.state });
    }
  }

  render() {
    const { 
      show, 
      total,
      month,
      format,
      onHide
    } = this.props;

    const {
      income,
      expenses
    } = this.state;

    const remaining = format(
      parseFloat(income) - 
      parseFloat(expenses) -
      total
    );
    
    return (
      <Modal backdrop="static" show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>Calculator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className={styles.field}>
              <label>Income</label>
              <input type="text" className="form-control" value={income} onChange={(e) => this.setState({ income: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label>- Other expenses</label>
              <input type="text" className="form-control" value={expenses} onChange={(e) => this.setState({ expenses: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label>- Bills</label>
              <input type="text" className="form-control" value={total} readOnly />
            </div>
            <div className={styles.results}>
              ${remaining} remaining at the end of {month}.
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-default" onClick={onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }

}
