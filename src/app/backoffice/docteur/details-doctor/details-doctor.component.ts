import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DocteurService } from '../../service/docteur.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormConfirmationService } from '../../service/form-confirmation.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-details-doctor',
  templateUrl: './details-doctor.component.html',
  standalone: true,
  imports: [
  CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
      
    InputNumberModule,
        CalendarModule,
        DropdownModule,
        SelectButtonModule,
        RouterModule,
  
        ToastModule
    
  ],
  providers: [ConfirmationService, MessageService],
  styleUrls: ['./details-doctor.component.css']
})
export class DetailsDoctorComponent {
  docteurForm: FormGroup;
  doctorId: any;
   statusOptions = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
  ];
  constructor(
    private fb: FormBuilder,
    private docteurService: DocteurService,
    private router: Router,
    private route: ActivatedRoute,
    private formConfirmationService: FormConfirmationService,
    private messageService: MessageService
  ) {
    this.docteurForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      adresse: [''],
      ville: [''],
      codePostal: [''],
      email: ['', [Validators.required, Validators.email]],
      specialite: [''],
      password: [''],
      localisation: [''],
      contact: [''],
     status: ['true']

    });
  }

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.paramMap.get('id');
    if (this.doctorId != 'null') {
      this.displayDocteur(this.doctorId);
    }
  }

  displayDocteur(id: any) {
    this.docteurService.getDocteurById(id).subscribe((res:any) => {
      this.docteurForm.patchValue(res);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.docteurForm.valid) {
      const confirmed = await this.formConfirmationService.confirmSubmit();
      if (confirmed) {
        if (this.doctorId != 'null') {
          this.updateDoctor();
        } else {
          this.docteurService.addDoctor(this.docteurForm.value).subscribe((res) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Doctor saved successfully' });
            this.docteurForm.reset();
            this.router.navigate(['/backoffice/doctor']);
          });
        }
      }
    }
  }

  updateDoctor() {
    if (this.docteurForm.valid) {
      this.docteurService.updateDoctor(this.doctorId, this.docteurForm.value).subscribe((res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Doctor updated successfully' });
        this.docteurForm.reset();
        this.router.navigate(['/backoffice/doctor']);
      });
    }
  }
}
