import { SortEnum } from '../../enums';
import { TodoStateTypes } from '../../redux/slices/todoListSlice';
import { ToDoItemTypes } from '../../types';

export const sortList = (list: TodoStateTypes['list'], order: string) => {
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
        return itemA.taskText.localeCompare(itemB.taskText);
      } else {
        return first > second ? 1 : -1;
      }
    } else {
      if (orderBy === SortEnum.Text) {
        return itemB.taskText.localeCompare(itemA.taskText);
      } else {
        return first < second ? 1 : -1;
      }
    }
  });
};
