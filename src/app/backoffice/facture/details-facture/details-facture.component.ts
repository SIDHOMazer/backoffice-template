import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FactureService } from '../../service/facture.service';
import { PatientService } from '../../service/patient.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormConfirmationService } from '../../service/form-confirmation.service';

@Component({
  selector: 'app-details-facture',
  templateUrl: './details-facture.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    SelectButtonModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  styleUrls: ['./details-facture.component.css']
})
export class DetailsFactureComponent {
  factureForm: FormGroup;
  factureId: any;
  patients: any[] = [];
  paymentMethods = [
    { label: 'Cash', value: 'CASH' },
    { label: 'Credit Card', value: 'CREDIT_CARD' },
    { label: 'Bank Transfer', value: 'BANK_TRANSFER' }
  ];
  statusOptions = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
  ];

  constructor(
    private fb: FormBuilder,
    private factureService: FactureService,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private formConfirmationService: FormConfirmationService,
    private messageService: MessageService
  ) {
    this.factureForm = this.fb.group({
      id: [''],
      patientId: ['', Validators.required],
      date: [new Date(), Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      invoice: ['', Validators.required],
      subTotal: [''],
      paymentMethod: ['', Validators.required],
      tax: [''],
      total: [''],
      qty: ['1', [Validators.required, Validators.min(1)]],
      status: [true]
    });
  }

  ngOnInit(): void {
    this.loadPatients();
    this.factureId = this.route.snapshot.paramMap.get('id');
    if (this.factureId != 'null') {
      this.displayFacture(this.factureId);
    }
    
    // Calculate totals when price or qty changes
    this.factureForm.get('price')?.valueChanges.subscribe(() => this.calculateTotals());
    this.factureForm.get('qty')?.valueChanges.subscribe(() => this.calculateTotals());
  }

  loadPatients() {
    this.patientService.getAllPatients().subscribe((res: any) => {
      this.patients = res.map((patient: any) => ({
        label: `${patient.firstname} ${patient.lastname}`,
        value: patient.id
      }));
    });
  }

  calculateTotals() {
    const price = this.factureForm.get('price')?.value || 0;
    const qty = this.factureForm.get('qty')?.value || 1;
    const subTotal = price * qty;
    const tax = subTotal * 0.20; // 20% tax
    const total = subTotal + tax;

    this.factureForm.patchValue({
      subTotal: subTotal,
      tax: tax,
      total: total
    }, { emitEvent: false });
  }

  displayFacture(id: any) {
    this.factureService.getFactureById(id).subscribe((res:any) => {
      this.factureForm.patchValue(res);
      console.log(this.factureForm.value);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.factureForm.valid) {
      const confirmed = await this.formConfirmationService.confirmSubmit();
      if (confirmed) {
        if (this.factureId != 'null') {
          this.updateFacture();
        } else {
          this.factureService.addFacture(this.factureForm.value).subscribe((res:any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bill saved successfully' });
            this.factureForm.reset();
            this.router.navigate(['/backoffice/facture']);
          });
        }
      }
    }
  }

  updateFacture() {
    if (this.factureForm.valid) {
      this.factureService.updateFacture(this.factureId, this.factureForm.value).subscribe((res:any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bill updated successfully' });
        this.factureForm.reset();
        this.router.navigate(['/backoffice/facture']);
      });
    }
  }
}
