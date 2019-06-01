import React, { Component } from 'react';
import './styles.css';

class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {recipes: [], fetch_err: false, selected_id: null}
  }

  componentDidMount() {
    this.props.fetchRecipes();
  }

  onRecipeClick(id) {
    if (id !== this.props.selected_id) {
      this.props.setSelectedRecipe(id);
    }
  }


  render() {
    if (this.props.loading) {
      return <p>Loading...</p>;
    }

    let recipes = this.props.recipes;

    return (
      <div className="recipe-everything-wrapper">
        <div className="recipe-list-wrapper">
          <div className='recipe-list-item-wrapper add-recipe-list-item-wrapper'>
            <p>Add a recipe!</p>
          </div>
            {recipes.map(item => (
              <div onClick={() => this.onRecipeClick(item.id)} key={item.id} className='recipe-list-item-wrapper'>
                 <p className={(item.id === this.props.selected_id ? "selected" : "blue")}> {item.name}</p>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default RecipeList;

