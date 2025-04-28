import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicamentplanService } from '../../service/medicamentplan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'app-details-medicamentplan',
 standalone: true,
    imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './details-medicamentplan.component.html',
  styleUrl: './details-medicamentplan.component.scss'
})
export class DetailsMedicamentplanComponent {
  medicamentplanForm: FormGroup;
  medicamentplanId: any;
    constructor(
      private fb: FormBuilder,
      private medicamentplanService: MedicamentplanService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      
      this.medicamentplanForm = this.fb.group({
       id: [''],
       medicamentId: [''],
       planDeTraitementId: [''],
       medicament: [''],
       note: [''],
       file: [''],
       Checkbox: [''],

      
        
      });
    }
  
    ngOnInit(): void {
      this.medicamentplanId = this.route.snapshot.paramMap.get('id');
      if (this.medicamentplanId != 'null') {
        this.displayMedicamentplan(this.medicamentplanId);
      }
    }
  
    displayMedicamentplan(id: any) {
      this.medicamentplanService.getMedicamentplanById(id).subscribe((res:any) => {
        this.medicamentplanForm.patchValue(res);
        console.log(this.medicamentplanForm.value);
      });
    }
  
    onSubmit(): void {
      if (this.medicamentplanForm.valid) {
        if (this.medicamentplanId != 'null') {
          this.updateMedicamentplan()
        }else{
          this.medicamentplanService
            .addMedicamentplan(this.medicamentplanForm.value)
            .subscribe((res:any) => {
              console.log(res);
              this.medicamentplanForm.reset();
              this.router.navigate(['/backoffice/medicamentplan']);
            });
        }
      }
    }
  
    updateMedicamentplan() {
      if (this.medicamentplanForm.valid) {
        console.log(this.medicamentplanForm.value);
        this.medicamentplanService.updateMedicamentplan(this.medicamentplanId,this.medicamentplanForm.value).subscribe((res:any) => {
          console.log(res);
          this.medicamentplanForm.reset();
          this.router.navigate(['/backoffice/medicamentplan']);
        });
      }
    }

}
