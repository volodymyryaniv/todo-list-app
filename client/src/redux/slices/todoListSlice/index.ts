import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createTodo, updateTodo } from '../../actions/todoListActions';
import { ToDoItemTypes } from '../../../types/index.js';
import { todoList } from '../../../assets/list.js';

interface StateTypes {
  list: ToDoItemTypes[];
  activeItem: ToDoItemTypes | null;
}

const todoListSlice = createSlice({
  name: 'todoListReducer',
  initialState: {
    list: todoList,
    activeItem: null,
  } as StateTypes,
  reducers: {
    setTodoStatus(state, action: PayloadAction<string>) {
      state.list.map((item: ToDoItemTypes): ToDoItemTypes => {
        if (item.id === action.payload) {
          item.completed = !item.completed;
        }
        return item;
      });
    },
    removeTodo(state, action: PayloadAction<string>) {
      return {
        ...state,
        list: state.list.filter((item: ToDoItemTypes): boolean => {
          return current(item).id !== action.payload;
        }),
      };
    },
    setActiveTodo(state, action: PayloadAction<string>) {
      const item = state.list.filter((item: ToDoItemTypes): boolean => {
        return current(item).id === action.payload;
      });
      return {
        ...state,
        activeItem: item[0],
      };
    },
    removeActiveTodo: (state) => {
      return {
        ...state,
        activeItem: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createTodo,
      (state, action: PayloadAction<ToDoItemTypes>) => {
        state.list.push(action.payload);
      }
    );
    builder.addCase(updateTodo, (state, action): StateTypes => {
      const updatedList = state.list.map((item: ToDoItemTypes) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
      return {
        ...state,
        list: updatedList,
      };
    });
  },
});

export const { setTodoStatus, removeTodo, setActiveTodo, removeActiveTodo } =
  todoListSlice.actions;
export default todoListSlice.reducer;
