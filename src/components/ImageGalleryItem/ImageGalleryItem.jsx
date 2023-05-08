
import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ picture, onOpenPicture }) => {
  
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => {
        onOpenPicture(picture);
      }}
    >
      <img src={picture.webformatURL} alt={picture.tags} className={css.ImageGalleryItemImage} />
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