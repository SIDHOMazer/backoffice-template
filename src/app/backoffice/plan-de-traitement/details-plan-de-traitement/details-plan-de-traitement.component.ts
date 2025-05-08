import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlanDeTraitementService } from '../../service/plan-de-traitement.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { TestDeSanteplanService } from '../../service/test-de-santeplan.service';
import { MedicamentService } from '../../service/medicament.service';
import { ExerciceService } from '../../service/exercice.service';
import { TestDeSanteService } from '../../service/test-de-sante.service';
import { DocteurService } from '../../service/docteur.service';
import { PatientService } from '../../service/patient.service';
import { SelectModule } from 'primeng/select';
import { RippleModule } from 'primeng/ripple';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormConfirmationService } from '../../service/form-confirmation.service';

@Component({
    selector: 'app-details-plan-de-traitement',
    templateUrl: './details-plan-de-traitement.component.html',
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule,
        SelectModule, 
        ReactiveFormsModule, 
        InputTextModule, 
        ButtonModule, 
        CheckboxModule, 
        PanelModule, 
        AccordionModule,
        RippleModule,
        ConfirmDialogModule,
        ToastModule,
        RouterLink
    ],
    providers: [ConfirmationService, MessageService],
    styleUrls: ['./details-plan-de-traitement.component.css']
})
export class DetailsPlanDeTraitementComponent implements OnInit {
    //   planDeTraitementForm: FormGroup;
    //   planDeTraitementId: any;
    testDeSantList: any = [];
    //   testDeSanteplanservice: any;
    medicamentList: any = [];

    //   medicamentplanservice: any;
    exerciceList: any = [];
  patientList :any;
  docteurList: any;
    //   exerciceplanservice: any;

    //    constructor(
    //      private fb: FormBuilder,
    //      private planDeTraitementService: PlanDeTraitementService,
    //      private router: Router,
    //      private route: ActivatedRoute
    //    ) {

    //      this.planDeTraitementForm = this.fb.group({

    //      });
    //    }

    //    ngOnInit(): void {
    //      this.planDeTraitementId = this.route.snapshot.paramMap.get('id');
    //       this.displayTestDeSanteplan();
    //       this.displayMedicamentplan();
    //       this.displayExerciceplan();
    //      if (this.planDeTraitementId != 'null') {
    //        this.displayPlanDeTraitement(this.planDeTraitementId);

    //      }

    //    }

    //    displayPlanDeTraitement(id: any) {
    //      this.planDeTraitementService.getPlanDeTraitementById(id).subscribe((res:any) => {
    //        this.planDeTraitementForm.patchValue(res);
    //        console.log(this.planDeTraitementForm.value);
    //      });
    //    }

    //    onSubmit(): void {
    //      if (this.planDeTraitementForm.valid) {
    //        if (this.planDeTraitementId != 'null') {
    //          this.updatePlanDeTraitement()
    //        }else{
    //          this.planDeTraitementService
    //            .addPlanDeTraitement(this.planDeTraitementForm.value)
    //            .subscribe((res:any) => {
    //              console.log(res);
    //              this.planDeTraitementForm.reset();
    //              this.router.navigate(['/backoffice/planDeTraitement']);
    //            });
    //        }
    //      }
    //    }

    //    updatePlanDeTraitement() {
    //      if (this.planDeTraitementForm.valid) {
    //        console.log(this.planDeTraitementForm.value);
    //        this.planDeTraitementService.updatePlanDeTraitement(this.planDeTraitementId,this.planDeTraitementForm.value).subscribe((res:any) => {
    //          console.log(res);
    //          this.planDeTraitementForm.reset();
    //     this.router.navigate(['/backoffice/planDeTraitement']);
    //        });
    //      }
    //    }

    ngOnInit(): void {
      this.displayTestDeSanteplan();
      this.displayMedicamentplan();
      this.displayExerciceplan();
      this.displayPatient();
      this.displayDocteur();
        //        this.displayPlanDeTraitement();
    }
    planForm: any;

