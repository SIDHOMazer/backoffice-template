import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs';
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
        
          // addTestDeSante(testDeSante: testDeSante) {
          //   return this.httpclient.post(this.baseUrl + '/testDeSante', testDeSante);
          // }
        
          // updateTestDeSante(id:any,testDeSante: testDeSante) {
          //   return this.httpclient.put(this.baseUrl + '/testDeSante/'+id, testDeSante);
          // }
           addTestDeSante(testDeSante: testDeSante) {
                if (testDeSante.file && testDeSante.file.length != 0) {
                  return this.uploadFile(testDeSante.file).pipe(
                    mergeMap((result: any) => {
                      const reqData = {
                        ...testDeSante,
                     file: result.filename,
                      };
                       return this.httpclient.post(this.baseUrl + '/testDeSante',
                        reqData
                      );
                    })
                  );
                } else {
                  return this.httpclient.post(this.baseUrl + '/testDeSante', testDeSante);
                }
              }
          updateTestDeSante(id:any,testDeSante: testDeSante) {
                if (testDeSante.file && testDeSante.file.length != 0) {
                  return this.uploadFile(testDeSante.file).pipe(
                    mergeMap((result: any) => {
                      const reqData = {
                        ...testDeSante,
                        file: result.filename,
                      };
                      return this.httpclient.put(
                        this.baseUrl + '/testDeSante/'+id,
                        reqData
                      );
                    })
                  );
                } else {
                  return this.httpclient.put(
                        this.baseUrl + '/testDeSante/'+id,
                    testDeSante
                  );
                }
              }
            
                 uploadFile(file: File) {
                const formData = new FormData();
                formData.append('file', file);
                return this.httpclient.post(
                  this.baseUrl + '/upload/image',
                  formData
                );
              }
}
