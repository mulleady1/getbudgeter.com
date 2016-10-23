import React from 'react';
import {Modal} from 'react-bootstrap';
import moment from 'moment';
import BillActions from '../../actions/BillActions';
import styles from './Copy.scss';
import {CopySource} from '../../constants';

const FORMAT = 'M/YYYY';

export default class Copy extends React.Component {

  constructor(props) {
    super(props);

    this.setInitialSourceDate(props);

    this.state = {
      message: null,
      source: CopySource.LAST_MONTH,
      sourceDate: this._initialSourceDate.format(FORMAT)
    };

    this.onSourceChange = this.onSourceChange.bind(this);
    this.onSourceDateChange = this.onSourceDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setInitialSourceDate(nextProps);
    this.setState({ sourceDate: this._initialSourceDate.format(FORMAT) });
  }

  setInitialSourceDate(props) {
    this._initialSourceDate = props.date.clone().add(-1, 'month');
  }

  render() {
    const {
      date, 
      show,
      onHide
    } = this.props;

    const { 
      message,
      source,
      sourceDate 
    } = this.state;

    const lastMonth = date.clone().add(-1, 'month').format('MMMM');

    return (
      <Modal backdrop="static" show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>Copy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={`text-danger ${styles.warning}`}>
            <b>Warning:</b> This will overwrite any existing
            bills for {date.format('MMMM')}.
          </p>
          <form>
            <div className="form-field ai-baseline">
              <label>Copy from</label>
              <ul>
                <li>
                  <label>
                    <input 
                      type="radio" 
                      checked={source === CopySource.LAST_MONTH}
                      value={CopySource.LAST_MONTH}
                      onChange={this.onSourceChange} />
                    <span>Previous month ({lastMonth})</span>
                  </label> 
                </li>
                <li>
                  <div>
                    <label>
                      <input 
                        type="radio" 
                        checked={source === CopySource.SPECIFIC_DATE}
                        value={CopySource.SPECIFIC_DATE}
                        onChange={this.onSourceChange} />
                      <span>Specific month</span>
                    </label>
                  </div>
                  { source === CopySource.SPECIFIC_DATE ? (
                    <div className={styles.sourceDate}>
                      <input 
                        className="form-control"
                        value={sourceDate} 
                        placeholder="MM/YYYY"
                        onChange={this.onSourceDateChange} />
                      { message ? (
                        <p className="text-danger">{message}</p>
                      ) : null
                      }
                    </div>
                  ) : null
                  }
                </li>
              </ul>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-default" onClick={onHide}>Cancel</button>
          <button className="btn btn-primary" onClick={this.onSubmit}>Copy</button>
        </Modal.Footer>
      </Modal>
    );
  }

  onSourceChange(e) {
    let nextState = { source: +e.target.value };
    if (this.state.message) {
      nextState.message = null;
    } 

    this.setState(nextState);
  }

  onSourceDateChange(e) {
    let nextState = { sourceDate: e.target.value };
    if (this.state.message) {
      nextState.message = null;
    } 

    this.setState(nextState);
  }

  onSubmit() {
    const { 
      source,
      sourceDate
    } = this.state;

    const date = source == CopySource.LAST_MONTH ? 
      this._initialSourceDate :
      moment(sourceDate, FORMAT);

    if (!date.isValid()) {
      return this.setState({ message: 'Invalid date.' });
    }

    BillActions.copy(date)
      .then(() => this.props.onHide());
  }

}
