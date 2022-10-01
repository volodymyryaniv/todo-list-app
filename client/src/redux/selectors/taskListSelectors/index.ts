import { TaskCardTypes } from '../../../types';
import { createSelector } from '@reduxjs/toolkit';
import { TaskStateTypes } from '@slices/taskListSlice';
import { RootState } from '@redux/store';
import { sortList } from '@services/sortList';

const memoizeOptions = {
  memoizeOptions: {
    maxSize: 10,
  },
};

export const selectState = (state: RootState): RootState => state;

export const selectAll = (state: RootState): TaskStateTypes =>
  state.taskListReducer;

export const selectList = (state: RootState): TaskStateTypes['list'] =>
  state.taskListReducer.list;

export const selectActive = createSelector(
  selectList,
  (list): TaskStateTypes['list'] => {
    return list.filter((item: TaskCardTypes) => !item.completed);
  }
);

export const selectCompleted = createSelector(
  selectList,
  (list): TaskStateTypes['list'] => {
    return list.filter((item: TaskCardTypes) => item.completed);
  }
);

export const selectAllSortedList = createSelector(
  [selectList, orderBy],
  (list: TaskStateTypes['list'], order) => {
    return sortList(list, order);
  },
  memoizeOptions
);

export const selectActiveSortedList = createSelector(
  [selectActive, orderBy],
  (list: TaskStateTypes['list'], order) => {
    return sortList(list, order);
  },
  memoizeOptions
);

export const selectCompletedSortedList = createSelector(
  [selectCompleted, orderBy],
  (list: TaskStateTypes['list'], order) => {
    return sortList(list, order);
  },
  memoizeOptions
);

function orderBy(state: RootState, order: string) {
  return order;
}
