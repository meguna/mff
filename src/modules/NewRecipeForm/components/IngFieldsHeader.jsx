import React from 'react';

const IngFieldsHeader = () => (
  <div className="new-ing-fields form-group ing-field-labels">
    <label className="new-ing-field-left" htmlFor="nr-ing-name-input">
      Ingredient Name
    </label>
    <label className="new-ing-field-ctr" htmlFor="nr-ing-amount-input">
      Amount
    </label>
    <label className="new-ing-field-right" htmlFor="nr-ing-notes-input">
      Notes
    </label>
  </div>
);

export default IngFieldsHeader;