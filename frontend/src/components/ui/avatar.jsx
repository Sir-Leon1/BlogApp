import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Avatar = ({ className, children, ...props }) => {
  return (
    <div className={classNames('relative inline-block', className)} {...props}>
      {children}
    </div>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export const AvatarImage = ({ src, alt, className, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={classNames('rounded-full object-cover', className)}
      {...props}
    />
  );
};

AvatarImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export const AvatarFallback = ({ children, className, ...props }) => {
  return (
    <div
      className={classNames('flex items-center justify-center rounded-full bg-gray-200 text-gray-700', className)}
      {...props}
    >
      {children}
    </div>
  );
};

AvatarFallback.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Avatar;