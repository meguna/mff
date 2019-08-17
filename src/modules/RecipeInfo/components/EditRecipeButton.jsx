import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Edit } from 'react-feather';
import { useTranslation } from 'react-i18next';

const EditRecipeButton = ({ id }) => {
  const { t } = useTranslation();
  return (
    <div className="ri-top-buttons">
      <Link to={`/editRecipe/${id}`}>
        <Edit />
        &nbsp;
        {t('common:actions.edit')}
      </Link>
    </div>
  )
};

EditRecipeButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default React.memo(EditRecipeButton);
