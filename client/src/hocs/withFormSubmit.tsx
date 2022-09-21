import React from 'react';
import { useAppDispatch } from '../hooks/redux-hooks';
import { createTodo } from '../redux/actions/todoListActions';
import { setPopup } from '../redux/slices/popupSlice';

export default function withFormSubmit<T>(
  WrappedComponent: React.ComponentType<T>
) {
  return (props: T) => {
    const [text, setText] = React.useState<string>('');
    const [created, setCreated] = React.useState<string>('');
    const [expire, setExpire] = React.useState<string>('');

    const dispatch = useAppDispatch();

    const onSubmitHandler = (e: React.SyntheticEvent): void => {
      e.preventDefault();
      console.log(created);
      dispatch(createTodo(text, created, expire));
      setText('');
      dispatch(setPopup(false));
    };

    return (
      <WrappedComponent
        {...props}
        text={text}
        setText={setText}
        setCreated={setCreated}
        setExpire={setExpire}
        onSubmit={onSubmitHandler}
      />
    );
  };
}

