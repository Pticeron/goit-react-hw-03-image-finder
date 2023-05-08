import propTypes from 'prop-types';
import css from './Message.module.css';

export const Message = ({ children }) => (
    <div className={css.Message}>{children}</div>
);

Message.defaultProps = {
    children: [],
};

Message.propTypes = {
    children: propTypes.node,
};