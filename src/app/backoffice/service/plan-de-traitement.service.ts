import { Injectable } from '@angular/core';
import { PlanDeTraitement } from '../model/planDeTraitement';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanDeTraitementService {

 baseUrl = 'http://localhost:8082/api/arsii';
  
    constructor(private httpclient:HttpClient) { }
    getAllPlanDeTraitements(){
      return this.httpclient.get<PlanDeTraitement[]>(
        this.baseUrl + '/planDeTraitement'
      );
  }
  getPlanDeTraitementById(id : any) {
      return this.httpclient.get<PlanDeTraitement[]>(
        this.baseUrl+'/planDeTraitement/'+id
      );
    }
  
    addPlanDeTraitement(planDeTraitement: PlanDeTraitement) {
      return this.httpclient.post(this.baseUrl + '/planDeTraitement', planDeTraitement);
    }
  
    updatePlanDeTraitement(id:any,planDeTraitement: PlanDeTraitement) {
      return this.httpclient.put(this.baseUrl + '/planDeTraitement/'+id, planDeTraitement);
    }
}
