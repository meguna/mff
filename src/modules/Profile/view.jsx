import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth0Client from '../auth/Auth';
import './styles.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
  }

  componentDidMount() {
    const { setSelectedRecipe, loadingAuth } = this.props;

    setSelectedRecipe(-1);

    if (!loadingAuth) {
      const profile = Auth0Client.getProfile();
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

  render() {
    const { name, email } = this.state;
    return (
      <div id="profile-page-wrapper">
        <h1 className="title">
          Account Information
        </h1>
        <div className="account-info-group">
          <p className="account-info-label">name</p>
          <p className="account-info-desc">{name}</p>
        </div>
        <div className="account-info-group">
          <p className="account-info-label">email</p>
          <p className="account-info-desc">{email}</p>
        </div>
        <Link className="edit-button" to="/editprofile">Change Account Settings</Link>
      </div>
    );
  }
}

Profile.propTypes = {
  loadingAuth: PropTypes.bool.isRequired,
  setSelectedRecipe: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Profile);
