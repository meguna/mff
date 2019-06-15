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
    this.onIngFieldChange = this.onIngFieldChange.bind(this);
    this.addIngField = this.addIngField.bind(this);

    this.state = {
      ingredients: [{ ...ING_FIELD_BLANK, groupId: props.groupId }],
    };
  }

  onIngFieldChange = (param, id, val) => {
    const { ingredients } = this.state;
    const { onIngGroupUpdate, groupId } = this.props;
    ingredients[id][param] = val;
    this.setState({ ingredients });
    if (onIngGroupUpdate) {
      onIngGroupUpdate(ingredients, groupId);
    }
  };

/**
 * functions to add and remove ingredient fields automatically.
 * when a user focuses on the last field of the list, a new set appears
 * when a user blurs off the last field of the list, and there are two
 * rows of empty fields, the last row is removed.
 */

  addIngField = (id) => {
    const { ingredients } = this.state;
    const { groupId } = this.props;
    if (id === ingredients.length - 1) {
      this.setState(prevState => ({
        ingredients: [...prevState.ingredients, { ...ING_FIELD_BLANK, groupId }],
      }));
    }
  };

  removeEmptyIngField = (id) => {
    const { ingredients } = this.state;
    if (
      ingredients.length > 1
      && ingredients[id].name === ''
      && ingredients[id].amount === ''
      && ingredients[id].notes === ''
    ) {
      this.setState((prevState) => {
        // prevState is only shallow copied by default,
        // so must be done manually to avoid getting empty `ingredients`
        const newIng = [...prevState.ingredients];
        newIng.pop();
        return {
          ingredients: newIng,
        };
      });
    }
  };

  removeSelectedIngField = (id) => {
    const { onIngGroupUpdate, groupId } = this.props;
    this.setState((prevState) => {
      const newIng = [...prevState.ingredients];
      newIng.splice(id, 1);
      return {
        ingredients: newIng,
      };
    }, () => {
      if (onIngGroupUpdate) {
        const { ingredients } = this.state;
        onIngGroupUpdate(ingredients, groupId);
      }
    });
  };

  render() {
    const {
      ingredients,
    } = this.state;
    const { groupId } = this.props;

    const ingFields = [];
    for (let i = 0; i < ingredients.length; i++) {
      ingFields.push(
        (<IngField
          onChange={this.onIngFieldChange}
          value={ingredients[i]}
          ingId={i}
          groupId={groupId}
          key={i}
          onFocus={this.addIngField}
          onBlur={this.removeEmptyIngField}
          onRemoveSelected={this.removeSelectedIngField}
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
  groupId: PropTypes.number,
  onIngGroupUpdate: PropTypes.func,
};

IngGroup.defaultProps = {
  groupId: 1,
  onIngGroupUpdate: () => {},
};

export default IngGroup;
