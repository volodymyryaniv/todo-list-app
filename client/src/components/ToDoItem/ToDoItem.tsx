import { FC } from 'react';
import { ToDoItemTypes } from '../../types';
import { formatDisplayDate } from '../../services/formatDate';
import styles from './ToDoItem.module.scss';

const ToDoItem: FC<ToDoItemTypes> = (props) => {
  const { text, created, expireUntil } = props;

  const formatedCreated = formatDisplayDate(created);
  const formatedExpire = formatDisplayDate(expireUntil);

  return (
    <article className={styles.container}>
      <div className={styles.mainInfo}>
        <p className={styles.text}>{text}</p>
      </div>
      <div className={styles.details}>
        <span className={styles.date}>{formatedCreated}</span>
        <span className={styles.date}>{formatedExpire}</span>
      </div>
    </article>
  );
};

export default ToDoItem;
