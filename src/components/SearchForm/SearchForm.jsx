import propTypes from 'prop-types';
import css from './SearchForm.module.css';
import { SearchFrom } from '../SearchForm';

export const Searchbar = ({ onSearch }) => (
  <header className={css.Searchbar}>
    <SearchFrom onSearch={onSearch} />
  </header>
);

Searchbar.propTypes = {
  onSearch: propTypes.func.isRequired,
};