import { connect } from 'react-redux';
import RecipeInfo from './view';
import {
  setSelectedRecipe,
  fetchSelectedRecipe,
} from '../Actions/index';

const mapStateToProps = state => state;

const mapDispatchToProps = {
  setSelectedRecipe,
  fetchSelectedRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInfo);
