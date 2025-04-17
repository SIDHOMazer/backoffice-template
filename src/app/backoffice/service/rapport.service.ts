import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RapportService {
    addRapport: any;
     getRapportById: any;
     updateRapport: any;
   
     constructor(private httpclient:HttpClient) { }
     getAllRapport(){
       return this.httpclient.get<Report[]>(
         'http://localhost:8082/api/arsii/report'

       );
   }

}
