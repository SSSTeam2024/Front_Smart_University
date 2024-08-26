import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface DisponibiliteSalle {
  _id: string;
  roomId: any;
  isAvailable: string;
  dayOfWeek: string;
  timeSlot: string;
}

export interface PayloadDisponibiliteSalle {
    heure_debut: string,
    heure_fin: string,
    jour: string
  }

export const disponibiliteSalleSlice = createApi({
  reducerPath: "DisponibiliteSalle",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/disponibilite-salle/",
  }),
  tagTypes: ["DisponibiliteSalle"],
  endpoints(builder) {
    return {
      fetchDisponibiliteSalles: builder.mutation<DisponibiliteSalle[], PayloadDisponibiliteSalle>({
        query(payload) {
          return {
            url: `get-disponibilite-salle`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["DisponibiliteSalle"],
      }),
    };
  },
});

export const {
useFetchDisponibiliteSallesMutation
} = disponibiliteSalleSlice;
