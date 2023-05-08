import propTypes from 'prop-types';
import css from './Button.module.css';

export function LoadMore({ onLoadMore }) {
  return (
    <div className="wrapper">
      <button className={css.button} type="button" onClick={onLoadMore}>
        Load More
      </button>
    </div>
  );
}

LoadMore.propTypes = {
  onLoadMore: propTypes.func,
};
