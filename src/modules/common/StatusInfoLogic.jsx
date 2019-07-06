import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Check, AlertCircle, Edit3 } from 'react-feather';

class StatusInfo extends Component {
  render() {
    const { status, message, hiddenClass } = this.props;

    let statusClass = '';
    if (status === 'success') {
      statusClass = 'notification-green';
    } else if (status === 'fail') {
      statusClass = 'notification-yellow';
    } else if (status === 'warn') {
      statusClass = 'notification-yellow';
    }

    return (
      <Fragment>
        {(status !== '') && (
          <div className={`notification ${statusClass} ${hiddenClass}`}>
            {status === 'success' && <Check />}
            {(status === 'fail' || status === 'warn') && <AlertCircle />}
            {status === 'load' && <Edit3 />}
            {` ${message}`}
          </div>
        )}
      </Fragment>
    );
  }
}

StatusInfo.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string,
  hiddenClass: PropTypes.string.isRequired,
};

StatusInfo.defaultProps = {
  status: '',
  message: '',
};

export default StatusInfo;
