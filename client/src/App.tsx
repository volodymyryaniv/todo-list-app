import { FC, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '@hooks/redux-hooks';
import {
  selectState,
  selectAllSortedList,
  selectActiveSortedList,
  selectCompletedSortedList,
  selectAll,
} from '@selectors/taskListSelectors';
import { validateInput } from '@services/inputValidation';
import Search from '@components/Search';
import CreatingTask from '@pages/CreatingTask';
import Navigation from '@pages/Navigation';
import Tasks from '@pages/Tasks';
import styles from './App.module.scss';

const App: FC = () => {
  const { wrapper, container, title } = styles;
  const { value } = useAppSelector(selectAll).sortBy;

  const [search, setSearch] = useState<string>('');
  const { isError, errorMessage, validationPatern } = validateInput(search);
  const searchValue = isError ? search.split(validationPatern)[0] : search;

  const state = useAppSelector(selectState);
  const list = selectAllSortedList(state, value);
  const listActive = useAppSelector(state => selectActiveSortedList(state, value));
  const listCompleted = selectCompletedSortedList(state, value);

  return (
    <div className={wrapper}>
      <div className={container}>
        <h1 className={title}>Todo</h1>
        <Search
          search={search}
          setSearch={setSearch}
          errorMessage={errorMessage}
          isError={isError}
        />
        <Routes>
          <Route path="/*" element={<CreatingTask />}>
            <Route
              index
              element={<Tasks list={list} searchValue={searchValue} />}
            />
            <Route
              path="active"
              element={<Tasks list={listActive} searchValue={searchValue} />}
            />
            <Route
              path="completed"
              element={
                <Tasks list={listCompleted} searchValue={searchValue} />
              }
            />
          </Route>
        </Routes>
        <Navigation />
      </div>
    </div>
  );
};

export default App;
