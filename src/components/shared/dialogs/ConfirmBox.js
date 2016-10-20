import React from 'react';
import {Modal} from 'react-bootstrap';
import styles from './ConfirmBox.scss';

export default class ConfirmBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: true
    };

    this.onNoClick = this.onNoClick.bind(this); 
    this.onYesClick = this.onYesClick.bind(this); 
  }

  render() {
    const { title, message } = this.props;

    return (
        <Modal backdrop="static" bsSize="small" show={this.state.show} onHide={this.onNoClick}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.body}>
              <span className="pull-left glyphicon glyphicon-warning-sign"></span>
              <p>{message}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-default" onClick={this.onNoClick}>Cancel</button>
            <button className="btn btn-primary" onClick={this.onYesClick}>Confirm</button>
          </Modal.Footer>
        </Modal>
    );
  }

  onNoClick() {
    this.setState({ show: false });
    setTimeout(() => {
      this.props.onNoClick();
    }, 200);
  }

  onYesClick() {
    this.setState({ show: false });
    setTimeout(() => {
      this.props.onYesClick();
    }, 200);
  }

}

