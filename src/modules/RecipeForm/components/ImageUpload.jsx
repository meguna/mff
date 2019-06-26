import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StatusInfo from '../../common/StatusInfo';

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

    const { onDone } = this.props;
    const data = new FormData();
    const maxFileSize = 1024 * 1024 * 2; // 2MB
    const maxNumFiles = 5;
    let fail = false;

    // FileList is not an array but array-list, so
    // create array from it then iterate
    Array.from(e.target.files).forEach((file, i) => {
      // 255: maximum filename size in DB
      // 18: total characters of 4 letter filename & datecode
      if (file.name.length > 255 - 18) {
        fail = true;
        this.setState({
          status: 'fail',
          statusMessage: `One or more of your files has a filename that exceeds
          the character limit of ${255 - 18} and could not be uploaded.`,
        });
      }
      if (i >= maxNumFiles) {
        this.setState({
          warn: 'warn',
          warnMessage: `You selected over five files.
          Only the first five will be uploaded.`,
        });
      } else if (file.size > maxFileSize) {
        fail = true;
        this.setState({
          status: 'fail',
          statusMessage: `One or more of your files exceeds the maximum size. 
          Please choose a different file.`,
        });
      } else {
        data.append('file', e.target.files[i]);
      }
    });
    if (!fail) {
      this.setState({
        status: 'load',
        statusMessage: 'Your image(s) are being uploaded.',
      }, () => {
        fetch('http://localhost:3005/api/addimage', {
          method: 'POST',
          body: data,
        })
          .then(res => res.json())
          .then((res) => {
            this.setState({
              status: 'success',
              statusMessage: 'Your images have been successfully uploaded.',
            });
            if (onDone) {
              onDone(res);
            }
            console.log(res);
          })
          .catch((err) => {
            this.setState({
              status: 'fail',
              statusMessage: `Your images could not be uploaded.
              Please try again.`,
            });
            console.error(err);
          });
      });
    }
  }

  render() {
    const { status, statusMessage, warn, warnMessage } = this.state;

    return (
      <div className="form-group">
        <p className="form-description">
          Attach any images you have of your recipe!
          <br />
          Max image size: 2MB.
          <br />
          Max number of images: 5.
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
          dynamicMessage={warnMessage}
        />
        <StatusInfo
          status={status}
          dynamicMessage={statusMessage}
        />
      </div>
    );
  }
}

ImageUpload.propTypes = {
  onDone: PropTypes.func,
};

ImageUpload.defaultProps = {
  onDone: () => {},
};

export default ImageUpload;
