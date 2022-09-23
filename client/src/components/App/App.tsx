import { FC } from 'react';
import AddNewTodo from '../AddNewTodo';
import ToDoList from '../ToDoList';
import styles from './App.module.scss';

const App: FC = () => {
  const { wrapper, container, title } = styles;
  return (
    <div className={wrapper}>
      <div className={container}>
        <h1 className={title}>Todo</h1>
        <AddNewTodo />
        <ToDoList />
      </div>
    </div>
  );
};

export default App;
