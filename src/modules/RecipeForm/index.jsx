import { connect } from 'react-redux';

import RecipeForm from './view';

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
)(RecipeForm);
