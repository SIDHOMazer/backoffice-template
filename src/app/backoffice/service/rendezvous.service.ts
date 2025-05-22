import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rendezvous } from '../model/rendezvous';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

   baseUrl = 'http://localhost:8082/api/arsii';
     
       constructor(private httpclient:HttpClient) { }
       getAllRendezvous(){
         return this.httpclient.get<Rendezvous[]>(
           this.baseUrl + '/rendezvous'
         );
     }
     getRendezvousById(id : any) {
         return this.httpclient.get<Rendezvous[]>(
           this.baseUrl+'/rendezvous/'+id
         );
       }
     
       addRendezvous(rendezvous: Rendezvous) {
         return this.httpclient.post(this.baseUrl + '/rendezvous', rendezvous);
       }
        getRendezvousByIdDoctor(id: any) {
               return this.httpclient.get<Rendezvous[]>(this.baseUrl + '/rendezvous/docteur/' + id);
           }
     
       updateRendezvous(id:any,rendezvous: any) {
         return this.httpclient.put(this.baseUrl + '/rendezvous/'+id, rendezvous);
       }
}
