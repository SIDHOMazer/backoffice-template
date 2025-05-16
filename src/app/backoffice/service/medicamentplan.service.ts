import { Injectable } from '@angular/core';
import { Medicamentplan } from '../model/medicamentplan';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicamentplanService {
baseUrl = 'http://localhost:8082/api/arsii';


  constructor(private httpclient:HttpClient) { }
  // getAllMedicamentplans(){
  //   return this.httpclient.get<Medicamentplan[]>(
  //     this.baseUrl + '/medicamentPlan'
  //   );

     getAllMedicamentplans(idPlan: any){
    return this.httpclient.get<Medicamentplan[]>(
      this.baseUrl + '/medicamentPlan/plan/'+idPlan
    );
//sala7 l url kif swagger 

}
getMedicamentplanById(id : any) {
    return this.httpclient.get<Medicamentplan[]>(
      this.baseUrl+'/medicamentPlan/'+id
    );
//sala7 l url kif swagger 

  }

  addMedicamentplan(medicamentPlan: Medicamentplan) {
    return this.httpclient.post(this.baseUrl + '/medicamentPlan', medicamentPlan);
//sala7 l url kif swagger 

  }

  updateMedicamentplan(id:any,medicamentPlan: Medicamentplan) {
    return this.httpclient.put(this.baseUrl + '/medicamentPlan/'+id, medicamentPlan);
//sala7 l url kif swagger 

  }
}
