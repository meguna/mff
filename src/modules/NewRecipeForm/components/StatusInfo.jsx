import React from 'react';
import PropTypes from 'prop-types';
import { Check, AlertCircle, Edit3 } from 'react-feather';

const StatusInfo = (
  {
    status,
    successMessage,
    failMessage,
    loadMessage,
    dynamicMessage,
    warnMessage,
  }
) => {
  let statusMessage = '';
  let statusClass = '';

  if (status === 'success') {
    statusClass = 'notification-success';
    statusMessage = successMessage;
  } else if (status === 'fail') {
    statusClass = 'notification-fail';
    statusMessage = failMessage;
  } else if (status === 'load') {
    statusClass = 'notification-fail';
    statusMessage = loadMessage;
  } else if (status === 'warn') {
    statusClass = 'notification-fail';
    statusMessage = warnMessage;
  }

  if (dynamicMessage) {
    statusMessage = dynamicMessage;
  }

  if (status !== '') {
    return (
      <div className={statusClass}>
        {status === 'success' && <Check />}
        {status === 'fail' && <AlertCircle />}
        {status === 'load' && <Edit3 />}
        {` ${statusMessage}`}
      </div>
    );
  }
  return null;
};

StatusInfo.propTypes = {
  status: PropTypes.string,
  successMessage: PropTypes.string,
  failMessage: PropTypes.string,
  loadMessage: PropTypes.string,
  warnMessage: PropTypes.string,
  dynamicMessage: PropTypes.string,
};

StatusInfo.defaultProps = {
  status: '',
  successMessage: '',
  failMessage: '',
  loadMessage: '',
  warnMessage: '',
  dynamicMessage: '',
};

export default StatusInfo;
