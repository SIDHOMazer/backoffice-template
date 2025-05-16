import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetailsRapport } from '../model/detailsRaport';

@Injectable({
  providedIn: 'root'
})
export class DetailsRapportService {
  baseUrl = 'http://localhost:8082/api/arsii';
 
   constructor(private httpclient:HttpClient) { }
   getAllDetailsRapports(){
     return this.httpclient.get<DetailsRapport[]>(
       this.baseUrl + '/detailReport'
     );

     
 }

  getAllDetailsRapportsByRapport(rapportId: any) {
     return this.httpclient.get<DetailsRapport[]>(
       this.baseUrl + '/detailReport'
     );
    }
 getDetailsRapportById(id : any) {
     return this.httpclient.get<DetailsRapport[]>(
       this.baseUrl+'/detailReport/'+id
     );
   }
 
   addDetailsRapport(detailRapport: DetailsRapport) {
     return this.httpclient.post(this.baseUrl + '/detailReport', detailRapport);
   }
 
   updateDetailsRapport(id:any,detailRapport: DetailsRapport) {
     return this.httpclient.put(this.baseUrl + '/detailReport/'+id, detailRapport);
   }
 }
 
 


