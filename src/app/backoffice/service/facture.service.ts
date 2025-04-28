import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Facture } from '../model/facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

 baseUrl = 'http://localhost:8082/api/arsii';
 
   constructor(private httpclient:HttpClient) { }
   getAllFactures(){
     return this.httpclient.get<Facture[]>(
       this.baseUrl + '/facture'
     );
 }
 getFactureById(id : any) {
     return this.httpclient.get<Facture[]>(
       this.baseUrl+'/facture/'+id
     );
   }
 
   addFacture(facture: Facture) {
     return this.httpclient.post(this.baseUrl + '/facture', facture);
   }
 
   updateFacture(id:any,facture: Facture) {
     return this.httpclient.put(this.baseUrl + '/facture/'+id, facture);
   }
}
