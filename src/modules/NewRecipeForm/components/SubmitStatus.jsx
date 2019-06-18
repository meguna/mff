import React from 'react';
import PropTypes from 'prop-types';
import { Check, AlertCircle } from 'react-feather';

const SubmitStatus = ({ status }) => {
  let statusMessage = '';
  let statusClass = '';
  if (status === 'success') {
    statusClass = 'notification-success';
    statusMessage = 'The recipe was added successfully!';
  } else if (status === 'fail') {
    statusClass = 'notification-fail';
    statusMessage = `Oops! There was an error adding your recipe.
      Please try again!`;
  }

  if (status !== '') {
    return (
      <div className={statusClass}>
        {status === 'success' && <Check />}
        {status === 'fail' && <AlertCircle />}
        {` ${statusMessage}`}
      </div>
    );
  }
  return null;
};

SubmitStatus.propTypes = {
  status: PropTypes.string,
};

SubmitStatus.defaultProps = {
  status: '',
};

export default SubmitStatus;
