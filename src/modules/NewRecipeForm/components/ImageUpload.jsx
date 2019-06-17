import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.onImageChosen = this.onImageChosen.bind(this);
  }

  onImageChosen = (e) => {
    const { onDone } = this.props;

    e.preventDefault();
    const data = new FormData();
    const maxFileSize = 1024 * 1024 * 2; // 2MB
    const maxNumFiles = 5;

    // FileList is not an array but array-list, so
    // create array from it then iterate
    Array.from(e.target.files).forEach((file, i) => {
      if (file.size < maxFileSize && i < maxNumFiles) {
        data.append('file', e.target.files[i]);
      }
    });

    fetch('http://localhost:3005/api/addimage', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then((res) => {
        if (onDone) {
          onDone(res);
        }
        console.log(res);
      })
      .catch(err => console.error(err));
  }

  render() {
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
          multiple
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
