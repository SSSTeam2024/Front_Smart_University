import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Seance {
  _id: string;
  matiere: string;
  enseignant: any;
  classe: any; 
  salle: string; 
  jour: string;
  heure_debut:string;
  heure_fin: string;
  type_seance: string;
  semestre:string;
}

export interface teacherSessionsPayload{
  teacher_id: string,
  jour: string,
  semestre: string
}


export const seanceSlice = createApi({
  reducerPath: "Seance",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/seance/",
  }),
  tagTypes: ["Seance"],
  endpoints(builder) {
    return {
      fetchSeances: builder.query<Seance[], number | void>({
        query() {
          return `get-all-seance`;
        },
        providesTags: ["Seance"],
      }),
      fetchAllSeancesByClasseId: builder.query<Seance[],string | void>({
        query: (_id) => ({
          url: `/get-all-seance/${_id}`,
          method: "GET"
        }),
        providesTags: ["Seance"],
      }),

      fetchAllSessionsByRoomId: builder.mutation<Seance[],string | void>({
        query: (_id) => ({
          url: `/get-sessions-by-room/${_id}`,
          method: "GET",
        }),
        invalidatesTags: ["Seance"],
      }),

      addSeance: builder.mutation<void, Seance>({
        query(payload) {
          return {
            url: "/create-seance",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Seance"],
      }),
      getSeancesByTeacher: builder.mutation<Seance[], teacherSessionsPayload>({
        query(payload) {
          return {
            url: "/get-seances-by-teacher",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Seance"],
      }),
      updateSeance: builder.mutation<void, Seance>({
        query: ({ _id, ...rest }) => ({
          url: `/update-seance/${_id}`,
          method: "PUT",
          body: rest,
        }),
        invalidatesTags: ["Seance"],
      }),
      deleteSeance: builder.mutation<void, any>({
        query: ({ _id, ...rest }) => ({
          url: `delete-seance/${_id}`,
          method: "DELETE",
          body: rest,
        }),
        invalidatesTags: ["Seance"],
      }),
    };
  },
});

export const {
useAddSeanceMutation,
useDeleteSeanceMutation,
useFetchSeancesQuery,
useUpdateSeanceMutation,
useFetchAllSeancesByClasseIdQuery,
useFetchAllSessionsByRoomIdMutation,
useGetSeancesByTeacherMutation
} = seanceSlice;
