import React, { Component } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import RecipeInfo from '../RecipeInfo';
import RecipeList from '../RecipeList';
import NewRecipeForm from '../NewRecipeForm';

class RecipeIndex extends Component {
  componentDidMount() {
    const { fetchRecipes, sortMethod } = this.props;
    fetchRecipes(sortMethod);
  }

  render() {
    return (
      <div className="recipe-everything-wrapper">
        <div id="recipe-list">
          <RecipeList />
        </div>
        <div id="recipe-info">
          <NewRecipeForm />
        </div>
      </div>
    );
  }
}

RecipeIndex.propTypes = {
  fetchRecipes: PropTypes.func,
  sortMethod: PropTypes.string,
};

RecipeIndex.defaultProps = {
  fetchRecipes: null,
  sortMethod: 'update_date',
};


export default RecipeIndex;
