import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RendezvousService } from '../../service/rendezvous.service';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../service/patient.service';
import { DocteurService } from '../../service/docteur.service';
import { SelectModule } from 'primeng/select';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-details-rendezvous',
  templateUrl: './details-rendezvous.component.html',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule,SelectModule,DatePickerModule],
  providers:[ConfirmationService], 
  styleUrls: ['./details-rendezvous.component.css']
})
export class DetailsRendezvousComponent {
  rendezvousForm: FormGroup;
  rendezvousId: any;
  patientList:any=[]
  docteurList:any=[]
    constructor(
      private fb: FormBuilder,
      private rendezvousService: RendezvousService,
       private patientservice: PatientService,
      private docteurservice: DocteurService,  
      private router: Router,
      private route: ActivatedRoute,
     
    ) {
      this.rendezvousForm = this.fb.group({
        date: [new Date(), Validators.required],
        patientId:[''],
        docteurId:[''],
        
      });
    }
    ngOnInit(): void {
      this.displayPatient()
      this.displayDocteur()
      this.rendezvousId= this.route.snapshot.paramMap.get('id');
      if (this.rendezvousId != 'null') {
        this.displayRendezvous(this.rendezvousId);
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
    
    displayRendezvous(id: any) {
      this.rendezvousService.getRendezvousById(id).subscribe((res:any)=> {
        this.rendezvousForm.patchValue(res);
        console.log(this.rendezvousForm.value);
      });
    }
   
  onSubmit(): void {
    if (this.rendezvousForm.valid) {
      if (this.rendezvousId != 'null') {
        this.updateRendezvous()
      }else{
        this.rendezvousService
          .addRendezvous(this.rendezvousForm.value)
          .subscribe((res: any) => {
            console.log(res);
            this.rendezvousForm.reset();
            this.router.navigate(['/backoffice/rendezvous']);
          
          });
      }
    }
  }
  
  
  updateRendezvous() {
    if (this.rendezvousForm.valid) {
      console.log(this.rendezvousForm.value);
      this.rendezvousService.updateRendezvous(this.rendezvousId, this.rendezvousForm.value).subscribe((res: any) => {
        console.log(res);
        this.rendezvousForm.reset();
        this.router.navigate(['/backoffice/rendezvous']);
      });
    }
  }

}
