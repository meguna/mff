import { connect } from 'react-redux';
import { fetchRecipes, setNotification, setSelectedRecipe } from '../Actions/index';
import RecipeForm from './view';

const mapStateToProps = state => state;
const mapDispatchToProps = {
  fetchRecipes,
  setNotification,
  setSelectedRecipe,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeForm);
