import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../model/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
 
  baseUrl = 'http://localhost:8082/api/arsii';

  constructor(private httpclient:HttpClient) { }
  getAllAdmins(){
    return this.httpclient.get<Admin[]>(
      this.baseUrl + '/admin'
    );
}
getAdminById(id : any) {
    return this.httpclient.get<Admin[]>(
      this.baseUrl+'/admin/'+id
    );
  }

  addAdmin(admin: Admin) {
    return this.httpclient.post(this.baseUrl + '/admin', admin);
  }

  updateAdmin(id:any,admin: Admin) {
    return this.httpclient.put(this.baseUrl + '/admin/'+id, admin);
  }
}


