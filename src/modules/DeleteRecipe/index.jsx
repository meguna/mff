import { connect } from 'react-redux';
import { setSelectedRecipe, fetchRecipes, setNotification } from '../Actions/index';
import DeleteRecipe from './view';

const mapStateToProps = state => state;
const mapDispatchToProps = {
  setSelectedRecipe,
  fetchRecipes,
  setNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteRecipe);
