import React from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { setTodoStatus } from '../../redux/slices/todoListSlice';
import { ToDoItemTypes } from '../../types';
import styles from './ToDoItem.module.scss';

const ToDoItem: React.FC<ToDoItemTypes> = ({
  id,
  text,
  created,
  expireUntil,
  completed,
}) => {
  const dispatch = useAppDispatch();

  const formatDate = (date: string): string => {
    const arr = date.split('T');
    const newDate = arr[0].split('-').reverse().join('.');
    const newTime = arr.at(-1)?.slice(0, 5);
    return `${newDate} ${newTime}`;
  };

  const formatClassNames = (
    status: ToDoItemTypes['completed'],
    name: string
  ): string => {
    return status ? `${styles[name]} ${styles.done}` : `${styles[name]}`;
  };

  const formatedCreated = formatDate(created);
  const formatedExpire = formatDate(expireUntil);

  const textStyle = formatClassNames(completed, 'text');
  const dateStyle = formatClassNames(completed, 'date');

  const onSetStatusHandler = (id: ToDoItemTypes['id']) => {
    dispatch(setTodoStatus(id));
  };

  return (
    <article className={styles.container}>
      <div className={styles.mainInfo}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={completed}
          onChange={() => onSetStatusHandler(id)}
        />
        <p className={textStyle}>{text}</p>
      </div>
      <div className={styles.details}>
        <span className={dateStyle}>{formatedCreated}</span>
        <span className={dateStyle}>{formatedExpire}</span>
      </div>
    </article>
  );
};

export default ToDoItem;
