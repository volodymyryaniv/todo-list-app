import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setPopup } from '../../redux/slices/popupSlice';
import withFormSubmit from '../../hocs/withFormSubmit';
import Popup from '../../modules/Popup';
import CreateForm from '../../modules/CreateForm';
import styles from './AddNewTodo.module.scss';

const QuickCreation = (
  props: any,
) => {
  const { text, setText, onSubmit } = props;

  const open = useAppSelector((state) => state.popupSlice);
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(setPopup(true));
  };

  return (
    <>
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="Quick add new todo"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
        <img
          className={styles.icon}
          src="/icons/add.svg"
          alt="cross icon"
          onClick={onClickHandler}
        />
      </section>
      {open && <Popup children={<CreateForm />} />}
    </>
  );
};

export default withFormSubmit(QuickCreation);
