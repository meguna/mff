import { connect } from 'react-redux';
import { fetchRecipes, setSelectedRecipe, fetchMoreRecipes } from '../Actions/index';

import RecipeList from './view';

const mapStateToProps = state => state;

const mapDispatchToProps = {
  fetchRecipes,
  setSelectedRecipe,
  fetchMoreRecipes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeList);
