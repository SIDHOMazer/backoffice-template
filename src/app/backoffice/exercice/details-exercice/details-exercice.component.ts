import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceService } from '../../service/exercice.service';

@Component({
  selector: 'app-details-exercice',
  templateUrl: './details-exercice.component.html',
   standalone: true,
    imports: [CommonModule,FormsModule, ReactiveFormsModule],
  styleUrls: ['./details-exercice.component.css']
})
export class DetailsExerciceComponent {
  exerciceForm: FormGroup;
  exerciceId: any;
    constructor(
      private fb: FormBuilder,
      private exerciceService: ExerciceService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      
      this.exerciceForm = this.fb.group({
        id: [''],
        description: [''],
        file: [''],
       nameExercice: [''],
       nameDisease: [''],
        
        
      });
    }
  
    ngOnInit(): void {
      this.exerciceId = this.route.snapshot.paramMap.get('id');
      if (this.exerciceId != 'null') {
        this.displayExercice(this.exerciceId);
      }
    }
  
    displayExercice(id: any) {
      this.exerciceService.getExerciceById(id).subscribe((res:any) => {
        this.exerciceForm.patchValue(res);
        console.log(this.exerciceForm.value);
      });
    }
  
    onSubmit(): void {
      if (this.exerciceForm.valid) {
        if (this.exerciceId != 'null') {
          this.updateExercice()
        }else{
          this.exerciceService
            .addExercice(this.exerciceForm.value)
            .subscribe((res:any) => {
              console.log(res);
              this.exerciceForm.reset();
              this.router.navigate(['/backoffice/exercice']);
            });
        }
      }
    }
  
    updateExercice() {
      if (this.exerciceForm.valid) {
        console.log(this.exerciceForm.value);
        this.exerciceService.updateExercice(this.exerciceId,this.exerciceForm.value).subscribe((res:any) => {
          console.log(res);
          this.exerciceForm.reset();
          this.router.navigate(['/backoffice/exercice']);
        });
      }
    }

}
