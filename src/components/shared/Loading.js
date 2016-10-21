import React from 'react';
import styles from './Loading.scss';

export default class Loading extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      i: 0
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ i: this.state.i + 1 });
    }, 250);
  }
  
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  
  render() {
    const wrapperClassName = `${styles.wrapper} flex-row ai-center`;
    switch(this.state.i % 5) {
      case 0:
        return (
          <div className={wrapperClassName}>
            <span className={styles.big}>•</span><span>•</span><span>•</span>
          </div>
        );
      case 1:
        return (
          <div className={wrapperClassName}>
            <span>•</span><span className={styles.big}>•</span><span>•</span>
          </div>
        );
      case 2:
        return (
          <div className={wrapperClassName}>
            <span>•</span><span>•</span><span className={styles.big}>•</span>
          </div>
        );
      case 3:
      case 4:
        return (
          <div className={wrapperClassName}>
            <span>•</span><span>•</span><span>•</span>
          </div>
        );
    }

    return (
      <div></div>
    );
  }

}
