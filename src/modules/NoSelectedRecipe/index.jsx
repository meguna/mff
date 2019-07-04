import { connect } from 'react-redux';
import { setSelectedRecipe, fetchRecipes } from '../Actions/index';
import DeleteRecipe from './view';

const mapStateToProps = state => state;
const mapDispatchToProps = {
  setSelectedRecipe,
  fetchRecipes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteRecipe);
