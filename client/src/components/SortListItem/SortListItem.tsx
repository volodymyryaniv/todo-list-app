import { useAppSelector } from '@hooks/redux-hooks';
import { selectAll } from '@selectors/todolistSelectors';
import { SortTypes } from '../../types';
import styles from './SortListItem.module.scss';

interface SortListItemProps {
  onSortHandler: (order: SortTypes) => void;
}

const SortListItem = (props: SortTypes & SortListItemProps) => {
  const {
    title,
    value,
    onSortHandler,
  } = props;
  const { item, active } = styles;

  const { title: activeCategory } = useAppSelector(selectAll).sortBy;
  const categoryStyles = title === activeCategory ? `${item} ${active}` : item;

  const onSetSortHandler = () => {
    onSortHandler({ title, value })
  };

  return (
    <li className={categoryStyles} onClick={onSetSortHandler}>
      {title}
    </li>
  );
}

export default SortListItem;
