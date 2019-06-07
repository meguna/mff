import React from 'react';
import PropTypes from 'prop-types';

const RecipeNotes = ({ notes }) => (
  <div>
    <p className="recipe-info-label">notes</p>
    <p className="recipe-info-notes">{notes}</p>
  </div>
);

RecipeNotes.propTypes = {
  notes: PropTypes.string,
};

RecipeNotes.defaultProps = {
  notes: '',
};

export default RecipeNotes;
