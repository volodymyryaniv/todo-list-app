import { FC, useRef, Dispatch, SetStateAction } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import {
  setTodoStatus,
  removeTodo,
  setActiveTodo,
} from '../../redux/slices/todoListSlice';
import { ToDoItemTypes } from '../../types';
import { formatDisplayDate } from '../../services/formatDate';
import { setPopup } from '../../redux/slices/popupSlice';
import ToggleButton from '../../components/ToggleButton';
import styles from './ToDoItem.module.scss';

interface ItemPositionTypes {
  setPosition: Dispatch<SetStateAction<number | undefined>>
}

const ToDoItem: FC<ToDoItemTypes & ItemPositionTypes> = (props) => {
  const { container, content, mainInfo, details, dateBlock, buttonsBlock } =
    styles;
  const { id, taskText, created, expireUntil, completed, setPosition } = props;

  const dispatch = useAppDispatch();
  const itemRef = useRef<HTMLDivElement>(null);

  const formatClassNames = (
    status: ToDoItemTypes['completed'],
    name: string
  ): string => {
    return status ? `${styles[name]} ${styles.done}` : `${styles[name]}`;
  };

  const formatedCreated = formatDisplayDate(created);
  const formatedExpire = formatDisplayDate(expireUntil);

  const textStyle = formatClassNames(completed, 'text');
  const dateStyle = formatClassNames(completed, 'date');
  const titleStyle = formatClassNames(completed, 'title');

  const onSetStatusHandler = () => {
    dispatch(setTodoStatus(id));
  };

  const onEditHandler = () => {
    setPosition(itemRef.current?.offsetTop);
    dispatch(setActiveTodo(id));
    dispatch(setPopup(true));
  };

  const onRemoveHandler = () => {
    dispatch(removeTodo(id));
  };

  return (
    <article ref={itemRef} className={container}>
      <div className={content}>
        <div className={mainInfo}>
          <ToggleButton
            checked={completed}
            onChangeHandler={onSetStatusHandler}
          />
          <p className={textStyle}>{taskText}</p>
        </div>
        <article className={details}>
          <div className={dateBlock}>
            <h5 className={titleStyle}>Created</h5>
            <span className={dateStyle}>{formatedCreated}</span>
          </div>
          <div className={dateBlock}>
            <h5 className={titleStyle}>Expiry</h5>
            <span className={dateStyle}>{formatedExpire}</span>
          </div>
        </article>
      </div>
      <div className={buttonsBlock}>
        <img
          src="/icons/delete.svg"
          alt="delete icon"
          onClick={onRemoveHandler}
        />
        <img
          src="/icons/edit.png"
          alt="delete icon"
          onClick={onEditHandler}
        />
      </div>
    </article>
  );
};

export default ToDoItem;
