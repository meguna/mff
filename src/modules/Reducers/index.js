import {
  FETCH_RECIPES_START,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
  FETCH_MORE_RECIPES_START,
  FETCH_MORE_RECIPES_SUCCESS,
  FETCH_MORE_RECIPES_FAILURE,
  SET_SELECTED_RECIPE,
} from '../Actions/ActionTypes';

const LIST_FETCH_COUNT = 5;

const INITIAL_STATE = {
  recipes: [],
  selectedId: -1,
  error: null,
  loading: false,
  listOffset: 0,
  sortMethod: 'update_date',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MORE_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: [...state.recipes, ...action.payload],
        error: null,
        loading: false,
        listOffset: state.listOffset + LIST_FETCH_COUNT,
      };
    case FETCH_RECIPES_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: [...action.payload],
        error: null,
        loading: false,
        listOffset: 0 + LIST_FETCH_COUNT,
        selectedId: -1,
      };
    case FETCH_RECIPES_FAILURE:
    case FETCH_MORE_RECIPES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_SELECTED_RECIPE:
      return {
        ...state,
        selectedId: action.payload,
      };
    case FETCH_MORE_RECIPES_START:
      return {
        ...state,
        error: null,
        loading: true,
        sortMethod: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
