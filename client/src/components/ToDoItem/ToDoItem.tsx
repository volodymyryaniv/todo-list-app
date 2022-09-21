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
      <article className={styles.details}>
        <div className={styles.dateBlock}>
          <h5 className={styles.title}>Created</h5>
          <span className={styles.date}>{formatedCreated}</span>
        </div>
        <div className={styles.dateBlock}>
          <h5 className={styles.title}>Expiry</h5>
          <span className={styles.date}>{formatedExpire}</span>
        </div>
      </article>
    </article>
  );
};

export default ToDoItem;
