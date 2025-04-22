import { Routes } from '@angular/router';
import { DocteurComponent } from './docteur/docteur/docteur.component';
import { DetailsDoctorComponent } from './docteur/details-doctor/details-doctor.component';
import { AdminComponent } from './admin/admin.component';
import { DetailsAdminComponent } from './admin/details-admin/details-admin.component';
import { PatientComponent } from './patient/patient/patient.component';
import { DetailsPatientComponent } from './patient/details-patient/details-patient.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { DetailsRendezvousComponent } from './rendezvous/details-rendezvous/details-rendezvous.component';
import { RapportComponent } from './rapport/rapport/rapport.component';
import { DetailsReportComponent } from './rapport/details-report/details-report.component';
import { PlanDeTraitementComponent } from './plan-de-traitement/plan-de-traitement.component';
import { DetailsPlanDeTraitementComponent } from './plan-de-traitement/details-plan-de-traitement/details-plan-de-traitement.component';
import { DetailsRapportComponent } from './detailsRapport/details-rapport/details-rapport.component';
import { DetailsDetailsRapprotComponent } from './detailsRapport/details-details-rapprot/details-details-rapprot.component';
import { DetailsExerciceComponent } from './exercice/details-exercice/details-exercice.component';
import { ExerciceComponent } from './exercice/exercice.component';
import { ExerciceplanComponent } from './exerciceplan/exerciceplan.component';
import { DetailsExerciceplanComponent } from './exerciceplan/details-exerciceplan/details-exerciceplan.component';
import { FactureComponent } from './facture/facture.component';
import { DetailsFactureComponent } from './facture/details-facture/details-facture.component';


export default [
   
    { path: 'admin', data: { breadcrumb: 'admin' }, component: AdminComponent },
    { path: 'details-admin/:id', data: { breadcrumb: 'details-admin/:id' }, component: DetailsAdminComponent },

    { path: 'doctor', data: { breadcrumb: 'doctor' }, component: DocteurComponent },
    { path: 'details-doctor/:id', data: { breadcrumb: 'details-doctor/:id' }, component: DetailsDoctorComponent },

    { path: 'patient', data: { breadcrumb: 'patient' }, component: PatientComponent },
    { path: 'details-patient/:id', data: { breadcrumb: 'details-patient/:id' }, component: DetailsPatientComponent },

    { path: 'rendezvous', data: { breadcrumb: 'rendezvous' }, component: RendezvousComponent },
    { path: 'details-rendezvous/:id', data: { breadcrumb: 'details-rendezvous/:id' }, component: DetailsRendezvousComponent },

    { path: 'rapport', data: { breadcrumb: 'rapport' }, component: RapportComponent },
    { path: 'details-report/:id', data: { breadcrumb: 'details-report/:id' }, component: DetailsReportComponent },

    { path: 'planDeTraitement', data: { breadcrumb: 'planDeTraitement' }, component: PlanDeTraitementComponent },
    { path: 'details-planDeTraitement/:id', data: { breadcrumb: 'details-planDeTraitement/:id' }, component: DetailsPlanDeTraitementComponent },

    { path: 'detailRapport', data: { breadcrumb: 'detailRapport' }, component: DetailsRapportComponent },
    { path: 'detailsRapport/:id', data: { breadcrumb: 'detailsRapport/:id' }, component: DetailsDetailsRapprotComponent },
    
    { path: 'exercice', data: { breadcrumb: 'exercice' }, component: ExerciceComponent },
    { path: 'details-exercice/:id', data: { breadcrumb: 'details-exercice/:id' }, component: DetailsExerciceComponent },

    { path: 'exercicePlan', data: { breadcrumb: 'exercicePlan' }, component: ExerciceplanComponent },
    { path: 'details-exercicePlan/:id', data: { breadcrumb: 'details-exercicePlan/:id' }, component: DetailsExerciceplanComponent },

    { path: 'facture', data: { breadcrumb: 'facture' }, component: FactureComponent },
    { path: 'details-facture/:id', data: { breadcrumb: 'details-facture/:id' }, component: DetailsFactureComponent },




  //  { path: '**', redirectTo: '/notfound' }
] as Routes;
