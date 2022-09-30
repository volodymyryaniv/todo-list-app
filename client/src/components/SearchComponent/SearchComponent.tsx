import { ChangeEvent } from 'react';
import { SetSearchTypes, withFormSimplePropTypes } from '../../types';
import styles from './SearchComponent.module.scss';

const SearchComponent = (
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
      <img className={icon} src="/icons/search.png" alt="cross icon" />
      <img
        className={clear}
        src="/icons/clear.png"
        alt="cross icon"
        onClick={onClearSearch}
      />
    </article>
  );
};

export default SearchComponent;
