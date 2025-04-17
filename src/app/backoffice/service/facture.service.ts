import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Facture } from '../model/facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

 addFacture: any;
  getFactureById: any;
  updateFacture: any;

  constructor(private httpclient:HttpClient) { }
  getAllFactures(){
    return this.httpclient.get<Facture[]>(
      'http://localhost:8082/api/arsii/facture'
    );
}
}
