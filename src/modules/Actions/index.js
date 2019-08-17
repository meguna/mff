import {
  FETCH_RECIPES_START,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
  FETCH_MORE_RECIPES_START,
  FETCH_MORE_RECIPES_SUCCESS,
  FETCH_MORE_RECIPES_FAILURE,
  SET_SELECTED_RECIPE,
  SET_NOTIFICATION_DETAILS,
  AUTH_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  AUTH_NOT_LOGGED_IN,
} from './ActionTypes';
import Auth0Client from '../auth/Auth';
import { callApi } from '../helpers';

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
  callApi(`/getrecipes/sort=${sortMethod}`)
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
  callApi(`/getrecipes/offset=${offset}-sort=${sortMethod}`)
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

const loginStart = () => ({
  type: AUTH_START,
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

export const signup = () => (dispatch) => {
  dispatch(loginStart());
  Auth0Client.signUp()
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

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logout = () => (dispatch) => {
  dispatch(logoutSuccess());
  Auth0Client.signOut();
};

export const checkAuthStatus = cb => (dispatch) => {
  dispatch(loginStart());
  Auth0Client.getToken()
    .then((res) => {
      dispatch(loginSuccess());
      cb();
    })
    .catch((err) => {
      dispatch(loginFailure());
      login();
    });
};
