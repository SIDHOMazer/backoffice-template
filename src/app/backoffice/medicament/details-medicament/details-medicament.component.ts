import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicamentService } from '../../service/medicament.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormConfirmationService } from '../../service/form-confirmation.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-details-medicament',
  templateUrl: './details-medicament.component.html',
  styleUrls: ['./details-medicament.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    FileUploadModule,
    ConfirmDialogModule,
     InputNumberModule,
            CalendarModule,
            DropdownModule,
            SelectButtonModule,
            RouterModule,
      
    ToastModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class DetailsMedicamentComponent {
  medicamentForm: FormGroup;
  medicamentId: any;
   statusOptions = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
  ];

  constructor(
    private fb: FormBuilder,
    private medicamentService: MedicamentService,
    private router: Router,
    private route: ActivatedRoute,
    private formConfirmationService: FormConfirmationService,
    private messageService: MessageService
  ) {
    this.medicamentForm = this.fb.group({
      id: [''],
      medicament: ['', Validators.required],
      note: [''],
      file: [''],
      status: ['true']
    });
  }

  ngOnInit(): void {
    this.medicamentId = this.route.snapshot.paramMap.get('id');
    if (this.medicamentId != 'null') {
      this.displayMedicament(this.medicamentId);
    }
  }

  displayMedicament(id: any) {
    this.medicamentService.getMedicamentById(id).subscribe((res:any) => {
      this.medicamentForm.patchValue(res);
      console.log(this.medicamentForm.value);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.medicamentForm.valid) {
      const confirmed = await this.formConfirmationService.confirmSubmit();
      if (confirmed) {
        if (this.medicamentId != 'null') {
          this.updateMedicament();
        } else {
          this.medicamentService.addMedicament(this.medicamentForm.value).subscribe((res:any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Medication saved successfully' });
            this.medicamentForm.reset();
            this.router.navigate(['/backoffice/medicament']);
          });
        }
      }
    }
  }

  updateMedicament() {
    if (this.medicamentForm.valid) {
      this.medicamentService.updateMedicament(this.medicamentId, this.medicamentForm.value).subscribe((res:any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Medication updated successfully' });
        this.medicamentForm.reset();
        this.router.navigate(['/backoffice/medicament']);
      });
    }
  }

  onFileSelect(event: any) {
    if (event.files && event.files.length) {
      const file = event.files[0];
      this.medicamentForm.patchValue({
        file: file.name
      });
    }
  }
}
