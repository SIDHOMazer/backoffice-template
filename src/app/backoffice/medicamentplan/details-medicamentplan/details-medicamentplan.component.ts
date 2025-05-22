import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicamentplanService } from '../../service/medicamentplan.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormConfirmationService } from '../../service/form-confirmation.service';
import { DropdownModule } from 'primeng/dropdown';
import { MedicamentService } from '../../service/medicament.service';

@Component({
  selector: 'app-details-medicamentplan',
  templateUrl: './details-medicamentplan.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    CheckboxModule,
    ConfirmDialogModule,
    ToastModule,DropdownModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class DetailsMedicamentplanComponent {
  medicamentplanForm: FormGroup;
  medicamentplanId: any;
  medicamentList: any[] = [];
  idPlan: any;

  constructor(
    private fb: FormBuilder,
    private medicamentplanService: MedicamentplanService,
    private router: Router,
    private route: ActivatedRoute,
    private formConfirmationService: FormConfirmationService,
    private messageService: MessageService,
    private medicamentservice:MedicamentService
  ) {
    this.medicamentplanForm = this.fb.group({
      dosage: ['', Validators.required],
      frequence: ['', Validators.required],
      medicamentId: ['',Validators.required],
      checkbok: [false]
    });
  }

  ngOnInit(): void {
    this.medicamentplanId = this.route.snapshot.paramMap.get('id');

     this.displayMedicament()
    if (this.medicamentplanId != 'null') {
      this.displayMedicamentplan(this.medicamentplanId);
    }
  }
   displayMedicament() {
        this.medicamentservice.getAllMedicaments().subscribe((res: any) => {
            this.medicamentList = res;
            console.log(this.medicamentList);
        });
    }

  displayMedicamentplan(id: any) {
    this.medicamentplanService.getMedicamentplanById(id).subscribe((res:any) => {
      this.medicamentplanForm.patchValue(res);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.medicamentplanForm.valid) {
      const confirmed = await this.formConfirmationService.confirmSubmit();
      if (confirmed) {
        if (this.medicamentplanId != 'null') {
          this.updateMedicamentplan();
        } else {
          this.medicamentplanService.addMedicamentplan(this.medicamentplanForm.value).subscribe((res:any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Medication plan saved successfully' });
            this.medicamentplanForm.reset();
            this.router.navigate(['/backoffice/medicamentplan']);
          });
        }
      }
    }
  }

  updateMedicamentplan() {
    if (this.medicamentplanForm.valid) {
      this.medicamentplanService.updateMedicamentplan(this.medicamentplanId, this.medicamentplanForm.value).subscribe((res:any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Medication plan updated successfully' });
        this.medicamentplanForm.reset();
        this.router.navigate(['/backoffice/medicamentplan']);
      });
    }
  }
}
