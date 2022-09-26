import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import {
  selectActive,
  selectCompleted,
  selectList,
} from '../../redux/selectors/todolistSelectors';
import AddNewTodo from '../AddNewTodo';
import NavBar from '../NavBar';
import ToDoList from '../ToDoList';
import styles from './App.module.scss';

const App: FC = () => {
  const { wrapper, container, title } = styles;
  const list = useAppSelector(selectList);
  const listActive = useAppSelector(selectActive);
  const listCompleted = useAppSelector(selectCompleted);

  return (
    <div className={wrapper}>
      <div className={container}>
        <h1 className={title}>Todo</h1>
        <Routes>
          <Route path="/*" element={<AddNewTodo />}>
            <Route index element={<ToDoList list={list} />} />
            <Route path="active" element={<ToDoList list={listActive} />} />
            <Route
              path="completed"
              element={<ToDoList list={listCompleted} />}
            />
          </Route>
        </Routes>
        <NavBar />
      </div>
    </div>
  );
};

export default App;
