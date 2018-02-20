import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  PieChart,
  Pie,
  Tooltip,
} from 'recharts';
import moment from 'moment';
import styles from './UploadDetail.scss';

export class UploadDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      upload,
      back,
      isMobile
    } = this.props;

    const data = upload.data.map(u => ({
      name: u.desc,
      value: u.amt
    }));

    const size = isMobile ?
      Math.min(window.innerWidth, window.innerHeight) - 20 :
      800;

    return (
      <div className={styles.wrapper}>
        <h5>{upload.filename}</h5>
        <button className={styles.back} onClick={back}>Back</button>
        <div className={styles.chartWrapper}>
          <PieChart width={size} height={size}>
            <Pie
              data={data}
              isAnimationActive={false}
              fill="#337ab7"
              label />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    );
  }

}

const setProps = (state) => {
  return {
    isMobile: state.app.isMobile
  };
};

export default connect(setProps)(UploadDetail);
