import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceplanService } from '../../service/exerciceplan.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormConfirmationService } from '../../service/form-confirmation.service';
import { ExerciceService } from '../../service/exercice.service';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-details-exerciceplan',
  templateUrl: './details-exerciceplan.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,  PanelModule,
    AccordionModule,
    SelectButtonModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class DetailsExerciceplanComponent {
  exerciceplanForm: FormGroup;
  exerciceplanId: any;
  exerciceList: any[] = [];
   idPlan: any;
  selectedImage: any;
      statusOptions = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
  ];


  constructor(
    private fb: FormBuilder,
    private exerciceplanService: ExerciceplanService,
    private router: Router,
    private route: ActivatedRoute,
    private formConfirmationService: FormConfirmationService,
    private messageService: MessageService,
     private exerciceService: ExerciceService     
  ) {
    this.exerciceplanForm = this.fb.group({
      seance: ['', Validators.required],
      seriesAndRepetition: ['', Validators.required],
      muscles: ['', Validators.required],
      duree: ['', [Validators.required, Validators.min(0)]],
      jour: ['', Validators.required],
      type: ['', Validators.required],
    //  exercicePlans: this.fb.array([]),
      exerciceId: ['',Validators.required],
      status: ['true']
    });
  }
   get exercicePlans(): FormArray {
    return this.exerciceplanForm.get('exercicePlans') as FormArray;
  }

  exercicePlansForm(index: number): FormGroup {
    return this.exercicePlans.at(index) as FormGroup;
  }

 


  ngOnInit(): void {
    this.exerciceplanId = this.route.snapshot.paramMap.get('id');
          this.idPlan= this.route.snapshot.paramMap.get('idPlan');

     this.displayExercice()
    if (this.exerciceplanId != 'null') {
      this.displayExerciceplan(this.exerciceplanId);
    }
  }
   

  displayExerciceplan(id: any) {
    this.exerciceplanService.getExerciceplanById(id).subscribe((res:any) => {
      this.exerciceplanForm.patchValue(res);
    });
  }

   displayExercice() {
        this.exerciceService.getAllExercices().subscribe((res: any) => {
            this.exerciceList = res;
            console.log(this.exerciceList);
        });
    }

  async onSubmit(): Promise<void> {
    if (this.exerciceplanForm.valid) {
      const confirmed = await this.formConfirmationService.confirmSubmit();
      if (confirmed) {
        if (this.exerciceplanId != 'null') {
          this.updateExerciceplan();
        } else {
          this.exerciceplanService.addExerciceplan({...this.exerciceplanForm.value,plandeTraitementId:this.idPlan}).subscribe((res:any) => {

        //  this.exerciceplanService.addExerciceplan(this.exerciceplanForm.value).subscribe((res:any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Exercise plan saved successfully' });
            this.exerciceplanForm.reset();
           this.router.navigate(['/backoffice/plan/'+this.idPlan+'/exercicePlan']);
       });
        }
      }
    }
  }



  updateExerciceplan() {
    if (this.exerciceplanForm.valid) {
      this.exerciceplanService.updateExerciceplan(this.exerciceplanId, this.exerciceplanForm.value).subscribe((res:any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Exercise plan updated successfully' });
        this.exerciceplanForm.reset();
        this.router.navigate(['/backoffice/plan/'+this.idPlan+'/exercicePlan']);
      });
    }
  }
}
