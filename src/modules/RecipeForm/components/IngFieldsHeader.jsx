import React from 'react';
import { useTranslation } from 'react-i18next';

const IngFieldsHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="new-ing-fields form-group ing-field-labels">
      <label
        className="new-ing-field-left field-label"
        htmlFor="nr-ing-name-input"
      >
        {t('common:recipeform.ingName')}
      </label>
      <label
        className="new-ing-field-ctr field-label"
        htmlFor="nr-ing-amount-input"
      >
        {t('common:recipeform.ingAmt')}
      </label>
      <label
        className="new-ing-field-right field-label"
        htmlFor="nr-ing-notes-input"
      >
        {t('common:recipeform.ingNotes')}
      </label>
    </div>
  );
};

export default IngFieldsHeader;
