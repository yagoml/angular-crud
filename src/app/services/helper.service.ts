// Serviço Auxiliar

import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class HelperService {
    generateUuid() {
        // Gerador de GUID (UUID)
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}