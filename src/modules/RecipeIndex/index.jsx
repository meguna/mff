import { connect } from 'react-redux';
import { fetchRecipes, setSelectedRecipe } from '../Actions/index';

import RecipeIndex from './view';

const mapStateToProps = state => state;

const mapDispatchToProps = {
  fetchRecipes,
  setSelectedRecipe,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeIndex);
