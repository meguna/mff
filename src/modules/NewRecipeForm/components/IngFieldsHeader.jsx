import React from 'react';

const IngFieldsHeader = () => (
  <div className="new-ing-fields form-group ing-field-labels">
    <label
      className="new-ing-field-left field-label"
      htmlFor="nr-ing-name-input"
    >
      Ingredient Name
    </label>
    <label
      className="new-ing-field-ctr field-label"
      htmlFor="nr-ing-amount-input"
    >
      Amount
    </label>
    <label
      className="new-ing-field-right field-label"
      htmlFor="nr-ing-notes-input"
    >
      Notes
    </label>
  </div>
);

export default IngFieldsHeader;
