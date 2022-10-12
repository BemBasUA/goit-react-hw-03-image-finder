import './ImageGallery.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ children }) => {
  return <ul className="ImageGallery">{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.node,
};
