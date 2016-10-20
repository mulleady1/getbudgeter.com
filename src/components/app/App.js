import React from 'react';
import { connect } from 'react-redux';
import BillActions from '../../actions/BillActions';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Content from '../content/Content';
import './App.scss';

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
    return (
      <div className="flex-col main">
        <Header />
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
    user: state.app.user
  };
};

export default connect(setProps)(App);
