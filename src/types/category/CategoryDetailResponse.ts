import { DepartmentResponse } from "@/types/department/DepartmentResponse.ts";

export interface CategoryDetailResponse {
    id: number;
    name: string;
    description: string;
    department: DepartmentResponse;
}
