import React from 'react';
import { ToDoItemTypes } from '../../types';
import styles from './ToDoItem.module.scss';

const ToDoItem: React.FC<ToDoItemTypes> = ({ text, created, expireUntil }) => {
  const formatDate = (date: string) => {
    const arr = date.split('T');
    const newDate = arr[0].split('-').reverse().join('.');
    const newTime = arr.at(-1)?.slice(0, 5);
    return `${newDate} ${newTime}`;
  };

  const formatedCreated = formatDate(created);
  const formatedExpire = formatDate(expireUntil);

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
