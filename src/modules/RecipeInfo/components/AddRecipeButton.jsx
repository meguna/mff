import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'react-feather';
import { useTranslation } from 'react-i18next';

const AddRecipeButton = () => {
  const { t } = useTranslation();
  return (
    <div className="ri-top-buttons">
      <Link to="/addRecipe">
        <Plus />
        &nbsp;
        {t('common:actions.add')}
      </Link>
    </div>
  )
};

export default React.memo(AddRecipeButton);
