import { ToDoItemTypes } from './../../../types';
import { createSelector } from '@reduxjs/toolkit';
import { SortEnum } from '../../../enums';
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

function sortList(list: TodoStateTypes['list'], order: string) {
  const arr = order.split('-');
  const orderBy = arr[0].toString();
  const type = arr.at(-1);

  return [...list].sort((itemA: ToDoItemTypes, itemB: ToDoItemTypes) => {
    const first = new Date(
      itemA[orderBy as keyof Omit<ToDoItemTypes, 'completed'>]
    );
    const second = new Date(
      itemB[orderBy as keyof Omit<ToDoItemTypes, 'completed'>]
    );

    if (type === SortEnum.Asc) {
      if (orderBy === SortEnum.Text) {
        return itemA.text.localeCompare(itemB.text);
      } else {
        return first > second ? 1 : -1;
      }
    } else {
      if (orderBy === SortEnum.Text) {
        return itemB.text.localeCompare(itemA.text);
      } else {
        return first < second ? 1 : -1;
      }
    }
  });
}
