import React, { Component } from 'react';
import { toast } from 'react-hot-toast';
import { BiSearch } from 'react-icons/bi';
import propTypes from 'prop-types';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  onChangeInput = evt => {
    const query = evt.currentTarget.value;
    this.setState({ query: query });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      return Notiflix.Notify.warning(
        'Please enter key words for search.',
    
      );
    }
    this.props.onSubmit(this.state);
    this.setState({ query: '' });
  };


  resetForm = () => {
    this.setState({ search: '' });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form
          onSubmit={evt => {
            evt.preventDefault();

            if (!this.state.search) {
              return toast.error('Enter text for search.');
            }
            this.props.handleSubmit(this.state.search);
            this.resetForm();
          }}
          className={css.Form}
        >
          <button type="submit" className={css.Button}>
            <BiSearch size="20" />
          </button>

          <input
            value={this.state.search}
            onChange={this.onChangeInput} 
            className={css.Input}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus 
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = { onSubmit: propTypes.func };
