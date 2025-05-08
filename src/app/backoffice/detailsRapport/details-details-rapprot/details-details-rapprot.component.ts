import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsRapportService } from '../../service/details-rapport.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormConfirmationService } from '../../service/form-confirmation.service';

@Component({
  selector: 'app-details-details-rapprot',
  templateUrl: './details-details-rapprot.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class DetailsDetailsRapprotComponent {
  detailsRapportForm: FormGroup;
  detailsRapportId: any;

  constructor(
    private fb: FormBuilder,
    private detailsRapportService: DetailsRapportService,
    private router: Router,
    private route: ActivatedRoute,
    private formConfirmationService: FormConfirmationService,
    private messageService: MessageService
  ) {
    this.detailsRapportForm = this.fb.group({
      tension: ['', [Validators.required, Validators.min(0)]],
      temperature: ['', [Validators.required, Validators.min(0)]],
      poids: ['', [Validators.required, Validators.min(0)]],
      taille: ['', [Validators.required, Validators.min(0)]],
      sportif: ['', Validators.required],
      symptomes: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.detailsRapportId = this.route.snapshot.paramMap.get('id');
    if (this.detailsRapportId != 'null') {
      this.displayDetailsRapport(this.detailsRapportId);
    }
  }

  displayDetailsRapport(id: any) {
    this.detailsRapportService.getDetailsRapportById(id).subscribe((res:any) => {
      this.detailsRapportForm.patchValue(res);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.detailsRapportForm.valid) {
      const confirmed = await this.formConfirmationService.confirmSubmit();
      if (confirmed) {
        if (this.detailsRapportId != 'null') {
          this.updateDetailsRapport();
        } else {
          this.detailsRapportService.addDetailsRapport(this.detailsRapportForm.value).subscribe((res: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Report details saved successfully' });
            this.detailsRapportForm.reset();
            this.router.navigate(['/backoffice/detailsRapport']);
          });
        }
      }
    }
  }

  updateDetailsRapport() {
    if (this.detailsRapportForm.valid) {
      this.detailsRapportService.updateDetailsRapport(this.detailsRapportId, this.detailsRapportForm.value).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Report details updated successfully' });
        this.detailsRapportForm.reset();
        this.router.navigate(['/backoffice/detailsRapport']);
      });
    }
  }
}
