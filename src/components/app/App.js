import React from 'react';
import { connect } from 'react-redux';
import AppActions from '../../actions/AppActions';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Content from '../content/Content';

export class App extends React.Component {

  getChildContext() {
    return {
      user: this.props.user
    };
  }

  componentWillMount() {
    AppActions.getSession();
  }

  componentDidMount() {
    const node = document.querySelector('#loading');
    node.parentNode.removeChild(node);
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
