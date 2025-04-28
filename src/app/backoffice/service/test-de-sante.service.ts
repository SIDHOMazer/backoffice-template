import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { testDeSante } from '../model/testDeSante';

@Injectable({
  providedIn: 'root'
})
export class TestDeSanteService {

   baseUrl = 'http://localhost:8082/api/arsii';
        
          constructor(private httpclient:HttpClient) { }
          getAllTestDeSantes(){
            return this.httpclient.get<testDeSante[]>(
              this.baseUrl + '/testDeSante'
            );
        }
        getTestDeSanteById(id : any) {
            return this.httpclient.get<testDeSante[]>(
              this.baseUrl+'/testDeSante/'+id
            );
          }
        
          addTestDeSante(testDeSante: testDeSante) {
            return this.httpclient.post(this.baseUrl + '/testDeSante', testDeSante);
          }
        
          updateTestDeSante(id:any,testDeSante: testDeSante) {
            return this.httpclient.put(this.baseUrl + '/testDeSante/'+id, testDeSante);
          }
}
