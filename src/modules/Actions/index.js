// import action constants

import {FETCH_RECIPES_START, 
	    FETCH_RECIPES_SUCCESS, 
	    FETCH_RECIPES_FAILURE,
	    SET_SELECTED_RECIPE
	   } from './ActionTypes.js';

// actions to fetch list of recipes

const fetchRecipesStart = () => {
  return {
    type: FETCH_RECIPES_START
  };
};

const fetchRecipesSuccess = recipes => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes
});

const fetchRecipesFailure = error => ({
  type: FETCH_RECIPES_FAILURE,
  payload: error
});

export const fetchRecipes = () => {
	return dispatch => {
		dispatch(fetchRecipesStart);
	    fetch(`http://localhost:3005/api/getrecipes`)
	    	.then(res => res.json())
	    	.then(res => dispatch(fetchRecipesSuccess(res)))
	    	.catch(err => dispatch(fetchRecipesFailure(err)));
	};
}

// action to set a selected recipe id

const setRecipe = id => ({
  type: SET_SELECTED_RECIPE,
  payload: id
});

export const setSelectedRecipe = id => {
	return dispatch => {
		dispatch(setRecipe(id));
	}
}