import { FC } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import ToDoItem from '../ToDoItem';
import { ToDoItemTypes } from '../../types';
import styles from './ToDoList.module.scss';

const ToDoList: FC = () => {
  const { container } = styles;
  const list = useAppSelector((state) => state.todoListReducer.list);

  return (
    <section className={container}>
      {list &&
        list.map((item: ToDoItemTypes) => {
          return <ToDoItem key={item.id} {...item} />;
        })}
    </section>
  );
};

export default ToDoList;
