import { connect } from 'react-redux';
import { fetchRecipes } from '../Actions/index';

import EditRecipeForm from './view';

const mapStateToProps = state => state;

const mapDispatchToProps = {
  fetchRecipes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditRecipeForm);
