import { TResponseRedux } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const routinesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRoutine: builder.mutation({
      query: (payload) => ({
        url: "/routines",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["routines"],
    }),

    getMyRoutines: builder.query({
      query: () => ({
        url: "/routines",
        method: "GET",
      }),
      providesTags: ["routines"],
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),

    getMyRoutine: builder.query({
      query: (studentId) => ({
        url: `/routines/${studentId}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),

    deleteMyRoutine: builder.mutation({
      query: (studentId) => ({
        url: `/routines/${studentId}`,
        method: "Delete",
      }),
      invalidatesTags: ["routines"],
    }),

    updateMyRoutine: builder.mutation({
      query: ({ id, data }) => ({
        url: `/routines/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["routines"],
    }),
  }),
});

export const {
  useCreateRoutineMutation,
  useGetMyRoutineQuery,
  useGetMyRoutinesQuery,
  useDeleteMyRoutineMutation,
  useUpdateMyRoutineMutation,
} = routinesApi;
