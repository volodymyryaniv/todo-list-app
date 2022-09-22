import { FC } from 'react';
import AddNewTodo from '../AddNewTodo';
import ToDoList from '../ToDoList';
import styles from './App.module.scss';

const App: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Todo</h1>
        <AddNewTodo />
        <ToDoList />
      </div>
    </div>
  );
}

export default App;
