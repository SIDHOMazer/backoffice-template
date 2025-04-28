import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicamentService } from '../../service/medicament.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-medicament',
  templateUrl: './details-medicament.component.html',
  styleUrl: './details-medicament.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class DetailsMedicamentComponent {
  medicamentForm: FormGroup;
   medicamentId: any;
      constructor(
        private fb: FormBuilder,
        private medicamentService: MedicamentService,
        private router: Router,
        private route: ActivatedRoute
      ) {
        
        this.medicamentForm = this.fb.group({
          id: [''],
         medicament: [''],
         note: [''],
         file: [''],
          
          
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
    
      onSubmit(): void {
        if (this.medicamentForm.valid) {
          if (this.medicamentId != 'null') {
            this.updateMedicament()
          }else{
            this.medicamentService
              .addMedicament(this.medicamentForm.value)
              .subscribe((res:any) => {
                console.log(res);
                this.medicamentForm.reset();
                this.router.navigate(['/backoffice/medicament']);
              });
          }
        }
      }
    
      updateMedicament() {
        if (this.medicamentForm.valid) {
          console.log(this.medicamentForm.value);
          this.medicamentService.updateMedicament(this.medicamentId,this.medicamentForm.value).subscribe((res:any) => {
            console.log(res);
            this.medicamentForm.reset();
            this.router.navigate(['/backoffice/medicament']);
          });
        }
      }

}
