import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { X } from 'react-feather';
import Auth0Client from '../../auth/Auth';
import StatusInfo from '../../common/StatusInfo';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldVal: '',
      errorStatus: {
        error: false,
        message: '',
        status: '',
      },
    };
    this.handlePassChange = this.handlePassChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePassChange(e) {
    this.setState({
      fieldVal: e.target.value,
    });
  }

  handleSubmit(e) {
    const { fieldParamName, toggleModal } = this.props;
    const { fieldVal } = this.state;
    e.preventDefault();
    const userData = {
      [fieldParamName]: fieldVal,
    };
    Auth0Client.patchUserData(userData)
      .then(() => {
        toggleModal(true);
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          errorStatus: {
            error: true,
            message: 'Oops! Something went wrong. Try again!',
            status: 'fail',
          },
        });
      });
  }

  closeModal() {
    const { toggleModal } = this.props;
    toggleModal();
  }

  render() {
    const { fieldVal, errorStatus } = this.state;
    const { desc, title } = this.props;
    return (
      <div className="check-pass-modal">
        {errorStatus.error && (
          <StatusInfo
            status={errorStatus.status}
            message={errorStatus.message}
          />
        )}
        <button
          type="button"
          onClick={this.closeModal}
          onKeyDown={this.closeModal}
          tabIndex="-1"
        >
          <X />
        </button>
        <h2>{title}</h2>
        <p>{desc}</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="email"
            value={fieldVal}
            onChange={this.handlePassChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  fieldParamName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
};

Modal.defaultProps = {
  desc: '',
};

export default Modal;
