import Loader from 'react-loader-spinner';
import css from './PreLoader.module.css';

export function Preloader() {
    return (
      <div className={css.loader}>
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      </div>
    );
  }