import React, { Component } from 'react';
import './styles.css';

class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {recipes: [], fetch_err: false}
  }

  componentDidMount() {
    fetch(`http://localhost:3005/api/getrecipes`)
      .then(function(res, err) {
        if(res.status !== 200) {
          this.setState({fetch_err: true});
          return '{}';
        } else {
          console.log(res);
          return res.json();
        }
      })
      .then(parsedData => {
        this.setState({recipes: parsedData})
      })
  }

  getRecipes() {
    let recipes = this.state.recipes;
    let newarr =  Object.keys(recipes).map(function(i) {
      try {
        return <div key={i}>
                  <h1>{recipes[i].name}</h1>
               </div>;
      } catch(e) {
        return <div key={i}><p>Coming Soon!</p></div>
      }
    })
    return newarr;
  }

  render() {
    return (
      <div className="recipe-list-wrapper">
        {this.getRecipes()} 
      </div>
    );
  }
}

export default RecipeList;
