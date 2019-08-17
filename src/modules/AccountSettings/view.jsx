import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Auth0Client from '../auth/Auth';
import Modal from './components/Modal';
import './styles.css';

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isModalOpen: false,
      modal: {
        title: '',
        fieldParamName: '',
      },
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.setEmailModal = this.setEmailModal.bind(this);
    this.setNameModal = this.setNameModal.bind(this);
  }

  componentDidMount() {
    const { setSelectedRecipe, loadingAuth } = this.props;

    setSelectedRecipe(-1);

    if (!loadingAuth) {
      const profile = Auth0Client.getProfile();
      console.log(profile);
      this.setState({
        name: profile.name,
        email: profile.email,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { loadingAuth } = this.props;

    if (prevProps.loadingAuth !== loadingAuth) {
      const profile = Auth0Client.getProfile();
      if (!loadingAuth) {
        this.setState({
          name: profile.name,
          email: profile.email,
        });
      }
    }
  }

  setProfile() {
    const profile = Auth0Client.getProfile();
    this.setState({
      name: profile.name,
      email: profile.email,
    });
  }

  setEmailModal() {
    const { t } = this.props;
    this.setState({
      modal: {
        title: t('common:account.emailchange'),
        fieldParamName: 'email',
      },
    }, () => {
      this.toggleModal();
    });
  }

  setNameModal() {
    const { t } = this.props;
    this.setState({
      modal: {
        title: t('common:account.namechange'),
        fieldParamName: 'name',
      },
    }, () => {
      this.toggleModal();
    });
  }

  toggleModal(shouldResetProfile) {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
    if (shouldResetProfile) {
      this.setProfile();
    }
  }

  render() {
    const { name, email, isModalOpen, modal } = this.state;
    const { t } = this.props;
    return (
      <div id="profile-page-wrapper" className={isModalOpen ? 'modal-open-bkgd' : ''}>
        {isModalOpen && (
          <Modal
            toggleModal={this.toggleModal}
            fieldParamName={modal.fieldParamName}
            title={modal.title}
          />
        )}
        <h1 className="title">
          {t('common:account.title')}
        </h1>
        <div className="account-info-group">
          <p className="account-info-label">{t('common:account.name')}</p>
          <p className="account-info-desc">{name}</p>
          <input
            className="account-change-button"
            type="button"
            value={t('common:account.change')}
            onClick={this.setNameModal}
          />
        </div>
        <div className="account-info-group">
          <p className="account-info-label">{t('common:account.email')}</p>
          <p className="account-info-desc">{email}</p>
          <input
            className="account-change-button"
            type="button"
            value={t('common:account.change')}
            onClick={this.setEmailModal}
          />
        </div>
        <div className="account-info-group">
          <p className="account-info-label">{t('common:account.password')}</p>
          <input
            className="account-change-button"
            type="button"
            value={t('common:account.reset')}
            onClick={() => { Auth0Client.resetPassword(email); }}
          />
        </div>
      </div>
    );
  }
}

AccountSettings.propTypes = {
  loadingAuth: PropTypes.bool.isRequired,
  setSelectedRecipe: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withTranslation()(AccountSettings);
