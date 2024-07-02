import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
interface UserState {
    user: {
      _id?: string;
      name: string;
    email:string,
    login:string,
    role_id:string,
    departement_id:string,
    password: string,
    api_token: string,
    photo: string,
    app_name: string,
    status: string,
    
  }
  }
  
const slice = createSlice({
  name: "auth",
  initialState: { user: {
    _id: "",
    name: "",
  email:"",
  login:"",
  role_id:"",
  departement_id:"",
  password: "",
  api_token: "",
  photo: "",
  app_name: "",
  status: "",
  } } as UserState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: {  user },
      }: PayloadAction<{
        user: any}>
    ) => {
      state.user = user;
    },
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;