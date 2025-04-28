import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../service/patient.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-patient',
  templateUrl: './details-patient.component.html',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  styleUrls: ['./details-patient.component.css']
})
export class DetailsPatientComponent {
  patientForm: FormGroup;
 
  patientId: any;
  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
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
      localisation: [''],
      specialite: [''],
      contact: [''],
      dateNaissance: [''],
      
      
    });
  }
  ngOnInit(): void {
    this.patientId= this.route.snapshot.paramMap.get('id');
    if (this.patientId != 'null') {
      this.displayPatient(this.patientId);
    }
  }
  displayPatient(id: any) {
    this.patientService.getPatientById(id).subscribe((res:any)=> {
      this.patientForm.patchValue(res);
      console.log(this.patientForm.value);
    });
  }
 
onSubmit(): void {
  if (this.patientForm.valid) {
    if (this.patientId != 'null') {
      this.updatePatient()
    }else{
      this.patientService
        .addPatient(this.patientForm.value)
        .subscribe((res: any) => {
          console.log(res);
          this.patientForm.reset();
          this.router.navigate(['/backoffice/patient']);
        
        });
    }
  }
}


updatePatient() {
  if (this.patientForm.valid) {
    console.log(this.patientForm.value);
    this.patientService.updatePatient(this.patientId, this.patientForm.value).subscribe((res: any) => {
      console.log(res);
      this.patientForm.reset();
      this.router.navigate(['/backoffice/patient']);
    });
  }
}
}

