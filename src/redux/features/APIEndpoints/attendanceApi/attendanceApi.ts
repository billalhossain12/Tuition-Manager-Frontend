import { TResponseRedux } from "../../../../types";
import { baseApi } from "../../../api/baseApi";

const attendancesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAttendance: builder.mutation({
      query: (payload) => ({
        url: "/attendances",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["attendances"],
    }),

    getMyAttendances: builder.query({
      query: () => ({
        url: "/attendances",
        method: "GET",
      }),
      providesTags: ["attendances"],
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),

    getMyTodayAttendances: builder.query({
      query: () => ({
        url: "/attendances/today",
        method: "GET",
      }),
      providesTags: ["attendances"],
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),

    getMyAttendance: builder.query({
      query: (attendanceId) => ({
        url: `/attendances/${attendanceId}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),

    deleteMyAttendance: builder.mutation({
      query: (attendanceId) => ({
        url: `/attendances/${attendanceId}`,
        method: "Delete",
      }),
      invalidatesTags: ["attendances"],
    }),

    updateMyAttendance: builder.mutation({
      query: ({ id, data }) => ({
        url: `/attendances/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["attendances"],
    }),
  }),
});

export const {
  useCreateAttendanceMutation,
  useGetMyAttendanceQuery,
  useGetMyAttendancesQuery,
  useGetMyTodayAttendancesQuery,
  useDeleteMyAttendanceMutation,
  useUpdateMyAttendanceMutation,
} = attendancesApi;
