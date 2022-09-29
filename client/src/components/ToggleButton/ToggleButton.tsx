import styles from './ToggleButton.module.scss';

interface PropTypes {
  checked: boolean;
  onChangeHandler: () => void;
}

const ToggleButton = (props: PropTypes) => {
  const { checked, onChangeHandler } = props;
  const { container, input, slider } = styles;
  return (
    <label className={container}>
      <input
        type="checkbox"
        className={input}
        checked={checked}
        onChange={onChangeHandler}
      />
      <span className={slider} />
    </label>
  );
};

export default ToggleButton;
