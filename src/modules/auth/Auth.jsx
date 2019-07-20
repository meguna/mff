import auth0 from 'auth0-js';
import auth0Config from '../../auth_config.json';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: auth0Config.domain,
      audience: `${auth0Config.domain}/userinfo`,
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

  signIn() {
    this.auth0.authorize();
  }

  checkSession(cb) {
    this.auth0.checkSession({}, (err, authResult) => {
      cb(err, authResult);
    });
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
        resolve();
      });
    });
  }

  signOut() {
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
  }
}

const auth0Client = new Auth();

export default auth0Client;
