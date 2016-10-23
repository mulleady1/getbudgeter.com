import React from 'react';
import {Modal} from 'react-bootstrap';
import styles from './AlertBox.scss';

export default class AlertBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: true
    };

    this.onYesClick = this.onYesClick.bind(this); 
  }

  render() {
    const { title, message } = this.props;

    return (
        <Modal backdrop="static" bsSize="small" show={this.state.show} onHide={this.onYesClick}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.body}>
              <span className="pull-left glyphicon glyphicon-info-sign"></span>
              <p>{message}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" onClick={this.onYesClick}>Close</button>
          </Modal.Footer>
        </Modal>
    );
  }

  onYesClick() {
    this.setState({ show: false });
    setTimeout(() => {
      this.props.onYesClick();
    }, 200);
  }

}

