import React from 'react';
import { Link } from 'react-router-dom';

const AddRecipeButton = () => (
  <div className="add-recipe-button">
    <Link to="/addRecipe">
      Add a new recipe
    </Link>
  </div>
);

export default React.memo(AddRecipeButton);
