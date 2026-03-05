import { api } from "../api";

export const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // GET ALL
   getCourses: builder.query<
  {
    courses: any[];
    total: number;
    totalPages: number;
    currentPage: number;
  },
  {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    sort?: string;
  }
>({
  query: ({
    page = 1,
    limit = 10,
    search = "",
    category = "",
    sort = "",
  }) =>
    `/courses?page=${page}&limit=${limit}&search=${search}&category=${category}&sort=${sort}`,
  providesTags: ["Courses"],
}),

    // CREATE
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Courses"],
    }),

    // UPDATE
    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Courses"],
    }),

    // DELETE
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;