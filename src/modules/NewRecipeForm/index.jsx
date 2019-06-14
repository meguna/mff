import React, { Component } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import Field from './components/Field';
import IngField from './components/IngField';
import IngGroup from './components/IngGroup';

const ING_FIELD_BLANK = {
  name: '',
  amount: '',
  notes: '',
  groupId: 1,
};

class NewRecipeForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);

    this.state = {
      name: '',
      size: '',
      ingredients: [{ ...ING_FIELD_BLANK }],
      notes: '',
    };
  }

  onFieldChange = (param, val) => {
    this.setState({ [param]: val });
  };


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
    console.log(this.state);

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
            labelClassName="required-field"
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
              <label className="new-ing-field-center" htmlFor="newrecipe-ingredient-amount-input">
                Amount
              </label>
              <label className="new-ing-field-right" htmlFor="newrecipe-ingredient-notes-input">
                Notes
              </label>
            </div>
            <IngGroup />
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
