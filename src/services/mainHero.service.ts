import { MainHeroRequest } from "@/types/mainHero/MainHeroRequest.tsx";
import { MainHeroResponse } from "@/types/mainHero/MainHeroResponse.tsx";
import http from "@services/http-common.ts";

class MainHeroService {

    getAll() {
        return http.get<Array<MainHeroResponse>>("hero/getAll");
    }

    addNew(data: MainHeroRequest) {
        return http.post("hero/addNew", data);
    }

    update(data: MainHeroRequest, id: number) {
        return http.put(`hero/update/${id}`, data);
    }

    delete(id: number) {
        return http.delete(`hero/delete/${id}`);
    }
}

export default new MainHeroService();