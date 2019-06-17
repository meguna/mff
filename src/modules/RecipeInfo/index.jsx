import { connect } from 'react-redux';
import RecipeInfo from './view';

const mapStateToProps = (state, ownProps) => {
  const selectedId = +ownProps.match.params.id;
  return {
    ...state,
    selected: state.recipes.filter(rec => selectedId === rec.id)[0],
    selectedId,
  };
};

export default connect(mapStateToProps)(RecipeInfo);
