import { ChangeEvent } from 'react';
import { SetSearchTypes } from '../../types';
import styles from './SearchComponent.module.scss';

export default function SearchComponent(props: SetSearchTypes) {
  const { container, input, icon, clear } = styles;
  const { search, setSearch } = props;

  const onClearSearch = (): void => {
    setSearch('');
  }

  const onSetSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  };

  return (
    <article className={container}>
      <input
        className={input}
        type="text"
        placeholder="Search task"
        value={search}
        onChange={onSetSearchHandler}
      />
      <img
        className={icon}
        src="/icons/search.png"
        alt="cross icon"
      />
      <img
        className={clear}
        src="/icons/clear.png"
        alt="cross icon"
        onClick={onClearSearch}
      />
    </article>
  )
}
