import propTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from  '../ImageGalleryItem/ImageGalleryItem';


export const ImageGallery = ({ images, onImageClick }) => (
  <ul className={css.ImageGallery}>
    {images.map(image => {
      return (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onImageClick={onImageClick}
        />
      );
    })}
  </ul>
);

ImageGallery.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
    }),
  ),
  onImageClick: propTypes.func.isRequired,
};