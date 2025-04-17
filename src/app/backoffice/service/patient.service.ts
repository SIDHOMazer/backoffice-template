import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  getPatientById: any;
  addPatient: any;
  updatePatient: any;

  constructor(private httpclient:HttpClient) { }
  getAllPatient(){
    return this.httpclient.get<Patient[]>(
      'http://localhost:8082/api/arsii/patient'

    );
  }
  
}
