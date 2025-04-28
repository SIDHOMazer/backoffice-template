import { Injectable } from '@angular/core';
import { testDeSanteplan } from '../model/testDeSanteplan';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestDeSanteplanService {
baseUrl = 'http://localhost:8082/api/arsii';
        
          constructor(private httpclient:HttpClient) { }
          getAllTestDeSanteplans(){
            return this.httpclient.get<testDeSanteplan[]>(
              this.baseUrl + '/testDeSantePlan'
            );
        }
        getTestDeSanteplanById(id : any) {
            return this.httpclient.get<testDeSanteplan[]>(
              this.baseUrl+'/testDeSantePlan/'+id
            );
          }
        
          addTestDeSanteplan(testDeSantePlan: testDeSanteplan) {
            return this.httpclient.post(this.baseUrl + '/testDeSantePlan', testDeSantePlan);
          }
        
          updateTestDeSanteplan(id:any,testDeSantePlan: testDeSanteplan) {
            return this.httpclient.put(this.baseUrl + '/testDeSantePlan/'+id, testDeSantePlan);
          }
}
