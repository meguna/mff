import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { X } from 'react-feather';
import { withTranslation } from 'react-i18next';
import Auth0Client from '../../auth/Auth';
import StatusInfo from '../../common/StatusInfo';

class Modal extends Component {
  constructor(props) {
    super(props);
    const { i18n } = this.props;
    this.state = {
      langVal: i18n.language,
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
    this.onLangSelect = this.onLangSelect.bind(this);
  }

  onLangSelect(e) {
    const { i18n } = this.props;
    this.setState({
      langVal: e.target.value,
    });
    if (e.target.value === 'en') {
      i18n.changeLanguage('en');
    } else if (e.target.value === 'en') {
      i18n.changeLanguage('ja');
    }
  }

  handlePassChange(e) {
    this.setState({
      fieldVal: e.target.value,
    });
  }

  handleSubmit(e) {
    const { fieldParamName, toggleModal, t } = this.props;
    const { fieldVal, langVal } = this.state;
    e.preventDefault();
    let userData = {
      [fieldParamName]: fieldVal,
    };
    if (fieldParamName === 'language') {
      userData = {
        nickname: langVal,
      };
    }
    Auth0Client.patchUserData(userData)
      .then(() => {
        if (fieldParamName === 'language') {
          window.location.reload();
        }
        toggleModal(true);
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          errorStatus: {
            error: true,
            message: t('common:error.general'),
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
    const { fieldVal, errorStatus, langVal } = this.state;
    const { desc, title, t, fieldParamName, i18n } = this.props;
    let formInputElem = null;
    if (fieldParamName === 'language') {
      formInputElem = (
        <select
          className="select-lang-dropdown-settings modal-input"
          defaultValue={langVal}
          onChange={this.onLangSelect}
        >
          <option value="en">English</option>
          <option value="ja">Japanese</option>
        </select>
      );
    } else {
      formInputElem = (
        <input
          className="modal-input"
          type="text"
          placeholder="email"
          value={fieldVal}
          onChange={this.handlePassChange}
        />
      );
    }
    return (
      <div className="check-pass-modal">
        {errorStatus.error && (
          <StatusInfo
            status={errorStatus.status}
            message={errorStatus.message}
          />
        )}
        <button
          className="close-modal-button"
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
          {formInputElem}
          <input
            type="submit"
            className="modal-submit"
            value={t('common:actions.submit')}
          />
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
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    changeLanguage: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
  }).isRequired,
};

Modal.defaultProps = {
  desc: '',
};

export default withTranslation()(Modal);
