import { TagRequest } from "@/types/tag/TagRequest";
import { TagResponse } from "@/types/tag/TagResponse";
import http from "@services/http-common.ts";

class TagService {

    getAll() {
        return http.get<Array<TagResponse>>("/tag/getAll");
    }

    getById(id: number) {
        return http.get<TagResponse>(`/tag/get/${id}`);
    }

    addNew(data: TagRequest) {
        return http.post("/tag/addNew", data);
    }

    delete(id: number) {
        return http.delete(`/tag/delete/${id}`);
    }

    update(data: TagRequest, id: number) {
        return http.put(`/tag/update/${id}`, data);
    }
}

export default new TagService();