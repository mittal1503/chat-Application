import { createSlice } from "@reduxjs/toolkit";
console.log("local storage",localStorage.getItem('userId'),localStorage.getItem('token'))
const user = JSON.parse(localStorage.getItem("user"));
console.log("user details",user)
 localStorage.getItem('token')
const UserSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    user: JSON.parse(localStorage.getItem("user")),
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = UserSlice.actions;

export default UserSlice.reducer;