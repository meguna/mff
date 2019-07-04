import React, { Component } from 'react';
import StatusInfo from '../../common/StatusInfo';
import RecipeImages from '../../common/RecipeImages';

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
    console.log('inage chosen');
    e.preventDefault();
    e.stopPropagation();

    const { onDone } = this.props;
    const data = new FormData();
    let fail = false;

    // FileList is not an array but array-list, so
    // create array from it then iterate
    Array.from(e.target.files).forEach((file, i) => {
      if (file.name.length > MAX_FILE_NAME_LENGTH) {
        fail = true;
        this.setState({
          status: 'fail',
          statusMessage: `One or more of your files has a filename that exceeds
          the character limit of ${MAX_FILE_NAME_LENGTH} and could not be uploaded.`,
        });
      }
      if (i >= MAX_FILE_COUNT) {
        this.setState({
          warn: 'warn',
          warnMessage: `You selected over five files.
          Only the first five will be uploaded.`,
        });
      } else if (file.size > MAX_FILE_SIZE) {
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
    const { images } = this.props;
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
        <RecipeImages images={images} />
      </div>
    );
  }
}

export default ImageUpload;
