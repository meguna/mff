import auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';
import auth0Config from '../../auth_config.json';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: auth0Config.domain,
      audience: `https://${auth0Config.domain}/userinfo`,
      clientID: auth0Config.clientId,
      redirectUri: 'http://localhost:3000/',
      responseType: 'id_token token',
      scope: 'openid profile email',
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
    console.log(this.expiresAt);
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    return this.lockJs({
      allowSignUp: false,
      initialScreen: 'login',
      
    });
  }

  signUp() {
    return this.lockJs({
      allowLogin: false,
      initialScreen: 'signUp',
      allowShowPassword: true,
    });
  }

  lockJs(additionalOptions) {
    if (sessionStorage.getItem('stateid') === null) {
      const nonce = Math.floor(Math.random() * 100000);
      sessionStorage.setItem('stateid', nonce);
    }
    const options = {
      autoclose: true,
      avatar: null,
      allowedConnections: ['Username-Password-Authentication'],
      loginAfterSignUp: true,
      usernameStyle: 'email',
      theme: {
        primaryColor: '#FF320C',
      },
      languageDictionary: {
        title: "Log In to Mood For Food",
      },
      auth: {
        redirect: true,
        redirectUrl: 'http://localhost:3000',
        params: {
          state: sessionStorage.getItem('stateid'),
        },
      }
    };
    const allOptions = Object.assign(options, additionalOptions);
    const lock = new Auth0Lock(
      auth0Config.clientId,
      auth0Config.domain,
      options
    );
    lock.show();

    return new Promise((resolve, reject) => {
      lock.on('authenticated', (authResult) => {
        if (authResult.state !== sessionStorage.getItem('stateid')) {
          reject('state mismatch error');
        } else {
          this.setSession(authResult);
          sessionStorage.removeItem('stateid');
          lock.getUserInfo(authResult.accessToken, (err, profile) => {
            if (err) {
              reject(err);
            }
            resolve(profile);
            lock.hide();
          });
        }
      });
      lock.on('unrecoverable_error', (err) => {
        console.log('unrecov error');
        console.error(err);
        reject(err);
      });
      lock.on('authorization_error', (err) => {
        console.log('auth error');
        console.error(err);
        reject(err);
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
