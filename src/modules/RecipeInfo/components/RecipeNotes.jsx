import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const RecipeNotes = ({ notes }) => (
  <Fragment>
    {notes && <p className="recipe-info-label">notes</p>}
    <p className="recipe-info-notes">{notes}</p>
  </Fragment>
);

RecipeNotes.propTypes = {
  notes: PropTypes.string,
};

RecipeNotes.defaultProps = {
  notes: '',
};

export default React.memo(RecipeNotes);
