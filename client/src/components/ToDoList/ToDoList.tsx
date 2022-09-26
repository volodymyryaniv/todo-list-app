import { useRef, useEffect, FC } from 'react';
import { ToDoItemTypes } from '../../types';
import { useAppSelector } from '../../hooks/redux-hooks';
import { TodoListType } from '../../redux/slices/todoListSlice';
import { selectAll } from '../../redux/selectors/todolistSelectors';
import ToDoItem from '../ToDoItem';
import styles from './ToDoList.module.scss';

const ToDoList: FC<TodoListType> = (props) => {
  const { wrapper, container } = styles;
  const { list } = props;
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollBottom, scrollTop } = useAppSelector(selectAll);

  useEffect(() => {
    const current = listRef.current;
    current?.scrollTo(0, current.scrollHeight);
  }, [scrollBottom]);

  useEffect(() => {
    listRef.current?.scrollTo(0, 0);
  }, [scrollTop]);

  return (
    <section className={wrapper}>
      <div ref={listRef} className={container}>
        {list &&
          list.map((item: ToDoItemTypes) => {
            return <ToDoItem key={item.id} {...item} />;
          })}
      </div>
    </section>
  );
};

export default ToDoList;
