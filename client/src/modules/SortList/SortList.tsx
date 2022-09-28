import { useEffect, useRef, useState } from 'react';
import { categories } from '../../assets/sortByList';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { selectAll } from '../../redux/selectors/todolistSelectors';
import { setSortBy } from '../../redux/slices/todoListSlice';
import { SortTypes } from '../../types';
import styles from './SortList.module.scss';

const SortList = () => {
  const { wrapper, container, item, active, icon } = styles;

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

  return (
    <section ref={ref} className={wrapper}>
      <div>
        <p>{title}:</p>
        <img
          className={icon}
          src="/icons/sort.png"
          alt="sort icon"
          onClick={() => setShowSort((prev) => !prev)}
        />
      </div>
      {showSort && (
        <ul className={container}>
          {categories.map((category) => (
            <li
              className={category.title === title ? `${item} ${active}` : item}
              key={category.value}
              onClick={() => onSortHandler(category)}
            >
              {category.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SortList;
