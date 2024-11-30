import { VendorDetailResponse } from "@/types/vendor/VendorDetailResponse";
import { VendorRequest } from "@/types/vendor/VendorRequest";
import { VendorResponse } from "@/types/vendor/VendorResponse";
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

    update(data: VendorRequest, id: number) {
        return http.put(`vendor/update/${id}`, data);
    }

    delete(id: number) {
        return http.delete(`vendor/delete/${id}`);
    }
}

export default new VendorService();
