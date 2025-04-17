import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExercicePlan } from '../model/exerciceplan';

@Injectable({
  providedIn: 'root'
})
export class ExerciceplanService {
addExerciceplan: any;
  getExerciceplanById: any;
  updateExerciceplan: any;

  constructor(private httpclient:HttpClient) { }
  getAllExerciceplans(){
    return this.httpclient.get<ExercicePlan[]>(
      'http://localhost:8082/api/arsii/exercicePlan'
    );
}
}
