import { SortEnum } from '../../enums';
import { TaskStateTypes } from '@slices/taskListSlice';
import { TaskCardTypes } from '../../types';

export const sortList = (list: TaskStateTypes['list'], order: string) => {
  const arr = order.split('-');
  const orderBy = arr[0].toString();
  const type = arr.at(-1);

  return [...list].sort((itemA: TaskCardTypes, itemB: TaskCardTypes) => {
    const first = new Date(
      itemA[orderBy as keyof Omit<TaskCardTypes, 'completed'>]
    );
    const second = new Date(
      itemB[orderBy as keyof Omit<TaskCardTypes, 'completed'>]
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
