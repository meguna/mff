import React, { Component } from 'react';
import './styles.css';
import PropTypes from 'prop-types';

class RecipeList extends Component {
  componentDidMount() {
    const { fetchRecipes } = this.props;
    fetchRecipes();
  }

  onRecipeClick(id) {
    const { selected_id: selectedId, setSelectedRecipe } = this.props;

    if (id !== selectedId) {
      setSelectedRecipe(id);
    }
  }


  render() {
    const { loading, recipes, selected_id: selectedId } = this.props;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="recipe-everything-wrapper">
        <div className="recipe-list-wrapper">
          <div className="recipe-list-item-wrapper add-recipe-list-item-wrapper">
            <p>Add a recipe!</p>
          </div>
          {recipes.map(item => (
            <div
              role="link"
              tabIndex="0"
              onClick={() => this.onRecipeClick(item.id)}
              onKeyDown={() => this.onRecipeClick(item.id)}
              key={item.id}
              className="recipe-list-item-wrapper"
            >
              <p className={(item.id === selectedId ? 'selected' : 'blue')}>
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  selected_id: PropTypes.number,
  fetchRecipes: PropTypes.func,
  setSelectedRecipe: PropTypes.func,
};

RecipeList.defaultProps = {
  recipes: {},
  loading: false,
  selected_id: null,
  fetchRecipes: null,
  setSelectedRecipe: null,
};

export default RecipeList;
