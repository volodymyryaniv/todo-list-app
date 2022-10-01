import { TaskCardTypes } from '../../types';

export const filterList = (list: TaskCardTypes[], value: string) => {
  return list.filter((item: TaskCardTypes) => {
    return item.taskText.toLowerCase().includes(value.trim().toLowerCase());
  });
};
