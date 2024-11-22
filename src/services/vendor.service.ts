import { VendorDetailResponse } from "@/types/vendor/VendorDetailResponse";
import { VendorRequest } from "@/types/vendor/VendorRequestType.ts";
import { VendorResponse } from "@/types/vendor/VendorResponseType.ts";
import http from "@services/http-common.ts";

class VendorService {

    getAll() {
        return http.get<Array<VendorResponse>>("vendor/getAll");
    }

    getById(id: number) {
        return http.get<VendorResponse>(`vendor/get/${id}`);
    }

    addNew(data: VendorRequest) {
        return http.post("vendor/addNew", data);
    }

    update(data: VendorDetailResponse, id: number) {
        return http.put(`vendor/update/${id}`, data);
    }

    delete(id: number) {
        return http.delete(`vendor/delete/${id}`);
    }
}

export default new VendorService();