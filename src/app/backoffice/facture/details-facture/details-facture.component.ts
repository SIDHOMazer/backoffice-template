import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FactureService } from '../../service/facture.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-facture',
  templateUrl: './details-facture.component.html',
   standalone: true,
    imports: [CommonModule,FormsModule, ReactiveFormsModule],
  styleUrls: ['./details-facture.component.css']
})
export class DetailsFactureComponent {
factureForm: FormGroup;
factureId: any;
  constructor(
    private fb: FormBuilder,
    private factureService: FactureService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
    this.factureForm = this.fb.group({
      id: [''],
      patientId: [''],
      date: [''],
      description: [''],
      price: [''],
      invoice: [''],
      subTotal: [''],
      paymentMethod: [''],
      tax: [''],
      total: [''],
      qty: [''],
      status: [''], 
    });
  }

  ngOnInit(): void {
    this.factureId = this.route.snapshot.paramMap.get('id');
    if (this.factureId != 'null') {
      this.displayFacture(this.factureId);
    }
  }

  displayFacture(id: any) {
    this.factureService.getFactureById(id).subscribe((res:any) => {
      this.factureForm.patchValue(res);
      console.log(this.factureForm.value);
    });
  }

  onSubmit(): void {
    if (this.factureForm.valid) {
      if (this.factureId != 'null') {
        this.updateFacture()
      }else{
        this.factureService
          .addFacture(this.factureForm.value)
          .subscribe((res:any) => {
            console.log(res);
            this.factureForm.reset();
            this.router.navigate(['/backoffice/facture']);
          });
      }
    }
  }

  updateFacture() {
    if (this.factureForm.valid) {
      console.log(this.factureForm.value);
      this.factureService.updateFacture(this.factureId,this.factureForm.value).subscribe((res:any) => {
        console.log(res);
        this.factureForm.reset();
        this.router.navigate(['/backoffice/facture']);
      });
    }
  }
}
