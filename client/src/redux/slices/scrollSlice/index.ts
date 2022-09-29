import { createSlice } from '@reduxjs/toolkit';

export interface ScrollStateTypes {
  scrollBottom?: boolean;
  scrollTop?: boolean;
  scrollToElem?: boolean;
}

const scrollSlice = createSlice({
  name: 'scrollReducer',
  initialState: {
    scrollBottom: false,
    scrollTop: false,
    scrollToElem: false,
  } as ScrollStateTypes,
  reducers: {
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
    setScrollToElem: (state) => {
      return {
        ...state,
        scrollToElem: !state.scrollToElem,
      };
    },
  },
});

export const { setScrollBottom, setScrollTop, setScrollToElem } =
  scrollSlice.actions;
export default scrollSlice.reducer;
