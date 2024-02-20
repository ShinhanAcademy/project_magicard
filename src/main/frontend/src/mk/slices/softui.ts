import { createSlice, configureStore } from "@reduxjs/toolkit";

// 초기 상태 정의
const initialState = {
  miniSidenav: false,
  transparentSidenav: true,
  sidenavColor: "info",
  transparentNavbar: true,
  fixedNavbar: true,
  openConfigurator: false,
  direction: "ltr",
  layout: "dashboard",
};

// Slice 생성
const softuiSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setMiniSidenav(state, action) {
      state.miniSidenav = action.payload;
    },
    setTransparentSidenav(state, action) {
      state.transparentSidenav = action.payload;
    },
    setSidenavColor(state, action) {
      state.sidenavColor = action.payload;
    },
    setTransparentNavbar(state, action) {
      state.transparentNavbar = action.payload;
    },
    setFixedNavbar(state, action) {
      state.fixedNavbar = action.payload;
    },
    setOpenConfigurator(state, action) {
      state.openConfigurator = action.payload;
    },
    setDirection(state, action) {
      state.direction = action.payload;
    },
    setLayout(state, action) {
      state.layout = action.payload;
    },
  },
});

// Export actions
export const {
  setMiniSidenav,
  setTransparentSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
} = softuiSlice.actions;

// Redux store 생성
export const store = configureStore({
  reducer: softuiSlice.reducer,
});

export default softuiSlice;
