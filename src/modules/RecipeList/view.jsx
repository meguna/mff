import React, { Component } from 'react';
import './styles.css';
import PropTypes from 'prop-types';

class RecipeList extends Component {
  onRecipeClick(id) {
    const { selectedId, setSelectedRecipe } = this.props;

    if (id !== selectedId) {
      setSelectedRecipe(id);
    }
  }

  onSortSelect(sortBy) {
    const { fetchRecipes } = this.props;
    fetchRecipes(0);
  }

  fetchMoreRecipes() {
    const { fetchRecipes, listOffset } = this.props;
    fetchRecipes(listOffset);
  }

  render() {
    const {
      recipes, selectedId, loading, error,
    } = this.props;
    if (loading || error) {
      return (
        <p className="housekeeping-message">Loading...</p>
      );
    }

    return (
      <div>
        <form>
          <select onChange={() => this.onSortSelect(this.value)}>
            <option value="name">name</option>
            <option value="update_date" selected>last updated</option>
            <option value="create_date">last added</option>
          </select>
        </form>

        {recipes.map(recipe => (
          <div key={recipe.id}>
            <div
              role="link"
              tabIndex="0"
              onClick={() => this.onRecipeClick(recipe.id)}
              onKeyDown={() => this.onRecipeClick(recipe.id)}
              className="recipe-list-item-wrapper"
            >
              <p className={(recipe.id === selectedId ? 'selected' : 'blue')}>
                {recipe.name}
              </p>
            </div>
          </div>
        ))}
        <button
          type="button"
          role="link"
          tabIndex="0"
          onClick={() => this.fetchMoreRecipes()}
          onKeyDown={() => this.fetchMoreRecipes()}
          className="housekeeping-message load-more-button"
        >
          Load More...
        </button>
      </div>
    );
  }
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.bool,
  loading: PropTypes.bool,
  selectedId: PropTypes.number,
  listOffset: PropTypes.number,
  fetchRecipes: PropTypes.func,
  setSelectedRecipe: PropTypes.func,
};

RecipeList.defaultProps = {
  recipes: [],
  error: false,
  loading: false,
  selectedId: 1,
  listOffset: 0,
  fetchRecipes: () => {},
  setSelectedRecipe: () => {},
};

export default RecipeList;
