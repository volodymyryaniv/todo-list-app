import { ChangeEvent } from 'react';
import { SetSearchTypes, withFormSimplePropTypes } from '../../types';
import clearIcon from '@assets/icons/clear.png';
import searchIcon from '@assets/icons/search.png';
import styles from './Search.module.scss';

const Search = (
  props: SetSearchTypes &
    Pick<withFormSimplePropTypes, 'errorMessage' | 'isError'>
) => {
  const { container, input, icon, clear, error } = styles;
  const { search, setSearch, isError, errorMessage } = props;

  const onClearSearch = (): void => {
    setSearch('');
  };

  const onSetSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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
      {isError && <p className={error}>{errorMessage}</p>}
      <img className={icon} src={searchIcon} alt="cross icon" />
      <img
        className={clear}
        src={clearIcon}
        alt="cross icon"
        onClick={onClearSearch}
      />
    </article>
  );
};

export default Search;
