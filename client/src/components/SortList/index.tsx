import { useEffect, useRef, useState } from 'react';
import { categories } from 'config/sortByList';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { selectAll } from '@redux/selectors/taskListSelectors';
import { setSortBy } from '@slices/taskListSlice';
import { SortTypes } from '../../types';
import SortListItem from '../SortListItem';
import sortIcon from '@assets/icons/sort.png';
import styles from './SortList.module.scss';

const SortList = () => {
  const { wrapper, container, icon } = styles;

  const ref = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();
  const { title } = useAppSelector(selectAll).sortBy;
  const [showSort, setShowSort] = useState<boolean>(false);

  const closeSortList = (e: MouseEvent) => {
    const path = e.composedPath();
    if (ref.current) {
      if (!path.includes(ref.current)) {
        setShowSort(false);
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', closeSortList);
    return () => document.body.removeEventListener('click', closeSortList);
  }, []);

  const onSortHandler = (category: SortTypes) => {
    dispatch(setSortBy(category));
    setShowSort(false);
  };

  const onShowSortHandler = () => {
    setShowSort((prev) => !prev)
  };

  return (
    <section ref={ref} className={wrapper}>
      <div>
        <p>{title}:</p>
        <img
          className={icon}
          src={sortIcon}
          alt="sort icon"
          onClick={onShowSortHandler}
        />
      </div>
      {showSort && (
        <ul className={container}>
          {categories.map((category) => (
            <SortListItem
              key={category.value}
              {...category}
              onSortHandler={onSortHandler}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default SortList;
