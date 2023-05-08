import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';
import propTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);
    }
  
    componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  
    handleKeyDown = event => {
      if (event.code === 'Escape') {
        this.props.onClose();
      }
    };
  
    handleOverlayClick = event => {
      if (event.currentTarget === event.target) {
        this.props.onClose();
      }
    };
  
    render() {
      return createPortal(
        <div className={css.Overlay} onClick={this.handleOverlayClick}>
          <div className={css.Modal}>{this.props.children}</div>
        </div>,
        modalRoot,
      );
    }
  }
  
  Modal.defaultProps = {
    children: null,
  };
  
  Modal.propTypes = {
    children: propTypes.node,
    onClose: propTypes.func.isRequired,
  };
  