    constructor(
        private fb: FormBuilder,
        private planDeTraitementService: PlanDeTraitementService,
        private router: Router,
        private route: ActivatedRoute,
        private testDeSanteservice: TestDeSanteService,
        private medicamentservice: MedicamentService,
        private exerciceservice: ExerciceService,
        private docteurService:DocteurService,
        private patientservice:PatientService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private formConfirmationService: FormConfirmationService
    ) {
        this.planForm = this.fb.group({
            patientId: ['', Validators.required],
            docteurId: ['', Validators.required],
            objectif: [''],
            dateDebut: [''],
            dateFin: [''],
            exercicePlans: this.fb.array([]),
            medicamentPlans: this.fb.array([]),
            testDeSantePlans: this.fb.array([]),
        });
      
        this.addExercicePlan(); // Add one by default
        this.addMedicamentPlan();
        this.addTestDeSantePlan();
    }

    get exercicePlans(): FormArray {
        return this.planForm.get('exercicePlans') as FormArray;
    }

    get medicamentPlans(): FormArray<FormGroup> {
  return this.planForm.get('medicamentPlans') as FormArray<FormGroup>;
}


    get testDeSantePlans(): FormArray {
        return this.planForm.get('testDeSantePlans') as FormArray;
    }

    exercicePlansForm(i: number): FormGroup {
        return this.planForm.get('exercicePlans').controls[i] as FormGroup;
    }

    medicamentPlansForm(i: number): FormGroup {
        return this.planForm.get('medicamentPlans').controls[i] as FormGroup;
    }
    testDeSantePlansForm(i: number): FormGroup {
        return this.planForm.get('testDeSantePlans').controls[i] as FormGroup;
    }

    addExercicePlan() {
        const group = this.fb.group({
            seance: [''],
            seriesAndRepetition: [''],
            muscles: [''],
            duree: [''],
            jour: [''],
            exerciceId: [''],
            type: ['']
        });
        this.exercicePlans.push(group);
    }

    displayTestDeSanteplan() {
        this.testDeSanteservice.getAllTestDeSantes().subscribe((res: any) => {
            this.testDeSantList = res;
            console.log(this.testDeSantList);
        });
    }
    displayMedicamentplan() {
        this.medicamentservice.getAllMedicaments().subscribe((res: any) => {
            this.medicamentList = res;
            console.log(this.medicamentList);
        });
    }
    displayExerciceplan() {
        this.exerciceservice.getAllExercices().subscribe((res: any) => {
            this.exerciceList = res;
            console.log(this.exerciceList);
        });
    }

    displayPatient() {
      this.patientservice.getAllPatients().subscribe((res)=>{
        this.patientList = res;
        console.log(this.patientList);
      });
    }

    displayDocteur() {
      this.docteurService.getAllDocteur().subscribe((res:any)=>{
        this.docteurList = res;
        console.log(this.docteurList);
      });
    }

    addMedicamentPlan() {
        const group = this.fb.group({
            dosage: [''],
            frequence: [''],
            momentOfTaking: [''],
            medicamentId: ['']
        });
        this.medicamentPlans.push(group);
    }

    addTestDeSantePlan() {
        const group = this.fb.group({
            poids: [''],
            taille: [''],
            checkbok: [false],
            testDeSanteId: ['']
        });
        this.testDeSantePlans.push(group);
    }

    removeExercicePlan(index: number) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this exercise plan?',
            accept: () => {
                this.exercicePlans.removeAt(index);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Exercise plan removed' });
            }
        });
    }

    removeMedicamentPlan(index: number) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this medication plan?',
            accept: () => {
                this.medicamentPlans.removeAt(index);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Medication plan removed' });
            }
        });
    }

    removeTestDeSantePlan(index: number) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this health test plan?',
            accept: () => {
                this.testDeSantePlans.removeAt(index);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Health test plan removed' });
            }
        });
    }

    async submit() {
        if (this.planForm.valid) {
            const confirmed = await this.formConfirmationService.confirmSubmit();
            if (confirmed) {
                this.planDeTraitementService.addPlanDeTraitement(this.planForm.value).subscribe((res: any) => { 
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Treatment plan saved successfully' });
                    this.planForm.reset();
                    this.router.navigate(['/backoffice/planDeTraitement']);
                });
            }
        } else {
            this.planForm.markAllAsTouched();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
        }
    }
}
