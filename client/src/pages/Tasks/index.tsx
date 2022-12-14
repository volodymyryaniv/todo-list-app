import { useRef, useEffect, FC, useState, useDeferredValue, useMemo } from 'react';
import { TaskCardTypes } from '../../types';
import { useAppSelector } from '@hooks/redux-hooks';
import { TaskListType } from '@slices/taskListSlice';
import { selectAllScrolls } from '@selectors/scrollSelectors';
import { filterList } from '@services/filterList';
import TaskCard from '../TaskCard';
import styles from './Tasks.module.scss';

interface SearchStrType {
  searchValue: string;
}

const Tasks: FC<TaskListType & SearchStrType> = (props) => {
  const { wrapper, container, fallback } = styles;
  const { list, searchValue } = props;
  const defferedSearchValue = useDeferredValue(searchValue);

  const listRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<number>(0);
  const { scrollBottom, scrollTop, scrollToElem } = useAppSelector(selectAllScrolls);

  const filteredMemoList = useMemo(() => {
    return filterList(list, defferedSearchValue);
  }, [defferedSearchValue, list]);

  useEffect(() => {
    const current = listRef.current;
    current?.scrollTo(0, current?.scrollHeight);
  }, [scrollBottom]);

  useEffect(() => {
    listRef.current?.scrollTo(0, 0);
  }, [scrollTop]);

  useEffect(() => {
    listRef.current?.scrollTo(0, position);
  }, [scrollToElem]);

  return (
    <section className={wrapper}>
      <div ref={listRef} className={container}>
        {list.length ? (
          filteredMemoList.map((item: TaskCardTypes) => {
            return <TaskCard key={item.id} {...item} setPosition={setPosition} />;
          })
        ) : (
          <div className={fallback}>
            <h3>Add your first task here</h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default Tasks;
