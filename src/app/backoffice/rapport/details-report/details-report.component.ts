import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RapportService } from '../../service/rapport.service';
import { PatientService } from '../../service/patient.service';
import { DocteurService } from '../../service/docteur.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormConfirmationService } from '../../service/form-confirmation.service';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-details-report',
  templateUrl: './details-report.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    DropdownModule,
    SelectModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class DetailsReportComponent {
  rapportForm: FormGroup;
  rapportId: any;
  patientList: any[] = [];
  docteurList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private rapportService: RapportService,
    private patientService: PatientService,
    private docteurService: DocteurService,
    private router: Router,
    private route: ActivatedRoute,
    private formConfirmationService: FormConfirmationService,
    private messageService: MessageService
  ) {
    this.rapportForm = this.fb.group({
      patientId: ['', Validators.required],
      docteurId: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPatients();
    this.loadDocteurs();
    this.rapportId = this.route.snapshot.paramMap.get('id');
    if (this.rapportId != 'null') {
      this.displayRapport(this.rapportId);
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

  displayRapport(id: any) {
    this.rapportService.getRapportById(id).subscribe((res:any) => {
      this.rapportForm.patchValue(res);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.rapportForm.valid) {
      const confirmed = await this.formConfirmationService.confirmSubmit();
      if (confirmed) {
        if (this.rapportId != 'null') {
          this.updateRapport();
        } else {
          this.rapportService.addRapport(this.rapportForm.value).subscribe((res:any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Report saved successfully' });
            this.rapportForm.reset();
            this.router.navigate(['/backoffice/rapport']);
          });
        }
      }
    }
  }

  updateRapport() {
    if (this.rapportForm.valid) {
      this.rapportService.updateRapport(this.rapportId, this.rapportForm.value).subscribe((res:any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Report updated successfully' });
        this.rapportForm.reset();
        this.router.navigate(['/backoffice/rapport']);
      });
    }
  }
}
