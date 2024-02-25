import { createSlice, current } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import localStorage from "redux-persist/es/storage";

const initialState = {
  employeeEmail: "",
  employeeName: "",
  phone: "",
  employeeCode: "",
  employeeRank: "",
  department: "",
  company: "",
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.employeeEmail = action.payload.employeeEmail;
      state.employeeName = action.payload.employeeName;
      state.phone = action.payload.phone;
      state.employeeCode = action.payload.employeeCode;
      state.employeeRank = action.payload.employeeRank;
      state.department = action.payload.department;
      state.company = action.payload.company;
      state.isAdmin = action.payload.isAdmin;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      localStorage.removeItem("persist:root");
      return initialState;
    });
  },
});

export default userSlice;
