import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestDeSanteService } from '../../service/test-de-sante.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-test-de-sante',
  standalone: true,
      imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './details-test-de-sante.component.html',
  styleUrl: './details-test-de-sante.component.scss'
})
export class DetailsTestDeSanteComponent {
  testDeSanteForm: FormGroup;
  testDeSanteId: any;
    constructor(
      private fb: FormBuilder,
      private testDeSanteService: TestDeSanteService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      
      this.testDeSanteForm = this.fb.group({
       id: [''],
       testName: [''],
       testDate: [''],
        result: [''],
      
        
      });
    }
  
    ngOnInit(): void {
      this.testDeSanteId = this.route.snapshot.paramMap.get('id');
      if (this.testDeSanteId != 'null') {
        this.displayTestDeSante(this.testDeSanteId);
      }
    }
  
    displayTestDeSante(id: any) {
      this.testDeSanteService.getTestDeSanteById(id).subscribe((res:any) => {
        this.testDeSanteForm.patchValue(res);
        console.log(this.testDeSanteForm.value);
      });
    }
  
    onSubmit(): void {
      if (this.testDeSanteForm.valid) {
        if (this.testDeSanteId != 'null') {
          this.updateTestDeSante()
        }else{
          this.testDeSanteService
            .addTestDeSante(this.testDeSanteForm.value)
            .subscribe((res:any) => {
              console.log(res);
              this.testDeSanteForm.reset();
              this.router.navigate(['/backoffice/testDeSante']);
            });
        }
      }
    }
  
    updateTestDeSante() {
      if (this.testDeSanteForm.valid) {
        console.log(this.testDeSanteForm.value);
        this.testDeSanteService.updateTestDeSante(this.testDeSanteId,this.testDeSanteForm.value).subscribe((res:any) => {
          console.log(res);
          this.testDeSanteForm.reset();
          this.router.navigate(['/backoffice/testDeSante']);
        });
      }
    }
}
