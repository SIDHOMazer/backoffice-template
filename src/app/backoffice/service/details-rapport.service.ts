import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetailsRapport } from '../model/detailsRaport';

@Injectable({
  providedIn: 'root'
})
export class DetailsRapportService {
 addDetailsRapport: any;
  getDetailsRapportById: any;
  updateDetailsRapport: any;

  constructor(private httpclient:HttpClient) { }
  getAllDetailsRapports(){
    return this.httpclient.get<DetailsRapport[]>(
      'http://localhost:8082/api/arsii/detailReport'
    );
}
}
