import React from 'react';
import moment from 'moment';
import UploadActions from '../../actions/UploadActions';
import styles from './UploadList.scss';
import {FORMAT} from '../../constants';

export class UploadList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      file: null,
      showForm: false
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  render() {
    const { uploads } = this.props;
    const { showForm } = this.state;

    return (
      <div className={styles.wrapper}>
        { showForm ? (
          <div className={styles.form}>
            <input type="file" onChange={this.onChange} />
            <button onClick={this.save}>Upload</button>
          </div>
        ) : (
          <div className={styles.form}>
            <button onClick={() => this.setState({ showForm: true })}>Add</button>
          </div>
        )}
        <ul>
        {uploads.map(u => (
          <li key={u._id} onClick={() => this.onClick(u)} className={styles.upload}>
            <span>{u.filename}</span>
            <span className="gray">{moment(u.created).format(FORMAT)}</span>
          </li>
        ))}
        </ul>
        { uploads.length ? null : (
          <div className={styles.message}>
            Upload CSV files of your banking or credit card transactions to see a visualization that helps understand your spending.
          </div>
        )}
      </div>
    );
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  save() {
    UploadActions.save(this.state.file).then(UploadActions.get);
  }

  onClick(upload) {
    this.props.onUploadClick(upload);
  }

}

export default UploadList;
