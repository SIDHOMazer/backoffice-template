import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercice } from '../model/exercice';

@Injectable({
  providedIn: 'root'
})
export class ExerciceService {
addExercice: any;
  getExerciceById: any;
  updateExercice: any;

  constructor(private httpclient:HttpClient) { }
  getAllExercices(){
    return this.httpclient.get<Exercice[]>(
      'http://localhost:8082/api/arsii/exercice'
    );
}
}
