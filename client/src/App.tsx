import { FC, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import SearchComponent from '../../modules/SearchComponent';
import {
  selectState,
  selectAllSortedList,
  selectActiveSortedList,
  selectCompletedSortedList,
  selectAll,
} from './redux/selectors/todolistSelectors';
import AddNewTodo from './pages/AddNewTodo';
import NavBar from './pages/NavBar';
import ToDoList from './pages/ToDoList';
import styles from './App.module.scss';

const App: FC = () => {
  const { wrapper, container, title } = styles;
  const { value } = useAppSelector(selectAll).sortBy;

  const [search, setSearch] = useState<string>('');

  const state = useAppSelector(selectState);
  const list = selectAllSortedList(state, value);
  const listActive = useAppSelector(state => selectActiveSortedList(state, value));
  const listCompleted = selectCompletedSortedList(state, value);

  return (
    <div className={wrapper}>
      <div className={container}>
        <h1 className={title}>Todo</h1>
        <SearchComponent search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/*" element={<AddNewTodo />}>
            <Route
              index
              element={<ToDoList list={list} searchValue={search} />}
            />
            <Route
              path="active"
              element={<ToDoList list={listActive} searchValue={search} />}
            />
            <Route
              path="completed"
              element={<ToDoList list={listCompleted} searchValue={search} />}
            />
          </Route>
        </Routes>
        <NavBar />
      </div>
    </div>
  );

};

export default App;
