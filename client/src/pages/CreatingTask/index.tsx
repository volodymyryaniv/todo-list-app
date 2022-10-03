import { ChangeEvent } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { setPopup } from '@slices/popupSlice';
import withFormSubmit from '@hocs/withFormSubmit';
import Popup from '@components/Popup';
import CreateForm from '@components/CreateForm';
import SortList from '@components/SortList';
import { withFormSimplePropTypes } from '../../types';
import addIcon from '@assets/icons/add.svg';
import styles from './CreatingTask.module.scss';

const CreatingTask = (props: withFormSimplePropTypes) => {
  const { taskText, setTaskText, onSubmit, isError, errorMessage } = props;
  const { container, form, input, icon, error } = styles;

  const open = useAppSelector((state) => state.popupSlice.open);
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(setPopup(true));
  };

  const onSetTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  return (
    <>
      <section className={container}>
        <SortList />
        <form className={form} onSubmit={onSubmit}>
          <input
            className={input}
            type="text"
            placeholder="Quick add new todo"
            value={taskText}
            onChange={onSetTextHandler}
          />
          {isError && <p className={error}>{errorMessage}</p>}
        </form>
        <img
          className={icon}
          src={addIcon}
          alt="cross icon"
          onClick={onClickHandler}
        />
      </section>
      {open && <Popup children={<CreateForm />} />}
      <Outlet />
    </>
  );
};

export default withFormSubmit(CreatingTask);
