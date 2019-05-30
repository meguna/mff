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
      <div className="recipe-list-wrapper">
        {recipes.map(item => (
          <div key={item.id} >
             <h1 onClick={() => this.onRecipeClick(item.id)} 
                 className={(item.id === this.props.selected_id ? "red" : "blue")}> {item.name}</h1>
          </div>
        ))}
      </div>
    );
  }
}

export default RecipeList;

