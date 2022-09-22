import { FC } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import ToDoItem from '../ToDoItem';
import styles from './ToDoList.module.scss';

const ToDoList: FC = () => {
  const list = useAppSelector(state => state.todoListReducer);
  return (
    <section className={styles.container}>
      {list && list.map((item) => {
        return (
          <ToDoItem key={item.id} {...item} />
        )
      })}
    </section>
  )
}

export default ToDoList;
