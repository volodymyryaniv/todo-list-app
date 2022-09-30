import { ToDoItemTypes } from '../../types';

export const filterList = (
  list: ToDoItemTypes[],
  value: string,
  isError: boolean
) => {
  return list.filter((item: ToDoItemTypes) => {
    const searchValue = isError ? value.split(/(&|\*|\$)/)[0] : value;
    return item.taskText
      .toLowerCase()
      .includes(searchValue.trim().toLowerCase());
  });
};
