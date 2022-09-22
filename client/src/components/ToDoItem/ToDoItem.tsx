import { FC } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { setTodoStatus } from '../../redux/slices/todoListSlice';
import { ToDoItemTypes } from '../../types';
import { formatDisplayDate } from '../../services/formatDate';
import styles from './ToDoItem.module.scss';

const ToDoItem: FC<ToDoItemTypes> = (props) => {
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
      <article className={styles.details}>
        <div className={styles.dateBlock}>
          <h5 className={titleStyle}>Created</h5>
          <span className={dateStyle}>{formatedCreated}</span>
        </div>
        <div className={styles.dateBlock}>
          <h5 className={titleStyle}>Expiry</h5>
          <span className={dateStyle}>{formatedExpire}</span>
        </div>
      </article>
    </article>
  );
};

export default ToDoItem;
