import React from 'react';
import styles from './Loading.scss';

export default class Loading extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      label: '.'
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      let label = this.state.label;
      if (this.state.label.indexOf('...') > -1) {
        label = '';
      } else {
        label += '.';
      }

      this.setState({ label });
    }, 250);
  }
  
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  
  render() {
    return (
      <div className={styles.wrapper}>{this.state.label}</div>
    );
  }

}
