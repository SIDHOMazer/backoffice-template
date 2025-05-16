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
import { FactureComponent } from './facture/facture.component';
import { DetailsFactureComponent } from './facture/details-facture/details-facture.component';
import { ExerciceplanComponent } from './exerciceplan/exerciceplan.component';
import { DetailsExerciceplanComponent } from './exerciceplan/details-exerciceplan/details-exerciceplan.component';
import { MedicamentComponent } from './medicament/medicament.component';
import { DetailsMedicamentComponent } from './medicament/details-medicament/details-medicament.component';
import { MedicamentplanComponent } from './medicamentplan/medicamentplan.component';
import { DetailsMedicamentplanComponent } from './medicamentplan/details-medicamentplan/details-medicamentplan.component';
import { TestDeSanteComponent } from './test-de-sante/test-de-sante.component';
import { DetailsTestDeSanteComponent } from './test-de-sante/details-test-de-sante/details-test-de-sante.component';
import { TestDeSanteplanComponent } from './test-de-santeplan/test-de-santeplan.component';
import { DetailsTestDeSanteplanComponent } from './test-de-santeplan/details-test-de-santeplan/details-test-de-santeplan.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';


export default [
   
    { path: 'admin', data: { breadcrumb: 'admin' }, component: AdminComponent },
    { path: 'details-admin/:id', data: { breadcrumb: 'details-admin/:id' }, component: DetailsAdminComponent },

    { path: 'doctor', data: { breadcrumb: 'doctor' }, component: DocteurComponent },
    { path: 'details-doctor/:id', data: { breadcrumb: 'details-doctor/:id' }, component: DetailsDoctorComponent },

    { path: 'patient', data: { breadcrumb: 'patient' }, component: PatientComponent },
    { path: 'details-patient/:id', data: { breadcrumb: 'details-patient/:id' }, component: DetailsPatientComponent },

    { path: 'rendezvous', data: { breadcrumb: 'rendezvous' }, component: RendezvousComponent },
    { path: 'details-rendezvous/:id', data: { breadcrumb: 'details-rendezvous/:id' }, component: DetailsRendezvousComponent },

    { path: 'rapport/:id', data: { breadcrumb: 'rapport/:id' }, component: RapportComponent },
    { path: 'details-report/:id', data: { breadcrumb: 'details-report/:id' }, component: DetailsReportComponent },

    { path: 'planDeTraitement', data: { breadcrumb: 'planDeTraitement' }, component: PlanDeTraitementComponent },
    { path: 'details-planDeTraitement/:id', data: { breadcrumb: 'details-planDeTraitement/:id' }, component: DetailsPlanDeTraitementComponent },

    { path: 'rapport/:idRapport/detailsRapport', data: { breadcrumb: 'detailsRapport/:report' }, component: DetailsRapportComponent },
    { path: 'rapport/:idRapport/detailsRapport/details/:id', data: { breadcrumb: 'detailsRapport/:id' }, component: DetailsDetailsRapprotComponent },
    
    { path: 'exercice', data: { breadcrumb: 'exercice' }, component: ExerciceComponent },
    { path: 'details-exercice/:id', data: { breadcrumb: 'details-exercice/:id' }, component: DetailsExerciceComponent },

    { path: 'plan/:idPlan/exercicePlan', data: { breadcrumb: 'exercicePlan' }, component: ExerciceplanComponent },
    { path: 'plan/:idPlan/exercicePlan/details-exercicePlan/:id', data: { breadcrumb: 'details-exercicePlan/:id' }, component: DetailsExerciceplanComponent },

    { path: 'facture', data: { breadcrumb: 'facture' }, component: FactureComponent },
    { path: 'details-facture/:id', data: { breadcrumb: 'details-facture/:id' }, component: DetailsFactureComponent },

    { path: 'medicament', data: { breadcrumb: 'medicament' }, component: MedicamentComponent },
    { path: 'details-medicament/:id', data: { breadcrumb: 'details-medicament/:id' }, component: DetailsMedicamentComponent },

    //old
   // { path: 'medicamentplan', data: { breadcrumb: 'medicamentplan' }, component: MedicamentplanComponent },
   // { path: 'details-medicamentplan/:id', data: { breadcrumb: 'details-medicamentplan/:id' }, component: DetailsMedicamentplanComponent },
    //new
   { path: 'plan/:idPlan/medicamentplan', data: { breadcrumb: 'medicamentplan' }, component: MedicamentplanComponent },
    { path: 'plan/:idPlan/medicamentplan/details-medicamentplan/:id', data: { breadcrumb: 'details-medicamentplan/:id' }, component: DetailsMedicamentplanComponent },



    { path: 'testDeSante', data: { breadcrumb: 'testDeSante' }, component: TestDeSanteComponent },
    { path: 'details-testDeSante/:id', data: { breadcrumb: 'details-testDeSante/:id' }, component: DetailsTestDeSanteComponent },

     { path: 'plan/:idPlan/testDeSanteplan', data: { breadcrumb: 'testDeSanteplan' }, component: TestDeSanteplanComponent },
     { path: 'plan/:idPlan/testDeSanteplan/details-testDeSanteplan/:id', data: { breadcrumb: 'details-testDeSanteplan/:id' }, component: DetailsTestDeSanteplanComponent },

   // { path: '', redirectTo: '/login', pathMatch: 'full' },
   // { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', redirectTo: '/login' }

   
] as Routes;
