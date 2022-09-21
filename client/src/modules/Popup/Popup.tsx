import React from 'react';
import ReactDOM from 'react-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { setPopup } from '../../redux/slices/popupSlice';
import styles from './Popup.module.scss';

interface ModalProps {
  children?: React.ReactNode;
}

const Popup = ({ children }: ModalProps) => {
  const el = React.useRef(document.createElement('div'));
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const element = el.current;
    document.body.appendChild(element);
    return () => void document.body.removeChild(element);
  }, []);

  return ReactDOM.createPortal(
    <section
      className={styles.wrapper}
      onClick={() => dispatch(setPopup(false))}
    >
      <article
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          className={styles.button}
          onClick={() => dispatch(setPopup(false))}
        >
          Cancel
        </button>
      </article>
    </section>,
    el.current
  );
};


export default Popup;
