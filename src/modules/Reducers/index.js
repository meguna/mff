import {
  FETCH_RECIPES_START,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
  FETCH_MORE_RECIPES_START,
  FETCH_MORE_RECIPES_SUCCESS,
  FETCH_MORE_RECIPES_FAILURE,
  FETCH_QS_START,
  FETCH_QS_SUCCESS,
  FETCH_MORE_QS_SUCCESS,
  FETCH_QS_FAILURE,
  SET_SELECTED_RECIPE,
  SET_NOTIFICATION_DETAILS,
  AUTH_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  AUTH_NOT_LOGGED_IN,
} from '../Actions/ActionTypes';

const INITIAL_STATE = {
  recipes: [],
  selectedId: -1,
  error: null,
  loading: false,
  listOffset: 0,
  sortMethod: 'update_date',
  notification: {
    message: '',
    status: '',
  },
  loadingAuth: true,
  isAuthenticated: false,
  profile: null,
  noMoreResults: false,
};

const LIST_COUNT_THRESHOLD = 5;

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_RECIPES_START: {
    return {
      ...state,
      error: null,
      loading: true,
    };
  }
  case FETCH_RECIPES_SUCCESS: {
    return {
      ...state,
      recipes: [...action.payload],
      error: null,
      loading: false,
      listOffset: action.payload.length,
      noMoreResults: (action.payload.length < LIST_COUNT_THRESHOLD),
    };
  }
  case FETCH_MORE_RECIPES_START: {
    return {
      ...state,
      error: null,
      loading: true,
      sortMethod: action.payload,
    };
  }
  case FETCH_MORE_RECIPES_SUCCESS: {
    return {
      ...state,
      recipes: [...state.recipes, ...action.payload],
      error: null,
      loading: false,
      listOffset: state.recipes.length + action.payload.length,
      noMoreResults: (action.payload.length < LIST_COUNT_THRESHOLD),
    };
  }
  case SET_SELECTED_RECIPE: {
    return {
      ...state,
      selectedId: action.payload,
    };
  }
  case FETCH_QS_FAILURE:
  case FETCH_RECIPES_FAILURE:
  case FETCH_MORE_RECIPES_FAILURE:
    console.error(action.payload);
    return {
      ...state,
      error: true,
      loading: false,
      loadingAuth: false,
    };
  case FETCH_QS_START:
    return {
      ...state,
      error: null,
      loading: true,
      sortMethod: action.payload,
    };
  case FETCH_QS_SUCCESS: {
    return {
      ...state,
      recipes: [...action.payload],
      error: null,
      loading: false,
      listOffset: action.payload.length,
      noMoreResults: (action.payload.length < LIST_COUNT_THRESHOLD),
    };
  }
  case FETCH_MORE_QS_SUCCESS: {
    return {
      ...state,
      recipes: [...state.recipes, ...action.payload],
      error: null,
      loading: false,
      listOffset: state.recipes.length + action.payload.length,
      noMoreResults: (action.payload.length < LIST_COUNT_THRESHOLD),
    };
  }
  case LOGIN_FAILURE:
    console.error(action.payload);
    return {
      ...state,
      error: false,
      loading: false,
      loadingAuth: false,
      isAuthenticated: false,
    };
  case SET_NOTIFICATION_DETAILS:
    return {
      ...state,
      notification: {
        message: action.payloadMessage,
        status: action.payloadStatus,
      },
    };
  case AUTH_START:
    return {
      ...state,
      loadingAuth: true,
      error: null,
    };
  case AUTH_NOT_LOGGED_IN:
    return {
      ...state,
      loadingAuth: false,
    };
  case LOGIN_SUCCESS:
    return {
      ...state,
      loadingAuth: false,
      isAuthenticated: true,
      error: null,
    };
  case LOGOUT_SUCCESS:
    return {
      ...state,
      isAuthenticated: false,
      error: null,
    };
  default:
    return state;
  }
};

export default reducer;
