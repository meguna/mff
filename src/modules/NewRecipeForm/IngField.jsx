import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IngField extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAmtChange = this.handleAmtChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleNameChange(e) {
    e.preventDefault();
    const { onChange, ingId } = this.props;
    if (onChange) {
      onChange('name', ingId, e.target.value);
    }
  }


  handleAmtChange(e) {
    e.preventDefault();
    const { onChange, ingId } = this.props;
    if (onChange) {
      onChange('amount', ingId, e.target.value);
    }
  }

  handleFocus(e) {
    e.preventDefault();
    const { onFocus, ingId } = this.props;
    if (onFocus) {
      onFocus(ingId);
    }
  }

  handleBlur(e) {
    e.preventDefault();
    const { onBlur, ingId } = this.props;
    if (onBlur) {
      onBlur(ingId);
    }
  }

  render() {
    const {
      value,
      ingId,
    } = this.props;
    return (
      <div className="new-ingredient-fields form-group">
        <input
          placeholder="name"
          className="new-ing-field-left"
          id="newrecipe-ingredient-name-input"
          type="text"
          value={value.name}
          onChange={this.handleNameChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <input
          placeholder="amount"
          className="new-ing-field-right"
          id="newrecipe-ingredient-amount-input"
          type="text"
          value={value.amount}
          onChange={this.handleAmtChange}
        />
      </div>
    );
  }
}


IngField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  ingId: PropTypes.number,
};

IngField.defaultProps = {
  onChange: () => {},
  value: '',
  ingId: 0,
};

export default IngField;
