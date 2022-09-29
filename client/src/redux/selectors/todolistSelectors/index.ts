import { ToDoItemTypes } from './../../../types';
import { createSelector } from '@reduxjs/toolkit';
import { TodoStateTypes } from '../../slices/todoListSlice';
import { RootState } from '../../store';
import { sortList } from '../../../services/sortList';

const memoizeOptions = {
  memoizeOptions: {
    maxSize: 10,
  },
};

export const selectState = (state: RootState): RootState => state;

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

export const selectAllSortedList = createSelector(
  [selectList, orderBy],
  (list: TodoStateTypes['list'], order) => {
    return sortList(list, order);
  },
  memoizeOptions
);

export const selectActiveSortedList = createSelector(
  [selectActive, orderBy],
  (list: TodoStateTypes['list'], order) => {
    return sortList(list, order);
  },
  memoizeOptions
);

export const selectCompletedSortedList = createSelector(
  [selectCompleted, orderBy],
  (list: TodoStateTypes['list'], order) => {
    return sortList(list, order);
  },
  memoizeOptions
);

function orderBy(state: RootState, order: string) {
  return order;
}
