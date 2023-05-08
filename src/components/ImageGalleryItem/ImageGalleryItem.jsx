
import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onImageClick }) => {
  const fullImage = () => onImageClick(image.largeImageURL);

  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={css.ImageGalleryItemImage}
        onClick={fullImage}
      />
    </li>
  );
};

ImageGalleryItem.defaultProps = {
  tags: '',
};

ImageGalleryItem.propTypes = {
  image: propTypes.shape({
    webformatURL: propTypes.string.isRequired,
    largeImageURL: propTypes.string.isRequired,
    tags: propTypes.string,
  }),
  onImageClick: propTypes.func.isRequired,
};