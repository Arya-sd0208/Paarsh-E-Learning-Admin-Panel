import { api } from "../api";

export const teachersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query<any, void>({
      query: () => "/admin/teacher",
      providesTags: ["Teachers"],
    }),

    createTeacher: builder.mutation<any, any>({
      query: (body) => ({
        url: "/admin/teacher",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Teachers"],
    }),

    updateTeacher: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/admin/teacher/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Teachers"],
    }),

    deleteTeacher: builder.mutation<any, string>({
      query: (id) => ({
        url: `/admin/teacher/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teachers"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teachersApi;

