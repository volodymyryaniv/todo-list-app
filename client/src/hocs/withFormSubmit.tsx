import { useState, ComponentType, SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { createTodo, updateTodo } from '../redux/actions/todoListActions';
import { removeActiveTodo } from '../redux/slices/todoListSlice';
import { withFormFullPropTypes } from '../types';
import { setPopup } from '../redux/slices/popupSlice';

export default function withFormSubmit<T>(WrappedComponent: ComponentType<T>) {
  return (props: Omit<T, keyof withFormFullPropTypes>) => {

    const currentItem = useAppSelector(state => state.todoListReducer.activeItem);
    const defaultId = currentItem?.id || '';
    const defaultText = currentItem?.text || '';
    const defaultCreated = currentItem?.created || '';
    const defaultExpiry = currentItem?.expireUntil || '';

    const [text, setText] = useState<string>(defaultText);
    const [created, setCreated] = useState<string>(defaultCreated);
    const [expire, setExpire] = useState<string>(defaultExpiry);

    const popupStatus = useAppSelector(state => state.popupSlice);
    const dispatch = useAppDispatch();

    const onSubmitHandler = (e: SyntheticEvent): void => {
      e.preventDefault();
      if (text.trim()) {
        if (!currentItem) {
          dispatch(createTodo(text, created, expire));
        } else {
          dispatch(updateTodo(text, created, expire, defaultId))
          dispatch(removeActiveTodo())
        }
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
