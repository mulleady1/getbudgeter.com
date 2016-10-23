import React from 'react';
import {Modal} from 'react-bootstrap';
import BillActions from '../../actions/BillActions';
import styles from './Calculator.scss';

export default class Copy extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      income: '',
      expenses: ''
    };
  }

  render() {
    const { 
      show, 
      date,
      onHide
    } = this.props;

    return (
      <Modal backdrop="static" show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>Copy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-default" onClick={onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }

}
