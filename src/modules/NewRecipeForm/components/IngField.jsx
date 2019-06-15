import React, { Component } from 'react';
import PropTypes from 'prop-types';
import x from '../../../assets/icons/x.svg';

class IngField extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAmtChange = this.handleAmtChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.removeFields = this.removeFields.bind(this);
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

  handleNotesChange(e) {
    e.preventDefault();
    const { onChange, ingId } = this.props;
    if (onChange) {
      onChange('notes', ingId, e.target.value);
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

  removeFields(e) {
    e.preventDefault();
    const { onRemoveSelected, ingId } = this.props;
    if (onRemoveSelected) {
      onRemoveSelected(ingId);
    }
  }

  render() {
    const {
      value,
      ingId,
      groupId,
    } = this.props;
    return (
      <div className="new-ing-fields form-group">
        <input
          placeholder="name"
          className="new-ing-field-left"
          id="nr-ing-name-input"
          type="text"
          value={value.name}
          onChange={this.handleNameChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <input
          placeholder="amount"
          className="new-ing-field-ctr"
          id="nr-ing-amount-input"
          type="text"
          value={value.amount}
          onChange={this.handleAmtChange}
        />
        <input
          placeholder="notes"
          className="new-ing-field-right"
          id="nr-ing-notes-input"
          type="text"
          value={value.notes}
          onChange={this.handleNotesChange}
        />
        {/* don't show 'remove ingredient' button for the
          * first ingredient of the first group */}
        {!(ingId === 0 && groupId === 1)
        && (
          <button
            type="button"
            onClick={this.removeFields}
            onKeyDown={this.removeFields}
          >
            <img className="close-icon" src={x} alt="close-button" />
          </button>
        )}
      </div>
    );
  }
}

IngField.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onRemoveSelected: PropTypes.func,
  value: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.string,
    notes: PropTypes.string,
  }),
  ingId: PropTypes.number,
  groupId: PropTypes.number,
};

IngField.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  onRemoveSelected: () => {},
  value: { name: '', amount: '', notes: '' },
  ingId: 0,
  groupId: 1,
};

export default IngField;
