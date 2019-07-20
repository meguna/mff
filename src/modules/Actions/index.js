import Auth0Lock from 'auth0-lock';
import auth0Config from '../../auth_config.json';
import {
  FETCH_RECIPES_START,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
  FETCH_MORE_RECIPES_START,
  FETCH_MORE_RECIPES_SUCCESS,
  FETCH_MORE_RECIPES_FAILURE,
  FETCH_SELECTED_RECIPE_START,
  FETCH_SELECTED_RECIPE_SUCCESS,
  FETCH_SELECTED_RECIPE_FAILURE,
  SET_SELECTED_RECIPE,
  SET_NOTIFICATION_DETAILS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
} from './ActionTypes';
import Auth0Client from '../auth/Auth';

/**
 * fetch a list of recipes for the first time
 * thus, offset is automatically set to zero.
 * takes a "sort method" argument.
 */

const fetchRecipesStart = sortMethod => ({
  type: FETCH_RECIPES_START,
  payload: sortMethod,
});

const fetchRecipesSuccess = recipes => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes,
});

const fetchRecipesFailure = error => ({
  type: FETCH_RECIPES_FAILURE,
  payload: error,
});

export const fetchRecipes = sortMethod => (dispatch) => {
  dispatch(fetchRecipesStart(sortMethod));
  fetch(`http://localhost:3005/api/getrecipes/sort=${sortMethod}`)
    .then((res, err) => {
      if (!res.ok) {
        throw Error(err);
      }
      return res;
    })
    .then(res => res.json())
    .then(res => dispatch(fetchRecipesSuccess(res)))
    .catch(err => dispatch(fetchRecipesFailure(err)));
};

/**
 * fetch more items from a list that has already been fetched.
 * thus, takes an item "offset" as argument.
 * assumes "sort method" has already been specified in previous
 * fetch.
 */

const fetchMoreRecipesStart = () => ({
  type: FETCH_MORE_RECIPES_START,
});

const fetchMoreRecipesSuccess = recipes => ({
  type: FETCH_MORE_RECIPES_SUCCESS,
  payload: recipes,
});

const fetchMoreRecipesFailure = error => ({
  type: FETCH_MORE_RECIPES_FAILURE,
  payload: error,
});

export const fetchMoreRecipes = (offset, sortMethod) => (dispatch) => {
  dispatch(fetchMoreRecipesStart);
  fetch(`http://localhost:3005/api/getrecipes/offset=${offset}-sort=${sortMethod}`)
    .then((res, err) => {
      if (!res.ok) {
        throw Error(err);
      }
      return res;
    })
    .then(res => res.json())
    .then(res => dispatch(fetchMoreRecipesSuccess(res)))
    .catch(err => dispatch(fetchMoreRecipesFailure(err)));
};

// action to set a selected recipe id

const setRecipe = id => ({
  type: SET_SELECTED_RECIPE,
  payload: id,
});

export const setSelectedRecipe = id => (dispatch) => {
  dispatch(setRecipe(id));
};


const fetchSelectedStart = id => ({
  type: FETCH_SELECTED_RECIPE_START,
  payload: id,
});

const fetchSelectedSuccess = recipes => ({
  type: FETCH_SELECTED_RECIPE_SUCCESS,
  payload: recipes,
});

const fetchSelectedFailure = error => ({
  type: FETCH_SELECTED_RECIPE_FAILURE,
  payload: error,
});

export const fetchSelectedRecipe = id => (dispatch) => {
  dispatch(fetchSelectedStart(id));
  fetch(`http://localhost:3005/api/getrecipe/${id}`)
    .then((res, err) => {
      if (!res.ok) {
        throw Error(err);
      }
      return res;
    })
    .then(res => res.json())
    .then(res => dispatch(fetchSelectedSuccess(res[0])))
    .catch(err => dispatch(fetchSelectedFailure(err)));
};

const setNotificationDetails = (status, message) => ({
  type: SET_NOTIFICATION_DETAILS,
  payloadMessage: message,
  payloadStatus: status,
});

export const setNotification = (status, message) => (dispatch) => {
  dispatch(setNotificationDetails(status, message));
};

const loginSuccess = profile => ({
  type: LOGIN_SUCCESS,
  payload: profile,
});

const loginFailure = err => ({
  type: LOGIN_FAILURE,
  payload: err,
});

export const login = () => (dispatch) => {
  const nonce = Math.floor(Math.random() * 100000);
  console.log(nonce);
  sessionStorage.setItem('stateid', nonce);
  const options = {
    auth: {
      params: {
        state: nonce,
      },
    },
  };

  const lock = new Auth0Lock(auth0Config.clientId, auth0Config.domain, options);

  lock.show();
  lock.on('authenticated', (authResult) => {
    console.log(authResult);
    if (authResult.state !== sessionStorage.getItem('stateid')) {
      dispatch(loginFailure('login failure'));
    } else {
      localStorage.setItem('id_token', authResult.idToken);
      lock.getUserInfo(authResult.accessToken, (err, profile) => {
        if (err) {
          dispatch(loginFailure(err));
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        dispatch(loginSuccess(profile));
        lock.hide();
        sessionStorage.removeItem('stateid');
      });
    }
  });
  lock.on('unrecoverable_error', (err) => {
    dispatch(loginFailure(err));
  });
  lock.on('authorization_error', (err) => {
    dispatch(loginFailure(err));
  });
};

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logout = () => (dispatch) => {
  localStorage.removeItem('id_token');
  localStorage.removeItem('profile');
  dispatch(logoutSuccess());
  Auth0Client.signOut();
};

export const checkAuthStatus = () => (dispatch) => {
  Auth0Client.checkSession()
    .then((authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      dispatch(loginSuccess(Auth0Client.getProfile()));
    })
    .catch((err) => {
      dispatch(loginFailure(err));
    });
};
