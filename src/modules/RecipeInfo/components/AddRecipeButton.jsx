import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'react-feather';

const AddRecipeButton = () => (
  <div className="ri-top-buttons">
    <Link to="/addRecipe">
      <Plus />
      &nbsp;Add a new recipe
    </Link>
  </div>
);

export default React.memo(AddRecipeButton);
