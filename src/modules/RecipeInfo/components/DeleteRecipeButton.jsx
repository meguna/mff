import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Trash2 } from 'react-feather';

const DeleteRecipeButton = ({ id }) => (
  <div className="ri-top-buttons">
    <Link to={`/deleteRecipe/${id}`}>
      <Trash2 />
      &nbsp;Delete this Recipe
    </Link>
  </div>
);

DeleteRecipeButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default React.memo(DeleteRecipeButton);
