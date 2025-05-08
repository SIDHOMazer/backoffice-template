import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceplanService } from '../../service/exerciceplan.service';
import { CommonModule } from '@angular/common';
import { Checkbox } from 'primeng/checkbox';
import { ExerciceService } from '../../service/exercice.service';

@Component({
  selector: 'app-details-exerciceplan',
  templateUrl: './details-exerciceplan.component.html',
   standalone: true,
    imports: [CommonModule,FormsModule, ReactiveFormsModule],
  styleUrls: ['./details-exerciceplan.component.css']
})
export class DetailsExerciceplanComponent {
  exerciceplanForm: FormGroup;
  exerciceplanId: any;
  exerciceList: any = [];
  planDeTraitementList: any = [];
    constructor(
      private fb: FormBuilder,
      private exerciceplanService: ExerciceplanService,
      private planDeTraitementservice: ExerciceplanService,
      private exerciceservice: ExerciceService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      
      this.exerciceplanForm = this.fb.group({
       id: [''],
       exerciceId: [''],
       planDeTraitementId: [''],
       duree: [''],
       jour: [''],
       type: [''],
       seance: [''],
       muscles: [''],
       seriesAndRepetitions: [''],
       Checkbox: [''],
        
      });
    }
  
    ngOnInit(): void {
      this.exerciceplanId = this.route.snapshot.paramMap.get('id');
      if (this.exerciceplanId != 'null') {
        this.displayExerciceplan(this.exerciceplanId);
      }
    }
    displayExercice() {
      this.exerciceservice.getAllExercices().subscribe((res)=>{
        this.exerciceList = res;
        console.log(this.exerciceList);
      });
    }
    //displayPlanDeTraitement() {
      //this.planDeTraitementservice.getAllPlanDeTraitements().subscribe((res)=>{
        //this.planDeTraitementList = res;
        //console.log(this.planDeTraitementList);
      //});
    //}
    displayExerciceplan(id: any) {
      this.exerciceplanService.getExerciceplanById(id).subscribe((res:any) => {
        this.exerciceplanForm.patchValue(res);
        console.log(this.exerciceplanForm.value);
      });
    }
  
    onSubmit(): void {
      if (this.exerciceplanForm.valid) {
        if (this.exerciceplanId != 'null') {
          this.updateExerciceplan()
        }else{
          this.exerciceplanService
            .addExerciceplan(this.exerciceplanForm.value)
            .subscribe((res:any) => {
              console.log(res);
              this.exerciceplanForm.reset();
              this.router.navigate(['/backoffice/exerciceplan']);
            });
        }
      }
    }
  
    updateExerciceplan() {
      if (this.exerciceplanForm.valid) {
        console.log(this.exerciceplanForm.value);
        this.exerciceplanService.updateExerciceplan(this.exerciceplanId,this.exerciceplanForm.value).subscribe((res:any) => {
          console.log(res);
          this.exerciceplanForm.reset();
          this.router.navigate(['/backoffice/exerciceplan']);
        });
      }
    }

}
