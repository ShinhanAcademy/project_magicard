import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  employeeEmail: "",
  employeeName: "",
  phone: "",
  employeeCode: "",
  employeeRank: "",
  department: "",
  company: "",
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
      // state.authority = action.payload.authority;
      // state.accessToken = action.payload.accessToken;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {},
});

export default userSlice;
