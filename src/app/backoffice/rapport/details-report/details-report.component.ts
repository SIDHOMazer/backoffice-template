import { Component, Type } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RapportService } from '../../service/rapport.service';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../service/patient.service';
import { SelectModule } from 'primeng/select';
import { DocteurService } from '../../service/docteur.service';

@Component({
  selector: 'app-details-report',
  templateUrl: './details-report.component.html',
  standalone: true,
    imports: [CommonModule,FormsModule, ReactiveFormsModule,SelectModule],
  styleUrls: ['./details-report.component.css']
})
export class DetailsReportComponent {
  rapportForm: FormGroup;
  patientList:any=[]
   rapportId: any;
   docteurList:any=[]
  
    constructor(
      private fb: FormBuilder,
      private rapportService: RapportService,
      private router: Router,
      private patientservice: PatientService,
      private docteurservice: DocteurService,  
      private route: ActivatedRoute
    ) {
      
      this.rapportForm = this.fb.group({
       file: [''],
       type: [''],
       date: [''],
       heure: [''],
        description: [''],
        patientId: [''],
        docteurId: [''],
      
        
      });
    }

    ngOnInit(): void {
      this.rapportId = this.route.snapshot.paramMap.get('id');
      this.displayDocteur();
      this.displayPatient();
      if (this.rapportId != 'null') {
        this.displayRapport(this.rapportId);
      }
    }
  
    
    displayPatient() {
      this.patientservice.getAllPatients().subscribe((res)=>{
        this.patientList = res;
        console.log(this.patientList);
      });
    }

    displayDocteur() {
      this.docteurservice.getAllDocteur().subscribe((res:any)=>{
        this.docteurList = res;
        console.log(this.docteurList);
      });
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
          console.log(this.rapportForm.value);
          
          this.rapportService
            .addRapport(this.rapportForm.value)
            .subscribe((res:any) => {
              console.log(res);
              this.rapportForm.reset();
              this.router.navigate(['/backoffice/rapport/'+this.rapportId]);
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
          this.router.navigate(['/backoffice/rapport/'+this.rapportId]);
        });
      }
    }

}
