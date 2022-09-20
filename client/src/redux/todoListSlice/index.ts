import { createSlice } from '@reduxjs/toolkit';
import { todoList } from '../../assets/list.js';

interface ToDoItem {
  id: string;
  text: string;
  created: string;
  expireUntil: string;
  completed: boolean;
}

const todoListSlice = createSlice({
  name: 'todoList',
  initialState: todoList as ToDoItem[],
  reducers: {},
});

export const {} = todoListSlice.actions;
export default todoListSlice.reducer;
