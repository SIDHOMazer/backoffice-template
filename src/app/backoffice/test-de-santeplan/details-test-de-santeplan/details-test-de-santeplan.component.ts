import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestDeSanteplanService } from '../../service/test-de-santeplan.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormConfirmationService } from '../../service/form-confirmation.service';
import { DropdownModule } from 'primeng/dropdown';
import { TestDeSanteService } from '../../service/test-de-sante.service';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-details-test-de-santeplan',
  templateUrl: './details-test-de-santeplan.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    CalendarModule,
    ConfirmDialogModule,
    ToastModule,DropdownModule,
    SelectButtonModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class DetailsTestDeSanteplanComponent {
  testDeSanteplanForm: FormGroup;
  testDeSanteplanId: any;
     idPlan: any;

 testDeSantList: any[] = [];
    statusOptions = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
  ];

  constructor(
    private fb: FormBuilder,
    private testDeSanteplanService: TestDeSanteplanService,
    private router: Router,
    private route: ActivatedRoute,
    private formConfirmationService: FormConfirmationService,
    private messageService: MessageService,
    private testDeSanteservice:TestDeSanteService

  ) {
    this.testDeSanteplanForm = this.fb.group({
      date: ['', Validators.required],
      resultat: ['', Validators.required],
      notes: [''],
      planId:[''],
      testDeSanteId: ['',Validators.required],
       poids: [''],
       taille: [''],
      status: ['true']


    });
  }

  ngOnInit(): void {
    this.testDeSanteplanId = this.route.snapshot.paramMap.get('id');
    this.idPlan = this.route.snapshot.paramMap.get('idPlan');

    if(this.idPlan){
      this.testDeSanteplanForm.controls['planId'].setValue(this.idPlan)
    }
    if (this.testDeSanteplanId != 'null') {
      this.displayTestDeSanteplan(this.testDeSanteplanId);
    }
      this.displayTestDeSante()
    if (this.testDeSanteplanId != 'null') {
      this.displayTestDeSanteplan(this.testDeSanteplanId);
    }
  }
   displayTestDeSante() {
        this.testDeSanteservice.getAllTestDeSantes().subscribe((res: any) => {
            this.testDeSantList = res;
            console.log(this.testDeSantList);
        });
    }


  displayTestDeSanteplan(id: any) {
    this.testDeSanteplanService.getTestDeSanteplanById(id).subscribe((res:any) => {
      if (res.date) {
        res.date = new Date(res.date);
      }
      this.testDeSanteplanForm.patchValue(res);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.testDeSanteplanForm.valid) {
      const confirmed = await this.formConfirmationService.confirmSubmit();
      if (confirmed) {
        if (this.testDeSanteplanId != 'null') {
          this.updateTestDeSanteplan();
        } else {
        this.testDeSanteplanService.addTestDeSanteplan({...this.testDeSanteplanForm.value,plandeTraitementId:this.idPlan}).subscribe((res:any) => {

         // this.testDeSanteplanService.addTestDeSanteplan(this.testDeSanteplanForm.value).subscribe((res:any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Health test plan saved successfully' });
            this.testDeSanteplanForm.reset();
             this.router.navigate(['/backoffice/plan/'+this.idPlan+'/testDeSanteplan']);
    
          });
        }
      }
    }
  }

  updateTestDeSanteplan() {
    if (this.testDeSanteplanForm.valid) {
      this.testDeSanteplanService.updateTestDeSanteplan(this.testDeSanteplanId, this.testDeSanteplanForm.value).subscribe((res:any) => {
       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Health test plan updated successfully' });
        this.testDeSanteplanForm.reset();
         this.router.navigate(['/backoffice/plan/'+this.idPlan+'/testDeSanteplan']);
        //this.router.navigate(['/backoffice/testDeSanteplan']);
      });
    }
  }
   
}
