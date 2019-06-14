import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IngField from './IngField';

const ING_FIELD_BLANK = {
  name: '',
  amount: '',
  notes: '',
  groupId: 1,
};

class IngGroup extends Component {
  constructor(props) {
    super(props);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onIngFieldChange = this.onIngFieldChange.bind(this);
    this.addIngField = this.addIngField.bind(this);

    this.state = {
      ingredients: [{ ...ING_FIELD_BLANK }],
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
        ingredients: [...prevState.ingredients, { ...ING_FIELD_BLANK }],
      }));
    }
  };

  removeEmptyIngField = (id) => {
    const { ingredients } = this.state;
    if (
      ingredients.length > 2
      && ingredients[id].name === ''
      && ingredients[id].amount === ''
      && ingredients[id].notes === ''
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

  render() {
    console.log(this.state);

    const {
      ingredients,
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
      <div className="ingredient-group">
        {ingFields}
      </div>
    );
  }
}


IngGroup.propTypes = {
  value: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.string,
    notes: PropTypes.string,
  }),
};

IngGroup.defaultProps = {
  value: { name: '', amount: '' },
  ingId: 0,
};

export default IngGroup;
