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
    ToastModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class DetailsTestDeSanteplanComponent {
  testDeSanteplanForm: FormGroup;
  testDeSanteplanId: any;

  constructor(
    private fb: FormBuilder,
    private testDeSanteplanService: TestDeSanteplanService,
    private router: Router,
    private route: ActivatedRoute,
    private formConfirmationService: FormConfirmationService,
    private messageService: MessageService
  ) {
    this.testDeSanteplanForm = this.fb.group({
      date: ['', Validators.required],
      resultat: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.testDeSanteplanId = this.route.snapshot.paramMap.get('id');
    if (this.testDeSanteplanId != 'null') {
      this.displayTestDeSanteplan(this.testDeSanteplanId);
    }
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
          this.testDeSanteplanService.addTestDeSanteplan(this.testDeSanteplanForm.value).subscribe((res:any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Health test plan saved successfully' });
            this.testDeSanteplanForm.reset();
            this.router.navigate(['/backoffice/testDeSanteplan']);
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
        this.router.navigate(['/backoffice/testDeSanteplan']);
      });
    }
  }
}
