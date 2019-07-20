import auth0 from 'auth0-js';
import auth0Config from '../../auth_config.json';
import Auth0Lock from 'auth0-lock';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: auth0Config.domain,
      audience: `https://${auth0Config.domain}/userinfo`,
      clientID: auth0Config.clientId,
      redirectUri: 'http://localhost:3000/',
      responseType: 'id_token',
      scope: 'openid profile',
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn(email, pass) {
    this.auth0.authorize({
      clientID: auth0Config.clientId,
      redirectUri: 'http://localhost:3000/login',
      responseType: 'id_token token',
      state: sessionStorage.getItem('stateid'),
    });
    this.auth0.login({
      email,
      password: pass,
    }, (err) => {
      console.error(err);
    });
    this.handleAuthentication();
  }

  checkSession() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) {
          return reject(err);
        }
        resolve(authResult);
      });
    });
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
  }

  signOut() {
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
    this.auth0.logout({
      returnTo: 'http://localhost:3000/',
      clientID: auth0Config.clientId,
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;
