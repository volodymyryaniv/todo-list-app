import { useState, ComponentType, SyntheticEvent } from 'react';
import { useAppDispatch } from '../hooks/redux-hooks';
import { createTodo } from '../redux/actions/todoListActions';
import { withFormFullPropTypes } from '../types';
import { setPopup } from '../redux/slices/popupSlice';

export default function withFormSubmit<T>(WrappedComponent: ComponentType<T>) {
  return (props: Omit<T, keyof withFormFullPropTypes>) => {

    const [text, setText] = useState<string>('');
    const [created, setCreated] = useState<string>('');
    const [expire, setExpire] = useState<string>('');

    const dispatch = useAppDispatch();

    const onSubmitHandler = (e: SyntheticEvent): void => {
      e.preventDefault();
      dispatch(createTodo(text, created, expire));
      setText('');
      dispatch(setPopup(false));
    };

    return (
      <WrappedComponent
        {...(props as T)}
        text={text}
        setText={setText}
        created={created}
        setCreated={setCreated}
        expire={expire}
        setExpire={setExpire}
        onSubmit={onSubmitHandler}
      />
    );
  };
}
