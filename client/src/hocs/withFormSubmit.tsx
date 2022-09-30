import { useState, ComponentType, SyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { createTodo, updateTodo } from '@actions/todoListActions';
import { setScrollToElem, setScrollBottom } from '@slices/scrollSlice';
import { selectAll } from '@selectors/todolistSelectors';
import { setPopup } from '@slices/popupSlice';
import { removeActiveTodo, setSortBy } from '@slices/todoListSlice';
import { validateInput } from '@services/inputValidation';
import { withFormFullPropTypes } from '../types';
import { categories } from '@assets/sortByList';

export default function withFormSubmit<T>(WrappedComponent: ComponentType<T>) {
  return (props: Omit<T, keyof withFormFullPropTypes>) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const currentItem = useAppSelector(selectAll).activeItem;
    const defaultId = currentItem?.id || '';
    const defaultText = currentItem?.taskText || '';
    const defaultCreated = currentItem?.created || '';
    const defaultExpiry = currentItem?.expireUntil || '';

    const [taskText, setTaskText] = useState<string>(defaultText);
    const [created, setCreated] = useState<string>(defaultCreated);
    const [expire, setExpire] = useState<string>(defaultExpiry);

    const popupStatus = useAppSelector(state => state.popupSlice.open);
    const { isError, errorMessage } = validateInput(taskText);

    const onSubmitHandler = (e: SyntheticEvent): void => {
      e.preventDefault();
      if (!isError) {
        if (taskText.trim()) {
          if (!currentItem) {
            dispatch(createTodo(taskText, created, expire));
            dispatch(setSortBy(categories[0]));
            dispatch(setScrollBottom());
            if (pathname !== '/active') {
              navigate('/');
            }
          } else {
            dispatch(updateTodo(taskText, created, expire, defaultId))
            dispatch(setScrollToElem());
            dispatch(removeActiveTodo());
          }
          setTaskText('');
        }
        if (popupStatus) {
          dispatch(setPopup(false));
        }
      }
    };

    return (
      <WrappedComponent
        {...(props as T)}
        taskText={taskText}
        setTaskText={setTaskText}
        created={created}
        setCreated={setCreated}
        expire={expire}
        setExpire={setExpire}
        onSubmit={onSubmitHandler}
        isError={isError}
        errorMessage={errorMessage}
      />
    );
  };
}

