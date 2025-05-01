import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rapport } from '../model/rapport';

@Injectable({
    providedIn: 'root'
})
export class RapportService {
    baseUrl = 'http://localhost:8082/api/arsii';

    constructor(private httpclient: HttpClient) {}
    getAllRapports() {
        return this.httpclient.get<Rapport[]>(this.baseUrl + '/report');
    }

    getAllRapportsByPatient(id:any){
      return this.httpclient.get<Rapport[]>(this.baseUrl + '/report/patient/' + id);
    }

    getRapportById(id: any) {
        return this.httpclient.get<Rapport[]>(this.baseUrl + '/report/' + id);
    }

    addRapport(rapport: Rapport) {
        return this.httpclient.post(this.baseUrl + '/report', rapport);
    }

    updateRapport(id: any, rapport: Rapport) {
        return this.httpclient.put(this.baseUrl + '/report/' + id, rapport);
    }
}
