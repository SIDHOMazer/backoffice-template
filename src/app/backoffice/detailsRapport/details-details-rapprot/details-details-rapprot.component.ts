import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsRapportService } from '../../service/details-rapport.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-details-rapprot',
  templateUrl: './details-details-rapprot.component.html',
   standalone: true,
    imports: [CommonModule,FormsModule, ReactiveFormsModule],
  styleUrls: ['./details-details-rapprot.component.css']
})
export class DetailsDetailsRapprotComponent {
 detailsRapportForm: FormGroup;
 detailsRapportId: any;
displayDetaisRapport: any;
   constructor(
     private fb: FormBuilder,
     private detailsRapportService: DetailsRapportService,
     private router: Router,
     private route: ActivatedRoute
  ) {
    
    this.detailsRapportForm = this.fb.group({
      Currenty: [''],
      SurgicalHistory: [''],
      TraumaHistory: [''],
      HealthHistory: [''],
      FamilyHealthHistory: [''],
      Autre: [''] ,
    });
  }

  ngOnInit(): void {
    this.detailsRapportId = this.route.snapshot.paramMap.get('id');
    if (this.detailsRapportId != 'null') {
      this.displayDetailsRapport(this.detailsRapportId);
    }
  }

  displayDetailsRapport(id: any) {
    this.detailsRapportService.getDetailsRapportById(id).subscribe((res:any)=> {
      this.detailsRapportForm.patchValue(res);
      console.log(this.detailsRapportForm.value);
    });
  }

  onSubmit(): void {
    if (this.detailsRapportForm.valid) {
      if (this.detailsRapportId != 'null') {
        this.updatedetailsRapport()
      }else{
        this.detailsRapportService
          .addDetailsRapport(this.detailsRapportForm.value)
          .subscribe((res: any) => {
            console.log(res);
            this.detailsRapportForm.reset();
            this.router.navigate(['/backoffice/detailsRapport']);
          });
      }
    }
  }
  

  updatedetailsRapport() {
    if (this.detailsRapportForm.valid) {
      console.log(this.detailsRapportForm.value);
      this.detailsRapportService.updateDetailsRapport(this.detailsRapportId,this.detailsRapportForm.value).subscribe((res: any) => {
        console.log(res);
        this.detailsRapportForm.reset();
        this.router.navigate(['/backoffice/detailsRapport']);
      });
    }
  }
}
