import { TResponseRedux } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const studentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (payload) => ({
        url: "/students",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["students"],
    }),

    getMyStudents: builder.query({
      query: () => ({
        url: "/students",
        method: "GET",
      }),
      providesTags: ["students"],
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),

    getMyStudent: builder.query({
      query: (studentId) => ({
        url: `/students/${studentId}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),

    deleteMyStudent: builder.mutation({
      query: (studentId) => ({
        url: `/students/${studentId}`,
        method: "Delete",
      }),
      invalidatesTags: ["students"],
    }),

    updateMyStudent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["students"],
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetMyStudentQuery,
  useGetMyStudentsQuery,
  useDeleteMyStudentMutation,
  useUpdateMyStudentMutation,
} = studentsApi;
