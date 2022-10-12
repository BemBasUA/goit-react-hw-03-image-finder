import './ImageGalleryItem.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ data, onClick }) => {
  return data.map(image => {
    return (
      <li
        key={image.id}
        className="ImageGalleryItem"
        onClick={() => onClick(image.largeImageURL)}
      >
        <img
          src={image.webformatURL}
          alt={image.tags}
          className="ImageGalleryItem-image"
        />
      </li>
    );
  });
};

ImageGalleryItem.propTypes = {
  data: PropTypes.array.isRequired,
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
