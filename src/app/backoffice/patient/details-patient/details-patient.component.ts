import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../service/patient.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormConfirmationService } from '../../service/form-confirmation.service';

@Component({
  selector: 'app-details-patient',
  templateUrl: './details-patient.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  styleUrls: ['./details-patient.component.css']
})
export class DetailsPatientComponent {
  patientForm: FormGroup;
  patientId: any;
  genderOptions = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' }
  ];

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private formConfirmationService: FormConfirmationService,
    private messageService: MessageService
  ) {
    this.patientForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      adresse: [''],
      ville: [''],
      codePostal: [''],
      email: ['', [Validators.required, Validators.email]],
      sexe: [''],
      password: [''],
      contact: [''],
      dateNaissance: ['']
    });
  }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    if (this.patientId != 'null') {
      this.displayPatient(this.patientId);
    }
  }

  displayPatient(id: any) {
    this.patientService.getPatientById(id).subscribe((res:any) => {
      if (res.dateNaissance) {
        res.dateNaissance = new Date(res.dateNaissance);
      }
      this.patientForm.patchValue(res);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.patientForm.valid) {
      const confirmed = await this.formConfirmationService.confirmSubmit();
      if (confirmed) {
        if (this.patientId != 'null') {
          this.updatePatient();
        } else {
          this.patientService.addPatient(this.patientForm.value).subscribe((res: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Patient saved successfully' });
            this.patientForm.reset();
            this.router.navigate(['/backoffice/patient']);
          });
        }
      }
    }
  }

  updatePatient() {
    if (this.patientForm.valid) {
      this.patientService.updatePatient(this.patientId, this.patientForm.value).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Patient updated successfully' });
        this.patientForm.reset();
        this.router.navigate(['/backoffice/patient']);
      });
    }
  }
}

