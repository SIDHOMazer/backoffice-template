import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicament } from '../model/medicament';
import { mergeMap } from 'rxjs';

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

  // addMedicament(medicament: Medicament) {
  //   return this.httpclient.post(this.baseUrl + '/medicament', medicament);
  // }

  // updateMedicament(id:any,medicament: Medicament) {
  //   return this.httpclient.put(this.baseUrl + '/medicament/'+id, medicament);
  // }
  
    addMedicament(medicament: Medicament) {
      if (medicament.file && medicament.file.length != 0) {
        return this.uploadFile(medicament.file).pipe(
          mergeMap((result: any) => {
            const reqData = {
              ...medicament,
           file: result.filename,
            };
             return this.httpclient.post(this.baseUrl + '/medicament',
              reqData
            );
          })
        );
      } else {
        return this.httpclient.post(this.baseUrl + '/medicament', medicament);
      }
    }
  
   updateMedicament(id:any,medicament: Medicament) {
      if (medicament.file && medicament.file.length != 0) {
        return this.uploadFile(medicament.file).pipe(
          mergeMap((result: any) => {
            const reqData = {
              ...medicament,
              file: result.filename,
            };
            return this.httpclient.put(
              this.baseUrl + '/medicament/'+id,
              reqData
            );
          })
        );
      } else {
        return this.httpclient.put(
              this.baseUrl + '/medicament/'+id,
          medicament
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
