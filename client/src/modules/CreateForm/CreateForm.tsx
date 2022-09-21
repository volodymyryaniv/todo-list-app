import withFormSubmit from '../../hocs/withFormSubmit';
import styles from './CreateForm.module.scss';

const CreateForm = (
  props: any
) => {
  const { text, setText, setCreated, setExpire, onSubmit } = props;

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter your task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="datetime-local"
          name="created"
          onChange={(e) => setCreated(e.target.value)}
        />
        <input
          className={styles.input}
          type="datetime-local"
          name="expireUntil"
          onChange={(e) => setExpire(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Save
        </button>
      </form>
    </section>
  );
}

export default withFormSubmit(CreateForm);
