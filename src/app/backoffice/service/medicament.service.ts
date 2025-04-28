import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicament } from '../model/medicament';

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {
baseUrl = 'http://localhost:8082/api/arsii';

  constructor(private httpclient:HttpClient) { }
  getAllMedicaments(){
    return this.httpclient.get<Medicament[]>(
      this.baseUrl + '/medicament'
    );
}
getMedicamentById(id : any) {
    return this.httpclient.get<Medicament[]>(
      this.baseUrl+'/medicament/'+id
    );
  }

  addMedicament(medicament: Medicament) {
    return this.httpclient.post(this.baseUrl + '/medicament', medicament);
  }

  updateMedicament(id:any,medicament: Medicament) {
    return this.httpclient.put(this.baseUrl + '/medicament/'+id, medicament);
  }
}
