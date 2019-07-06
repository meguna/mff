import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Check, AlertCircle, Edit3 } from 'react-feather';

class StatusInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
    };
  }

  componentDidMount() {
    const { decay } = this.props;
    if (decay) {
      this.timeout = setTimeout(() => {
        this.setState({ isHidden: true });
      }, 10000);
    }
  }

  componentWillUnmount() {
    const { decay } = this.props;
    if (decay) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    const { status, message } = this.props;
    const { isHidden } = this.state;

    let statusClass = '';
    const hiddenClass = isHidden ? 'hidden' : 'not-hidden';

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
  decay: PropTypes.bool,
};

StatusInfo.defaultProps = {
  status: '',
  message: '',
  decay: true,
};

export default StatusInfo;
