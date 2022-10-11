export const ImageGalleryItem = ({ data }) => {
  return data.map(image => {
    return (
      <li key={image.id} className="gallery-item">
        <img src={image.webformatURL} alt={image.tags} />
      </li>
    );
  });
};
