import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createTodo, updateTodo } from '../../actions/todoListActions';
import { ToDoItemTypes } from '../../../types/index.js';
import { todoList } from '../../../assets/list.js';

export interface TodoListType {
  list: ToDoItemTypes[];
}

export interface TodoStateTypes extends TodoListType {
  activeItem: ToDoItemTypes | null;
  scrollBottom?: boolean;
  scrollTop?: boolean;
}

const todoListSlice = createSlice({
  name: 'todoListReducer',
  initialState: {
    list: todoList,
    activeItem: null,
    scrollBottom: false,
    scrollTop: false,
  } as TodoStateTypes,
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
    clearCompletedTodo: (state) => {
      return {
        ...state,
        list: state.list.filter((item: ToDoItemTypes): boolean => {
          return !item.completed;
        }),
      };
    },
    setScrollBottom: (state) => {
      return {
        ...state,
        scrollBottom: !state.scrollBottom,
      };
    },
    setScrollTop: (state) => {
      return {
        ...state,
        scrollTop: !state.scrollTop,
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
    builder.addCase(updateTodo, (state, action): TodoStateTypes => {
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

export const {
  setTodoStatus,
  removeTodo,
  setActiveTodo,
  removeActiveTodo,
  clearCompletedTodo,
  setScrollBottom,
  setScrollTop,
} = todoListSlice.actions;
export default todoListSlice.reducer;
