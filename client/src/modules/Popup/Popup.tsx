import { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { removeActiveTodo } from '../../redux/slices/todoListSlice';
import { setPopup } from '../../redux/slices/popupSlice';
import styles from './Popup.module.scss';

interface ModalProps {
  children?: React.ReactNode;
}

const Popup = ({ children }: ModalProps) => {
  const { wrapper, container, button } = styles;
  const el = useRef(document.createElement('div'));
  const currentItem = useAppSelector(state => state.todoListReducer.activeItem);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const element = el.current;
    document.body.appendChild(element);
    return () => void document.body.removeChild(element);
  }, []);

  useEffect(() => {
    const closePopup = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(setPopup(false));
        if (currentItem) {
          dispatch(removeActiveTodo())
        }
      }
    }
    window.addEventListener('keydown', closePopup)
    return () => window.removeEventListener('keydown', closePopup);
  });

  const onClosePopupHandler = () => {
    dispatch(setPopup(false));
    dispatch(removeActiveTodo())
  }

  return ReactDOM.createPortal(
    <section
      className={wrapper}
      onClick={onClosePopupHandler}
    >
      <article
        className={container}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          className={button}
          onClick={onClosePopupHandler}
        >
          Cancel
        </button>
      </article>
    </section>,
    el.current
  );
};

export default Popup;
