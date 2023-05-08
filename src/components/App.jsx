import React, { Component } from 'react';
import Notiflix from 'notiflix';

import { fetchData, notifySettings } from './fetch';

import { Searchbar }  from  './Searchbar/Searchbar';
import { ImageGallery }  from './ImageGallery/ImageGallery';
import { Button }  from './Button/Button';
import { Loader }  from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Message } from './Message/Message';


export class App extends Component {
  state = {
      images: [],
      searchQuery: '',
      currentPage: 1,
      isLoading: false,
      showModal: false,
      largeImage: '',
      tags: '',
      total: 0,
      error: null,
    };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.getImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      images: [],
      currentPage: 1,
      searchQuery: query,
      error: null,
    });
  };


  getImages = async () => {
    const { currentPage, searchQuery } = this.state;

    this.setState({
      isLoading: true,
    });

    try {
      const { hits } = await fetchData(searchQuery, currentPage);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        currentPage: prevState.currentPage + 1,
      }));

      if (currentPage !== 1) {
        this.scrollOnLoadButton();
      }
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure(
        'Sorry, something went wrong, please try again later',
        notifySettings
      );
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };


  handleGalleryItem = fullImageUrl => {
    this.setState({
      largeImage: fullImageUrl,
      showModal: true,
    });
  };


  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImage: '',
    }));
  };


  scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
          const { images, isLoading, showModal, largeImage, error } = this.state;
          const needToShowLoadMore = images.length > 0 && images.length >= 12; // Нужны доп проверки;
      
          return (
            <>
              <Searchbar onSearch={this.onChangeQuery} />
      
              {images.length < 1 && (
                <Message>
                  <h2>The gallery is empty 🙁</h2>
                  <p>Use search field!</p>
                </Message>
              )}
      
              <ImageGallery images={images} onImageClick={this.handleGalleryItem} />
      
              {needToShowLoadMore && <Button onClick={this.getImages} />}
      
              {showModal && (
                <Modal onClose={this.toggleModal}>
                    <img src={largeImage} alt="" className="Modal-image" />
                </Modal>
              )}
      
              {isLoading && <Loader />}
      
              {error && (
                <Message>
                  <h2>Oops! 😫</h2>
                  <p>
                    Sorry, something went wrong. Please try again, or{' '}
                    <a href="/">refresh the page</a>.
                  </p>
                </Message>
              )}
      </>
    );
  }
}


//   handleSubmit = async e => {
//     e.preventDefault();
//     this.setState({ isLoading: true });
//     const inputForSearch = e.target.elements.inputForSearch;
//     if (inputForSearch.value.trim() === '') {
//       return;
//     }
//     const response = await fetchImages(inputForSearch.value, 1);
//     this.setState({
//       images: response,
//       isLoading: false,
//       currentSearch: inputForSearch.value,
//       pageNr: 1,
//     });
//   };

//   handleClickMore = async () => {
//     const response = await fetchImages(
//       this.state.currentSearch,
//       this.state.pageNr + 1
//     );
//     this.setState({
//       images: [...this.state.images, ...response],
//       pageNr: this.state.pageNr + 1,
//     });
//   };

//   handleImageClick = e => {
//     this.setState({
//       modalOpen: true,
//       modalAlt: e.target.alt,
//       modalImg: e.target.name,
//     });
//   };

//   handleModalClose = () => {
//     this.setState({
//       modalOpen: false,
//       modalImg: '',
//       modalAlt: '',
//     });
//   };

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.handleModalClose();
//     }
//   };

//   async componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
  
//   render() {
//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr',
//           gridGap: '16px',
//           paddingBottom: '24px',
//         }}
//       >
//         {this.state.isLoading ? (
//           <Loader />
//         ) : (
//           <React.Fragment>
//             <Searchbar onSubmit={this.handleSubmit} />
//               <ImageGallery
//               onImageClick={this.handleImageClick}
//               images={this.state.images}
//             />
//             {this.state.images.length > 0 ? (
//               <Button onClick={this.handleClickMore} />
//             ) : null}
//           </React.Fragment>
//         )}
//         {this.state.modalOpen ? (
//           <Modal
//             src={this.state.modalImg}
//             alt={this.state.modalAlt}
//             handleClose={this.handleModalClose}
//           />
//         ) : null}
//       </div>
//     );
//   }
// }

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







