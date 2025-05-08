import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RendezvousService } from '../../service/rendezvous.service';
import { PatientService } from '../../service/patient.service';
import { DocteurService } from '../../service/docteur.service';
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
  selector: 'app-details-rendezvous',
  templateUrl: './details-rendezvous.component.html',
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
  providers: [ConfirmationService, MessageService]
})
export class DetailsRendezvousComponent {
  rendezvousForm: FormGroup;
  rendezvousId: any;
  patientList: any[] = [];
  docteurList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private rendezvousService: RendezvousService,
    private patientService: PatientService,
    private docteurService: DocteurService,
    private router: Router,
    private route: ActivatedRoute,
    private formConfirmationService: FormConfirmationService,
    private messageService: MessageService
  ) {
    this.rendezvousForm = this.fb.group({
      date: ['', Validators.required],
      patientId: ['', Validators.required],
      docteurId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPatients();
    this.loadDocteurs();
    this.rendezvousId = this.route.snapshot.paramMap.get('id');
    if (this.rendezvousId != 'null') {
      this.displayRendezvous(this.rendezvousId);
    }
  }

  loadPatients() {
    this.patientService.getAllPatients().subscribe((res: any) => {
      this.patientList = res.map((patient: any) => ({
        label: `${patient.firstname} ${patient.lastname}`,
        value: patient.id
      }));
    });
  }

  loadDocteurs() {
    this.docteurService.getAllDocteur().subscribe((res: any) => {
      this.docteurList = res.map((docteur: any) => ({
        label: `${docteur.firstname} ${docteur.lastname}`,
        value: docteur.id
      }));
    });
  }

  displayRendezvous(id: any) {
    this.rendezvousService.getRendezvousById(id).subscribe((res:any) => {
      if (res.date) {
        res.date = new Date(res.date);
      }
      this.rendezvousForm.patchValue(res);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.rendezvousForm.valid) {
      const confirmed = await this.formConfirmationService.confirmSubmit();
      if (confirmed) {
        if (this.rendezvousId != 'null') {
          this.updateRendezvous();
        } else {
          this.rendezvousService.addRendezvous(this.rendezvousForm.value).subscribe((res: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Appointment saved successfully' });
            this.rendezvousForm.reset();
            this.router.navigate(['/backoffice/rendezvous']);
          });
        }
      }
    }
  }

  updateRendezvous() {
    if (this.rendezvousForm.valid) {
      this.rendezvousService.updateRendezvous(this.rendezvousId, this.rendezvousForm.value).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Appointment updated successfully' });
        this.rendezvousForm.reset();
        this.router.navigate(['/backoffice/rendezvous']);
      });
    }
  }
}
