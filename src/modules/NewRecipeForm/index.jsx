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
    // this.ingredientsChange = this.ingredientsChange.bind(this);
    this.notesChange = this.notesChange.bind(this);

    this.state = {
      name: '',
      size: '',
      // ingredients: '',
      notes: '',
    };
  }

  nameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  sizeChange = (e) => {
    this.setState({ size: e.target.value });
  };

  ingredientsChange = (e) => {
    this.setState({ ingredients: e.target.value });
  };

  notesChange = (e) => {
    this.setState({ notes: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3005/api/createnewrecipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };


  render() {
    const {
      name,
      size,
      ingredients,
      notes,
    } = this.state;

    return (
      <form id="newrecipe-form" onSubmit={this.onSubmit} autoComplete="off">
        <label htmlFor="newrecipe-name-input">
          Name
          <br />
          <input id="newrecipe-name-input" type="text" value={name} onChange={this.nameChange} />
        </label>
        <label htmlFor="newrecipe-size-input">
          Size
          <br />
          <input id="newrecipe-size-input" type="text" value={size} onChange={this.sizeChange} />
        </label>
        <fieldset>
          <legend>Ingredients</legend>
          <div className="new-ingredient-fields">
            <label htmlFor="newrecipe-ingredient-name-input">
              Name
              <br />
              <input id="newrecipe-ingredient-name-input" type="text" value={ingredients} onChange={this.ingredientsChange} />
            </label>
            <label htmlFor="newrecipe-ingredient-amount-input">
              Amount
              <br />
              <input id="newrecipe-ingredient-amount-input" type="text" />
            </label>
          </div>
        </fieldset>
        <label htmlFor="newrecipe-recipenotes-input">
          Notes
          <br />
          <input id="newrecipe-recipenotes-input" type="textarea" value={notes} onChange={this.notesChange} />
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
