import React, { Component } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class NewRecipeForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.sizeChange = this.sizeChange.bind(this);
    this.ingredientsChange = this.ingredientsChange.bind(this);
    this.notesChange = this.notesChange.bind(this);

    this.state = {
      name: '',
      size: '',
      ingredients: '',
      notes: '',
    }
  }

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  nameChange = e => {
    this.setState({ name: e.target.value });
  };

  sizeChange = e => {
    this.setState({ size: e.target.value });
  };

  ingredientsChange = e => {
    this.setState({ ingredients: e.target.value });
  };

  notesChange = e => {
    this.setState({ notes: e.target.value });
  };


  render() {
    return (
      <form id="newrecipe-form" onSubmit={this.onSubmit} >
        <label htmlFor="newrecipe-name-input">
          Name <br />
          <input id="newrecipe-name-input" type="text" value={this.state.name} onChange={this.nameChange} />
        </label>
        <label htmlFor="newrecipe-size-input">
          Size <br />
          <input id="newrecipe-size-input" type="text" value={this.state.size} onChange={this.sizeChange} />
        </label>
        <label htmlFor="newrecipe-ingredients-input">
          Ingredients <br />
          <input id="newrecipe-ingredients-input" type="text" value={this.state.ingredients} onChange={this.ingredientsChange} />
        </label>
        <label htmlFor="newrecipe-recipenotes-input">
          Notes <br />
          <input id="newrecipe-recipenotes-input" type="textarea" value={this.state.notes} onChange={this.notesChange} />
        </label>
        <input type="submit" />
      </form>
    );
  }
}

NewRecipeForm.propTypes = {

};

NewRecipeForm.defaultProps = {

};


const mapStateToProps = state => state;

export default connect(mapStateToProps)(NewRecipeForm);
