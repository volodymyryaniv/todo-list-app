import { FC } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { setTodoStatus, removeTodo, setActiveTodo } from '../../redux/slices/todoListSlice';
import { ToDoItemTypes } from '../../types';
import { formatDisplayDate } from '../../services/formatDate';
import styles from './ToDoItem.module.scss';
import { setPopup } from '../../redux/slices/popupSlice';

const ToDoItem: FC<ToDoItemTypes> = (props) => {
  const {
    container,
    content,
    mainInfo,
    checkbox,
    details,
    dateBlock,
    buttonsBlock,
  } = styles;
  const { id, text, created, expireUntil, completed } = props;

  const dispatch = useAppDispatch();

  const formatClassNames = (
    status: ToDoItemTypes['completed'],
    name: string
  ): string => {
    return status ? `${styles[name]} ${styles.done}` : `${styles[name]}`;
  };

  const formatedCreated = formatDisplayDate(created);
  const formatedExpire = formatDisplayDate(expireUntil);

  const textStyle = formatClassNames(completed, 'text');
  const dateStyle = formatClassNames(completed, 'date');
  const titleStyle = formatClassNames(completed, 'title');

  const onSetStatusHandler = (id: ToDoItemTypes['id']) => {
    dispatch(setTodoStatus(id));
  };

  const onEditHandler = (id: ToDoItemTypes['id']) => {
    dispatch(setActiveTodo(id))
    dispatch(setPopup(true))
  }

  return (
    <article className={container}>
      <div className={content}>
        <div className={mainInfo}>
          <input
            className={checkbox}
            type="checkbox"
            checked={completed}
            onChange={() => onSetStatusHandler(id)}
          />
          <p className={textStyle}>{text}</p>
        </div>
        <article className={details}>
          <div className={dateBlock}>
            <h5 className={titleStyle}>Created</h5>
            <span className={dateStyle}>{formatedCreated}</span>
          </div>
          <div className={dateBlock}>
            <h5 className={titleStyle}>Expiry</h5>
            <span className={dateStyle}>{formatedExpire}</span>
          </div>
        </article>
      </div>
      <div className={buttonsBlock}>
        <img
          src="/icons/delete.svg"
          alt="delete icon"
          onClick={() => dispatch(removeTodo(id))}
        />
        <img
          src="/icons/edit.png"
          alt="delete icon"
          onClick={() => onEditHandler(id)}
        />
      </div>
    </article>
  );
};

export default ToDoItem;
