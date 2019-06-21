import { connect } from 'react-redux';

import NewRecipeForm from './view';

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
)(NewRecipeForm);
