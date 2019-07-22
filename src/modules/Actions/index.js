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
  AUTH_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  AUTH_NOT_LOGGED_IN,
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
  const token = Auth0Client.getToken();
  fetch(`http://localhost:3005/api/getrecipes/sort=${sortMethod}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
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
  dispatch(loginStart());
  Auth0Client.signIn()
    .then((res) => {
      dispatch(loginSuccess(res));
    })
    .catch((err) => {
      loginFailure(err);
    });
};

const notLoggedIn = () => ({
  type: AUTH_NOT_LOGGED_IN,
});

const loginStart = () => ({
  type: AUTH_START,
});

export const checkAuthStatus = () => (dispatch) => {
  return new Promise((resolve) => {
    dispatch(loginStart());
    Auth0Client.silentAuth()
      .then(() => {
        dispatch(loginSuccess(Auth0Client.getProfile()));
        resolve();
      })
      .catch((err) => {
        if (err.error === 'consent_required') {
          console.error(err);
          dispatch(loginStart());
          Auth0Client.signIn()
            .then((res) => {
              dispatch(loginSuccess(res));
            })
            .catch((err) => {
              dispatch(loginFailure(err));
            });
        } else if (err.error === 'login_required') {
          console.error(err);
          dispatch(notLoggedIn(err));
        } else {
          console.error(err);
          dispatch(loginFailure(err));
        }
      });
  });
};

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logout = () => (dispatch) => {
  dispatch(logoutSuccess());
  Auth0Client.signOut();
};
