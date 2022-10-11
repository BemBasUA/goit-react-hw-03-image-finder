export const ImageGalleryItem = ({ data, onClick }) => {
  return data.map(image => {
    return (
      <li
        key={image.id}
        className="gallery-item"
        onClick={() => onClick(image.largeImageURL)}
      >
        <img src={image.webformatURL} alt={image.tags} />
      </li>
    );
  });
};
