import React from 'react';
import { connect } from 'react-redux';
import BillActions from '../../actions/BillActions';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Content from '../content/Content';
import styles from './App.scss';

export class App extends React.Component {

  getChildContext() {
    return {
      user: this.props.user
    };
  }

  componentWillMount() {
    BillActions.get();
  }

  componentDidMount() {
    const node = document.querySelector('#loading');
    node.parentNode.removeChild(node);
    clearInterval(window._loadTimer);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="flex-col main">
        <Header />
        { message ? (
          <div className={styles.message}>{message}</div>
        ) : null
        }
        <div className="flex-row main">
          <Sidebar />
          <Content />
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  user: React.PropTypes.object
};

const setProps = (state) => {
  return {
    user: state.app.user,
    message: state.app.message
  };
};

export default connect(setProps)(App);
