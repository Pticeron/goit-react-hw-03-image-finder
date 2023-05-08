import React, { Component } from 'react';
import Notiflix from 'notiflix';
import css from './App.module.css';
import { fetchDataApi } from '../services/api';

import { Searchbar }  from  './Searchbar/Searchbar';
import { ImageGallery }  from './ImageGallery/ImageGallery';
import { LoadMore }  from './Button/Button';
import { PreLoader }  from './PreLoader/PreLoader';
import { Modal } from './Modal/Modal';


export class App extends Component {
  state = {
      gallery: [],
      searchQuery: '',
      page: 1,
      showLoader: false,
      showModal: false,
      largeImage: '',
      tags: '',
      total: 0,
      error: null,
    };

    componentDidMount() {
      this.setState({ showLoader: true });
      this.fetchGallary();
    }
  
    componentDidUpdate(prevProps, prevState) {
      const prevQuery = prevState.searchQuery;
      const naxtQuery = this.state.searchQuery;
      if (prevQuery !== naxtQuery) {
        this.fetchGallary();
      }
    }
  
    fetchGallary = () => {
      const { searchQuery, page } = this.state;
      this.setState({ showLoader: true });
  
      fetchDataApi(searchQuery, page)
        .then(({ hits, total }) => {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...hits],
            page: prevState.page + 1,
            total,
          }));
          this.scrollToDown();
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ showLoader: false }));
    };
  
    scrollToDown = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    };
  
    handleFormSubmit = searchQuery => {
      if (this.state.searchQuery === searchQuery) {
        return;
      }
      this.setState({ searchQuery, gallery: [], page: 1 });
    };
  
    toggleModal = () => {
      this.setState(prevState => ({
        showModal: !prevState.showModal,
      }));
    };
  
    handleOpenPicture = largeImage => {
      this.setState({ largeImage });
      this.toggleModal();
    };
  
    showLoadMore = () => {
      const { total, page } = this.state;
      return Math.ceil(total / 12) !== page - 1;
    };
  
    render() {
      const { error, showLoader, showModal, gallery, largeImage } = this.state;
      const showLoadMore = this.showLoadMore();
      return (
        <div className={css.container}>
          <Searchbar onSubmit={this.handleFormSubmit} />
  
          {error && <p>{error.message}</p>}
  
          {gallery.length > 0 && (
            <ImageGallery
              gallery={gallery}
              onOpenPicture={this.handleOpenPicture}
            />
          )}
  
          {showLoader && <PreLoader />}
  
          {gallery.length > 0 && !showLoader && showLoadMore && (
            <LoadMore onLoadMore={this.fetchGallary} />
          )}
  
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={largeImage.largeImageURL} alt={largeImage.tags} />
            </Modal>
          )}
        </div>
      );
    }
  }

// // state = {
//   images: [],
//   query: '',
//   page: 1,
//   isLoading: false,
//   showModal: false,
//   largeImage: '',
//   tags: '',
//   total: 0,
//   error: null,
// };
// const totalPage = total / images.length;
// {totalPage > 1 && !isLoading && images.length !== 0 && (
//         <Button onClick={this.onLoadMore} />
//       )}







