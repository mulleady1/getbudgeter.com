import React from 'react';
import UploadList from './UploadList';
import UploadDetail from './UploadDetail';

export class Uploads extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      upload: null
    };

    this.onUploadClick = this.onUploadClick.bind(this);
  }

  render() {
    const { uploads } = this.props;
    const { upload } = this.state;

    return upload ?
      <UploadDetail upload={upload} back={() => this.onUploadClick(null)} /> :
      <UploadList uploads={uploads} onUploadClick={this.onUploadClick} />;
  }

  onUploadClick(upload) {
    this.setState({ upload });
  }
}

export default Uploads;
