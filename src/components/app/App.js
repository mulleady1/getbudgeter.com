import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import AppActions from '../../actions/AppActions';
import BillActions from '../../actions/BillActions';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Content from '../content/Content';
import styles from './App.scss';
import {
  MOBILE_WIDTH
} from '../../constants';

export class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  getChildContext() {
    return {
      user: this.props.user
    };
  }

  componentWillMount() {
    BillActions.get();
  }

  componentDidMount() {
    setTimeout(() => {
      if (window.requestAnimationFrame) {
        window.cancelAnimationFrame(window._loadTimer);
      } else {
        window.clearInterval(window._loadTimer);
      }
      
      const node = document.querySelector('#loading');
      node.parentNode.removeChild(node);
      this.setState({ loading: false });
    }, 1000);

    const onResize = () => {
      AppActions.setIsMobile(window.innerWidth < MOBILE_WIDTH);
    };

    window.addEventListener('orientationchange', onResize);
    window.addEventListener('resize', onResize);
  }

  render() {
    const { 
      message, 
      isMobile 
    } = this.props;

    const cssClass = classNames(
      'flex-col',
      'main',
      { 
        mobile: isMobile,
        [styles.loading]: this.state.loading 
      }
    );

    return (
      <div className={cssClass}>
        <Header />
        { message ? (
          <div className={styles.message}>{message}</div>
        ) : null
        }
        <div className="flex-row main">
        <Sidebar isMobile={isMobile} />
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
    message: state.app.message,
    isMobile: state.app.isMobile
  };
};

export default connect(setProps)(App);
