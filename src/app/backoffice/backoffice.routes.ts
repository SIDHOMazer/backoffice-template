import { Routes } from '@angular/router';
import { DocteurComponent } from './docteur/docteur/docteur.component';
import { DetailsDoctorComponent } from './docteur/details-doctor/details-doctor.component';
import { AdminComponent } from './admin/admin.component';
import { DetailsAdminComponent } from './admin/details-admin/details-admin.component';


export default [
   
    { path: 'admin', data: { breadcrumb: 'admin' }, component: AdminComponent },
    { path: 'details-admin/:id', data: { breadcrumb: 'details-admin/:id' }, component: DetailsAdminComponent },
    { path: 'doctor', data: { breadcrumb: 'doctor' }, component: DocteurComponent },
    { path: 'details-doctor/:id', data: { breadcrumb: 'details-doctor/:id' }, component: DetailsDoctorComponent },
  //  { path: '**', redirectTo: '/notfound' }
] as Routes;
