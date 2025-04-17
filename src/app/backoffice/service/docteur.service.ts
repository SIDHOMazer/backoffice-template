import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Docteur } from '../model/docteur';

@Injectable({
  providedIn: 'root'
})
export class DocteurService {
  baseUrl = 'http://localhost:8082/api/arsii';
  getPatientById: any;
  addPatient: any;
  updatePatient: any;
  constructor(private httpclient:HttpClient) { }
  getAllDocteur(){
    return this.httpclient.get<Docteur[]>(
      this.baseUrl+'/docteur'
    );
  }

  getDocteurById(id : any) {
    return this.httpclient.get<Docteur[]>(
      this.baseUrl+'/docteur/'+id
    );
  }

  addDoctor(docteur: Docteur) {
    return this.httpclient.post(this.baseUrl + '/docteur', docteur);
  }

  updateDoctor(id:any,docteur: Docteur) {
    return this.httpclient.put(this.baseUrl + '/docteur/'+id, docteur);
  }
}
