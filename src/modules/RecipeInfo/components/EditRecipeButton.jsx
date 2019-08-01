import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Edit } from 'react-feather';

const EditRecipeButton = ({ id }) => (
  <div className="ri-top-buttons">
    <Link to={`/editRecipe/${id}`}>
      <Edit />
      &nbsp;Edit this Recipe
    </Link>
  </div>
);

EditRecipeButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default React.memo(EditRecipeButton);
