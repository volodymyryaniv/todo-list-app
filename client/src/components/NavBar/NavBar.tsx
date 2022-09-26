import { SyntheticEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import {
  clearCompletedTodo,
  setScrollTop,
} from '../../redux/slices/todoListSlice';
import styles from './NavBar.module.scss';

export default function NavBar() {
  const { container, linkContainer, title, disabled, active, clearAll } =
    styles;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickHandler = (e: SyntheticEvent, to: string) => {
    e.preventDefault();
    dispatch(setScrollTop());
    navigate(to);
  };

  return (
    <nav className={container}>
      <h5 className={title}>Items left:</h5>
      <div className={linkContainer}>
        <NavLink
          end
          to="/"
          className={({ isActive }) => (isActive ? active : disabled)}
          onClick={(e) => onClickHandler(e, '/')}
        >
          All
        </NavLink>
        <NavLink
          to="active"
          className={({ isActive }) => (isActive ? active : disabled)}
          onClick={(e) => onClickHandler(e, '/active')}
        >
          Active
        </NavLink>
        <NavLink
          to="completed"
          className={({ isActive }) => (isActive ? active : disabled)}
          onClick={(e) => onClickHandler(e, '/completed')}
        >
          Completed
        </NavLink>
      </div>
      <p className={clearAll} onClick={() => dispatch(clearCompletedTodo())}>
        Clear completed
      </p>
    </nav>
  );
}
