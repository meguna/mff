import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import StatusInfoLogic from './StatusInfoLogic';

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

    const hiddenClass = isHidden ? 'hidden' : 'not-hidden';

    return (
      <Fragment>
        {!isHidden && (
          <StatusInfoLogic status={status} message={message} hiddenClass={hiddenClass} />
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
