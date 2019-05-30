import { connect } from 'react-redux';
import React, { Component } from 'react';
import './styles.css';

class RecipeInfo extends Component {
  constructor(props) {
    super(props);
  }

  selected_recipe_info() {
    // database id's start at 1, array index starts at 0
    let selected = this.props.recipes[this.props.selected_id - 1];
    return (
      <div>
        <p className='recipe-info-name'>{selected.name}</p>
        <p className='recipe-info-serves'>servings: {selected.serves}</p>
        <p className='recipe-info-notes'>{selected.notes}</p>
      </div>
    )
  }

  no_selected_recipe() {
    return (
      <div>
        <p>Nothing selected</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.props.selected_id ? this.selected_recipe_info() : this.no_selected_recipe()}
      </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(RecipeInfo);