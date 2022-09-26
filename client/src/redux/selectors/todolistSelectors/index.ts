import { createSelector } from '@reduxjs/toolkit';
import { ToDoItemTypes } from '../../../types';
import { TodoStateTypes } from '../../slices/todoListSlice';
import { RootState } from '../../store';

export const selectAll = (state: RootState): TodoStateTypes =>
  state.todoListReducer;

export const selectList = (state: RootState): TodoStateTypes['list'] =>
  state.todoListReducer.list;

export const selectActive = createSelector(
  selectList,
  (list): TodoStateTypes['list'] => {
    return list.filter((item: ToDoItemTypes) => !item.completed);
  }
);

export const selectCompleted = createSelector(
  selectList,
  (list): TodoStateTypes['list'] => {
    return list.filter((item: ToDoItemTypes) => item.completed);
  }
);
