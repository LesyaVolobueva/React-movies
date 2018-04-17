import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { onClick, children, disabled, className } = props;

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      type='text'
    >{children}</button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
