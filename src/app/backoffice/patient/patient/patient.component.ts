import { RouterModule } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { Patient } from '../../model/patient';
import { PatientService } from '../../service/patient.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-patient',
  standalone: true,
    imports: [CommonModule,RouterModule
    ,TableModule,
            MultiSelectModule,
            SelectModule,
            InputIconModule,
            TagModule,
            InputTextModule,
            SliderModule,
            ProgressBarModule,
            ToggleButtonModule,
            ToastModule,
            CommonModule,
            FormsModule,
            ButtonModule,
            RatingModule,
            RippleModule,
            IconFieldModule],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patientList: Patient[] = []
   
    selectedPatient: any;
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;
    statusValue!: null | boolean;


    statuses = [
      { label: 'Active', value: true },
      { label: 'Desactive', value: false },
    
  ];
    constructor(private patientservice:PatientService,
                    private messageService: MessageService
      
    ) { }
  
    ngOnInit(): void {
      
      this.displayPatient();
    }
    
    displayPatient() {
      this.patientservice.getAllPatients().subscribe((res)=>{
        this.patientList = res;
        console.log(this.patientList);
        this.loading = false;
      });
    }
  
    selectPatient(patient:any){
      this.selectedPatient=patient;
   }
   onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
      updatePatient(md: any) {
        this.patientservice
            .updatePatient(md.id, {
                status: false
            })
            .subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Medication deleted successfully' });
                this.displayPatient();
            });
    }
}
