import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { Outlet } from 'react-router-dom';
import { setPopup } from '../../redux/slices/popupSlice';
import withFormSubmit from '../../hocs/withFormSubmit';
import Popup from '../../components/Popup';
import CreateForm from '../../components/CreateForm';
import SortList from '../../components/SortList';
import { withFormSimplePropTypes } from '../../types';
import styles from './AddNewTodo.module.scss';

const AddNewTodo = (props: withFormSimplePropTypes) => {
  const { taskText, setTaskText, onSubmit } = props;
  const { container, form, input, icon } = styles;

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
        </form>
        <img
          className={icon}
          src="/icons/add.svg"
          alt="cross icon"
          onClick={onClickHandler}
        />
      </section>
      {open && <Popup children={<CreateForm />} />}
      <Outlet />
    </>
  );
};

export default withFormSubmit(AddNewTodo);
