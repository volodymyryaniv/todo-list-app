import { useRef, useEffect, FC, useState } from 'react';
import { ToDoItemTypes } from '../../types';
import { useAppSelector } from '../../hooks/redux-hooks';
import { TodoListType } from '../../redux/slices/todoListSlice';
import { selectAllScrolls } from '../../redux/selectors/scrollSelectors';
import ToDoItem from '../ToDoItem';
import styles from './ToDoList.module.scss';

const ToDoList: FC<TodoListType> = (props) => {
  const { wrapper, container } = styles;
  const { list } = props;
  const listRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<number | undefined>(0);
  const { scrollBottom, scrollTop, scrollToElem } = useAppSelector(selectAllScrolls);

  useEffect(() => {
    const current = listRef.current;
    current?.scrollTo(0, current.scrollHeight);
  }, [scrollBottom]);

  useEffect(() => {
    listRef.current?.scrollTo(0, 0);
  }, [scrollTop]);

  useEffect(() => {
    listRef.current?.scrollTo(0, position || 0);
  }, [scrollToElem]);

  return (
    <section className={wrapper}>
      <div ref={listRef} className={container}>
        {list &&
          list.map((item: ToDoItemTypes) => {
            return <ToDoItem key={item.id} {...item} setPosition={setPosition} />
          })}
      </div>
    </section>
  );
};

export default ToDoList;
