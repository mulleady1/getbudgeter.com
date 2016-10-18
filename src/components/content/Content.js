import React from 'react';
import { connect } from 'react-redux';
import AppActions from '../../actions/AppActions';
import BillList from '../bills/BillList';
import styles from './Content.scss';

export class Content extends React.Component {

  constructor(props) {
    super(props);

    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  render() {
    const { 
      user,
      bills 
    } = this.props;

    return (
      <div className="main">
        <BillList bills={bills} />
      </div>
    );
  }

  onLogoutClick() {
    AppActions.logout();
  }

}

const setProps = (state) => {
  return {
    user: state.app.user,
    bills: state.bills
  };
};

export default connect(setProps)(Content);
