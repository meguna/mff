import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Field extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, onChange } = this.props;
    if (onChange) {
      onChange(name, e.target.value);
    }
  }

  render() {
    const {
      name,
      className,
      value,
      id,
    } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={id}>
          {name}
        </label>
        <input
          placeholder={name}
          className={className}
          id={id}
          type="text"
          value={value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}


Field.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

Field.defaultProps = {
  onChange: () => {},
  className: '',
  value: '',
  id: '',
  name: '',
};

export default Field;
