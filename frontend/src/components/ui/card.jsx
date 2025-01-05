// frontend/src/components/ui/card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Card = ({ children, className, ...props }) => {
  return (
    <div className={classNames('bg-white shadow rounded-lg', className)} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={classNames('p-4', className)} {...props}>
      {children}
    </div>
  );
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div className={classNames('p-4 border-b border-gray-200', className)} {...props}>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h2 className={classNames('text-lg font-semibold', className)} {...props}>
      {children}
    </h2>
  );
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};