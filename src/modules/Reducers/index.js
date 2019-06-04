import {
  FETCH_RECIPES_START,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
  SET_SELECTED_RECIPE,
} from '../Actions/ActionTypes';

const LIST_FETCH_COUNT = 5;

const INITIAL_STATE = {
  recipes: [],
  selectedId: -1,
  error: null,
  loading: false,
  listOffset: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RECIPES_START:
      return {
        recipes: state.recipes,
        error: null,
        loading: true,
        selectedId: state.selectedId,
        listOffset: state.listOffset,
      };
    case FETCH_RECIPES_SUCCESS:
      return {
        recipes: [...state.recipes, ...action.payload],
        error: null,
        loading: false,
        selectedId: state.selectedId,
        listOffset: state.listOffset + LIST_FETCH_COUNT,
      };
    case FETCH_RECIPES_FAILURE:
      return {
        recipes: state.recipes,
        error: action.payload,
        loading: false,
        selectedId: state.selectedId,
        listOffset: state.listOffset,
      };
    case SET_SELECTED_RECIPE:
      return {
        recipes: state.recipes,
        error: state.error,
        loading: state.loading,
        selectedId: action.payload,
        listOffset: state.listOffset,
      };
    default:
      return state;
  }
};

export default reducer;
