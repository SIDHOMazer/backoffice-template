import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExercicePlan } from '../model/exerciceplan';

@Injectable({
  providedIn: 'root'
})
export class ExerciceplanService {
 baseUrl = 'http://localhost:8082/api/arsii';

  constructor(private httpclient:HttpClient) { }
  getAllExerciceplans(idPlan:any){
    return this.httpclient.get<ExercicePlan[]>(
       this.baseUrl + '/exercicePlan/plan/'+idPlan
     );
}
getExerciceplanById(id : any) {
    return this.httpclient.get<ExercicePlan[]>(
      this.baseUrl+'/exercicePlan/'+id
    );
  }

  addExerciceplan(exercicePlan: ExercicePlan) {
    return this.httpclient.post(this.baseUrl + '/exercicePlan', exercicePlan);
  }

  updateExerciceplan(id:any,exercicePlan: ExercicePlan) {
    return this.httpclient.put(this.baseUrl + '/exercicePlan/'+id, exercicePlan);
  }
}
