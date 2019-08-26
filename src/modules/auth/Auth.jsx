import auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';
import i18n from '../../i18n';
import authConfig from '../../auth_config.json';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: authConfig.domain,
      audience: authConfig.apiAudience,
      clientID: authConfig.clientId,
      redirectUri: authConfig.rootUri,
      responseType: 'id_token token',
      scope: 'openid profile email user_metadata',
      responseMode: 'web_message',
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

  getToken() {
    return new Promise((resolve, reject) => {
      if (this.accessToken !== undefined && this.isAuthenticated()) {
        resolve(this.accessToken);
      } else {
        this.silentAuth()
          .then((res) => {
            resolve(res.accessToken);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    return this.lockJs({
      allowSignUp: false,
      initialScreen: 'login',
    });
  }

  /* IMPORTANT
   * the user's language preference is stored as "nickname" because
   * per auth0 rules, items stored in user_metadata cannot be accessed through
   * auth0.js. Basic params like nickname, name, given_name, etc are available
   * to access from auth0.js. Since I already do silent authentication with
   * auth0.js every time a user navigates to the app, it seems too costly to do
   * an operation with the management api every time as well. However, I still
   * need to access the language parameter every time the user navigates to
   * the app so that I can tell react-i18n which language to use.
   */
  signUp() {
    return this.lockJs({
      allowLogin: false,
      initialScreen: 'signUp',
      allowShowPassword: true,
      additionalSignUpFields: [{
        name: 'name',
        placeholder: 'your name',
      }, {
        type: 'hidden',
        name: 'nickname',
        value: i18n.language,
      }],
    });
  }

  resetPassword(emailPrefill) {
    return this.lockJs({
      allowLogin: false,
      allowSignUp: false,
      initialScreen: 'forgotPassword',
      closable: true,
      prefill: {
        email: emailPrefill,
      },
    });
  }

  lockJs(additionalOptions) {
    if (sessionStorage.getItem('stateid') === null) {
      const nonce = Math.floor(Math.random() * 100000);
      sessionStorage.setItem('stateid', nonce);
    }
    const options = {
      language: i18n.language || 'en',
      closable: false,
      autoclose: true,
      avatar: null,
      allowedConnections: ['Username-Password-Authentication'],
      loginAfterSignUp: true,
      usernameStyle: 'email',
      theme: {
        primaryColor: '#FF320C',
      },
      languageDictionary: {
        title: 'Log In to Foodnotes',
      },
      auth: {
        redirect: true,
        redirectUrl: authConfig.rootUri,
        params: {
          state: sessionStorage.getItem('stateid'),
        },
      },
    };
    const allOptions = Object.assign(options, additionalOptions);
    const lock = new Auth0Lock(
      authConfig.clientId,
      authConfig.domain,
      allOptions,
    );
    lock.show();

    return new Promise((resolve, reject) => {
      lock.on('authenticated', (authResult) => {
        if (authResult.state !== sessionStorage.getItem('stateid')) {
          reject(new Error('state mismatch error'));
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
        lock.show({
          flashMessage: {
            type: 'error',
            text: err.errorDescription,
          },
        });
        console.error(err);
        reject(err);
      });
      lock.on('authorization_error', (err) => {
        lock.show({
          flashMessage: {
            type: 'error',
            text: err.errorDescription,
          },
        });
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
        return resolve();
      });
    });
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) {
          reject(err);
        } else {
          this.setSession(authResult);
          return resolve(authResult);
        }
      });
    });
  }

  patchUserData(userMetadata) {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({
        audience: 'https://dev-jknyt6s8.auth0.com/api/v2/',
        scope: 'read:current_user update:current_user_identities create:current_user_metadata update:current_user_metadata delete:current_user_metadata create:current_user_device_credentials delete:current_user_device_credentials',
      }, (err, authResult) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        const auth0Manage = new auth0.Management({
          domain: 'dev-jknyt6s8.auth0.com',
          token: authResult.accessToken,
        });
        auth0Manage.patchUserMetadata(this.profile.sub, userMetadata, (e2, ar2) => {
          if (e2) {
            console.error(e2);
          }
          /* Takes a moment for the rules in auth0's backend to finish running.
           * The rules make sure that user metadata matches user root data.
           * Below code runs it manually on this end so users see immediate feedback.
           */
          if (ar2.user_metadata.name) {
            this.profile.name = ar2.user_metadata.name;
          }
          if (ar2.user_metadata.email) {
            this.profile.email = ar2.user_metadata.email;
          }
          return resolve(auth0Manage);
        });
      });
    });
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    this.accessToken = authResult.accessToken;
    this.profile = authResult.idTokenPayload;
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
  }

  signOut() {
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
    this.auth0.logout({
      returnTo: authConfig.rootUri,
      clientID: authConfig.clientId,
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;
