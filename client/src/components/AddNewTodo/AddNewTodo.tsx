import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { Outlet } from 'react-router-dom';
import { setPopup } from '../../redux/slices/popupSlice';
import withFormSubmit from '../../hocs/withFormSubmit';
import Popup from '../../modules/Popup';
import CreateForm from '../../modules/CreateForm';
import SortList from '../../modules/SortList';
import { withFormSimplePropTypes } from '../../types';
import styles from './AddNewTodo.module.scss';

const AddNewTodo = (props: withFormSimplePropTypes) => {
  const { text, setText, onSubmit } = props;
  const { container, form, input, icon } = styles;

  const open = useAppSelector((state) => state.popupSlice.open);
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(setPopup(true));
  };

  const onSetTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
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
            value={text}
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
