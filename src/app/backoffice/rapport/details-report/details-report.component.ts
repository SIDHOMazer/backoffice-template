import { Component, Type } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RapportService } from '../../service/rapport.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-report',
  templateUrl: './details-report.component.html',
  standalone: true,
    imports: [CommonModule,FormsModule, ReactiveFormsModule],
  styleUrls: ['./details-report.component.css']
})
export class DetailsReportComponent {
  rapportForm: FormGroup;

   rapportId: any;
    constructor(
      private fb: FormBuilder,
      private rapportService: RapportService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      
      this.rapportForm = this.fb.group({
       File: [''],
       Type: [''],
       Date: [''],
       Heure: [''],
        Description: [''],
      
        
      });
    }
  
    ngOnInit(): void {
      this.rapportId = this.route.snapshot.paramMap.get('id');
      if (this.rapportId != 'null') {
        this.displayRapport(this.rapportId);
      }
    }
  
    displayRapport(id: any): void {
      this.rapportService.getRapportById(id).subscribe((res:any) => {
        this.rapportForm.patchValue(res);
        console.log(this.rapportForm.value);
      });
    }
  
    onSubmit(): void {
      if (this.rapportForm.valid) {
        if (this.rapportId != 'null') {
          this.updateRapport()
        }else{
          this.rapportService
            .addRapport(this.rapportForm.value)
            .subscribe((res:any) => {
              console.log(res);
              this.rapportForm.reset();
              this.router.navigate(['/rapport']);
            });
        }
      }
    }
  
    updateRapport() {
      if (this.rapportForm.valid) {
        console.log(this.rapportForm.value);
        this.rapportService.updateRapport(this.rapportId,this.rapportForm.value).subscribe((res:any) => {
          console.log(res);
          this.rapportForm.reset();
          this.router.navigate(['/rapport']);
        });
      }
    }

}
