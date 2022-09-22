import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'todoList',
  initialState: false,
  reducers: {
    setPopup: (state, action: PayloadAction<boolean>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setPopup } = popupSlice.actions;
export default popupSlice.reducer;
