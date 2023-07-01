import { DepartmentResponse } from "@/types/department/DepartmentResponse";
import { serverApi } from "./serverApi";
import { DepartmentRequest } from "@/types/department/DepartmentRequest";

export const departmentApi = serverApi.injectEndpoints({
    endpoints: (builder) => ({
        getDepartments: builder.query<DepartmentResponse[], number>({
            query: () => "/department/getAll",
        }),
        addDepartment: builder.mutation<DepartmentResponse, DepartmentRequest>({
            query: (data) => {
                return {
                    url: "/department/addNew",
                    method: "POST",
                    body: data,
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const { useGetDepartmentsQuery, useAddDepartmentMutation } =
    departmentApi;
