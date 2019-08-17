import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const RecipeNotes = ({ notes }) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      {notes && <p className="recipe-info-label">{t('common:recipe.notes')}</p>}
      <p className="recipe-info-notes">{notes}</p>
    </Fragment>
  )
};

RecipeNotes.propTypes = {
  notes: PropTypes.string,
};

RecipeNotes.defaultProps = {
  notes: '',
};

export default React.memo(RecipeNotes);
