import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl = 'http://localhost:8082/api/arsii';
   
     constructor(private httpclient:HttpClient) { }
     getAllPatients(){
       return this.httpclient.get<Patient[]>(
         this.baseUrl + '/patient'
       );
   }
   getPatientById(id : any) {
       return this.httpclient.get<Patient[]>(
         this.baseUrl+'/patient/'+id
       );
     }
   
     addPatient(patient: Patient) {
       return this.httpclient.post(this.baseUrl + '/patient', patient);
     }
   
     updatePatient(id:any,patient: Patient) {
       return this.httpclient.put(this.baseUrl + '/patient/'+id, patient);
     }
  
}
