import { createSelector } from '@reduxjs/toolkit';
import { ToDoItemTypes } from '../../../types';
import { TodoStateTypes } from '../../slices/todoListSlice';
import { RootState } from '../../store';

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
    const newList = [...list];
    return sortList(newList, order);
  },
  memoizeOptions
);

export const selectActiveSortedList = createSelector(
  [selectActive, orderBy],
  (list: TodoStateTypes['list'], order) => {
    const newList = [...list];
    return sortList(newList, order);
  },
  memoizeOptions
);

export const selectCompletedSortedList = createSelector(
  [selectCompleted, orderBy],
  (list: TodoStateTypes['list'], order) => {
    const newList = [...list];
    return sortList(newList, order);
  },
  memoizeOptions
);

function orderBy(state: RootState, order: string) {
  return order;
}

function createdAsc(a: ToDoItemTypes, b: ToDoItemTypes) {
  const first = new Date(a.created);
  const second = new Date(b.created);
  return first > second ? 1 : -1;
}

function createdDesc(a: ToDoItemTypes, b: ToDoItemTypes) {
  const first = new Date(a.created);
  const second = new Date(b.created);
  return first < second ? 1 : -1;
}

function expiryAsc(a: ToDoItemTypes, b: ToDoItemTypes) {
  const first = new Date(a.expireUntil);
  const second = new Date(b.expireUntil);
  return first > second ? 1 : -1;
}

function expiryDesc(a: ToDoItemTypes, b: ToDoItemTypes) {
  const first = new Date(a.expireUntil);
  const second = new Date(b.expireUntil);
  return first < second ? 1 : -1;
}

function textAsc(a: ToDoItemTypes, b: ToDoItemTypes) {
  return a.text.localeCompare(b.text);
}

function textDesc(a: ToDoItemTypes, b: ToDoItemTypes) {
  return b.text.localeCompare(a.text);
}

function sortList(list: TodoStateTypes['list'], order: string) {
  switch (order) {
    case 'created-date-asc':
      return list.sort(createdAsc);
    case 'created-date-desc':
      return list.sort(createdDesc);
    case 'expiry-date-asc':
      return list.sort(expiryAsc);
    case 'expiry-date-desc':
      return list.sort(expiryDesc);
    case 'text-asc':
      return list.sort(textAsc);
    case 'text-desc':
      return list.sort(textDesc);
    default:
      return list;
  }
}
