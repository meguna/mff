import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import StatusInfo from '../../common/StatusInfo';
import { callApi } from '../../helpers';

const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB
const MAX_FILE_COUNT = 5;
// 255: maximum filename size in DB
// 18: total characters of 4 letter filename & datecode
const MAX_FILE_NAME_LENGTH = 255 - 18;


class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      statusMessage: '',
      warn: '',
      warnMessage: '',
    };
    this.onImageChosen = this.onImageChosen.bind(this);
  }

  onImageChosen = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { onDone, imageCount, t } = this.props;
    const data = new FormData();
    let fail = false;

    // FileList is not an array but array-list, so
    // create array from it then iterate
    Array.from(e.target.files).forEach((file, i) => {
      if (file.name.length > MAX_FILE_NAME_LENGTH) {
        fail = true;
        this.setState({
          status: 'fail',
          statusMessage: t('common:imgupload.filename', { length: MAX_FILE_NAME_LENGTH }),
        });
      }
      if (i >= MAX_FILE_COUNT - imageCount) {
        this.setState({
          warn: 'warn',
          warnMessage: t('common:imgupload.filecount', { count: MAX_FILE_COUNT }),
        });
      } else if (file.size > MAX_FILE_SIZE) {
        fail = true;
        this.setState({
          status: 'fail',
          statusMessage: t('common:imgupload.filesize', { size: 2 }),
        });
      } else {
        data.append('file', e.target.files[i]);
      }
    });
    if (!fail) {
      this.setState({
        status: 'load',
        statusMessage: t('common:imgupload.loading'),
      }, () => {
        callApi('/addimage', {
          method: 'POST',
          body: data,
        })
          .then((res) => {
            this.setState({
              status: 'success',
              statusMessage: t('common:imgupload.success'),
            });
            console.log(res);
            if (onDone) {
              onDone(res);
            }
            console.log(res);
          })
          .catch((err) => {
            this.setState({
              status: 'fail',
              statusMessage: t('common:imgupload.fail'),
            });
            console.error(err);
          });
      });
    }
  }

  render() {
    const { status, statusMessage, warn, warnMessage } = this.state;
    const { t } = this.props;
    return (
      <div className="form-group">
        <p className="form-description">
          {t('common:recipeform.imgDesc')}
        </p>
        <label htmlFor="recipe-image-upload" className="hidden">
          Image Upload
        </label>
        <input
          id="recipe-image-upload"
          type="file"
          accept="image/*"
          onChange={this.onImageChosen}
          value=""
          multiple
        />
        <StatusInfo
          status={warn}
          message={warnMessage}
        />
        <StatusInfo
          status={status}
          message={statusMessage}
        />
      </div>
    );
  }
}

ImageUpload.propTypes = {
  imageCount: PropTypes.number.isRequired,
  onDone: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ImageUpload);
