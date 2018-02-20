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
      back
    } = this.props;

    const data = upload.data.map(u => ({
      name: u.desc,
      value: u.amt
    }));

    return (
      <div className={styles.wrapper}>
        <h5>{upload.filename}</h5>
        <button className={styles.back} onClick={back}>Back</button>
        <div className={styles.chartWrapper}>
          <PieChart width={800} height={800}>
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
