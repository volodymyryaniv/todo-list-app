import { FC, useRef, Dispatch, SetStateAction } from 'react';
import { useAppDispatch } from '@hooks/redux-hooks';
import {
  setTaskStatus,
  removeTask,
  setActiveTask,
} from '@slices/taskListSlice';
import { TaskCardTypes } from '../../types';
import { formatDisplayDate } from '@services/formatDate';
import { setPopup } from '@slices/popupSlice';
import ToggleButton from '@components/ToggleButton';
import editIcon from '@assets/icons/edit.png';
import deleteIcon from '@assets/icons/delete.svg';
import styles from './TaskCard.module.scss';

interface ItemPositionTypes {
  setPosition: Dispatch<SetStateAction<number>>;
}

const TaskCard: FC<TaskCardTypes & ItemPositionTypes> = (props) => {
  const { container, content, mainInfo, details, dateBlock, buttonsBlock } =
    styles;
  const { id, taskText, created, expireUntil, completed, setPosition } = props;

  const dispatch = useAppDispatch();
  const itemRef = useRef<HTMLDivElement>(null);

  const formatClassNames = (
    status: TaskCardTypes['completed'],
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
    dispatch(setTaskStatus(id));
  };

  const onEditHandler = () => {
    setPosition(itemRef.current?.offsetTop || 0);
    dispatch(setActiveTask(id));
    dispatch(setPopup(true));
  };

  const onRemoveHandler = () => {
    dispatch(removeTask(id));
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
          src={deleteIcon}
          alt="delete icon"
          onClick={onRemoveHandler}
        />
        <img
          src={editIcon}
          alt="delete icon"
          onClick={onEditHandler}
        />
      </div>
    </article>
  );
};

export default TaskCard;
