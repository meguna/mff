import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { X } from 'react-feather';
import { withTranslation } from 'react-i18next';
import { ING_FIELD_BLANK } from '../../common/initial';

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
      t,
      screen,
    } = this.props;

    return (
      <div className="new-ing-fields form-group">
        <input
          placeholder={t('common:recipeform.ingName')}
          className="new-ing-field-left field-label ing-field"
          id="nr-ing-name-input"
          type="text"
          value={value.name || ''}
          onFocus={this.handleFocus}
          onChange={this.handleNameChange}
        />
        <input
          placeholder={t('common:recipeform.ingAmt')}
          className="new-ing-field-ctr field-label ing-field"
          id="nr-ing-amount-input"
          type="text"
          value={value.amount || ''}
          onChange={this.handleAmtChange}
        />
        <input
          placeholder={t('common:recipeform.ingNotes')}
          className="new-ing-field-right field-label ing-field"
          id="nr-ing-notes-input"
          type="text"
          value={value.notes || ''}
          onChange={this.handleNotesChange}
          onBlur={this.handleBlur}
        />
        {/* don't show 'remove ingredient' button for the
          * first ingredient of the first group */}
        {!(ingId === 0 && groupId === 1)
        && (
          <button
            type="button"
            onClick={this.removeFields}
            onKeyDown={this.removeFields}
            tabIndex="-1"
          >
            {(screen !== 'mobile') && <X />}
            {(screen === 'mobile') && <p className="rem-ing-link">remove this ingredient</p>}
          </button>
        )}
      </div>
    );
  }
}

IngField.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onRemoveSelected: PropTypes.func.isRequired,
  screen: PropTypes.string.isRequired,
  value: PropTypes.object,
  ingId: PropTypes.number,
  groupId: PropTypes.number,
  t: PropTypes.func.isRequired,
};

IngField.defaultProps = {
  value: { ...ING_FIELD_BLANK },
  ingId: 0,
  groupId: 1,
};

export default withTranslation()(IngField);
