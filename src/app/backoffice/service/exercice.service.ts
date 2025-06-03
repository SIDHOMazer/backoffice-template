import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercice } from '../model/exercice';
import { mergeMap } from 'rxjs';

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
 
  //  addExercice(exercice: Exercice) {
  //    return this.httpclient.post(this.baseUrl + '/exercice', exercice);
  //  }
 
  //  updateExercice(id:any,exercice: Exercice) {
  //    return this.httpclient.put(this.baseUrl + '/exercice/'+id, exercice);
  //  }

  addExercice(exercice: Exercice) {
    if (exercice.file && exercice.file.length != 0) {
      return this.uploadFile(exercice.file).pipe(
        mergeMap((result: any) => {
          const reqData = {
            ...exercice,
         file: result.filename,
          };
           return this.httpclient.post(this.baseUrl + '/exercice',
            reqData
          );
        })
      );
    } else {
      return this.httpclient.post(this.baseUrl + '/exercice', exercice);
    }
  }

 updateExercice(id:any,exercice: Exercice) {
    if (exercice.file && exercice.file.length != 0) {
      return this.uploadFile(exercice.file).pipe(
        mergeMap((result: any) => {
          const reqData = {
            ...exercice,
            file: result.filename,
          };
          return this.httpclient.put(
            this.baseUrl + '/exercice/'+id,
            reqData
          );
        })
      );
    } else {
      return this.httpclient.put(
            this.baseUrl + '/exercice/'+id,
        exercice
      );
    }
  }

     uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpclient.post(
      this.baseUrl + '/upload/image',
      formData
    );
  }

}
