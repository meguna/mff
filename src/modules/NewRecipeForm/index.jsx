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
    this.ingNameChange = this.ingNameChange.bind(this);
    this.ingAmtChange = this.ingAmtChange.bind(this);
    this.notesChange = this.notesChange.bind(this);

    this.state = {
      name: '',
      size: '',
      ingredients: [{ name: '', amount: '' }],
      notes: '',
    };
  }

  nameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  sizeChange = (e) => {
    this.setState({ size: e.target.value });
  };

  ingNameChange = (e) => {
    const { ingredients } = this.state;
    ingredients[ingredients.length - 1].name = e.target.value;
    this.setState({ ingredients });
  };

  ingAmtChange = (e) => {
    const { ingredients } = this.state;
    ingredients[ingredients.length - 1].amount = e.target.value;
    this.setState({ ingredients });
  };

  notesChange = (e) => {
    this.setState({ notes: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    // const picked = (({ name, size, notes }) => ({ name, size, notes }))(this.state);
    // fetch('http://localhost:3005/api/createnewrecipe', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(picked),
    // })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  };


  render() {
    const {
      name,
      size,
      ingredients,
      notes,
    } = this.state;

    return (
      <div>
        <h1>Add a New Recipe!</h1>
        <form id="newrecipe-form" onSubmit={this.onSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="newrecipe-name-input">
              Recipe Name
            </label>
            <input placeholder="name" id="newrecipe-name-input" type="text" value={name} onChange={this.nameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="newrecipe-size-input">
              Size
            </label>
            <input placeholder="size" id="newrecipe-size-input" type="text" value={size} onChange={this.sizeChange} />
          </div>
          <fieldset className="ingredients-fieldset">
            <legend>Ingredients</legend>
            <div className="new-ingredient-fields form-group">
              <label className="new-ing-field-left" htmlFor="newrecipe-ingredient-name-input">
                Ingredient Name
              </label>
              <label className="new-ing-field-right" htmlFor="newrecipe-ingredient-amount-input">
                Amount
              </label>
            </div>
            <div className="new-ingredient-fields form-group">
              <input className="new-ing-field-left" placeholder="name" id="newrecipe-ingredient-name-input" type="text" value={ingredients[ingredients.length - 1].name} onChange={this.ingNameChange} />
              <input className="new-ing-field-right" placeholder="amount" id="newrecipe-ingredient-amount-input" type="text" value={ingredients[ingredients.length - 1].amount} onChange={this.ingAmtChange} />
            </div>
          </fieldset>
          <div className="form-group">
            <label htmlFor="newrecipe-recipenotes-input">
              Notes
            </label>
            <input placeholder="notes" id="newrecipe-recipenotes-input" type="textarea" value={notes} onChange={this.notesChange} />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

NewRecipeForm.propTypes = {

};

NewRecipeForm.defaultProps = {

};


const mapStateToProps = state => state;

export default connect(mapStateToProps)(NewRecipeForm);
