import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestDeSanteplanService } from '../../service/test-de-santeplan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'app-details-test-de-santeplan',
   standalone: true,
      imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './details-test-de-santeplan.component.html',
  styleUrl: './details-test-de-santeplan.component.scss'
})
export class DetailsTestDeSanteplanComponent {
testDeSanteplanForm: FormGroup;
testDeSanteplanId: any;
    constructor(
      private fb: FormBuilder,
      private testDeSanteplanService: TestDeSanteplanService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      
      this.testDeSanteplanForm = this.fb.group({
       id: [''],
       planDeSanteId: [''],
       planDeTraitementId: [''],
       poids: [''],
        taille: [''],
        sexe: [''],
        fumeur: [''],
        alcoolique: [''],
        sportif: [''],
        symptomes: [''],
        Checkbox: [''],
      
        
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
        this.testDeSanteplanForm.patchValue(res);
        console.log(this.testDeSanteplanForm.value);
      });
    }
  
    onSubmit(): void {
      if (this.testDeSanteplanForm.valid) {
        if (this.testDeSanteplanId != 'null') {
          this.updateTestDeSanteplan()
        }else{
          this.testDeSanteplanService
            .addTestDeSanteplan(this.testDeSanteplanForm.value)
            .subscribe((res:any) => {
              console.log(res);
              this.testDeSanteplanForm.reset();
              this.router.navigate(['/backoffice/testDeSanteplan']);
            });
        }
      }
    }
  
    updateTestDeSanteplan() {
      if (this.testDeSanteplanForm.valid) {
        console.log(this.testDeSanteplanForm.value);
        this.testDeSanteplanService.updateTestDeSanteplan(this.testDeSanteplanId,this.testDeSanteplanForm.value).subscribe((res:any) => {
          console.log(res);
          this.testDeSanteplanForm.reset();
          this.router.navigate(['/backoffice/testDeSanteplan']);
        });
      }
    }

}
