import { ChangeEvent } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import withFormSubmit from '../../hocs/withFormSubmit';
import { selectAll } from '../../redux/selectors/todolistSelectors';
import { withFormFullPropTypes } from '../../types';
import { formatFormDate } from '../../services/formatDate';
import styles from './CreateForm.module.scss';

const CreateForm = (props: withFormFullPropTypes) => {
  const { container, form, input, button } = styles;
  const { text, setText, created, setCreated, expire, setExpire, onSubmit } = props;

  const currentItem = useAppSelector(selectAll).activeItem;

  const minDate = formatFormDate(currentItem?.created);
  const createdDate = formatFormDate(created);
  const expireDate = formatFormDate(expire);

  const onSetDateHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setCreated(value);
    if (value > expireDate) {
      setExpire(value);
    }
  };

  const onSetTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSetExpireHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setExpire(e.target.value);
  };

  return (
    <section className={container}>
      <form className={form} onSubmit={onSubmit}>
        <label>
          Your task
          <input
            className={input}
            type="text"
            placeholder="Enter your task"
            value={text}
            onChange={onSetTextHandler}
            required
          />
        </label>
        <label>
          Created date
          <input
            className={input}
            type="datetime-local"
            name="created"
            value={createdDate}
            min={minDate}
            onChange={onSetDateHandler}
          />
        </label>
        <label>
          Expiry date
          <input
            className={input}
            type="datetime-local"
            name="expireUntil"
            value={expireDate}
            min={createdDate}
            onChange={onSetExpireHandler}
          />
        </label>
        <button className={button} type="submit">
          Save
        </button>
      </form>
    </section>
  );
};

export default withFormSubmit(CreateForm);
