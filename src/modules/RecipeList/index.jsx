import { connect } from 'react-redux';
import {fetchRecipes, setSelectedRecipe} from '../Actions/index.js';

import RecipeList from './view.jsx';

const mapStateToProps = state => state;

const mapDispatchToProps = {
  fetchRecipes,
  setSelectedRecipe
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeList);
