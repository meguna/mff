// simple enough component, so Redux logic is combined with Component view. 
// separate if becomes too complex. 

import { connect } from 'react-redux';
import React, { Component } from 'react';
import './styles.css';

class RecipeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {ingredients: []}
  }

  selected_recipe_info() {
    // database id's start at 1, array index starts at 0
    // probably bad practice, change to grab item using its ID instead of index
    let selected = this.props.recipes[this.props.selected_id - 1];
    return (
      <div>
        <p className='recipe-info-name'>{selected.name}</p>
        <p className='recipe-info-serves'>{selected.size}</p>
        <p className="recipe-info-label">ingredients</p>
        {this.fetch_ingredients()}
        <p className="recipe-info-label">notes</p>
        <p className='recipe-info-notes'>{selected.notes}</p>
      </div>
    )
  }

  fetch_ingredients() {
    let ings = <div></div>;

    if (this.props.selected_id) {
      fetch('http://localhost:3005/api/getingredients/' + this.props.selected_id)
      .then(res => res.json())
      .then(res => {
        this.setState({ingredients: res})
      })
      .catch(() => {
      })

      let ing_list = this.state.ingredients;
      ings = <ul className='recipe-info-ingredients-list'>
              {ing_list.map(item => (
                <li key={item.id}>{item.name} &mdash; {item.amount} {item.amount_unit}</li>
              ))}
             </ul>
    }
    return ings;
  }

  no_selected_recipe() {
    return (
      <div>
        <p>Nothing selected</p>
      </div>
    )
  }

  render() {
    if (this.props.selected_id && !this.props.loading && !this.props.error) {
      return <div>{this.selected_recipe_info()}</div>
    } else {
      return <div>{this.no_selected_recipe()}</div>
    }    
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(RecipeInfo);