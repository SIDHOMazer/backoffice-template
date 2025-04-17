import { Injectable } from '@angular/core';
import { PlanDeTraitement } from '../model/planDeTraitement';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanDeTraitementService {

 addPlanDeTraitement: any;
  getPlanDeTraitementById: any;
  updatePlanDeTraitement: any;

  constructor(private httpclient:HttpClient) { }
  getAllPlanDeTraitements(){
    return this.httpclient.get<PlanDeTraitement[]>(
      'http://localhost:8082/api/arsii/plandetraitement'
    );
}
}
