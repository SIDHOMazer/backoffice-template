import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercice } from '../model/exercice';

@Injectable({
  providedIn: 'root'
})
export class ExerciceService {
 baseUrl = 'http://localhost:8082/api/arsii';
 
   constructor(private httpclient:HttpClient) { }
   getAllExercices(){
     return this.httpclient.get<Exercice[]>(
       this.baseUrl + '/exercice'
     );
 }
 getExerciceById(id : any) {
     return this.httpclient.get<Exercice[]>(
       this.baseUrl+'/exercice/'+id
     );
   }
 
   addExercice(exercice: Exercice) {
     return this.httpclient.post(this.baseUrl + '/exercice', exercice);
   }
 
   updateExercice(id:any,exercice: Exercice) {
     return this.httpclient.put(this.baseUrl + '/exercice/'+id, exercice);
   }
}
