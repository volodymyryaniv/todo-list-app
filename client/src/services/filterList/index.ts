import { ToDoItemTypes } from '../../types';

export const filterList = (list: ToDoItemTypes[], value: string) => {
  return list.filter((item: ToDoItemTypes) => {
    return item.text.toLowerCase().includes(value.trim().toLowerCase());
  });
};
