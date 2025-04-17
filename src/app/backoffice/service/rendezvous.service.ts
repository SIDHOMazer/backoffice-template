import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rendezvous } from '../model/rendezvous';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

   addRendezvous: any;
    getRendezvousById: any;
    updateRendezvous: any;
  
    constructor(private httpclient:HttpClient) { }
    getAllRendezvous(){
      return this.httpclient.get<Rendezvous[]>(
        'http://localhost:8082/api/arsii/rendezvous'
      );
  }
}
