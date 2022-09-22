import { ChangeEvent } from 'react';
import withFormSubmit from '../../hocs/withFormSubmit';
import { withFormFullPropTypes } from '../../types';
import { formatFormDate } from '../../services/formatDate';
import styles from './CreateForm.module.scss';

const CreateForm = (props: withFormFullPropTypes) => {
  const { text, setText, created, setCreated, expire, setExpire, onSubmit } = props;

  const minDate = formatFormDate();
  const createdDate = created ? formatFormDate(created) : formatFormDate();
  const expireDate = expire ? formatFormDate(expire) : formatFormDate();

  const onSetDateHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setCreated(e.target.value);
    setExpire(e.target.value);
  };

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <label>
          Your task
          <input
            className={styles.input}
            type="text"
            placeholder="Enter your task"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </label>
        <label>
          Created date
          <input
            className={styles.input}
            type="datetime-local"
            name="created"
            value={createdDate}
            min={minDate}
            onChange={(e) => onSetDateHandler(e)}
          />
        </label>
        <label>
          Expiry date
          <input
            className={styles.input}
            type="datetime-local"
            name="expireUntil"
            value={expireDate}
            min={createdDate}
            onChange={(e) => setExpire(e.target.value)}
          />
        </label>
        <button className={styles.button} type="submit">
          Save
        </button>
      </form>
    </section>
  );
};

export default withFormSubmit(CreateForm);
