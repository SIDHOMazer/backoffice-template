import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanDeTraitementService } from '../../service/plan-de-traitement.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-plan-de-traitement',
  templateUrl: './details-plan-de-traitement.component.html',
  standalone: true,
    imports: [CommonModule,FormsModule, ReactiveFormsModule],
  
  styleUrls: ['./details-plan-de-traitement.component.css']
  
})
export class DetailsPlanDeTraitementComponent {
  planDeTraitementForm: FormGroup;
  planDeTraitementId: any;
   
 
   constructor(
     private fb: FormBuilder,
     private planDeTraitementService: PlanDeTraitementService,
     private router: Router,
     private route: ActivatedRoute
   ) {
     
     this.planDeTraitementForm = this.fb.group({
      
       
     });
   }
 
   ngOnInit(): void {
     this.planDeTraitementId = this.route.snapshot.paramMap.get('id');
     if (this.planDeTraitementId != 'null') {
       this.displayPlanDeTraitement(this.planDeTraitementId);
     }
   }
 
   displayPlanDeTraitement(id: any) {
     this.planDeTraitementService.getPlanDeTraitementById(id).subscribe((res:any) => {
       this.planDeTraitementForm.patchValue(res);
       console.log(this.planDeTraitementForm.value);
     });
   }
 
   onSubmit(): void {
     if (this.planDeTraitementForm.valid) {
       if (this.planDeTraitementId != 'null') {
         this.updatePlanDeTraitement()
       }else{
         this.planDeTraitementService
           .addPlanDeTraitement(this.planDeTraitementForm.value)
           .subscribe((res:any) => {
             console.log(res);
             this.planDeTraitementForm.reset();
             this.router.navigate(['/planDeTraitement']);
           });
       }
     }
   }
 
   updatePlanDeTraitement() {
     if (this.planDeTraitementForm.valid) {
       console.log(this.planDeTraitementForm.value);
       this.planDeTraitementService.updatePlanDeTraitement(this.planDeTraitementId,this.planDeTraitementForm.value).subscribe((res:any) => {
         console.log(res);
         this.planDeTraitementForm.reset();
         this.router.navigate(['/planDeTraitement']);
       });
     }
   }

}
