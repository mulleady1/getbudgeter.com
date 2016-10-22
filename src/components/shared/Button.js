import React from 'react';
import styles from './Button.scss';

export default class Button extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.onTouchEnd);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onTouchEnd);
  }

  render() {
    const { children, className, ...props } = this.props;

    let cssClass = className || '';
    if (this.state.active) {
      cssClass += ` ${styles.active}`;
    }

    return (
      <button
        {...props} 
        ref="button" 
        className={cssClass} 
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}>
          {children}
      </button>
    );
  }

  onTouchStart() {
    this.setState({ active: true });
  }

  onTouchEnd(e) {
    if (this.state.active && (e.target === this.refs.button || e.target.parentNode === this.refs.button)) {
      this.setState({ active: false });
    }
  }

}
