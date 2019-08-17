import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Trash2 } from 'react-feather';
import { useTranslation } from 'react-i18next';

const DeleteRecipeButton = ({ id }) => {
  const { t } = useTranslation();
  return (
    <div className="ri-top-buttons">
      <Link to={`/deleteRecipe/${id}`}>
        <Trash2 />
        &nbsp;
        {t('common:actions.delete')}
      </Link>
    </div>
  )
};

DeleteRecipeButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default React.memo(DeleteRecipeButton);
