import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { Outlet } from 'react-router-dom';
import { setPopup } from '../../redux/slices/popupSlice';
import withFormSubmit from '../../hocs/withFormSubmit';
import { withFormSimplePropTypes } from '../../types';
import Popup from '../../modules/Popup';
import CreateForm from '../../modules/CreateForm';
import styles from './AddNewTodo.module.scss';

const AddNewTodo = (props: withFormSimplePropTypes) => {
  const { text, setText, onSubmit } = props;
  const { container, form, input, icon } = styles;

  const open = useAppSelector((state) => state.popupSlice.open);
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(setPopup(true));
  };

  return (
    <>
      <section className={container}>
        <form className={form} onSubmit={onSubmit}>
          <input
            className={input}
            type="text"
            placeholder="Quick add new todo"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
