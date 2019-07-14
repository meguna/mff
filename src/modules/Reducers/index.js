import {
  FETCH_RECIPES_START,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
  FETCH_MORE_RECIPES_START,
  FETCH_MORE_RECIPES_SUCCESS,
  FETCH_MORE_RECIPES_FAILURE,
  SET_SELECTED_RECIPE,
  FETCH_SELECTED_RECIPE_START,
  FETCH_SELECTED_RECIPE_SUCCESS,
  FETCH_SELECTED_RECIPE_FAILURE,
  SET_NOTIFICATION_DETAILS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
} from '../Actions/ActionTypes';

const INITIAL_STATE = {
  recipes: [],
  selectedId: -1,
  error: null,
  loading: false,
  listOffset: 0,
  sortMethod: 'update_date',
  selected: {},
  notification: {
    message: '',
    status: '',
  },
  isAuthenticated: false,
};

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
    let selectedRecipeFiltered = state.selected;
    if (state.selected.length === 0 && state.recipes) {
      selectedRecipeFiltered = action.payload.filter(rec => state.selectedId === rec.id)[0];
      if (selectedRecipeFiltered === undefined) {
        selectedRecipeFiltered = {};
      }
    }
    return {
      ...state,
      recipes: [...action.payload],
      selected: selectedRecipeFiltered,
      error: null,
      loading: false,
      listOffset: action.payload.length,
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
    let selectedRecipeFiltered = state.selected;
    if (state.selected.length === 0 && state.recipes) {
      selectedRecipeFiltered = action.payload.filter(rec => state.selectedId === rec.id)[0];
      if (selectedRecipeFiltered === undefined) {
        selectedRecipeFiltered = {};
      }
    }
    if (action.payload.length === 0) {
      return state;
    }
    return {
      ...state,
      recipes: [...state.recipes, ...action.payload],
      error: null,
      loading: false,
      listOffset: state.recipes.length + action.payload.length,
      selected: selectedRecipeFiltered,
    };
  }
  case SET_SELECTED_RECIPE: {
    let selectedRecipeFiltered = state.selected;
    if (state.recipes) {
      selectedRecipeFiltered = state.recipes.filter(rec => action.payload === rec.id)[0];
      if (selectedRecipeFiltered === undefined) {
        selectedRecipeFiltered = {};
      }
    }
    return {
      ...state,
      selectedId: action.payload,
      selected: selectedRecipeFiltered,
    };
  }
  case FETCH_SELECTED_RECIPE_START: {
    return {
      ...state,
      error: null,
      loading: true,
      selectedId: action.payload,
    };
  }
  case FETCH_SELECTED_RECIPE_SUCCESS: {
    return {
      ...state,
      loading: false,
      selected: { ...action.payload },
    };
  }
  case FETCH_RECIPES_FAILURE:
  case FETCH_MORE_RECIPES_FAILURE:
  case FETCH_SELECTED_RECIPE_FAILURE:
  case LOGIN_FAILURE:
    console.error(action.payload);
    return {
      ...state,
      error: true,
      loading: false,
    };
  case SET_NOTIFICATION_DETAILS:
    return {
      ...state,
      notification: {
        message: action.payloadMessage,
        status: action.payloadStatus,
      },
    };
  case LOGIN_SUCCESS:
    return {
      ...state,
      isAuthenticated: true,
      profile: action.payload,
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
