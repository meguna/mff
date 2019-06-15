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
      labelClassName,
      value,
      id,
      textarea,
    } = this.props;

    const TagType = (textarea !== 'notes') ? 'input' : 'textarea';

    return (
      <div className="form-group">
        <label htmlFor={id} className={labelClassName}>
          {name}
        </label>
        <TagType
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
  labelClassName: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  textarea: PropTypes.bool,
};

Field.defaultProps = {
  onChange: () => {},
  className: '',
  labelClassName: '',
  value: '',
  id: '',
  name: '',
  textarea: false,
};

export default Field;
