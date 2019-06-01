import {
  FETCH_RECIPES_START,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
  SET_SELECTED_RECIPE,
} from '../Actions/ActionTypes';

const INITIAL_STATE = {
  recipes: [],
  selected_id: null,
  error: null,
  loading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RECIPES_START:
      return {
        recipes: state.recipes,
        error: null,
        loading: true,
        selected_id: state.selected_id,
      };
    case FETCH_RECIPES_SUCCESS:
      return {
        recipes: [...state.recipes, action.payload][0],
        error: null,
        loading: false,
        selected_id: state.selected_id,
      };
    case FETCH_RECIPES_FAILURE:
      return {
        recipes: state.recipes,
        error: action.payload,
        loading: false,
        selected_id: state.selected_id,
      };
    case SET_SELECTED_RECIPE:
      return {
        recipes: state.recipes,
        error: state.error,
        loading: state.loading,
        selected_id: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
