import React, { Component } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import RecipeInfo from '../RecipeInfo';
import RecipeList from '../RecipeList';
import NewRecipeForm from '../NewRecipeForm';

class RecipeIndex extends Component {
  componentDidMount() {
    const { fetchRecipes, listOffset } = this.props;
    fetchRecipes(listOffset);
  }

  render() {
    const {
      loading,
      error,
    } = this.props;
    if (loading || error) {
      return <p>Loading...</p>;
    }

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
  listOffset: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

RecipeIndex.defaultProps = {
  fetchRecipes: null,
  listOffset: 0,
  loading: false,
  error: false,
};


export default RecipeIndex;
