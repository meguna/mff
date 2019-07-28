import { connect } from 'react-redux';
import RecipeInfo from './view';
import {
  setSelectedRecipe,
} from '../Actions/index';

const mapStateToProps = state => state;

const mapDispatchToProps = {
  setSelectedRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInfo);
