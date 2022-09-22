import { useState, ComponentType, SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { createTodo } from '../redux/actions/todoListActions';
import { withFormFullPropTypes } from '../types';
import { setPopup } from '../redux/slices/popupSlice';

export default function withFormSubmit<T>(WrappedComponent: ComponentType<T>) {
  return (props: Omit<T, keyof withFormFullPropTypes>) => {
  
    const [text, setText] = useState<string>('');
    const [created, setCreated] = useState<string>('');
    const [expire, setExpire] = useState<string>('');

    const popupStatus = useAppSelector(state => state.popupSlice);
    const dispatch = useAppDispatch();

    const onSubmitHandler = (e: SyntheticEvent): void => {
      e.preventDefault();
      if (text.trim()) {
        dispatch(createTodo(text, created, expire));
        setText('');
      }
      if (popupStatus) {
        dispatch(setPopup(false));
      }
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
