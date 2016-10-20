import React from 'react';
import {Modal} from 'react-bootstrap';
import lang from 'hocs/language';

const AlertBox = React.createClass({

  getInitialState() {

    return { show: true };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.showModal });
  },

  onCancelClick() {
    this.setState({show: false});
    this.props.onCancelClick();
  },

  onContinueClick() {
    this.setState({show: false});
    this.props.onContinueClick();
  },

  render() {
    const { i18n, title, message } = this.props;
    const  icon = this.props.icon + " text-info";

    return (
      <div  data-cmp="AlertBox">
        <Modal backdrop="static" show={this.state.show} onHide={this.onCancelClick}>
          <Modal.Header bsClass="notificationHeader" >
            <Modal.Title>{i18n(title)}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="dialog">
              <span className={`${icon} notificationIconStyles pull-left`} ></span>
              <span className="notificationTextStyles" >{ i18n(message) }</span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary continueClick"
              onClick={this.onContinueClick}>
              { i18n('notification.alert.button.ok') }
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

export default lang(AlertBox);
