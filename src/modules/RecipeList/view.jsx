import React, { Component } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'update_date' };
    this.onSortSelect = this.onSortSelect.bind(this);
  }

  onRecipeClick(id) {
    const { selectedId, setSelectedRecipe } = this.props;
    if (id !== selectedId) {
      setSelectedRecipe(id);
    }
  }

  onSortSelect(event) {
    const { fetchRecipes } = this.props;
    this.setState({ value: event.target.value }, () => {
      const { value } = this.state;
      fetchRecipes(value);
    });
  }

  render() {
    const {
      recipes, selectedId, loading, error, fetchMoreRecipes, listOffset,
    } = this.props;
    const { value } = this.state;

    return (
      <div>
        <form>
          <select value={value} onChange={this.onSortSelect}>
            <option value="name">name</option>
            <option value="update_date">last updated</option>
            <option value="create_date">last added</option>
          </select>
        </form>

        {(!loading || !error) && recipes.map(recipe => (
          <div key={recipe.id}>
            <Link
              role="link"
              to={`/recipe/${recipe.id}`}
              tabIndex="0"
              onClick={() => this.onRecipeClick(recipe.id)}
              onKeyDown={() => this.onRecipeClick(recipe.id)}
              className="recipe-list-item-wrapper"
            >
              <p className={(recipe.id === selectedId ? 'selected' : '')}>
                {recipe.name}
              </p>
            </Link>
          </div>
        ))}
        <button
          type="button"
          role="link"
          tabIndex="0"
          onClick={() => fetchMoreRecipes(listOffset, value)}
          onKeyDown={() => fetchMoreRecipes(listOffset, value)}
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
  fetchMoreRecipes: PropTypes.func,
  setSelectedRecipe: PropTypes.func,
};

RecipeList.defaultProps = {
  recipes: [],
  error: false,
  loading: false,
  selectedId: 1,
  listOffset: 0,
  fetchRecipes: () => {},
  fetchMoreRecipes: () => {},
  setSelectedRecipe: () => {},
};

export default RecipeList;
