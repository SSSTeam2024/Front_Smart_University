import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "app/store";

export interface UserResponse {
  user: {
    _id?: string;
    name: string,
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
export interface Account {
  accessToken: string,
  user: {
    _id?: string;
    name: string,
    email:string,
    login:string,
    role_id:string,
    departement_id:string,
    password: string,
    // api_token: string,
    photo: string,
    app_name: string,
    status: string,
    
  }
}

export interface LoginRequest {
  login: string;
  password: string;
}

export const accountSlice = createApi({
  reducerPath: "account",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/user/",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState)?.auth?.user.api_token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Account"],
  endpoints(builder) {
    return {
      login: builder.mutation<UserResponse, LoginRequest>({
        query: (credentials) => ({
          url: "/login-user",
          method: "POST",
          body: credentials,
        }),
      }),
    //   updateAccount: builder.mutation<void, Account>({
    //     query: ({ idCompte, ...rest }) => ({
    //       url: `editUser/${idCompte}`,
    //       method: "PATCH",
    //       body: rest,
    //     }),
    //     invalidatesTags: ["Account"],
    //   }),
    //   deleteCompte: builder.mutation<void, number>({
    //     query: (idCompte) => ({
    //       url: `removeUser/${idCompte}`,
    //       method: "DELETE",
    //     }),
    //     invalidatesTags: ["Account"],a
    //   }),
    };
  },
});

export const {
//   useUpdateAccountMutation,
  useLoginMutation,
//   useDeleteCompteMutation,
} = accountSlice;
