import React, { Component } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import Field from './components/Field';
import IngField from './components/IngField';

class NewRecipeForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onIngFieldChange = this.onIngFieldChange.bind(this);
    this.addIngField = this.addIngField.bind(this);

    this.state = {
      name: '',
      size: '',
      ingredients: [{ name: '', amount: '' }],
      notes: '',
    };
  }

  onFieldChange = (param, val) => {
    this.setState({ [param]: val });
  };

  onIngFieldChange = (param, id, val) => {
    const { ingredients } = this.state;
    ingredients[id][param] = val;
    this.setState({ ingredients });
  };

/**
 * functions to add and remove ingredient fields automatically.
 * when a user focuses on the last field of the list, a new set appears
 * when a user blurs off the last field of the list, and there are two
 * rows of empty fields, the last row is removed.
 */

  addIngField = (id) => {
    const { ingredients } = this.state;
    if (id === ingredients.length - 1) {
      this.setState(prevState => ({
        ingredients: [...prevState.ingredients, { name: '', amount: '' }],
      }));
    }
  };

  removeEmptyIngField = (id) => {
    const { ingredients } = this.state;
    if (
      ingredients.length > 2
      && ingredients[id].name === ''
      && ingredients[id].amount === ''
    ) {
      this.setState((prevState) => {
        // prevState is only shallow copied by default,
        // so must be done manually to avoid getting empty `ingredients`
        const newState = JSON.parse(JSON.stringify(prevState));
        newState.ingredients.pop();
        return {
          ingredients: newState.ingredients,
        };
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
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

    const ingFields = [];
    for (let i = 0; i < ingredients.length; i++) {
      ingFields.push(
        (<IngField
          onChange={this.onIngFieldChange}
          value={ingredients[i]}
          ingId={i}
          key={i}
          onFocus={this.addIngField}
          onBlur={this.removeEmptyIngField}
        />),
      );
    }

    return (
      <div>
        <h1>Add a New Recipe!</h1>
        <form id="newrecipe-form" onSubmit={this.onSubmit} autoComplete="off">
          <Field
            onChange={this.onFieldChange}
            value={name}
            name="name"
            id="newrecipe-name-input"
          />
          <Field
            onChange={this.onFieldChange}
            value={size}
            name="size"
            id="newrecipe-size-input"
          />
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
            {ingFields}
          </fieldset>
          <Field
            onChange={this.onFieldChange}
            value={notes}
            name="notes"
            id="newrecipe-recipenotes-input"
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(NewRecipeForm);
