import { connect } from 'react-redux';
import {
  fetchRecipes,
  setSelectedRecipe,
  fetchMoreRecipes,
  fetchQuickSearch,
} from '../Actions/index';

import RecipeList from './view';

const mapStateToProps = state => state;

const mapDispatchToProps = {
  fetchRecipes,
  setSelectedRecipe,
  fetchMoreRecipes,
  fetchQuickSearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeList);
